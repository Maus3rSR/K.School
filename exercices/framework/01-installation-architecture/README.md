# Exercice 01 — Installation et architecture Laravel

## Objectif

Installer un projet Laravel 12 avec Docker (via Laravel Sail), le faire tourner localement, puis identifier les rôles des principaux répertoires et fichiers de l'arborescence.

**Durée estimée** : 2h (A : 1h30, B : 30 min)

**Référence officielle** :

- [Laravel Installation](https://laravel.com/docs/12.x/installation)
- [Laravel Sail](https://laravel.com/docs/12.x/sail)

---

## Prérequis

- Docker et Docker Compose installés sur votre poste
- Un compte GitHub pour pousser le dépôt du projet
- Avoir suivi la partie cours de la séance 1 (frameworks, architecture, cycle requête/réponse)

---

## Partie A — Installer WishFlix avec Laravel Sail

### Étape 1 — Créer le projet

Dans le répertoire où vous stockez vos projets, exécutez :

```bash
# macOS / Linux
curl -s https://laravel.build/wishflix | bash

# Windows (PowerShell)
curl -s https://laravel.build/wishflix | cmd /c
```

> Cette commande utilise un conteneur temporaire pour installer Laravel et ses dépendances, sans toucher à votre machine.

Puis rendez-vous dans le dossier créé :

```bash
cd wishflix
```

### Étape 2 — Lancer l'environnement

```bash
./vendor/bin/sail up -d
```

Cette commande peut être **longue la première fois** : Docker télécharge l'image PHP, le serveur web, la base de données et les dépendances. C'est normal.

### Étape 3 — Vérifier que le site répond

Rendez-vous sur [http://localhost](http://localhost).

Vous devriez voir la page d'accueil Laravel avec le logo et la version.

### Étape 4 — Vérifier la console Artisan

```bash
./vendor/bin/sail artisan about
```

Vous devez obtenir la version de Laravel, de PHP et l'environnement courant (`local`).

### Étape 5 — Versionner et pousser sur GitHub

1. Initialisez un dépôt Git : `git init`
2. Créez un dépôt privé sur GitHub (sans README, sans `.gitignore`)
3. Suivez les instructions affichées par GitHub pour `git remote add origin ...` puis `git push -u origin main`

---

## Partie B — Chasse au trésor dans l'architecture

Ouvrez le répertoire `wishflix/` dans votre éditeur. Pour chaque fichier ou dossier ci-dessous, indiquez **où il se trouve** et **à quoi il sert**. Rédigez vos réponses dans un fichier `REPONSES.md` à la racine du projet.

| # | Cible | À quoi sert-il/elle ? |
|---|-------|----------------------|
| 1 | `artisan` | |
| 2 | `routes/web.php` | |
| 3 | `app/Http/Controllers/` | |
| 4 | `app/Models/` | |
| 5 | `resources/views/` | |
| 6 | `database/migrations/` | |
| 7 | `public/index.php` | |
| 8 | `bootstrap/app.php` | |
| 9 | `config/app.php` | |
| 10 | `storage/logs/` | |
| 11 | `vendor/` | |
| 12 | `.env` | |
| 13 | `compose.yaml` | |

---

## Indices

<details>
<summary>Indice de niveau 1 — Les 3 grandes familles</summary>

L'arborescence se divise en trois grandes familles :

- ce que **vous** écrivez (`app/`, `resources/`, `routes/`, `database/migrations/`)
- ce que **Composer** gère (`vendor/`)
- ce que Laravel **génère** ou utilise à l'exécution (`storage/`, `bootstrap/cache/`)

</details>

<details>
<summary>Indice de niveau 2 — Deux points d'entrée</summary>

Un projet Laravel a deux points d'entrée principaux :

- `public/index.php` pour les requêtes HTTP
- `artisan` pour les commandes en ligne

Tout le reste du code est chargé à partir de l'un de ces deux fichiers.

</details>

<details>
<summary>Indice de niveau 3 — Rôles précis</summary>

- `bootstrap/app.php` : crée l'**application** Laravel et configure les providers, le kernel HTTP et console.
- `config/app.php` : configuration générale (timezone, locale, providers, etc.).
- `app/Models/` : classes Eloquent représentant les tables de la base de données.
- `resources/views/` : templates **Blade** utilisés pour générer le HTML.
- `database/migrations/` : scripts de modification du schéma de base de données.
- `compose.yaml` : description des services Docker (PHP, serveur web, base de données).

</details>

---

## Critères de réussite

- [ ] Le projet démarre avec `./vendor/bin/sail up -d`
- [ ] La page d'accueil s'affiche sur [http://localhost](http://localhost)
- [ ] La commande `./vendor/bin/sail artisan about` affiche Laravel 12.x et PHP 8.3+
- [ ] Le dépôt GitHub privé est créé et contient au moins un commit
- [ ] Le fichier `REPONSES.md` contient les 13 réponses à la chasse au trésor

---

## Bonus

Créez une première route qui affiche « Hello WishFlix ! » sur l'URL `/hello`.

1. Ouvrez le fichier `routes/web.php`.
2. Ajoutez la route suivante :

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return 'Hello WishFlix !';
});
```

3. Testez l'URL [http://localhost/hello](http://localhost/hello).

> 💡 Ici, on utilise une **closure** directement dans la route. Dans les prochaines séances, on remplacera cela par des contrôleurs.
