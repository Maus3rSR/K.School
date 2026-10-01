---
layout: cover
background: https://cover.sli.dev?6
---

# Chapitre 05 - Architecture d'un projet Symfony

---

# Architecture d'un projet Symfony
Arborescence principale

Voici les répertoires que vous allez utiliser chaque jour :

```text
wishflix/
├── bin/                 # Scripts exécutables (console)
├── config/              # Fichiers de configuration
├── public/              # Fichiers accessibles depuis le web
├── src/                 # Votre code PHP
├── templates/           # Vos templates Twig
├── tests/               # Vos tests automatisés
├── var/                 # Cache et logs générés
├── vendor/              # Dépendances installées par Composer
├── .env                 # Variables d'environnement
├── composer.json        # Dépendances et métadonnées
└── compose.yaml         # Configuration Docker
```

<!--
Insister : src/, templates/ et config/ sont le code de l'apprenant.
var/ et vendor/ sont générés, ne pas les modifier à la main.
-->

---

# Architecture d'un projet Symfony
Les dossiers que vous écrivez

<v-click>

- **`src/`** : classes PHP de votre application
  - `Controller/` : contrôleurs
  - `Entity/` : entités Doctrine
  - `Repository/` : requêtes personnalisées
  - `Form/` : formulaires

</v-click>
<v-click>

- **`templates/`** : fichiers Twig (`.html.twig`)
- **`config/`** : routing, services, packages...
- **`tests/`** : tests PHPUnit

</v-click>

<!--
Analogie : src/ c'est votre cuisine, templates/ c'est la salle, config/ c'est le plan électrique.
-->

---

# Architecture d'un projet Symfony
Les dossiers générés

<v-click>

- **`var/`** : fichiers produits automatiquement
  - `cache/` : cache de configuration et de templates
  - `log/` : journaux d'erreurs et de requêtes

</v-click>
<v-click>

- **`vendor/`** : dépendances Composer
  - Ne jamais modifier à la main
  - Généré par `composer install`

</v-click>
<v-click>

> 💡 Ces dossiers sont listés dans `.gitignore`. Ils n'ont pas vocation à être versionnés.

</v-click>

<!--
Expliquer que var/cache/ peut être supprimé pour résoudre certains problèmes étranges.
-->

---

# Architecture d'un projet Symfony
Le front controller

Le fichier `public/index.php` est le **seul fichier PHP** accessible directement depuis le web.

<v-click>

```php
// public/index.php — version simplifiée
use App\Kernel;

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
```

</v-click>
<v-click>

- Toutes les URLs passent par lui
- Il crée une instance de `App\Kernel`
- Le kernel charge la configuration et route la requête

</v-click>

<!--
Le vrai fichier contient plus de lignes (chargement du runtime, gestion des erreurs).
L'essentiel est ici : un seul point d'entrée.
-->

---

# Architecture d'un projet Symfony
Cycle requête → réponse

<v-clicks>

1. Le navigateur envoie une **requête HTTP** à `public/index.php`
2. Le **kernel** crée un objet `Request`
3. Le **router** détermine quel contrôleur exécuter
4. Le contrôleur retourne une **Response**
5. Le kernel envoie la réponse au navigateur

</v-clicks>

<v-click>

```text
Navigateur  →  public/index.php  →  Kernel  →  Router  →  Controller  →  Response
```

</v-click>

<!--
Ce modèle est commun à de nombreux frameworks : NestJS, Laravel, Ruby on Rails, Django...
La magie réside dans la convention, pas dans la complexité.
-->

---

# Architecture d'un projet Symfony
Les environnements

Symfony utilise des **environnements** pour adapter le comportement :

| Environnement | Usage | Caractéristiques |
|---------------|-------|------------------|
| `dev` | Développement local | Debug activé, logs verbeux |
| `prod` | Production | Cache maximal, pas de debug |
| `test` | Tests automatisés | Base de données dédiée |

<v-click>

L'environnement est défini par la variable `APP_ENV` dans le fichier `.env` :

```bash
APP_ENV=dev
```

</v-click>

<!--
En production, on surchargerait APP_ENV dans un fichier .env.local qui n'est pas versionné.
-->

---

# Architecture d'un projet Symfony
La console Symfony

Le fichier `bin/console` donne accès à des **commandes pratiques** :

```bash
# Liste de toutes les commandes
docker compose exec php php bin/console list

# Informations sur le projet
docker compose exec php php bin/console about

# Vider le cache
docker compose exec php php bin/console cache:clear
```

<v-click>

> 💡 La console est aussi un point d'entrée de l'application, comme `public/index.php`, mais en ligne de commande.

</v-click>

<!--
Montrer `bin/console list` et quelques commandes utiles.
Dire qu'on utilisera souvent `make:controller`, `make:entity`, `doctrine:migrations:migrate`, etc.
-->

---

# Architecture d'un projet Symfony
Flex et les recipes

<v-click>

- **Flex** : plugin Composer qui automatise l'installation des packages Symfony

</v-click>
<v-click>

- **Recipe** : script associé à un package qui configure le projet automatiquement

</v-click>
<v-click>

```bash
composer require symfony/orm-pack
```

Cette commande installe Doctrine **et** ajoute les fichiers de configuration nécessaires.

</v-click>

<v-click>

> 💡 C'est un gain de temps considérable : pas besoin de créer chaque fichier de config à la main.

</v-click>

<!--
Les recipes sont stockées dans `symfony.lock` et dans le dossier `config/`.
On peut les réinstaller avec `composer recipes:install` si besoin.
-->

---

# Architecture d'un projet Symfony
Résumé visuel

```text
Votre code                    Framework
------------                  -----------
src/Controller/     ←────→   Routing
src/Entity/         ←────→   Doctrine ORM
templates/          ←────→   Twig
config/             ←────→   Flex / Dependency Injection
tests/              ←────→   PHPUnit
```

<v-click>

Symfony fournit la structure. Vous remplissez les cases avec votre logique métier.

</v-click>

<!--
Cette slide est une synthèse des relations entre le code de l'apprenant et les composants Symfony.
-->

---
layout: center
class: text-center
---

# Architecture d'un projet Symfony
&nbsp;

> 💬 D'après ce que l'on vient de voir, que se passe-t-il concrètement quand un visiteur accède à `/hello` ?

<!--
Réponse attendue : la requête arrive sur public/index.php, le kernel et le router identifient le contrôleur associé à la route /hello, le contrôleur retourne une Response.
Transition vers l'exercice 01.
-->

---

# Exercice 01
Installation et architecture

🛠️ Lancez l'exercice avec :

```bash
pnpm symfony:ex:installation
```

Lisez le README dans :

```text
exercices/symfony/01-installation-architecture/README.md
```

<!--
Le formateur circule pendant l'installation.
Le premier lancement Docker est souvent long : encourager les apprenants à patienter.
-->
