# Programme Framework (Laravel) — R5.Real.05 Programmation avancée

**Public** : BUT Informatique 3e année
**Volume** : 34h — 8 séances de 4h + 1 séance de 2h
**Version** : Laravel 12 (PHP 8.3+) — tout le code suit la [documentation Laravel 12.x](https://laravel.com/docs/12.x)
**Fil rouge** : WishFlix (`scenarios/WishFlix`) — catalogue de jeux vidéo avec wishlist personnelle

## Compétences ciblées

- **Développer** — concevoir, coder, tester et intégrer une solution informatique pour un client
- **Optimiser** — proposer des applications optimisées selon des critères spécifiques : temps d'exécution, précision, consommation de ressources

## Format de séance

**Public** : étudiants de BUT, **débutants sur Laravel**, avec des bases de programmation (PHP, HTML/CSS, SQL, Git). Ce n'est pas un public sans prérequis.

### Une séance = une suite de cycles

Pas de bloc « théorie » suivi d'un bloc « pratique ». Chaque notion se traite complète :

1. **Théorie courte** : le problème, puis le concept (slides)
2. **Livecoding sur Campus Quest** (sujet A) : le formateur construit la notion en direct
3. **Micro-pratique « à vous » sur WishFlix** (sujet B) : les étudiants transposent, puis valident un point de contrôle

L'ordre des slides = l'ordre du livecoding (`scenarios/CampusQuest/laravel/seance-XX/LIVECODING.md`) = l'ordre des étapes de la Partie A de l'exercice.

### Deux domaines, jamais de recopie

- **Campus Quest** (quêtes, XP, lieux) : démonstrations uniquement
- **WishFlix** (catalogue de jeux avec wishlist) : projet fil rouge des étudiants, construit **en continu** (pas de « projet de fin » séparé). Les étudiants l'ont commencé en S1 : ne jamais changer le modèle de données ni les noms de fichiers déjà attendus

### Budget de temps

- `duration` d'un chapitre = slides + livecoding + micro-pratique
- Somme des chapitres + pratique en séance + pause ≤ 4h **− 10 %** (≈ 3h35 planifiées au maximum)
- Hypothèse : les étudiants pratiquent **2 à 3 fois moins vite** que la démo ; le socle est dimensionné pour un étudiant lent
- Densité : 3-4 notions nouvelles par séance, un seul « aperçu » au maximum

### Structure de chaque exercice (`exercices/framework/XX-*/README.md`)

| Partie | Où | Contenu |
|---|---|---|
| **A — Socle** | En séance | Micro-étapes alignées sur les chapitres, points de contrôle |
| **B — Attendu** | À la maison (≈ 1h15) | **2 user stories** qui réappliquent la notion ailleurs dans le site |
| **C — Sous le capot** | À la maison (≈ 45 min) | Questions qui font lire le code du framework, réponses dans `REPONSES.md` |
| **Bonus** | Facultatif | 3e user story et défis |

Travail personnel : **≈ 2h par semaine** (B + C).

### Rattrapage

- Campus Quest est publié dans un **dépôt dédié** avec un commit par étape du livecoding et **un tag par chapitre** (ex. `s3-ch2-migrations`) : le diff entre deux tags = le code du chapitre
- Un étudiant en retard s'appuie sur le tag Campus Quest du point de contrôle pour **refaire la partie sur WishFlix** (transposition, pas de copie)
- Aucun tag ni dépôt de rattrapage WishFlix : le projet reste sous la responsabilité de l'étudiant
- La compréhension se juge donc surtout sur l'Attendu, les bonus, `REPONSES.md` et la soutenance

---

## Résumé des séances

### **Séance 1 — Introduction, Docker et architecture** (4h)
- Présentation du formateur, tour de table, déroulé du module et modalités d'évaluation
- Démonstration de WishFlix statique : l'objectif du module
- Pourquoi un framework (version courte) : inversion de contrôle, **talk** raccourci sur le [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/technology#1-web-frameworks-and-technologies) ; comparaison Symfony / NestJS en ressource
- Installation de Laravel 12 avec Docker via Laravel Sail, **lancée tôt** (le téléchargement des images tourne pendant la suite)
- Architecture d'un projet en livecoding : suivre une requête de fichier en fichier (front controller, routes, vue), environnements, Artisan
- 🛠️ Exercice : `exercices/framework/01-installation-architecture`

### **Séance 2 — Routing, contrôleurs et Blade** (4h)
- Ordre de construction : route → vue Blade retournée par la route → contrôleur → `Request` → layout → CSS de page avec Vite → page 404
- Routes dans `routes/web.php` : verbes HTTP, paramètres, contraintes, noms de routes
- Blade : affichage, directives (`@if`, `@foreach`), puis héritage de layouts (`@extends`, `@section`)
- Contrôleurs, objet `Request`, redirections
- Vite : intégrer `app.css` et les CSS de chaque page (copie des CSS des maquettes par un script fourni)
- Page 404 personnalisée
- 🛠️ Atelier : pages statiques WishFlix → layout `app.blade.php` + accueil + fiche jeu `/game/{id}` (données dans un tableau PHP)
- 🛠️ Exercice : `exercices/framework/02-routing-blade`

### **Séance 3 — Eloquent : modèles, relations, migrations** (4h)
- Table + objet : ORM, modèle Eloquent, migration (sans clé étrangère), Tinker
- Relation 1-N de bout en bout : clé étrangère, migration, `belongsTo` / `hasMany`, `$fillable`
- Relation N-N de bout en bout : table pivot, `belongsToMany`, `attach`
- Données et affichage : seeders et factory en **démo guidée**, catalogue branché sur la base, problème N+1 **constaté** à l'écran (teaser de la S4)
- 🛠️ Atelier : modèles `Game`, `Category`, `Platform` + migrations + seeders → le catalogue lit la base
- 🛠️ Exercice : `exercices/framework/03-eloquent`

### **Séance 4 — Requêtes Eloquent et optimisation** (4h)
- Query Builder vs Eloquent : `where`, `orderBy`, `with`, `paginate`
- **Optimisation** : problème **N+1** et eager loading (`with`)
- Laravel Debugbar pour profiler les requêtes
- Recherche par titre, filtres par catégorie
- 🛠️ Atelier : filtre par catégorie, jeu « À la une », meilleures notes, correction d'un N+1 sur le catalogue

### **Séance 5 — Formulaires, validation et services** (4h)
- Créer : formulaire `GET create` + `POST store`, erreur 419 provoquée en direct (CSRF), `validate()`, `old()` et affichage des erreurs
- Éditer et supprimer : routes écrites à la main, puis `Route::resource`, route model binding, `PUT` / `DELETE`
- Refactor : Form Request pour centraliser la validation ; les **services** en démo de fin de séance (hors socle)
- 🛠️ Atelier : back-office CRUD des jeux (création validée, édition, suppression)
- 🛠️ Exercice : `exercices/framework/05-formulaires-validation`

### **Séance 6 — Authentification et sécurité** (4h)
- Authentification vs autorisation
- Authentification avec **Laravel Breeze** (pas de Sanctum)
- Autorisation : middleware `auth`, gates et policies
- Hash des mots de passe (le CSRF est déjà vu en S5)
- Démo XSS : `{!! !!}` vs `{{ }}`
- Wishlist liée à l'utilisateur connecté
- 🛠️ Atelier : connexion avec un compte démo, back-office réservé aux admins, ajout d'un jeu à sa wishlist

### **Séance 7 — Interactivité front et optimisation** (4h)
- Rappel du cycle requête/réponse
- Interactivité légère : requêtes `fetch` vers une route API, réponse JSON
- Cache applicatif : `Cache::remember` sur une requête coûteuse, **gain mesuré** avant / après (compétence « Optimiser », réutilisable en soutenance)
- 🛠️ Atelier : ajout / retrait de la wishlist sans rechargement, compteur de la barre de navigation mis à jour en direct

### **Séance 8 — Tests et atelier projet** (4h)
- Tests HTTP avec PHPUnit et `TestCase`
- Base de données de test en mémoire (SQLite)
- Tests des routes publiques, accès protégé, formulaire
- Atelier projet : finitions, README, préparation de la démonstration

### **Séance 9 — Soutenances** (2h)
- Démonstration de 10 minutes par étudiant : parcours utilisateur, un choix technique justifié, une optimisation mesurée

---

## Répartition séance / travail personnel

| Séance | Atelier en séance (socle) | Travail personnel (attendu : 2 US + Partie C) | Bonus |
|--------|---------------------------|-----------------------------|-------|
| S1 | Projet `wishflix` qui tourne en Laravel 12, enquête d'architecture | Finir l'installation, dépôt GitHub privé, `REPONSES.md` | Explorer les commandes Artisan |
| S2 | Layout Blade, accueil, fiche jeu | Pages wishlist et connexion (statiques) | Liens générés (`route()`), Tailwind selon la doc Laravel |
| S3 | `Game`, `Category`, `Platform`, migrations, relations | Seeders complets (≈ 20 jeux) | Slug unique dans l'URL de la fiche |
| S4 | Filtre par catégorie, « À la une », N+1 corrigé | Recherche par titre | Pagination du catalogue |
| S5 | Création validée, édition et suppression d'un `Game` | CRUD `Category` et `Platform` | `GameService`, upload de la jaquette |
| S6 | Connexion (Breeze), rôles, back-office protégé | Page wishlist dynamique | Inscription d'un nouvel utilisateur |
| S7 | Wishlist sans rechargement, `Cache::remember` mesuré | Compteur en direct dans la barre de navigation | Filtre du catalogue en direct |
| S8 | Tests HTTP des routes clés | README (installation, migrations, seeders, comptes de test) | Test de la wishlist |

Travail personnel estimé : **≈ 2h par semaine** (Partie B ≈ 1h15 + Partie C ≈ 45 min), soit **≈ 16h** sur le module. Ces estimations supposent un rythme rapide.

---

## Domaine des démonstrations : Campus Quest

| WishFlix (atelier) | Campus Quest (démo) | Introduit en |
|---|---|---|
| `Game` | `Quest` (`title`, `description`, `xp`, `difficulty`, `featured`) | S2 (tableau PHP), S3 (Eloquent) |
| `Category` | `Category` (Quiz, Mission, Culture G) | S3 |
| `Platform` | `Location` (BU, Cafét, Amphi…) | S3 |
| Wishlist `User ↔ Game` | Quêtes acceptées `User ↔ Quest` | S6 |
| Back-office admin | Maître du jeu | S5-S6 |
| — | Classement de la promo (somme d'XP) | S4 (agrégats, N+1) |

Équipes et badges restent hors périmètre sauf besoin d'une séance.

---

## Modèle de données WishFlix

| Entité | Champs principaux | Relations |
|--------|-------------------|-----------|
| `Game` | `title`, `synopsis`, `release_year`, `rating`, `playtime_hours`, `cover_url`, `featured`, `status` (enum ou string) | `belongsTo` → `Category` · `belongsToMany` → `Platform` |
| `Category` | `name` (RPG, Action, Aventure…) | `hasMany` → `Game` |
| `Platform` | `name` (PC, PS5, Xbox…) | `belongsToMany` ← `Game` |
| `User` | `email`, `password` (hashé), `is_admin` | `belongsToMany` → `Game` (wishlist) |

Bonus : remplacer la relation wishlist par une entité `WishlistItem` (`user_id`, `game_id`, `added_at`) pour trier par date d'ajout.

---

## Évaluation du projet

| Niveau | Contenu | Poids indicatif |
|--------|---------|-----------------|
| **Socle** | Tout ce qui est réalisé en atelier (S1 → S8) | 50 % |
| **Attendu** | User stories de travail personnel | 30 % |
| **Bonus** | Au choix, au moins un par étudiant | 10 % |
| **Soutenance** | Démo, justification d'un choix, optimisation mesurée | 10 % |

Critères transverses : code conforme à Laravel 12, commits réguliers, README permettant de lancer le projet (Sail, migrations, seeders, comptes de test).

---

## Outils et packages Laravel par séance

| Séance | Outils / concepts |
|--------|-------------------|
| S1 | Laravel Sail, Composer, Artisan, Kernel, Service Container |
| S2 | Routing, Controllers, Blade, Vite |
| S3 | Eloquent, Migrations, Factories, Seeders |
| S4 | Query Builder, Eloquent relationships, eager loading, Debugbar |
| S5 | CSRF, Resource controllers, route model binding, Validation, Form Requests (Services en démo) |
| S6 | Auth (Breeze), Middleware, Gates/Policies |
| S7 | Fetch API routes, JSON responses, `Cache::remember` |
| S8 | PHPUnit, `TestCase`, base de test SQLite |

---

## Préparation avant la séance 1

À envoyer aux étudiants une semaine avant :

- Installer **Docker Desktop** (Windows : avec le backend WSL2) ou Docker Engine + Compose v2.10+ (Linux)
- Installer **Git** et créer un compte **GitHub**
- Prévoir ≈ 5 Go d'espace disque libre
- Vérifier que les ports **80** et **3306** sont libres (arrêter XAMPP / Apache / MySQL s'ils tournent)
- Lancer une première fois `curl -s "https://laravel.build/wishflix?with=mariadb" | bash` pour télécharger les images à la maison

⚠️ À vérifier côté IUT : disponibilité de Docker et des droits administrateur sur les postes. Plan B : PC personnels, ou **Laravel Herd** en local.

---

## Points de vigilance

- **Premier build Docker** : long sur un réseau partagé — d'où la préparation à la maison.
- **Installation en séance 1** : elle déborde souvent. Elle est lancée tôt dans la séance ; si besoin, la fin de l'enquête d'architecture passe en travail personnel.
- **Conventions Laravel** : respecter les noms de fichiers, de classes et de tables pour que l'ORM et les migrations fonctionnent sans configuration explicite.
- **PHP 8.3+** : le typage, les enums et les attributs sont utilisés ; s'assurer que l'environnement Sail est bien sur PHP 8.3+.

---

## Compétences acquises

À l'issue du module, l'étudiant sera capable de :
- ✅ Mettre en place un environnement Laravel **conteneurisé** et reproductible
- ✅ Structurer une application **MVC** (routes, contrôleurs, vues)
- ✅ Modéliser un domaine avec **Eloquent** (modèles, relations, migrations, seeders)
- ✅ Écrire des requêtes **optimisées** et le prouver avec les outils de profiling
- ✅ Construire des formulaires **validés** et un back-office
- ✅ **Sécuriser** une application (authentification, autorisations)
- ✅ Ajouter de l'**interactivité** légère côté client
- ✅ **Tester** fonctionnellement les parcours clés
