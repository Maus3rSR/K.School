---
layout: cover
background: https://cover.sli.dev?5
---

# Chapitre 04 - Architecture d'un projet Laravel

---

# Architecture d'un projet Laravel
Arborescence principale

Voici les répertoires que vous allez utiliser chaque jour :

```text
wishflix/
├── app/                 # Code métier de l'application
├── bootstrap/         # Fichiers de démarrage et cache
├── config/            # Fichiers de configuration
├── database/          # Migrations, seeders, factories
├── public/            # Fichiers accessibles depuis le web
├── resources/         # Views (Blade), assets CSS/JS
├── routes/            # Fichiers de routes
├── storage/           # Logs, cache, fichiers uploadés
├── tests/             # Tests automatisés
├── vendor/            # Dépendances installées par Composer
├── .env               # Variables d'environnement
├── artisan            # Console Artisan
├── composer.json      # Dépendances PHP
├── package.json       # Dépendances Node / Vite
└── compose.yaml       # Configuration Sail / Docker
```

<!--
Insister : app/, resources/views/, routes/ et database/migrations/ sont le code de l'apprenant.
vendor/, bootstrap/cache/ et storage/framework/ sont générés ou utilisés par le framework.
-->

---

# Architecture d'un projet Laravel
Les dossiers que vous écrivez

- **`app/`** : classes PHP de votre application
  - `Models/` : modèles Eloquent
  - `Http/Controllers/` : contrôleurs
  - `Providers/` : configuration du service container
- **`routes/`** : définition des routes web, API, console
- **`resources/views/`** : templates Blade
- **`database/migrations/`** : versionnement du schéma
- **`tests/`** : tests Feature et Unit

<!--
Analogie : app/ c'est votre cuisine, resources/views/ c'est la salle, routes/ c'est le plan d'accès.
-->

---

# Architecture d'un projet Laravel
Les dossiers générés ou gérés automatiquement

- **`storage/`** : fichiers produits automatiquement
  - `logs/` : journaux d'erreurs
  - `framework/cache/` : cache de configuration et vues
  - `app/` : fichiers uploadés
- **`vendor/`** : dépendances Composer
  - Ne jamais modifier à la main
  - Généré par `composer install`
- **`bootstrap/cache/`** : cache de démarrage du framework
<v-click>

> 💡 Ces dossiers sont listés dans `.gitignore`. Ils n'ont pas vocation à être versionnés.

</v-click>

<!--
Expliquer que vider `storage/framework/cache/` ou `bootstrap/cache/` peut résoudre certains comportements étranges.
-->

---

# Architecture d'un projet Laravel
Le front controller

Le fichier `public/index.php` est le **seul fichier PHP** accessible directement depuis le web.

<v-click>

```php
// public/index.php — version simplifiée
require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
)->send();
```

</v-click>
<v-click>

- Toutes les URLs passent par lui
- Il crée l'application via `bootstrap/app.php`
- Le kernel reçoit la requête et retourne la réponse

</v-click>

<!--
Le vrai fichier contient quelques lignes de plus (maintenance mode, etc.).
L'essentiel est ici : un seul point d'entrée qui charge l'application.
-->

---

# Architecture d'un projet Laravel
Cycle requête → réponse

<v-clicks>

1. Le navigateur envoie une **requête HTTP** à `public/index.php`
2. Laravel crée l'**application** et le **kernel HTTP**
3. Le **router** détermine la route correspondante
4. Le **contrôleur** exécute la logique métier
5. Le contrôleur retourne une **réponse** (souvent une vue Blade)
6. Le kernel envoie la réponse au navigateur

</v-clicks>

<v-click>

```text
Navigateur  →  public/index.php  →  Application  →  Router  →  Controller  →  Response
```

</v-click>

<!--
Ce modèle est commun à de nombreux frameworks : Symfony, NestJS, Ruby on Rails, Django...
La magie réside dans la convention, pas dans la complexité.
-->

---

# Architecture d'un projet Laravel
Les environnements

Laravel utilise des **environnements** pour adapter le comportement :

| Environnement | Usage | Caractéristiques |
|---------------|-------|------------------|
| `local` | Développement local | Debug activé, logs verbeux |
| `production` | Production | Cache maximal, pas de debug |
| `testing` | Tests automatisés | Base de données en mémoire (SQLite souvent) |

<v-click>

L'environnement est défini par la variable `APP_ENV` dans le fichier `.env` :

```bash
APP_ENV=local
```

</v-click>

<!--
En production, on surchargerait APP_ENV dans un fichier .env.production qui n'est pas versionné.
-->

---

# Architecture d'un projet Laravel
Artisan : la console Laravel

Le fichier `artisan` donne accès à des **commandes pratiques** :

```bash
# Liste de toutes les commandes
./vendor/bin/sail artisan list

# Informations sur le projet
./vendor/bin/sail artisan about

# Vider le cache
./vendor/bin/sail artisan cache:clear

# Créer un contrôleur
./vendor/bin/sail artisan make:controller GameController
```

<v-click>

> 💡 Artisan est aussi un point d'entrée de l'application, comme `public/index.php`, mais en ligne de commande.

</v-click>

<!--
Montrer `artisan list` et quelques commandes utiles.
Dire qu'on utilisera souvent `make:model`, `make:controller`, `migrate`, `db:seed`, etc.
-->

---

# Architecture d'un projet Laravel
Fichiers de configuration

Laravel centralise la configuration dans le dossier `config/` :

- `config/app.php` : configuration générale
- `config/database.php` : connexions aux bases de données
- `config/auth.php` : authentification
- `config/cache.php` : cache
- `config/services.php` : services tiers (API keys)

<v-click>

> 💡 La plupart des valeurs sensibles ne sont pas dans ces fichiers : elles viennent du fichier `.env`.

</v-click>

<!--
Expliquer le principe : configuration versionnée, secrets dans .env non versionné.
C'est une bonne pratique de sécurité transverse à tous les frameworks.
-->

---

# Architecture d'un projet Laravel
Résumé visuel

```text
Votre code                    Framework
------------                  -----------
routes/web.php      ←────→   Router
app/Http/Controllers/ ←────→  Kernel / Pipeline
app/Models/         ←────→   Eloquent ORM
resources/views/    ←────→   Blade
database/migrations/←────→   Schema Builder
.env                ←────→   Config / Services
```

<v-click>

Laravel fournit la structure. Vous remplissez les cases avec votre logique métier.

</v-click>

<!--
Cette slide est une synthèse des relations entre le code de l'apprenant et les composants Laravel.
-->