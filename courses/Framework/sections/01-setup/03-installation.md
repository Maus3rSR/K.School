---
layout: cover
background: https://cover.sli.dev?4
---

# Chapitre 03 - Installer Laravel avec Docker

---

# Installer Laravel avec Docker
Pourquoi Docker ?

Docker permet d'avoir le **même environnement** sur toutes les machines :

<v-click>

- Même version de PHP
- Même version de Laravel
- Même extensions PHP
- Même serveur web (nginx / PHP-FPM)

</v-click>

<v-click>

> Pas de "chez moi ça marche" : tout le monde utilise la même configuration.

</v-click>

<!--
Analogie : Docker, c'est une cuisine équipée identique chez chaque apprenant.
On suit la même recette, on obtient le même plat.
-->

---

# Installer Laravel avec Docker
Prérequis

Avant de commencer, vérifiez que vous avez :

- **Docker** installé et en cours d'exécution
- **Docker Compose** (généralement inclus dans Docker Desktop)
- Un accès à Internet pour télécharger les images
- Environ **2 à 4 Go** d'espace disque disponible

<v-click>

> ⚠️ Le premier lancement est **long** : Docker télécharge PHP, MySQL/PostgreSQL, Redis et toutes les dépendances Composer.

</v-click>

<!--
Prévenir les apprenants : la première installation peut prendre 10 à 30 minutes selon le réseau.
C'est normal, c'est le moment où Docker prépare l'environnement.
-->

---

# Installer Laravel avec Docker
Étape 1 — Créer le projet avec l'installeur Laravel

> 📖 [Documentation officielle : Installation avec Docker](https://laravel.com/docs/11.x/installation#docker-installation-using-sail)

Laravel fournit un installeur qui crée un projet prêt à l'emploi, avec Sail intégré.

```bash
# macOS / Linux
curl -s https://laravel.build/<NOM_DE_VOTRE_PROJET>?with=postgres,redis | bash

# Windows (PowerShell)
curl -s https://laravel.build/<NOM_DE_VOTRE_PROJET>?with=postgres,redis | cmd /c
```

<v-click>

Cette commande :

1. Crée le dossier `<NOM_DE_VOTRE_PROJET>/`
2. Installe Laravel 12 et ses dépendances dans un conteneur temporaire
3. with=postgres,redis : installe PostgreSQL et Redis en services complémentaires (base de données et système de cache)
4. Configure automatiquement **[https://laravel.com/framework/docs/12.x/sail](Laravel Sail)**

</v-click>

<!--
Laravel.build est le moyen le plus simple de démarrer avec Docker.
Il utilise des conteneurs temporaires pour installer les dépendances sans polluer la machine locale.
-->

---

# Installer Laravel avec Docker
Étape 2 — Lancer l'environnement

Rendez-vous dans le dossier du projet et démarrez Sail :

```bash
cd <NOM_DE_VOTRE_PROJET>
# Lancement du container
./vendor/bin/sail up -d
# Migration de la base de données
./vendor/bin/sail artisan migrate
```

<v-click>

Cette commande démarre :

- Le conteneur PHP / Laravel
- Le serveur web
- La base de données (PostgreSQL par défaut)
- Le système de cache (Redis)
- Avec le CLI `artisan`, on lance la migration de la base de données

</v-click>

<!--
`./vendor/bin/sail` est un script qui encapsule `docker compose` avec les bons services pour Laravel.
`up -d` lance les conteneurs en arrière-plan.
-->

---

# Installer Laravel avec Docker
Étape 3 — Vérifier l'installation

Ouvrez [http://localhost](http://localhost) dans votre navigateur.

<v-click>

Vous devriez voir la page d'accueil Laravel avec :

- le logo Laravel
- le numéro de version
- les liens vers la documentation

</v-click>

<!--
Préparer un screenshot de la page d'accueil Laravel pour montrer le résultat attendu.
Contrairement à Symfony Docker, Sail utilise HTTP et non HTTPS par défaut en local.
-->

---

# Installer Laravel avec Docker
Étape 4 — Utiliser Artisan

Dans Docker, la commande `php` n'est pas directement accessible sur votre machine. Il faut l'exécuter **via Sail** :

```bash
./vendor/bin/sail artisan about
```

<v-click>

Cette commande affiche :

- La version de Laravel installée
- La version de PHP
- L'environnement courant (`local`)
- Les packages principaux

</v-click>

<!--
Expliquer le schéma : ./vendor/bin/sail artisan → exécute artisan dans le conteneur PHP.
C'est l'habitude à prendre pour toutes les commandes Laravel.
-->

---

# Installer Laravel avec Docker
Premiers réflexes

Pour travailler quotidiennement avec Sail :

```bash
# Démarrer le projet
./vendor/bin/sail up -d

# Arrêter le projet
./vendor/bin/sail down

# Voir les logs
./vendor/bin/sail logs

# Exécuter une commande Artisan
./vendor/bin/sail artisan <commande>

# Exécuter Composer
./vendor/bin/sail composer <commande>

# Exécuter NPM / Vite
./vendor/bin/sail npm <commande>
```

<!--
Insister sur le fait que Sail encapsule Docker Compose.
Toutes les commandes Laravel passent par `./vendor/bin/sail`.
-->
