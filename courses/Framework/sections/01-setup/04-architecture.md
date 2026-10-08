---
layout: chapter
transition: slide-left | slide-right
number: 04
duration: 40 min
---

# Architecture d'un projet Laravel

- Comprendre l'arborescence d'un projet Laravel
- Suivre le cycle d'une requête jusqu'à la réponse
- Identifier le rôle d'Artisan et des fichiers de configuration

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Architecture d'un projet Laravel
Arborescence principale

::left::

**✍️ Votre code** <span class="text-xs opacity-70">— les dossiers où vous travaillez chaque jour : <KeyTerm>routes</KeyTerm>, <KeyTerm>contrôleurs</KeyTerm>, vues <KeyTerm>Blade</KeyTerm></span>

<div class="text-sm">

<FileTree :tree="[
  {
    name: 'mon-projet/',
    children: [
      { name: 'app/', highlight: true, comment: 'Votre code PHP : modèles, contrôleurs', children: [
        { name: 'Models/' },
        { name: 'Http/Controllers/' },
        { name: 'Providers/' }
      ]},
      { name: 'database/', highlight: true, children: [
        { name: 'migrations/', comment: 'Versionnement du schéma' },
        { name: 'seeders/', comment: 'Données initiales ou de test' }
      ]},
      { name: 'resources/', highlight: true, comment: 'Templates et assets front', children: [
        { name: 'views/', comment: 'Templates Blade' },
        { name: 'css/' },
        { name: 'js/' }
      ]},
      { name: 'routes/', highlight: true, children: [
        { name: 'web.php', comment: 'Les URLs de votre site' },
        { name: 'api.php', comment: 'Endpoints API' }
      ]},
      { name: 'tests/', comment: 'Tests Feature et Unit' }
    ]
  }
]" />

</div>

::right::

**⚙️ Fourni par Laravel** <span class="text-xs opacity-70">— configuration et fichiers générés, vous y touchez rarement</span>

<div class="text-sm">

<FileTree :tree="[
  {
    name: 'mon-projet/',
    children: [
      { name: 'bootstrap/', children: [
        { name: 'app.php' },
        { name: 'cache/', comment: 'Cache de démarrage' }
      ]},
      { name: 'config/', comment: 'Configuration — valeurs sensibles dans .env' },
      { name: 'public/', children: [
        { name: 'index.php', comment: 'Seul fichier accessible depuis le web' }
      ]},
      { name: 'storage/', comment: 'Logs, caches, fichiers uploadés' },
      { name: 'vendor/', comment: 'Dépendances Composer — ne jamais modifier' },
      { name: '.env', comment: 'Secrets et environnement — jamais versionné' },
      { name: 'artisan', comment: 'Console Laravel' },
      { name: 'composer.json', comment: 'Dépendances PHP' },
      { name: 'package.json', comment: 'Dépendances JS' },
      { name: 'compose.yaml', comment: 'Services Docker de Sail' }
    ]
  }
]" />

</div>

<!--
Insister : app/, resources/views/, routes/ et database/migrations/ sont le code de l'apprenant.
Analogie : app/ c'est votre cuisine, resources/views/ c'est la salle, routes/ c'est le plan d'accès.
vendor/, bootstrap/cache/ et storage/framework/ sont générés ou utilisés par le framework — listés dans .gitignore, ils ne se versionnent pas.
Expliquer que vider `storage/framework/cache/` ou `bootstrap/cache/` peut résoudre certains comportements étranges.
-->

---
transition: slide-up | slide-down
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
- Le kernel reçoit la <KeyTerm>requête</KeyTerm> et retourne la <KeyTerm>réponse</KeyTerm>

</v-click>

<!--
Le vrai fichier contient quelques lignes de plus (maintenance mode, etc.).
L'essentiel est ici : un seul point d'entrée qui charge l'application.
-->

---
transition: slide-up | slide-down
---

# Architecture d'un projet Laravel
Cycle requête → réponse

<Steps direction="vertical" :clicks="true" :items="[
  { icon: '🌐', title: 'Requête HTTP', desc: 'Le navigateur appelle public/index.php' },
  { icon: '⚙️', title: 'Application', desc: 'Laravel crée le kernel HTTP' },
  { icon: '🔀', title: 'Router', desc: 'La route correspondante est déterminée' },
  { icon: '🎮', title: 'Contrôleur', desc: 'La logique métier est exécutée' },
  { icon: '📄', title: 'Réponse', desc: 'Souvent une vue Blade retournée' },
  { icon: '↩️', title: 'Navigateur', desc: 'Le kernel envoie la réponse' }
]" />

<!--
Ce modèle est commun à de nombreux frameworks : Symfony, NestJS, Ruby on Rails, Django...
La magie réside dans la convention, pas dans la complexité.
Le contenu est maintenant présenté via le composant <Steps>.
-->

---
transition: slide-up | slide-down
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
transition: slide-up | slide-down
---

# Architecture d'un projet Laravel
Artisan : la console Laravel

Le fichier `artisan` donne accès à des **commandes pratiques** :

<Terminal title="bash" prompt="$" :clicks="true" :lines="[{ cmd: './vendor/bin/sail artisan list', out: 'Available artisan commands listed.' }, { cmd: './vendor/bin/sail artisan about', out: 'Laravel 12.x · PHP 8.3.x · Environment local.' }, { cmd: './vendor/bin/sail artisan cache:clear', out: 'INFO  Cache cleared successfully.' }, { cmd: './vendor/bin/sail artisan make:controller QuestController', out: 'INFO  Controller [app/Http/Controllers/QuestController.php] created successfully.' }]" />

<v-click>

> 💡 <KeyTerm>Artisan</KeyTerm> est aussi un point d'entrée de l'application, comme `public/index.php`, mais en ligne de commande.

</v-click>

<!--
Montrer `artisan list` et quelques commandes utiles.
Dire qu'on utilisera souvent `make:model`, `make:controller`, `migrate`, `db:seed`, etc.
Le contenu est maintenant présenté via le composant <Terminal>.
-->
