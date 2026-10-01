# Programme Symfony 7.4 — R5.Real.05 Programmation avancée

**Public** : BUT Informatique 3e année
**Volume** : 34h — 8 séances de 4h + 1 séance de 2h
**Version** : Symfony 7.4 (PHP 8.2+) — tout le code suit la [documentation Symfony 7.4](https://symfony.com/doc/7.4/index.html)
**Fil rouge** : WishFlix (`scenarios/WishFlix`) — catalogue de jeux vidéo avec wishlist personnelle

## Compétences ciblées

- **Développer** — concevoir, coder, tester et intégrer une solution informatique pour un client
- **Optimiser** — proposer des applications optimisées selon des critères spécifiques : temps d'exécution, précision, consommation de ressources

## Principe pédagogique

Chaque séance suit le même rythme :

1. **Cours** (≈ 1h30-2h) : concepts, démonstrations en direct
2. **Atelier WishFlix** (≈ 2h) : les exercices du support de base sont **transposés sur WishFlix** — chaque séance fait avancer le projet
3. **Travail personnel** (≈ 2h / semaine) : user stories d'extension qui réappliquent la notion du jour sur une autre partie du site

Le projet est donc construit **en continu** : il n'y a pas de « projet de fin » séparé des exercices.

---

## Résumé des séances

### **Séance 1 — Introduction, Docker et architecture** (4h)
- Présentation du formateur, tour de table, déroulé du module et modalités d'évaluation
- Démonstration de WishFlix statique : l'objectif du module
- Qu'est-ce qu'un framework ? Bibliothèque vs framework, frameworks populaires
- Découvrir Symfony : historique, cycle de versions, composants, fonctionnalités
- Installation de Symfony 7.4 avec Docker (template `dunglas/symfony-docker`)
- Architecture d'un projet : arborescence, front controller, cycle requête → réponse, environnements, console, Flex et recipes
- 🛠️ Exercice : `exercices/symfony/01-installation-architecture`

### **Séance 2 — Routing, contrôleurs et Twig** (4h)
- Routes en attributs (`#[Route]`), paramètres, contraintes, méthodes HTTP, noms de routes
- Contrôleurs, `AbstractController`, objets `Request` / `Response`, redirections
- Twig : affichage, logique, filtres, héritage (`extends`, `block`), `include`, `path()`
- AssetMapper : intégrer `app.css` et les CSS de chaque page
- Page 404 personnalisée (templates d'erreur)
- 🛠️ Atelier : pages statiques WishFlix → layout `base.html.twig` + accueil + fiche jeu `/game/{id}` (données dans un tableau PHP)

### **Séance 3 — Doctrine : entités, relations, migrations** (4h)
- ORM : pourquoi, comment (entités, mapping par attributs)
- Configuration de la base de données (service Docker ajouté par la recipe Doctrine)
- Relations `ManyToOne` / `OneToMany` / `ManyToMany`, côté propriétaire
- Enum PHP mappée par Doctrine (statut d'un jeu)
- Migrations : générer, lire, exécuter
- Fixtures (dont fixtures dépendantes)
- 🛠️ Atelier : entités `Game`, `Category`, `Platform` + fixtures → le catalogue lit la base

### **Séance 4 — Repository, QueryBuilder et optimisation** (4h)
- Repository : méthodes `find*`, méthodes personnalisées
- QueryBuilder et DQL : filtres, tri, limites, jointures, agrégats
- **Optimisation** : Web Debug Toolbar et Profiler, problème **N+1**, jointures avec sélection (`addSelect`), mesurer avant / après
- 🛠️ Atelier : filtre par catégorie, jeu « À la une », meilleures notes, correction d'un N+1 sur le catalogue

### **Séance 5 — Formulaires, validation et services** (4h)
- Composant Form : `FormType`, types de champs, `EntityType`
- Validation : contraintes en attributs, messages d'erreur, affichage dans Twig
- Messages flash, pattern Post/Redirect/Get
- Services et injection de dépendances : sortir la logique métier du contrôleur
- 🛠️ Atelier : back-office CRUD des jeux (création, édition, suppression protégée par CSRF)

### **Séance 6 — Sécurité** (4h)
- Authentification vs autorisation
- Entité `User`, hash des mots de passe, formulaire de connexion, déconnexion
- Rôles, `access_control`, attribut `#[IsGranted]`, `is_granted()` dans Twig
- Wishlist liée à l'utilisateur connecté
- 🛠️ Atelier : connexion avec le compte démo, back-office réservé à `ROLE_ADMIN`, ajout d'un jeu à sa wishlist

### **Séance 7 — Stimulus et Symfony UX** (4h)
- Principes de Stimulus : contrôleurs, `targets`, `actions`, `values`
- Appels `fetch` vers des routes qui renvoient du JSON
- Turbo : navigation sans rechargement (aperçu)
- 🛠️ Atelier : ajout / retrait de la wishlist sans rechargement, compteur de la barre de navigation mis à jour en direct

### **Séance 8 — Tests et atelier projet** (4h)
- Tests fonctionnels avec `WebTestCase` : routes publiques, accès protégé, formulaire
- Base de données de test et fixtures
- Atelier projet : finitions, README, préparation de la démonstration

### **Séance 9 — Soutenances** (2h)
- Démonstration de 10 minutes par étudiant : parcours utilisateur, un choix technique justifié, une optimisation mesurée

---

## Répartition séance / travail personnel

| Séance | Atelier en séance (socle) | Travail personnel (attendu) | Bonus |
|--------|---------------------------|-----------------------------|-------|
| S1 | Projet `wishflix` qui tourne en Symfony 7.4 | Finir l'installation, dépôt GitHub privé, `REPONSES.md` | Observer une recipe Flex |
| S2 | Layout Twig, accueil, fiche jeu | Pages wishlist, connexion (statiques), 404 | Tailwind via `symfonycasts/tailwind-bundle` |
| S3 | `Game`, `Category`, `Platform`, migrations | Fixtures complètes (≈ 20 jeux) | Slug unique dans l'URL de la fiche |
| S4 | Filtre par catégorie, « À la une », N+1 corrigé | Recherche par titre | Pagination du catalogue |
| S5 | CRUD `Game` avec validation | CRUD `Category` et `Platform` | Upload de la jaquette |
| S6 | Connexion, rôles, back-office protégé | Page wishlist dynamique | Inscription d'un nouvel utilisateur |
| S7 | Wishlist sans rechargement | Compteur en direct dans la barre de navigation | Filtre du catalogue en direct |
| S8 | Tests fonctionnels des routes clés | README (installation, fixtures, comptes de test) | Test de la wishlist |

Travail personnel estimé : **≈ 16h** sur le module.

---

## Modèle de données WishFlix

| Entité | Champs principaux | Relations |
|--------|-------------------|-----------|
| `Game` | `title`, `synopsis`, `releaseYear`, `rating`, `playtimeHours`, `coverUrl`, `featured`, `status` (enum `GameStatus`) | `ManyToOne` → `Category` · `ManyToMany` → `Platform` |
| `Category` | `name` (RPG, Action, Aventure…) | `OneToMany` → `Game` |
| `Platform` | `name` (PC, PS5, Xbox…) | `ManyToMany` ← `Game` |
| `User` | `email`, `password` (hashé), `roles` | `ManyToMany` → `Game` (wishlist) |

Bonus : remplacer la relation wishlist par une entité `WishlistItem` (`user`, `game`, `addedAt`) pour trier par date d'ajout.

---

## Évaluation du projet

| Niveau | Contenu | Poids indicatif |
|--------|---------|-----------------|
| **Socle** | Tout ce qui est réalisé en atelier (S1 → S8) | 50 % |
| **Attendu** | User stories de travail personnel | 30 % |
| **Bonus** | Au choix, au moins un par étudiant | 10 % |
| **Soutenance** | Démo, justification d'un choix, optimisation mesurée | 10 % |

Critères transverses : code conforme à Symfony 7.4, commits réguliers, README permettant de lancer le projet (Docker, migrations, fixtures, comptes de test).

---

## Notions Symfony par séance

| Séance | Composants / outils |
|--------|---------------------|
| S1 | Docker (FrankenPHP, Caddy), Composer, Flex, Console, Kernel |
| S2 | Routing, HttpFoundation, Twig, AssetMapper |
| S3 | Doctrine ORM, DoctrineMigrations, DoctrineFixtures, MakerBundle |
| S4 | Repository, QueryBuilder, Web Debug Toolbar, Profiler |
| S5 | Form, Validator, DependencyInjection |
| S6 | SecurityBundle, PasswordHasher |
| S7 | StimulusBundle, Turbo |
| S8 | PHPUnit, BrowserKit (`WebTestCase`) |

---

## Correspondance avec le support de base

Support existant : [symfony-course.vercel.app](https://symfony-course.vercel.app/) — chaque exemple de code est à **réécrire pour Symfony 7.4** (ex. `Symfony\Component\Routing\Attribute\Route` au lieu de `...\Annotation\Route`, Stimulus via `@hotwired/stimulus` et `data-*-target`).

| Séance | Chapitres réutilisés | Exercice transposé sur WishFlix |
|--------|----------------------|---------------------------------|
| S1 | Introduction, Installation (XAMPP → Docker), Architecture, Console | — |
| S2 | Routing, Controllers, Templates, Filtres Twig | Exercice 1 |
| S3 | Entités et Doctrine, Relations, Migrations | Exercice 2 |
| S4 | EntityManager (DQL, QueryBuilder) | Exercice 3 |
| S5 | Formulaires, Services | Exercice 4 |
| S6 | *(absent du support — à créer)* | — |
| S7 | Stimulus (x2) | Exercice 5 |
| S8 | *(absent du support — à créer)* | — |

Non repris : Traductions (hors périmètre, bonus possible), sujet e-commerce (remplacé par WishFlix).

---

## Préparation avant la séance 1

À envoyer aux étudiants une semaine avant :

- Installer **Docker Desktop** (Windows : avec le backend WSL2) ou Docker Engine + Compose v2.10+ (Linux)
- Installer **Git** et créer un compte **GitHub**
- Prévoir ≈ 5 Go d'espace disque libre
- Vérifier que les ports **80** et **443** sont libres (arrêter XAMPP / Apache s'ils tournent)
- Lancer une première fois `docker compose build --pull` sur le template `dunglas/symfony-docker` pour télécharger les images à la maison

⚠️ À vérifier côté IUT : disponibilité de Docker et des droits administrateur sur les postes. Plan B : PC personnels, ou PHP 8.2 + Symfony CLI en local.

---

## Points de vigilance

- **Symfony 7.4 est une LTS** : support de sécurité jusqu'en novembre 2029. Elle convient parfaitement à une utilisation académique et professionnelle.
- **Premier build Docker** : long sur un réseau partagé — d'où la préparation à la maison.
- **Installation en séance 1** : elle déborde souvent. Si besoin, la partie B de l'exercice (chasse au trésor) passe en travail personnel.

---

## Compétences acquises

À l'issue du module, l'étudiant sera capable de :
- ✅ Mettre en place un environnement Symfony **conteneurisé** et reproductible
- ✅ Structurer une application **MVC** (routes, contrôleurs, templates)
- ✅ Modéliser un domaine avec **Doctrine** (entités, relations, migrations, fixtures)
- ✅ Écrire des requêtes **optimisées** et le prouver avec le Profiler
- ✅ Construire des formulaires **validés** et un back-office
- ✅ **Sécuriser** une application (authentification, rôles)
- ✅ Ajouter de l'**interactivité** sans framework front lourd (Stimulus)
- ✅ **Tester** fonctionnellement les parcours clés
