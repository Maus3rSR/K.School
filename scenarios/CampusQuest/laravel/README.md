# Campus Quest — projet de démonstration (S2)

Projet Laravel 12 + Sail utilisé par le formateur pour le **live coding** de la séance 2 (Routing, contrôleurs et Blade) du cours Framework.

## Contexte

**Campus Quest** : une app de défis de campus. Chaque **quête** a un `title`, des points d'**XP** et une `difficulty` (`easy` / `hard`). Les données vivent dans un **tableau PHP** du contrôleur (la BDD arrive en S3). Ce n'est pas l'atelier étudiant (WishFlix).

## Installation (première fois)

```bash
cp .env.example .env
docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/var/www/html" -w /var/www/html \
    laravelsail/php84-composer:latest composer install --ignore-platform-reqs
./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev   # garder ouvert dans un second terminal
```

Puis ouvrir <http://localhost>.

## Commandes utiles

```bash
./vendor/bin/sail up -d            # démarrer
./vendor/bin/sail down             # arrêter
./vendor/bin/sail artisan route:list
./vendor/bin/sail npm run build    # assets sans serveur Vite
```

## État du projet

Installation standard, **sans le code des étapes** (routes, contrôleur, vues). Prêts à l'emploi : `resources/css/app.css` et `resources/css/quests.css`. La solution complète est dans [`../solution/`](../solution) : copier avec `cp -r ../solution/* .`.

## Déroulé

Voir [LIVECODING.md](LIVECODING.md).
