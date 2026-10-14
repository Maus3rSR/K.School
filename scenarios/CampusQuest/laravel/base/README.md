# Campus Quest — projet de démonstration (S2 + S3)

Projet Laravel 12 + Sail utilisé par le formateur pour les **live coding** des séances 2 (Routing, contrôleurs et Blade) et 3 (Eloquent : modèles, relations, migrations) du cours Framework.

## Contexte

**Campus Quest** : une app de défis de campus. En S2, chaque **quête** vit dans un **tableau PHP** du contrôleur ; en S3, les quêtes passent en base (`quests`, `categories`, `locations`, pivot `location_quest`). Ce n'est pas l'atelier étudiant (WishFlix).

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

> Le projet démo tourne en **SQLite** (`DB_CONNECTION=sqlite`) — `database/database.sqlite` sera créé au premier `migrate`. Les slides montrent la variante MariaDB/Sail ; les commandes `sail artisan` sont identiques.

## Commandes utiles

```bash
./vendor/bin/sail up -d            # démarrer
./vendor/bin/sail down             # arrêter
./vendor/bin/sail artisan route:list
./vendor/bin/sail artisan migrate:fresh --seed
./vendor/bin/sail npm run build    # assets sans serveur Vite
```

## État du projet

Installation standard, **sans le code des étapes** (état de départ de la S2 : routes par défaut, vues `welcome`, pas de quêtes en base). Les fichiers finaux sont dans les dossiers `solution/` de chaque séance :

- [`../seance-02/`](../seance-02) — `LIVECODING.md` + `solution/` : `cp -r ../seance-02/solution/* .`
- [`../seance-03/`](../seance-03) — `LIVECODING.md` + `solution/` : `cp -r ../seance-03/solution/* .` (prérequis : solution S2 appliquée)

## Déroulé

Voir [seance-02/LIVECODING.md](../seance-02/LIVECODING.md) et [seance-03/LIVECODING.md](../seance-03/LIVECODING.md).
