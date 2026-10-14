#!/usr/bin/env bash
# Podman port of https://laravel.build/EXAMPLE
# Usage: ./laravel-podman.sh [app-name] [services]
#   e.g. ./laravel-podman.sh EXAMPLE "mysql,redis,meilisearch,mailpit,selenium"

APP_NAME="${1:-EXAMPLE}"
SERVICES="${2:-mysql,redis,meilisearch,mailpit,selenium}"

# Ensure that Podman is running...
if ! podman info > /dev/null 2>&1; then
    echo "Podman is not running (or not installed)."

    exit 1
fi

ROOTLESS="$(podman info --format '{{.Host.Security.Rootless}}' 2>/dev/null)"

# In rootless Podman, container root == your host user, so generated files are owned by you.
podman run --rm \
    --pull=always \
    -v "$(pwd)":/opt:Z \
    -w /opt \
    docker.io/laravelsail/php84-composer:latest \
    bash -c "laravel new $APP_NAME --no-interaction && cd $APP_NAME && composer show laravel/sail 2>/dev/null || composer require laravel/sail --dev && php ./artisan sail:install --with=$SERVICES " || exit 1

cd "$APP_NAME" || exit 1

# Fully qualify short image names (Podman may refuse/prompt for unqualified names)
# and add SELinux relabel option to relative bind mounts.
sed -E -i \
    -e "/^\s+image:\s*['\"]?(sail-|localhost\/)/b" \
    -e "/^\s+image:\s*['\"]?[a-z0-9-]+\.[a-z0-9.-]+(:[0-9]+)?\//b" \
    -e "s#^(\s+image:\s*['\"]?)#\1docker.io/#" \
    -e "s#^(\s+-\s*['\"]?\.(/[^'\":]*)?:[^'\":]+)(['\"]?)\s*\$#\1:z\3#" \
    compose.yaml

if [ "$ROOTLESS" == "true" ]; then
    # Rootless Podman mappe déjà le root du conteneur sur l'utilisateur hôte :
    # les fichiers créés par root dans le conteneur appartiennent à l'utilisateur hôte.
    # L'UID hôte n'est PAS mappé dans le user namespace du conteneur : ne jamais
    # le passer en WWWUSER (usermod/setuid échoueraient -> php exit 127).
    # On fait donc tourner PHP en root dans le conteneur. Ne pas ajouter userns_mode: keep-id.
    if ! grep -q '^WWWGROUP=' .env; then
        echo "WWWGROUP=1337" >> .env
    fi

    if ! grep -q '^SUPERVISOR_PHP_USER=' .env; then
        echo "SUPERVISOR_PHP_USER=root" >> .env
    fi

    # Le compose.yaml de Sail ne transmet pas SUPERVISOR_PHP_USER au conteneur
    # (le ENV du Dockerfile vaut "sail") : on l'ajoute au bloc environment.
    if ! grep -q 'SUPERVISOR_PHP_USER' compose.yaml; then
        sed -E -i \
            -e "s/^(\s+)(WWWUSER:.*)\$/\1\2\n\1SUPERVISOR_PHP_USER: '\${SUPERVISOR_PHP_USER:-sail}'/" \
            compose.yaml
    fi

    # Sans session systemd (bus utilisateur absent), le réseau bridge (aardvark-dns)
    # et les timers de healthcheck échouent : laravel.test passe en network_mode: pasta,
    # les autres services partagent son réseau (network_mode: 'service:laravel.test')
    # et leurs ports sont rapatriés sur laravel.test.
    awk '
    NR == FNR {
        if ($0 ~ /^[^ ]/) { top = $1 }
        else if (top == "services:" && $0 ~ /^    [^ ]/) { svc = $1 }
        else if (top == "services:" && $0 ~ /^        [^ ]/) { prop = $1 }
        else if (top == "services:" && svc != "laravel.test:" && prop == "ports:" && $0 ~ /^            - /) {
            extra_ports = extra_ports $0 "\n"
        }
        next
    }
    function flush() { if (in_ports) { printf "%s", extra_ports; in_ports = 0 } }
    function end_svc() {
        flush()
        if (svc == "laravel.test:") print "        network_mode: pasta"
        else if (svc != "") print "        network_mode: '\''service:laravel.test'\''"
    }
    {
        if ($0 ~ /^[^ ]/) {
            if (top == "services:") end_svc()
            top = $1; svc = ""; prop = ""; skip_prop = 0; skip = (top == "networks:")
            if (!skip) print $0
            next
        }
        if (skip) next
        if (top == "services:" && $0 ~ /^    [^ ]/) {
            end_svc()
            svc = $1; prop = ""; skip_prop = 0
            print $0
            next
        }
        if (top == "services:" && $0 ~ /^        [^ ]/) {
            flush()
            prop = $1; skip_prop = 0
            if (prop == "networks:" || prop == "depends_on:" || prop == "healthcheck:") skip_prop = 1
            else if (svc != "laravel.test:" && (prop == "ports:" || prop == "extra_hosts:")) skip_prop = 1
            else if (svc == "laravel.test:" && prop == "ports:") in_ports = 1
            if (!skip_prop) print $0
            next
        }
        if (skip_prop) next
        print $0
    }
    END { if (top == "services:") end_svc() }
    ' compose.yaml compose.yaml > compose.yaml.tmp && mv compose.yaml.tmp compose.yaml

    # Les services partagent le réseau de laravel.test : accès via 127.0.0.1.
    if grep -Eq '^#?\s*DB_HOST=' .env; then
        sed -E -i 's/^#?\s*DB_HOST=.*/DB_HOST=127.0.0.1/' .env
    else
        echo "DB_HOST=127.0.0.1" >> .env
    fi

    sed -E -i \
        -e 's/^REDIS_HOST=.*/REDIS_HOST=127.0.0.1/' \
        -e 's/^MEMCACHED_HOST=.*/MEMCACHED_HOST=127.0.0.1/' \
        -e 's/^MAIL_HOST=mailpit/MAIL_HOST=127.0.0.1/' \
        -e 's#^MEILISEARCH_HOST=http://meilisearch:#MEILISEARCH_HOST=http://127.0.0.1:#' \
        -e 's/^TYPESENSE_HOST=.*/TYPESENSE_HOST=127.0.0.1/' \
        -e 's#^AWS_ENDPOINT=http://minio:#AWS_ENDPOINT=http://127.0.0.1:#' \
        -e 's/^PUSHER_HOST=soketi/PUSHER_HOST=127.0.0.1/' \
        .env
