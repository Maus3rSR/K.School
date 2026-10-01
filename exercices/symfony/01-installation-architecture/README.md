# Exercice 01 — Installation et architecture Symfony

## Objectif

Installer un projet Symfony 7.4 avec Docker, le faire tourner localement, puis identifier les rôles des principaux répertoires et fichiers de l'arborescence.

**Durée estimée** : 2h (A : 1h30, B : 30 min)

**Référence officielle** :

- [Installing & Setting up the Symfony Framework 7.4](https://symfony.com/doc/7.4/setup.html)
- [Symfony Docker](https://github.com/dunglas/symfony-docker)

---

## Prérequis

- Docker et Docker Compose installés sur votre poste
- Un compte GitHub pour pousser le dépôt du projet
- Avoir suivi la partie cours de la séance 1 (frameworks, architecture, cycle requête/réponse)

---

## Partie A — Installer WishFlix avec Docker

### Étape 1 — Créer le projet

Dans le répertoire où vous stockez vos projets, exécutez :

```bash
curl -sSL https://github.com/dunglas/symfony-docker/archive/refs/heads/main.tar.gz | tar -xz
mv symfony-docker-main wishflix
cd wishflix
```

> C'est un modèle de projet Docker optimisé pour Symfony. Vous pouvez aussi utiliser `git clone https://github.com/dunglas/symfony-docker.git wishflix` si vous préférez conserver l'historique Git du template.

### Étape 2 — Lancer l'environnement

```bash
SYMFONY_VERSION=7.4.* docker compose up -d --wait
```

Cette commande peut être **longue la première fois** (téléchargement des images + installation des dépendances). C'est normal.

> Le préfixe `SYMFONY_VERSION=7.4.*` force l'installation de la version Symfony cible du cours.

### Étape 3 — Vérifier que le site répond

Rendez-vous sur [https://localhost](https://localhost).

Vous devriez voir la page d'accueil Symfony avec un message de bienvenue.

### Étape 4 — Vérifier la console Symfony

```bash
docker compose exec php php bin/console about
```

Vous devez obtenir la version de Symfony, de PHP et l'environnement courant.

### Étape 5 — Versionner et pousser sur GitHub

1. Initialisez un dépôt Git : `git init`
2. Créez un dépôt privé sur GitHub (sans README, sans `.gitignore`)
3. Suivez les instructions affichées par GitHub pour `git remote add origin ...` puis `git push -u origin main`

---

## Partie B — Chasse au trésor dans l'architecture

Ouvrez le répertoire `wishflix/` dans votre éditeur. Pour chaque fichier ou dossier ci-dessous, indiquez **où il se trouve** et **à quoi il sert**. Rédigez vos réponses dans un fichier `REPONSES.md` à la racine du projet.

| # | Cible | À quoi sert-elle ? |
|---|-------|--------------------|
| 1 | `bin/console` | |
| 2 | `config/routes.yaml` | |
| 3 | `config/services.yaml` | |
| 4 | `public/index.php` | |
| 5 | `src/Controller/` | |
| 6 | `src/Kernel.php` | |
| 7 | `templates/` | |
| 8 | `var/cache/` | |
| 9 | `var/log/` | |
| 10 | `vendor/` | |
| 11 | `.env` | |
| 12 | `compose.yaml` | |
| 13 | `Dockerfile` | |

---

## Indices

<details>
<summary>Indice de niveau 1 — Les 3 grandes familles</summary>

L'arborescence se divise en trois grandes familles :

- ce que **vous** écrivez (`src/`, `templates/`, `config/`)
- ce que **Composer** gère (`vendor/`)
- ce que Symfony **génère** à l'exécution (`var/`)

</details>

<details>
<summary>Indice de niveau 2 — Deux points d'entrée</summary>

Un projet Symfony a deux points d'entrée principaux :

- `public/index.php` pour les requêtes HTTP
- `bin/console` pour les commandes en ligne

Tout le reste du code est chargé à partir de l'un de ces deux fichiers.

</details>

<details>
<summary>Indice de niveau 3 — Rôles précis</summary>

- `config/services.yaml` : déclare comment Symfony doit instancier les classes (le **conteneur de services**).
- `config/routes.yaml` : associe les URLs aux contrôleurs quand on ne veut pas utiliser d'attributs PHP.
- `src/Kernel.php` : classe qui représente l'application elle-même et charge la configuration.
- `compose.yaml` / `Dockerfile` : décrivent l'environnement Docker (services, image PHP, base de données éventuelle).

</details>

---

## Critères de réussite

- [ ] Le projet démarre avec `docker compose up`
- [ ] La page d'accueil s'affiche sur [https://localhost](https://localhost)
- [ ] La commande `docker compose exec php php bin/console about` affiche Symfony 7.4.x et PHP 8.2+
- [ ] Le dépôt GitHub privé est créé et contient au moins un commit
- [ ] Le fichier `REPONSES.md` contient les 13 réponses à la chasse au trésor

---

## Bonus

Créez un premier contrôleur qui affiche « Hello WishFlix ! » sur l'URL `/hello` :

1. Créez le dossier `src/Controller/` s'il n'existe pas.
2. Créez le fichier `src/Controller/HelloController.php`.
3. Utilisez l'attribut `#[Route]` du namespace `Symfony\Component\Routing\Attribute\Route`.
4. Testez l'URL [https://localhost/hello](https://localhost/hello).

```php
<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HelloController
{
    #[Route('/hello', name: 'app_hello')]
    public function hello(): Response
    {
        return new Response('Hello WishFlix !');
    }
}
```
