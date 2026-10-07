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
# macOS / Linux / WSL2
curl -s "https://laravel.build/wishflix?with=mariadb,redis" | bash

# Windows (PowerShell)
curl -s "https://laravel.build/wishflix?with=mariadb,redis" | cmd /c
```

> Cette commande utilise un conteneur temporaire pour installer Laravel et ses dépendances, sans installer PHP ni Composer sur votre machine. `with=mariadb,redis` limite les services à une base de données et un cache.

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

Vous devriez voir la page d'accueil Laravel avec le logo et la version.

### Étape 4 — Vérifier la console Artisan

```bash
./vendor/bin/sail artisan about
```

Vous devez obtenir la version de Laravel (12.x), de PHP (8.3+) et l'environnement courant (`local`).

### Étape 5 — Versionner et pousser sur GitHub

```bash
git init -b main
git add .
git commit -m "Installation de Laravel 12 avec Sail"
```

1. Créez un dépôt **privé** sur GitHub (sans README, sans `.gitignore`)
2. Suivez les instructions affichées par GitHub : `git remote add origin ...` puis `git push -u origin main`
3. Vérifiez sur GitHub que le fichier `.env` **n'apparaît pas** dans le dépôt (vous comprendrez pourquoi en partie B)

---

## Partie B — Enquête dans l'architecture

Ouvrez le répertoire `wishflix/` dans votre éditeur. Répondez aux questions suivantes dans un fichier `REPONSES.md` à la racine du projet. Pour chaque réponse, indiquez **comment vous l'avez trouvée** (fichier ouvert, commande lancée).

Les questions sont organisées en trois paliers de difficulté croissante. Il n'y a pas de réponse « par cœur » : chaque question demande d'ouvrir un fichier ou d'exécuter une commande.

### Palier 1 — Observer (ouvrir et lire)

| # | Question |
|---|----------|
| 1 | Ouvrez `routes/web.php`. Quelle URL est définie ? Que retourne-t-elle ? Quel fichier (chemin complet) contient cette vue ? |
| 2 | Ouvrez `.env`. Notez les valeurs de `APP_ENV`, `DB_CONNECTION` et `SESSION_DRIVER`. |
| 3 | Ouvrez `compose.yaml`. Listez les services définis. Lequel sert la page `http://localhost` ? Sur quel port de votre machine la base de données est-elle exposée ? |
| 4 | Combien de fichiers y a-t-il dans `database/migrations/` ? Quelles tables créent-ils ? Vérifiez qu'ils ont bien été exécutés avec `./vendor/bin/sail artisan migrate:status`. |

### Palier 2 — Relier (suivre le fil entre deux fichiers)

| # | Question |
|---|----------|
| 5 | Dans `public/index.php`, quel est le **premier** fichier chargé par `require` ? À quel dossier appartient-il et qui a généré ce dossier ? |
| 6 | Ouvrez `bootstrap/app.php`. Quels fichiers de routes y sont déclarés ? Une URL de « santé » (*health*) y est aussi configurée : laquelle ? Visitez-la dans votre navigateur. |
| 7 | Exécutez `./vendor/bin/sail artisan route:list`. Combien de routes existent ? Retrouvez-vous l'URL de la question 6 ? |
| 8 | Dans `config/app.php`, trouvez la ligne qui définit `'name'`. Quelle fonction est utilisée pour lire la valeur ? Que se passerait-il si `APP_NAME` était absent du `.env` ? |

### Palier 3 — Raisonner (expliquer un choix du framework)

| # | Question |
|---|----------|
| 9 | `app/Models/` contient un seul modèle. Lequel ? À quelle table de la base correspond-il ? Comment Laravel fait-il le lien entre le nom de la classe et le nom de la table ? |
| 10 | `app/Http/Controllers/` contient un fichier. Est-il utilisé par la route `/` ? Si non, comment la route produit-elle quand même une réponse ? |
| 11 | Ouvrez `.gitignore`. Pourquoi `.env` y figure-t-il alors que `.env.example` n'y figure pas ? Pourquoi `vendor/` y figure-t-il ? Quelle commande un collègue devra-t-il lancer après avoir cloné votre dépôt pour reconstituer ce dossier ? |
| 12 | Le dossier `public/` est le **seul** exposé au serveur web. Quel problème de sécurité cela évite-t-il par rapport à un projet PHP « from scratch » où tous les fichiers sont à la racine du site ? |

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

## Bonus

### Bonus 1 — Une première route

Ajoutez dans `routes/web.php` une route qui affiche le texte « Hello WishFlix ! » sur l'URL `/hello`, en vous inspirant de la route `/` déjà présente. Testez sur [http://localhost/hello](http://localhost/hello), puis vérifiez qu'elle apparaît dans `./vendor/bin/sail artisan route:list`.

> 💡 Ici, on utilise une **closure** directement dans la route. Dans les prochaines séances, on remplacera cela par des contrôleurs.

### Bonus 2 — Une route avec paramètre

Ajoutez une route `/hello/{name}` qui affiche « Hello Alice ! » quand on visite `/hello/Alice`. Cherchez comment récupérer le paramètre dans la section [Route Parameters](https://laravel.com/framework/docs/12.x/routing#route-parameters) de la documentation.

Committez vos deux routes et poussez sur GitHub.
