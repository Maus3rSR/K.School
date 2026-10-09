# Programme Framework (Laravel) — R5.Real.05 Programmation avancée

**Public** : BUT Informatique 3e année
**Volume** : 34h — 8 séances de 4h + 1 séance de 2h
**Version** : Laravel 12 (PHP 8.3+) — tout le code suit la [documentation Laravel 12.x](https://laravel.com/docs/12.x)
**Fil rouge** : WishFlix (`scenarios/WishFlix`) — catalogue de jeux vidéo avec wishlist personnelle

## Compétences ciblées

- **Développer** — concevoir, coder, tester et intégrer une solution informatique pour un client
- **Optimiser** — proposer des applications optimisées selon des critères spécifiques : temps d'exécution, précision, consommation de ressources

## Principe pédagogique

Chaque séance suit le même rythme :

1. **Cours** (≈ 1h30-2h) : concepts, démonstrations en direct

   Les démonstrations du cours utilisent un domaine distinct, **Campus Quest** (application de défis de campus : quêtes, XP, classement), pour que l'atelier soit une vraie transposition et non une recopie.
2. **Atelier WishFlix** (≈ 2h) : les exercices du support de base sont **transposés sur WishFlix** — chaque séance fait avancer le projet
3. **Travail personnel** (≈ 2h / semaine) : user stories d'extension qui réappliquent la notion du jour sur une autre partie du site

Le projet est donc construit **en continu** : il n'y a pas de « projet de fin » séparé des exercices.

---

## Résumé des séances

### **Séance 1 — Introduction, Docker et architecture** (4h)
- Présentation du formateur, tour de table, déroulé du module et modalités d'évaluation
- Démonstration de WishFlix statique : l'objectif du module
- Qu'est-ce qu'un framework ? Bibliothèque vs framework, frameworks populaires
- **Talk** : le paysage des frameworks web selon le [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/technology#1-web-frameworks-and-technologies)
- Découvrir Laravel : historique, cycle de versions, écosystème, comparaison Symfony / NestJS
- Installation de Laravel 12 avec Docker via Laravel Sail
- Architecture d'un projet : arborescence, front controller, cycle requête → réponse, environnements, Artisan
- 🛠️ Exercice : `exercices/framework/01-installation-architecture`

### **Séance 2 — Routing, contrôleurs et Blade** (4h)
- Routes dans `routes/web.php` : verbes HTTP, paramètres, contraintes, noms de routes
- Contrôleurs, `Controller` de base, objets `Request` / `Response`, redirections
- Blade : affichage, directives (`@if`, `@foreach`, `@extends`, `@section`), héritage de layouts
- Vite : intégrer `app.css` et les CSS de chaque page
- Page 404 personnalisée et vues d'erreur
- 🛠️ Atelier : pages statiques WishFlix → layout `app.blade.php` + accueil + fiche jeu `/game/{id}` (données dans un tableau PHP)
- 🛠️ Exercice : `exercices/framework/02-routing-blade`

### **Séance 3 — Eloquent : modèles, relations, migrations** (4h)
- ORM : pourquoi, comment (modèles Eloquent, conventions de nommage)
- Migrations : créer, modifier, annuler des tables
- Relations `belongsTo`, `hasMany`, `belongsToMany`
- Factories et seeders pour générer des données de test
- 🛠️ Atelier : modèles `Game`, `Category`, `Platform` + migrations + seeders → le catalogue lit la base

### **Séance 4 — Requêtes Eloquent et optimisation** (4h)
- Query Builder vs Eloquent : `where`, `orderBy`, `with`, `paginate`
- **Optimisation** : problème **N+1** et eager loading (`with`)
- Laravel Debugbar / Telescope pour profiler les requêtes
- Recherche par titre, filtres par catégorie
- 🛠️ Atelier : filtre par catégorie, jeu « À la une », meilleures notes, correction d'un N+1 sur le catalogue

### **Séance 5 — Formulaires, validation et services** (4h)
- Formulaires HTML classiques avec routes `GET` / `POST`
- Validation des requêtes : `validate()`, messages d'erreur, affichage dans Blade
- Requêtes de formulaire (Form Request) pour centraliser la validation
- Extraction de la logique métier dans des services injectés
- 🛠️ Atelier : back-office CRUD des jeux (création, édition, suppression protégée par CSRF)

### **Séance 6 — Authentification et sécurité** (4h)
- Authentification vs autorisation
- Authentification Laravel (Breeze / Sanctum overview, ou auth manuelle selon le temps)
- Middleware `auth`, gates et policies
- Hash des mots de passe, protection CSRF
- Démo XSS : `{!! !!}` vs `{{ }}`
- Wishlist liée à l'utilisateur connecté
- 🛠️ Atelier : connexion avec un compte démo, back-office réservé aux admins, ajout d'un jeu à sa wishlist

### **Séance 7 — Interactivité front et optimisation** (4h)
- Rappel du cycle requête/réponse
- Interactivité légère : requêtes `fetch` vers une route API, réponse JSON
- Aperçu de Livewire / Alpine.js pour la réactivité sans framework lourd
- Cache Laravel (cache de configuration, cache de vues compilées)
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

| Séance | Atelier en séance (socle) | Travail personnel (attendu) | Bonus |
|--------|---------------------------|-----------------------------|-------|
| S1 | Projet `wishflix` qui tourne en Laravel 12 | Finir l'installation, dépôt GitHub privé, `REPONSES.md` | Explorer les commandes Artisan |
| S2 | Layout Blade, accueil, fiche jeu | Pages wishlist, connexion (statiques), 404 | Intégrer Tailwind selon la doc Laravel |
| S3 | `Game`, `Category`, `Platform`, migrations | Seeders complets (≈ 20 jeux) | Slug unique dans l'URL de la fiche |
| S4 | Filtre par catégorie, « À la une », N+1 corrigé | Recherche par titre | Pagination du catalogue |
| S5 | CRUD `Game` avec validation | CRUD `Category` et `Platform` | Upload de la jaquette |
| S6 | Connexion, rôles, back-office protégé | Page wishlist dynamique | Inscription d'un nouvel utilisateur |
| S7 | Wishlist sans rechargement | Compteur en direct dans la barre de navigation | Filtre du catalogue en direct |
| S8 | Tests HTTP des routes clés | README (installation, migrations, seeders, comptes de test) | Test de la wishlist |

Travail personnel estimé : **≈ 16h** sur le module.

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
| S5 | Validation, Form Requests, Services, dependency injection |
| S6 | Auth (Breeze / Sanctum / manuel), Middleware, Gates/Policies |
| S7 | Fetch API routes, JSON responses, Cache, aperçu Livewire |
| S8 | PHPUnit, `TestCase`, base de test SQLite |

---

## Préparation avant la séance 1

À envoyer aux étudiants une semaine avant :

- Installer **Docker Desktop** (Windows : avec le backend WSL2) ou Docker Engine + Compose v2.10+ (Linux)
- Installer **Git** et créer un compte **GitHub**
- Prévoir ≈ 5 Go d'espace disque libre
- Vérifier que les ports **80** et **3306** sont libres (arrêter XAMPP / Apache / MySQL s'ils tournent)
- Lancer une première fois `curl -s "https://laravel.build/wishflix?with=mariadb,redis" | bash` pour télécharger les images à la maison

⚠️ À vérifier côté IUT : disponibilité de Docker et des droits administrateur sur les postes. Plan B : PC personnels, ou **Laravel Herd** en local.

---

## Points de vigilance

- **Premier build Docker** : long sur un réseau partagé — d'où la préparation à la maison.
- **Installation en séance 1** : elle déborde souvent. Si besoin, la partie B de l'exercice (chasse au trésor) passe en travail personnel.
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
