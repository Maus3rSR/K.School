---
layout: cover
background: https://cover.sli.dev?5
---

# Chapitre 04 - Installer Symfony avec Docker

---

# Installer Symfony avec Docker
Pourquoi Docker ?

Docker permet d'avoir le **même environnement** sur toutes les machines :

<v-click>

- Même version de PHP
- Même version de Symfony
- Même extensions PHP
- Même serveur web (Caddy / FrankenPHP)

</v-click>

<v-click>

> Pas de "chez moi ça marche" : tout le monde utilise la même configuration.

</v-click>

<!--
Analogie : Docker, c'est une cuisine équipée identique chez chaque élève.
On suit la même recette, on obtient le même plat.
-->

---

# Installer Symfony avec Docker
Prérequis

Avant de commencer, vérifiez que vous avez :

- **Docker** installé et en cours d'exécution
- **Docker Compose** (généralement inclus dans Docker Desktop)
- Un accès à Internet pour télécharger les images
- Environ **2 à 4 Go** d'espace disque disponible

<v-click>

> ⚠️ Le premier lancement est **long** : Docker télécharge PHP, Caddy et toutes les dépendances Composer.

</v-click>

<!--
Prévenir les apprenants : la première installation peut prendre 10 à 30 minutes selon le réseau.
C'est normal, c'est le moment où Docker prépare l'environnement.
-->

---

# Installer Symfony avec Docker
Étape 1 — Télécharger le modèle

Le projet utilise le modèle officiel **dunglas/symfony-docker**.

Dans votre terminal :

```bash
curl -sSL https://github.com/dunglas/symfony-docker/archive/refs/heads/main.tar.gz | tar -xz
mv symfony-docker-main wishflix
cd wishflix
```

<v-click>

Alternative avec **Git** :

```bash
git clone https://github.com/dunglas/symfony-docker.git wishflix
cd wishflix
```

</v-click>

<!--
Expliquer que ce modèle contient Dockerfile, compose.yaml et les scripts de démarrage.
-->

---

# Installer Symfony avec Docker
Étape 2 — Lancer avec la version 7.4

Par défaut, le modèle installe la dernière version stable. On force **Symfony 7.4** :

```bash
SYMFONY_VERSION=7.4.* docker compose up --wait
```

<v-click>

Cette commande fait trois choses :

1. **Construit** l'image Docker (PHP 8.2+, Caddy, FrankenPHP)
2. **Télécharge** Symfony 7.4 et les dépendances via Composer
3. **Démarre** le serveur sur [https://localhost](https://localhost)

</v-click>

<!--
La commande `--wait` attend que les services soient prêts avant de rendre la main.
Sur Windows PowerShell, la syntaxe d'export de variable d'environnement diffère légèrement.
-->

---

# Installer Symfony avec Docker
Étape 3 — Vérifier l'installation

Ouvrez [https://localhost](https://localhost) dans votre navigateur.

<v-click>

Vous devriez voir la page d'accueil Symfony avec :

- le logo Symfony
- un message de bienvenue
- les liens vers la documentation

</v-click>

<v-click>

> 🔒 Le navigateur peut afficher un avertissement de certificat : c'est normal, le certificat est auto-signé en local. Acceptez-le.

</v-click>

<!--
Préparer un screenshot de la page d'accueil Symfony pour montrer le résultat attendu.
-->

---

# Installer Symfony avec Docker
Étape 4 — Utiliser la console Symfony

Dans Docker, la commande `php` n'est pas directement accessible sur votre machine. Il faut l'exécuter **à l'intérieur du conteneur** :

```bash
docker compose exec php php bin/console about
```

<v-click>

Cette commande affiche :

- La version de Symfony installée
- La version de PHP
- L'environnement courant (`dev`)
- Le répertoire du projet

</v-click>

<!--
Expliquer le schéma : docker compose exec php → on rentre dans le conteneur nommé "php", puis on exécute php bin/console.
C'est une habitude à prendre pour toutes les commandes Symfony.
-->

---

# Installer Symfony avec Docker
Plan B : sans Docker

Si Docker n'est pas disponible, vous pouvez utiliser **Symfony CLI** :

```bash
# PHP 8.2+ et Composer doivent être installés localement
symfony new wishflix --version=7.4.* --webapp
cd wishflix
symfony server:start
```

<v-click>

> ⚠️ Le reste du cours est prévu pour Docker. Le plan B est une solution de secours.

</v-click>

<!--
La version "webapp" installe un pack plus complet : Twig, Security, Doctrine, Debug Profiler, etc.
En Docker, on part d'un squelette et on ajoute les packages au fur et à mesure.
-->

---

# Installer Symfony avec Docker
Premiers réflexes

Pour travailler quotidiennement avec Docker :

```bash
# Démarrer le projet
docker compose up -d

# Arrêter le projet
docker compose down

# Voir les logs
docker compose logs -f

# Exécuter une commande dans le conteneur PHP
docker compose exec php <commande>
```

<!--
`docker compose up -d` lance les conteneurs en arrière-plan (mode détaché).
`docker compose down` les arrête et supprime le réseau temporaire.
-->

---
layout: center
class: text-center
---

# Installer Symfony avec Docker
&nbsp;

> 💬 Quelle différence faites-vous entre `docker compose up` et `docker compose exec php php bin/console ...` ?

<!--
Réponse attendue : up démarre les services, exec exécute une commande dans un service déjà démarré.
Cette distinction est essentielle pour le reste du module.
-->
