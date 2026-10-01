---
layout: cover
background: https://cover.sli.dev?5
---

# Chapitre 04 - Installer Laravel avec Docker

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

Laravel fournit un installeur qui crée un projet prêt à l'emploi, avec Sail intégré.

```bash
# macOS / Linux
curl -s https://laravel.build/wishflix | bash

# Windows (PowerShell)
curl -s https://laravel.build/wishflix | cmd /c
```

<v-click>

Cette commande :

1. Crée le dossier `wishflix/`
2. Installe Laravel 12 et ses dépendances dans un conteneur temporaire
3. Configure automatiquement **Laravel Sail**

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
cd wishflix
./vendor/bin/sail up -d
```

<v-click>

Cette commande démarre :

- Le conteneur PHP / Laravel
- Le serveur web
- La base de données (MySQL par défaut)

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
Plan B : sans Docker

Si Docker n'est pas disponible, vous pouvez utiliser **Laravel Herd** :

```bash
# Herd fournit PHP, Composer, un serveur local et une base de données
herd new wishflix
cd wishflix
herd open
```

<v-click>

> ⚠️ Le reste du cours est prévu pour Docker / Sail. Le plan B est une solution de secours.

</v-click>

<!--
Herd est un outil local très pratique sur macOS et Windows.
Il ne nécessite pas Docker mais installe PHP et les outils directement sur la machine.
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

---
layout: center
class: text-center
---

# Installer Laravel avec Docker
&nbsp;

> 💬 Quelle différence faites-vous entre `sail up -d` et `sail artisan about` ?

<!--
Réponse attendue : up démarre les services, artisan exécute une commande dans le conteneur déjà démarré.
Cette distinction est essentielle pour le reste du module.
-->
