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
    # Map your host UID to the same UID inside the app container so the "sail" user can write to the project.
    grep -q 'userns_mode' compose.yaml || \
        sed -E -i "s#^(\s+)laravel\.test:\s*\$#&\n\1    userns_mode: keep-id#" compose.yaml

    # Rootless Podman cannot bind ports below net.ipv4.ip_unprivileged_port_start (default 1024).
    if [ "$(sysctl -n net.ipv4.ip_unprivileged_port_start 2>/dev/null || echo 1024)" -gt 80 ] && ! grep -q '^APP_PORT=' .env; then
        echo "APP_PORT=8080" >> .env
    fi
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