fi

APP_PORT=8080
# Listen :8080 to prevent conflict of existing app listening :80
if grep -q '^APP_PORT=' .env; then
    sed -i "s/^APP_PORT=.*/APP_PORT=${APP_PORT}/" .env
elif grep -q '^APP_URL=' .env; then
    sed -i "/^APP_URL=/a APP_PORT=${APP_PORT}" .env
else
    echo "APP_PORT=${APP_PORT}" >> .env
fi

# Tell Sail to use Podman instead of Docker (Sail sources .env).
grep -q '^SAIL_DOCKER_BINARY=' .env || echo "SAIL_DOCKER_BINARY=podman" >> .env
export SAIL_DOCKER_BINARY=podman

# Allow build with no additional services..
if [ "$SERVICES" == "none" ]; then
    ./vendor/bin/sail build
else
    ./vendor/bin/sail pull ${SERVICES//,/ }
    ./vendor/bin/sail build
fi

BOLD='\033[1m'
NC='\033[0m'

echo ""

if [ "$ROOTLESS" == "true" ]; then
    echo -e "${BOLD}Get started with:${NC} cd $APP_NAME && ./vendor/bin/sail up"
    exit 0
fi

# Rootful Podman: files were created by root, fix ownership.
if command -v doas &>/dev/null; then
    SUDO="doas"
elif command -v sudo &>/dev/null; then
    SUDO="sudo"
else
    echo "Neither sudo nor doas is available. Exiting."
    exit 1
fi

if $SUDO -n true 2>/dev/null; then
    $SUDO chown -R $USER: .
    echo -e "${BOLD}Get started with:${NC} cd $APP_NAME && ./vendor/bin/sail up"
else
    echo -e "${BOLD}Please provide your password so we can make some final adjustments to your application's permissions.${NC}"
    echo ""
    $SUDO chown -R $USER: .
    echo ""
    echo -e "${BOLD}Thank you! We hope you build something incredible. Dive in with:${NC} cd $APP_NAME && ./vendor/bin/sail up"
fi
