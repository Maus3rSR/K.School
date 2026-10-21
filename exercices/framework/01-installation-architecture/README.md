# Exercice 01 — Installation et architecture Laravel

## Objectif

Installer un projet Laravel 12 avec Docker (via Laravel Sail), le faire tourner localement, puis **enquêter** dans l'arborescence pour comprendre comment les fichiers s'articulent : qui charge quoi, qui appelle qui.

**Durée estimée** : 2h (A : 1h dont téléchargements, B : 45 min, bonus : 15 min)

**Référence officielle** :

- [Laravel Installation](https://laravel.com/framework/docs/12.x/installation)
- [Laravel Sail](https://laravel.com/framework/docs/12.x/sail)

---

## Prérequis

- Docker et Docker Compose installés et **démarrés** sur votre poste
- Les ports **80** et **3306** libres (arrêter XAMPP / Apache / MySQL s'ils tournent)
- Un compte GitHub pour pousser le dépôt du projet
- Avoir suivi la partie cours de la séance 1 (frameworks, installation, architecture, cycle requête → réponse)

---

## Partie A — Installer WishFlix avec Laravel Sail

### Étape 1 — Créer le projet

Dans le répertoire où vous stockez vos projets, exécutez :

```bash
curl -s "https://laravel.build/wishflix?with=mariadb" | bash
```

> Sous Windows : exécutez cette commande dans un terminal **WSL2** (pas dans PowerShell).

> Cette commande utilise un conteneur temporaire pour installer Laravel et ses dépendances, sans installer PHP ni Composer sur votre machine. `with=mariadb` limite les services à la base de données (Redis n'est pas nécessaire pour ce cours).

Puis rendez-vous dans le dossier créé :

```bash
cd wishflix
```

### Étape 2 — Lancer l'environnement et préparer la base

```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
```

- `up -d` peut être **long la première fois** : Docker télécharge l'image PHP, le serveur web et la base de données. C'est normal.
- `migrate` crée les tables dont Laravel a besoin dès le départ (sessions, cache, jobs). **Sans cette étape, la page d'accueil affichera une erreur.**

> 💡 Vous pouvez configurer l'alias `sail` vu en cours pour taper `sail up -d` au lieu de `./vendor/bin/sail up -d`. Les consignes gardent la forme longue pour fonctionner partout.

### Étape 3 — Vérifier que le site répond

Rendez-vous sur [http://localhost](http://localhost).

✅ Vérification : la page d'accueil Laravel s'affiche avec le logo et la version.

### Étape 4 — Vérifier la console Artisan

```bash
./vendor/bin/sail artisan about
```

✅ Vérification : la sortie affiche la version de Laravel (12.x), de PHP (8.3+) et l'environnement courant (`local`).

### Étape 5 — Versionner et pousser sur GitHub

1. Initialisez le dépôt Git et faites le premier commit :

   ```bash
   git init -b main
   git add .
   git commit -m "Installation de Laravel 12 avec Sail"
   ```

2. Créez un dépôt **privé** sur GitHub (sans README, sans `.gitignore`), puis suivez les instructions affichées par GitHub : `git remote add origin ...` puis `git push -u origin main`.

✅ Vérification : sur GitHub, le dépôt contient votre commit, et le fichier `.env` **n'apparaît pas** dans le dépôt (vous comprendrez pourquoi en partie B).

---

## Partie B — Enquête dans l'architecture

Ouvrez le répertoire `wishflix/` dans votre éditeur. Répondez aux questions suivantes dans un fichier `REPONSES.md` à la racine du projet. Pour chaque réponse, indiquez **comment vous l'avez trouvée** (fichier ouvert, commande lancée).

Les questions sont organisées en trois paliers de difficulté croissante. Il n'y a pas de réponse « par cœur » : chaque question demande d'ouvrir un fichier ou d'exécuter une commande.

### Palier 1 — Observer (ouvrir et lire)

**Question 1** — La route d'accueil.

- Ouvrez `routes/web.php`.
- Repérez l'URL définie et ce qu'elle retourne.

**À noter dans `REPONSES.md`** : l'URL définie, ce qu'elle retourne, et le chemin complet du fichier qui contient cette vue.

**Question 2** — Les valeurs de l'environnement.

- Ouvrez `.env`.

**À noter dans `REPONSES.md`** : les valeurs de `APP_ENV`, `DB_CONNECTION` et `SESSION_DRIVER`.

**Question 3** — Les services Docker.

- Ouvrez `compose.yaml`.
- Listez les services définis.

**À noter dans `REPONSES.md`** : la liste des services, celui qui sert la page `http://localhost`, et le port de votre machine sur lequel la base de données est exposée.

**Question 4** — Les migrations.

- Comptez les fichiers dans `database/migrations/`.
- Vérifiez qu'ils ont bien été exécutés :

  ```bash
  ./vendor/bin/sail artisan migrate:status
  ```

**À noter dans `REPONSES.md`** : le nombre de fichiers, les tables qu'ils créent, et ce que confirme `migrate:status`.

### Palier 2 — Relier (suivre le fil entre deux fichiers)

**Question 5** — Le tout premier fichier chargé.

- Ouvrez `public/index.php`.
- Repérez le **premier** fichier chargé par `require`.

**À noter dans `REPONSES.md`** : ce fichier, le dossier auquel il appartient, et qui a généré ce dossier.

**Question 6** — Les routes déclarées au démarrage.

- Ouvrez `bootstrap/app.php`.
- Repérez les fichiers de routes qui y sont déclarés, ainsi que l'URL de « santé » (*health*) configurée.
- Visitez cette URL dans votre navigateur.

**À noter dans `REPONSES.md`** : les fichiers de routes déclarés et l'URL de santé.

**Question 7** — L'inventaire des routes.

- Exécutez :

  ```bash
  ./vendor/bin/sail artisan route:list
  ```

**À noter dans `REPONSES.md`** : combien de routes existent, et si vous retrouvez l'URL de la question 6.

**Question 8** — La lecture de la configuration.

- Ouvrez `config/app.php`.
- Trouvez la ligne qui définit `'name'`.

**À noter dans `REPONSES.md`** : la fonction utilisée pour lire la valeur, et ce qui se passerait si `APP_NAME` était absent du `.env`.

### Palier 3 — Raisonner (expliquer un choix du framework)

**Question 9** — Le seul modèle.

- Ouvrez `app/Models/` : il contient un seul modèle.

**À noter dans `REPONSES.md`** : lequel, à quelle table de la base il correspond, et comment Laravel fait le lien entre le nom de la classe et le nom de la table.

**Question 10** — Le contrôleur inutilisé.

- Ouvrez `app/Http/Controllers/` : il contient un fichier.

**À noter dans `REPONSES.md`** : ce contrôleur est-il utilisé par la route `/` ? Si non, comment la route produit-elle quand même une réponse ?

**Question 11** — Ce que Git ignore.

- Ouvrez `.gitignore`.

**À noter dans `REPONSES.md`** : pourquoi `.env` y figure alors que `.env.example` n'y figure pas ; pourquoi `vendor/` y figure ; et quelle commande un collègue devra lancer après avoir cloné votre dépôt pour reconstituer ce dossier.

**Question 12** — Le seul dossier exposé.

- Le dossier `public/` est le **seul** exposé au serveur web.

**À noter dans `REPONSES.md`** : quel problème de sécurité cela évite-t-il par rapport à un projet PHP « from scratch » où tous les fichiers sont à la racine du site ?

---

## Indices

<details>
<summary>Indice de niveau 1 — Les 3 grandes familles</summary>

L'arborescence se divise en trois grandes familles :

- ce que **vous** écrivez (`app/`, `resources/`, `routes/`, `database/migrations/`)
- ce que **Composer** gère (`vendor/`)
- ce que Laravel **génère** ou utilise à l'exécution (`storage/`, `bootstrap/cache/`)

Pour une question sur un fichier, demandez-vous d'abord à quelle famille il appartient.

</details>

<details>
<summary>Indice de niveau 2 — Où chercher</summary>

- Q1 : les vues Blade portent l'extension `.blade.php`.
- Q3 : dans `compose.yaml`, cherchez la clé `ports:` de chaque service. La notation est `port_machine:port_conteneur`.
- Q5 : le fichier chargé en premier a été produit par la commande qui remplit `vendor/`.
- Q6 : cherchez l'appel `withRouting(...)` et lisez ses arguments nommés.
- Q8 : la fonction utilisée accepte **deux** arguments ; le second a un rôle précis.
- Q9 : regardez la [convention de nommage des tables](https://laravel.com/framework/docs/12.x/eloquent#table-names) dans la documentation Eloquent.

</details>

<details>
<summary>Indice de niveau 3 — Un pas de plus</summary>

- Q10 : une route peut recevoir soit un contrôleur, soit une **fonction anonyme** (closure). Observez la syntaxe dans `routes/web.php`.
- Q11 : `.env.example` est un **modèle** sans secret ; `.env` contient les vraies valeurs. Pour `vendor/`, relisez la définition de Composer dans le lexique du cours.
- Q12 : imaginez que `.env` soit accessible via `http://localhost/.env`.

</details>

---

## Critères de réussite

- [ ] Le projet démarre avec `./vendor/bin/sail up -d`
- [ ] `./vendor/bin/sail artisan migrate:status` indique que toutes les migrations sont passées (`Ran`)
- [ ] La page d'accueil s'affiche sur [http://localhost](http://localhost)
- [ ] La commande `./vendor/bin/sail artisan about` affiche Laravel 12.x et PHP 8.3+
- [ ] Le dépôt GitHub privé est créé, contient au moins un commit, et **ne contient pas** `.env`
- [ ] Le fichier `REPONSES.md` répond aux 12 questions en précisant la méthode utilisée pour chacune

---

## Bonus — Explorer les commandes Artisan

Artisan propose bien plus de commandes que `about` et `migrate`. Découvrez le catalogue complet :

```bash
./vendor/bin/sail artisan list
```

Puis relevez les défis ci-dessous. Notez vos trouvailles dans `REPONSES.md`.

1. Dans la liste affichée par `artisan list`, repérez une commande qui **vide un cache** et une qui **indique l'état des migrations**.

   **À noter dans `REPONSES.md`** : leurs noms exacts.

2. Exécutez :

   ```bash
   ./vendor/bin/sail artisan make:controller --help
   ```

   - Relevez les options qui permettent de générer **d'autres fichiers** en même temps que le contrôleur.
   - Choisissez-en une et générez un contrôleur.
   - Observez les fichiers créés, puis nettoyez-les.

3. Lancez :

   ```bash
   ./vendor/bin/sail artisan tinker
   ```

   C'est une console PHP interactive branchée sur votre application. Essayez d'y afficher la valeur `APP_NAME` de votre `.env` sans ouvrir le fichier — une fonction d'aide de Laravel permet de lire la configuration (regardez comment `config/app.php` récupère ses valeurs).

> 💡 La [documentation Artisan](https://laravel.com/framework/docs/12.x/artisan) liste les commandes par famille — utile si vous êtes bloqué.

Quand vous avez terminé, committez `REPONSES.md` et poussez sur GitHub.
