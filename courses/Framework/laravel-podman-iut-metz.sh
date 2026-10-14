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
