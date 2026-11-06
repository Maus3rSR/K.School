# Exercice 01 — Installation et architecture Laravel

## Objectif

Installer un projet Laravel 12 avec Docker (Laravel Sail), le faire tourner, puis **suivre une requête** de fichier en fichier et **enquêter** dans l'arborescence : qui charge quoi, qui appelle qui.

## Charge

| Niveau | Contenu | Où | Charge indicative |
|---|---|---|---|
| **Socle** | Étape 0 + Partie A (étapes 1 à 10) | En séance | ≈ 1 h 45 (dont téléchargements) |
| **Attendu** | Partie B (enquête, ≈ 1 h) + Partie C « Sous le capot » (≈ 45 min) | À la maison | ≈ 2 h |
| **Bonus** | Explorer Artisan | Facultatif | ≈ 20 min |

> Ces estimations sont indicatives : elles supposent un rythme rapide — un étudiant met souvent 2 à 3 fois plus de temps que la démo. ⚠️ **Requis pour la séance 2** : la Partie A terminée — en S2 les maquettes WishFlix deviennent des pages Laravel dans ce projet.

**Référence officielle** :

- [Laravel Installation](https://laravel.com/docs/12.x/installation)
- [Laravel Sail](https://laravel.com/docs/12.x/sail)

**Répartition de l'enquête** : les 12 questions gardent leur numéro et leurs paliers. En séance, vous répondez à la **1, 5 et 6** (les fichiers que vous venez de suivre). À la maison, la partie B porte sur les paliers **Observer** (2, 3, 4) et **Relier** (7, 8) puis une synthèse ; la partie C (**Raisonner**, 9 à 12) fait expliquer des choix du framework. Les réponses vont dans `REPONSES.md`.

---

## Prérequis

- Docker et Docker Compose installés et **démarrés** sur votre poste
- Les ports **80** et **3306** libres (arrêter XAMPP / Apache / MySQL s'ils tournent)
- Un compte GitHub pour pousser le dépôt du projet
- Plan B si Docker est indisponible : poste IUT avec Podman (script `laravel-podman-iut-metz.sh wishflix mariadb`, site sur `http://localhost:8080`), PC personnel avec Docker Desktop, ou [Laravel Herd](https://herd.laravel.com/) (`laravel new wishflix`, commandes `php artisan` à la place de `sail artisan`)

---

## Étape 0 — Contrôler l'environnement

Dans un terminal **WSL2** (pas PowerShell sous Windows) :

```bash
docker compose version
docker ps
```

✅ Vérification : les deux commandes répondent sans `Cannot connect to the Docker daemon`.

---

## Partie A — Socle (en séance)

Chaque étape indique son **chapitre** du cours. Faites-les dans l'ordre, juste après la démo du chapitre correspondant.

### Étape 1 — Lancer la création du projet (Chapitre 1)

Dans le répertoire où vous stockez vos projets :

```bash
curl -s "https://laravel.build/wishflix?with=mariadb" | bash
```

> La commande utilise un conteneur temporaire : ni PHP ni Composer ne sont installés sur votre machine. `with=mariadb` limite les services à la base de données. **Le nom `wishflix` est imposé** : les exercices suivants l'attendent.

Laissez tourner (10 à 30 min) : c'est le moment du chapitre 02.

✅ Vérification : la commande se termine par un message invitant à faire `cd wishflix`.

### Étape 2 — Démarrer l'environnement (Chapitre 3)

```bash
cd wishflix
./vendor/bin/sail up -d
```

`up -d` peut être **long la première fois** (images à télécharger).

### Étape 3 — Préparer la base (Chapitre 3)

```bash
./vendor/bin/sail artisan migrate
```

`migrate` crée les tables dont Laravel a besoin dès le départ (sessions, cache, jobs). **Sans cette étape, la page d'accueil affiche une erreur.**

### Étape 4 — Vérifier le site et la console (Chapitre 3)

Rendez-vous sur [http://localhost](http://localhost), puis :

```bash
./vendor/bin/sail artisan about
```

✅ Vérification : la page d'accueil Laravel s'affiche ; `about` indique Laravel 12.x, PHP 8.3+ et l'environnement `local`.

### Étape 5 — Configurer l'alias `sail` (Chapitre 3)

Ajoutez dans `~/.bashrc` (ou `~/.zshrc`), puis rouvrez le terminal :

```bash
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
```

> Les consignes gardent la forme longue `./vendor/bin/sail` pour fonctionner partout.

✅ Vérification : `sail artisan about` donne le même résultat.

### Étape 6 — Versionner et pousser sur GitHub (Chapitre 3)

```bash
git init -b main
git add .
git commit -m "Installation de Laravel 12 avec Sail"
```

Créez un dépôt **privé** sur GitHub (sans README, sans `.gitignore`), puis suivez les instructions de GitHub (`git remote add origin ...`, `git push -u origin main`).

✅ Vérification : le dépôt contient votre commit et le fichier `.env` **n'apparaît pas**.

> ✅ **Point de contrôle 1** — étapes 2 à 6 validées : le site répond, `migrate` est passé, le dépôt GitHub contient le commit sans `.env`.
> 🛟 Rattrapage : relisez le projet neuf du tag Campus Quest `s1-ch3-installation` (dépôt `CampusQuest`), puis **refaites** l'installation de `wishflix` (ou le plan B).

### Étape 7 — Premier fichier d'une requête (Chapitre 4)

Créez `REPONSES.md` à la racine du projet. Pour chaque réponse, indiquez **comment vous l'avez trouvée** (fichier ouvert, commande lancée).

**Question 5** — Le tout premier fichier chargé.

- Ouvrez `public/index.php`.
- Repérez le **premier** fichier chargé par `require`.

**À noter dans `REPONSES.md`** : ce fichier, le dossier auquel il appartient, et qui a généré ce dossier.

### Étape 8 — Routes déclarées au démarrage (Chapitre 4)

**Question 6** — Les routes déclarées au démarrage.

- Ouvrez `bootstrap/app.php`.
- Repérez les fichiers de routes qui y sont déclarés, ainsi que l'URL de « santé » (*health*) configurée.
- Visitez cette URL dans votre navigateur.

**À noter dans `REPONSES.md`** : les fichiers de routes déclarés et l'URL de santé.

### Étape 9 — Route et vue d'accueil (Chapitre 4)

**Question 1** — La route d'accueil.

- Ouvrez `routes/web.php`.
- Repérez l'URL définie et ce qu'elle retourne.

**À noter dans `REPONSES.md`** : l'URL définie, ce qu'elle retourne, et le chemin complet du fichier qui contient cette vue.

Puis modifiez un mot dans la vue trouvée et rafraîchissez [http://localhost](http://localhost).

✅ Vérification : votre mot apparaît dans le navigateur.

### Étape 10 — Configuration (Chapitre 4)

Changez `APP_NAME` dans `.env`, puis lancez `./vendor/bin/sail artisan about`.

✅ Vérification : le nouveau nom apparaît dans la sortie. Remettez `WishFlix` si vous voulez garder un nom cohérent.

> ✅ **Point de contrôle 2** — `REPONSES.md` contient les questions 1, 5 et 6 avec leur méthode.
> 🛟 Rattrapage : relisez le diff du tag Campus Quest `s1-ch4-requete` (dépôt `CampusQuest`), puis **refaites** les étapes 7 à 10 sur `wishflix`.

---

## Partie B — Attendu : enquête (à la maison, ≈ 1 h)

Continuez `REPONSES.md`. Pour chaque réponse, indiquez **comment vous l'avez trouvée**. Il n'y a pas de réponse « par cœur » : chaque question demande d'ouvrir un fichier ou de lancer une commande.

### Palier 1 — Observer (ouvrir et lire)

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

### Synthèse — Votre carte de la requête

Dans `REPONSES.md`, dessinez (liste, schéma ASCII ou Mermaid) le trajet de `GET /` avec **les fichiers de votre projet**, du navigateur à la réponse, en ajoutant pour chaque fichier une phrase sur son rôle. Ajoutez où intervient `.env`.

Poussez ensuite `REPONSES.md` sur GitHub.

---

## Partie C — Sous le capot : raisonner (à la maison, ≈ 45 min)

Palier 3 — Raisonner (expliquer un choix du framework). Les questions 9 à 12 se traitent à la fin, dans `REPONSES.md`.

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

## Bonus

### Bonus 1 — Explorer les commandes Artisan

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

> 💡 La [documentation Artisan](https://laravel.com/docs/12.x/artisan) liste les commandes par famille — utile si vous êtes bloqué.

Quand vous avez terminé, committez `REPONSES.md` et poussez sur GitHub.

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
- Q9 : regardez la [convention de nommage des tables](https://laravel.com/docs/12.x/eloquent#table-names) dans la documentation Eloquent.

</details>

<details>
<summary>Indice de niveau 3 — Un pas de plus</summary>

- Q10 : une route peut recevoir soit un contrôleur, soit une **fonction anonyme** (closure). Observez la syntaxe dans `routes/web.php`.
- Q11 : `.env.example` est un **modèle** sans secret ; `.env` contient les vraies valeurs. Pour `vendor/`, relisez la définition de Composer dans le lexique du cours.
- Q12 : imaginez que `.env` soit accessible via `http://localhost/.env`.

</details>

---

## Critères de réussite

- [ ] Points de contrôle 1 et 2 validés (partie A)
- [ ] `./vendor/bin/sail artisan migrate:status` indique que toutes les migrations sont passées (`Ran`)
- [ ] La page d'accueil s'affiche sur [http://localhost](http://localhost) ; `about` affiche Laravel 12.x et PHP 8.3+
- [ ] Le dépôt GitHub privé contient au moins un commit et **ne contient pas** `.env`
- [ ] `REPONSES.md` répond aux 12 questions, précise la méthode de chacune et contient la synthèse
