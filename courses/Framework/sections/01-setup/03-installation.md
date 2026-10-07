---
layout: chapter
transition: slide-left | slide-right
number: 03
duration: 45 min
---

# Installer Laravel avec Docker

- Comprendre l'intérêt de Docker pour le développement Laravel
- Créer un projet Laravel avec Laravel Sail
- Démarrer l'environnement et utiliser Artisan

---
transition: slide-up | slide-down
---

# Pourquoi Docker ?

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
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Trois outils à connaître

Avant de commencer

::left::

<Definition term="Composer">
Le gestionnaire de dépendances de PHP. Il télécharge Laravel et les bibliothèques tierces dans `vendor/`, comme `npm` le fait pour JavaScript.
</Definition>

<Definition term="Artisan">
La console en ligne de commande fournie par Laravel. Elle sert à lancer des tâches (migrations, cache) et à générer du code (`make:controller`...).
</Definition>

::right::

<Definition term="Sail">
L'environnement Docker officiel de Laravel : un fichier `compose.yaml` + un script `sail` qui pilote les conteneurs (PHP, base de données, Redis) pour vous.
</Definition>

<Alert>Ces trois noms reviendront dans toutes les commandes du cours.</Alert>

<!--
Composer = npm pour PHP. Artisan = le couteau suisse de Laravel. Sail = Docker Compose emballé pour Laravel.
Ne pas entrer dans le détail ici, on les manipule concrètement dans les étapes suivantes.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Deux méthodes d'installation

::left::

<Compare badLabel="🖥️ Laravel installer" goodLabel="🐳 Laravel Sail">
  <template #bad>

```bash
laravel new mon-projet
cd mon-projet
composer run dev
```

PHP, Composer et Node installés **sur votre machine**.

- Rapide à démarrer, pas de Docker
- Chacun a sa version de PHP et de base de données
- Application sur `http://localhost:8000`

</template>
  <template #good>

```bash
curl -s https://laravel.build/mon-projet | bash
cd mon-projet
./vendor/bin/sail up -d
```

PHP, Composer et Node tournent **dans des conteneurs Docker**.

- Même environnement pour tout le monde
- Nécessite Docker, premier lancement plus long
- Application sur `http://localhost`

</template>
</Compare>

::right::

<KeyPoint variant="rule" title="Dans ce cours" icon="🐳">

Nous utilisons **Sail** : une seule configuration à dépanner pour toute la promotion.

</KeyPoint>

<!--
Le Laravel installer est la méthode « officielle » par défaut dans la doc : elle suppose PHP installé localement (via php.new ou Herd).
Sail encapsule Docker Compose : toutes les commandes php/composer/artisan/npm passent par le script sail.
Les deux produisent exactement le même projet Laravel ; seule la façon de l'exécuter change.
-->

---
transition: slide-up | slide-down
---

# Prérequis

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
transition: slide-up | slide-down
---

# Étape 1 — Créer le projet

> 📖 [Documentation officielle : Laravel Sail](https://laravel.com/framework/docs/12.x/sail)

Laravel fournit un installeur qui crée un projet prêt à l'emploi, avec Sail intégré.

<Terminal title="bash" prompt="$" :clicks="true" :lines="[{ cmd: 'curl -s https://laravel.build/\x3CNOM_DE_VOTRE_PROJET\x3E?with=mariadb,redis \u007C bash', out: 'Application ready! Build something amazing.' }, { cmd: 'curl -s https://laravel.build/\x3CNOM_DE_VOTRE_PROJET\x3E?with=mariadb,redis \u007C cmd /c', out: 'Project created in mon-projet/.' }]" />

<v-click>

Cette commande :

1. Crée le dossier `&lt;NOM_DE_VOTRE_PROJET&gt;/`
2. Installe Laravel 12 et ses dépendances dans un conteneur temporaire
3. `with=mariadb,redis` : installe MariaDB (MySQL) et Redis en services complémentaires (base de données et système de cache)
4. Configure automatiquement **[Laravel Sail](https://laravel.com/framework/docs/12.x/sail)**

</v-click>

<!--
Laravel.build est le moyen le plus simple de démarrer avec Docker.
Il utilise des conteneurs temporaires pour installer les dépendances sans polluer la machine locale.
-->

---
transition: slide-up | slide-down
---

# Étape 2 — Lancer l'environnement

Rendez-vous dans le dossier du projet et démarrez Sail :

<Terminal title="bash" prompt="$" :clicks="true" :lines="[{ cmd: 'cd \x3CNOM_DE_VOTRE_PROJET\x3E' }, { cmd: './vendor/bin/sail up -d', out: 'Containers started (PHP, MariaDB, Redis).' }, { cmd: './vendor/bin/sail artisan migrate', out: 'Database migrated successfully.' }]" />

<v-click>

Cette commande démarre :

- Le conteneur PHP / Laravel
- Le serveur web
- La base de données (MariaDB par défaut avec `with=mariadb`)
- Le système de cache (Redis)
- Avec le CLI `artisan`, on lance la migration de la base de données

</v-click>

<!--
`./vendor/bin/sail` est un script qui encapsule `docker compose` avec les bons services pour Laravel.
`up -d` lance les conteneurs en arrière-plan.
-->

---
transition: slide-up | slide-down
---

# Étape 3 — Vérifier l'installation

Ouvrez [http://localhost](http://localhost) dans votre navigateur.

<Browser url="http://localhost">
  <Placeholder text="Page d'accueil Laravel" />
</Browser>

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
transition: slide-up | slide-down
---

# Étape 4 — Utiliser Artisan

Dans Docker, la commande `php` n'est pas directement accessible sur votre machine. Il faut l'exécuter **via Sail** :

<Terminal title="bash" prompt="$" :clicks="true" :lines="[{ cmd: './vendor/bin/sail artisan about', out: 'Laravel 12.x · PHP 8.3.x · Environment local · Debug ENABLED' }]" />

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
transition: slide-up | slide-down
---

# Premiers réflexes

Pour travailler quotidiennement avec Sail :

<Terminal title="bash" prompt="$" :clicks="true" :lines="[{ cmd: './vendor/bin/sail up -d' }, { cmd: './vendor/bin/sail down' }, { cmd: './vendor/bin/sail logs' }, { cmd: './vendor/bin/sail artisan \x3Ccommande\x3E' }, { cmd: './vendor/bin/sail composer \x3Ccommande\x3E' }, { cmd: './vendor/bin/sail npm \x3Ccommande\x3E' }]" />

<!--
Insister sur le fait que Sail encapsule Docker Compose.
Toutes les commandes Laravel passent par `./vendor/bin/sail`.
-->

---
transition: slide-up | slide-down
---

# Un alias pour aller plus vite

<Compare badLabel="❌ Sans alias" goodLabel="✅ Avec alias">
  <template #bad>

```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
./vendor/bin/sail composer require laravel/sanctum
```

</template>
  <template #good>

```bash
sail up -d
sail artisan migrate
sail composer require laravel/sanctum
```

</template>
</Compare>

<v-click>

Ajoutez cette ligne dans votre `~/.bashrc` ou `~/.zshrc`, puis rouvrez votre terminal :

```bash
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
```

> 📖 [Documentation officielle : configurer un alias shell](https://laravel.com/framework/docs/12.x/sail#configuring-a-shell-alias)

</v-click>

<!--
La doc officielle Laravel suppose l'alias configuré : quand elle écrit "sail artisan", c'est "./vendor/bin/sail artisan".
Sous Windows, l'alias se configure dans le shell WSL2 (bash), pas dans PowerShell.
-->
