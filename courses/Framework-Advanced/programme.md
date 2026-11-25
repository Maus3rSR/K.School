# Programme Framework avancé (Laravel) — Semestre 6

**Ressources couvertes** : R6.Real.05 Développement avancé (18h nationales dont 7h TP) + R6.Real.06 Maintenance applicative (13h nationales dont 6h TP)
**Public** : BUT Informatique 3e année, parcours Réalisation, semestre 6
**Volume proposé** : 32h — 8 séances de 4h (≈ 31h nationales) — ⚠️ à caler sur la maquette locale et la date de départ en stage
**Version** : Laravel 12 (PHP 8.3+), même base qu'au Sem5 — [documentation Laravel 12.x](https://laravel.com/docs/12.x)
**Suite de** : `courses/Framework` (R5.Real.05 Programmation avancée)
**SAÉ alimentée** : SAÉ 6.Real.01 « Évolution d'une application existante »

> Statut : **proposition** — les points marqués « ⚖️ à arbitrer » sont listés en fin de document. Aucune séance n'est rédigée.

## Intention

Au Sem5, les étudiants ont découvert un framework pour la première fois : ils ont **construit** une application. Au Sem6, ils **reprennent** une application qu'ils n'ont pas écrite, la sécurisent par des tests, la remanient, la font évoluer en TDD et la livrent automatiquement.

Fil conducteur : **reprendre → sécuriser → faire évoluer → livrer**.

Les tests ne sont pas un chapitre isolé : ils sont posés dès la S1, l'intégration continue tourne dès la S2, et toute la suite du module se fait sous ce filet.

### Pourquoi pas le TDD dès la première séance

Le TDD écrit le test **avant** le code. Sur une application existante, le code est déjà là : on commence donc par des **tests de caractérisation** (figer le comportement actuel), puis on remanie sous ce filet, et seulement ensuite les **nouvelles** fonctionnalités s'écrivent test d'abord (S4).

## Référentiel national

| | R6.Real.05 Développement avancé | R6.Real.06 Maintenance applicative |
|---|---|---|
| Savoirs | Frameworks de développement complexes ; patrons d'architecture complexes | Rétroconception ; techniques avancées par les tests ; remaniement de code |
| AC | AC31.01, AC31.02, AC31.03, AC32.03, AC36.03 | AC31.01, AC31.02, AC31.03, AC32.02 |
| Séances | S5, S6, S7 (+ S4) | S1, S2, S3, S4 |

- **AC31.01** Choisir et implémenter les architectures adaptées — S3, S5, S6
- **AC31.02** Faire évoluer une application existante — tout le module
- **AC31.03** Intégrer des solutions dans un environnement de production — S2, S7
- **AC32.02** Profiler, analyser et justifier le comportement d'un code existant — S1, S2, S3
- **AC32.03** Choisir et utiliser des bibliothèques dédiées — S3 (Larastan, Pint), S5, S6

## Compétences ciblées

- **Développer** — concevoir, coder, **tester** et **intégrer** une solution informatique pour un client
- **Optimiser** — proposer des applications optimisées selon des critères spécifiques
- **Travailler en équipe informatique** — revue de code, pull requests, pipeline partagé

## Format de séance

**Public** : étudiants de BUT 3 ayant suivi `courses/Framework` (Sem5) : à l'aise avec routes, contrôleurs, Blade, Eloquent, formulaires, Breeze, `fetch` + JSON, `Cache::remember`. **Débutants sur les tests automatisés, l'intégration continue et le déploiement.** Le Sem5 ne fait qu'un premier contact avec `php artisan test` (séance 8 du Sem5).

### Profil pédagogique

Lu par le skill `sequencing-audit`. Le détail de chaque clé est dans les sous-sections ci-dessous et dans `AGENTS.md`.

| Clé | Valeur |
|---|---|
| Public | étudiants de BUT 3 ayant suivi `courses/Framework` ; débutants sur les tests, la CI et le déploiement ; prérequis : Laravel niveau Sem5, Git, GitHub |
| Unité | séance de 4h |
| Budget utile | 180 min (somme des `duration` des chapitres) |
| Modèle de séance | cycles théorie courte → démo flash Campus Quest → micro-pratique sur l'application héritée |
| Decks | `courses/Framework-Advanced/slides-*.md`, un par séance |
| Démo | `scenarios/CampusQuest/laravel-advanced/seance-XX/LIVECODING.md` |
| Solution de référence | `scenarios/CampusQuest/laravel-advanced/seance-XX/solution/` |
| Exercice | `exercices/framework-advanced/XX-*/README.md` (partie en séance : Partie A) |
| Fil rouge | application héritée commune ⚖️ (règle : transposition de la démo, jamais de recopie) ; Partie B sur le WishFlix personnel du Sem5 |
| Ordre imposé | chapitres des slides = moments de `LIVECODING.md` = étapes de la Partie A |
| Rattrapage | tag Campus Quest du chapitre (`adv-sXX-chY-slug`) |
| Densité | 3-4 notions nouvelles par séance, ≤ 1 aperçu |
| Règles propres | `AGENTS.md` : « Pacte des trois terrains », « Tags », « Panoramas » (`seen`), « Tout passe par la CI » |

### Une séance = une suite de cycles

Même modèle qu'au Sem5, en démo flash dès la S1 (les étudiants connaissent le rythme) :

1. **Théorie courte** : le problème, puis le concept (slides qui déroulent le code)
2. **Démo flash sur Campus Quest** (3-5 min par chapitre) : uniquement les moments où l'exécution parle — test rouge puis vert, pipeline qui casse, rapport de couverture, déploiement
3. **Micro-pratique « à vous »** sur l'application héritée, avec point de contrôle

### Trois terrains, jamais de recopie

| Terrain | Rôle | Pourquoi |
|---|---|---|
| **Campus Quest** (état de fin de Sem5) | Démonstrations | Connu de vue par les étudiants : on lit vite, on se concentre sur la notion |
| **Application héritée commune** ⚖️ | Partie A en séance | Inconnue des étudiants : la rétroconception est réelle ; commune à tous : le cours reste collectif ; défauts **semés volontairement** (contrôleurs trop chargés, logique dupliquée, N+1, aucune validation centralisée, aucun test) |
| **WishFlix personnel** (Sem5) | Partie B à la maison | Transposition sur son propre code : tests, CI et remaniement de son projet ; hétérogène, donc jamais utilisé en séance |

### Budget de temps

Identique au Sem5 :

- `duration` d'un chapitre = slides + démo + micro-pratique
- 4h = 20 min de pause + 20 min de marge en début + 20 min de marge en fin = **180 min utiles**
- Cible **50/50** slides + démo / pratique ; pratique dimensionnée à ≈ 2× le temps de démo
- Densité : 3-4 notions nouvelles par séance, un seul « aperçu » au maximum

### Structure de chaque exercice (`exercices/framework-advanced/XX-*/README.md`)

| Partie | Où | Contenu |
|---|---|---|
| **A — Socle** | En séance, sur l'application héritée | Micro-étapes alignées sur les chapitres, points de contrôle ; chaque point de contrôle = **pipeline CI vert** (à partir de la S2) |
| **B — Attendu** | À la maison (≈ 1h15), sur le WishFlix personnel | **2 user stories** qui transposent la notion sur son propre projet |
| **C — Sous le capot** | À la maison (≈ 45 min) | Lire le code du framework (testing, queue, HTTP client…), réponses dans `REPONSES.md` |
| **Bonus** | Facultatif | 3e user story et défis |

Travail personnel : **≈ 2h par semaine** (B + C).

### Rattrapage

- Campus Quest avancé est versionné dans le dépôt `CampusQuest`, avec un tag par chapitre au format **`adv-sXX-chY-slug`** (préfixe `adv-` : les tags `sXX-` du Sem5 existent déjà)
- L'application héritée est distribuée dans son **état initial** ; un étudiant en retard relit le diff du tag Campus Quest et **refait** l'étape sur l'application héritée
- Point de reprise collectif possible en début de séance : une branche `checkpoint-sXX` de l'application héritée ⚖️

---

## Résumé des séances

### Bloc 1 — Reprendre l'existant (R6.Real.06)

### **Séance 1 — Rétroconception et premiers tests** (4h)
- Installer une application inconnue (Sail), la faire tourner, la **cartographier** : `route:list`, modèles et relations, Debugbar, schéma de la base
- Repérer les **défauts de code** (code smells) : contrôleur trop chargé, duplication, N+1, validation dispersée — un registre des défauts dans `REPONSES.md`
- Premier test HTTP : `get('/')->assertOk()`, lancer `php artisan test`
- Tests « de fumée » : chaque route publique répond, chaque route protégée redirige (`actingAs`, `RefreshDatabase`, factories dans les tests)
- 🛠️ Atelier : cartographie de l'application héritée + tests de fumée de toutes ses routes
- 🛠️ Exercice : `exercices/framework-advanced/01-reverse-engineering`

### **Séance 2 — Le filet de sécurité et l'intégration continue** (4h)
- **Tests de caractérisation** : figer le comportement actuel, bugs compris (et le dire dans le nom du test)
- Assertions utiles : `assertSee`, `assertRedirect`, `assertSessionHasErrors`, `assertDatabaseHas`, `postJson()->assertJson()` (les réponses JSON du Sem5)
- **Couverture** mesurée : `php artisan test --coverage` (Sail : `SAIL_XDEBUG_MODE=coverage`) — un chiffre qui guide, pas un objectif
- **GitHub Actions** : un workflow qui lance les tests à chaque push et à chaque pull request ; le badge du pipeline dans le README
- 🛠️ Atelier : tests de caractérisation des parcours clés de l'application héritée, pipeline vert
- 🛠️ Exercice : `exercices/framework-advanced/02-safety-net-ci`

### **Séance 3 — Remaniement sous filet** (4h)
- Remanier sans changer le comportement : les tests restent verts à chaque étape
- Contrôleur trop chargé → Form Request (rappel Sem5) → **classe d'action / service** injecté par le conteneur (injection de dépendances)
- Requêtes dupliquées → **scopes Eloquent** ; N+1 corrigé, prouvé par un test (`preventLazyLoading`)
- **Tests unitaires** vs tests HTTP : tester une action sans passer par une route
- **Qualité outillée dans la CI** : Pint (style) et Larastan (analyse statique) — le pipeline casse sur une erreur
- 🛠️ Atelier : remanier deux défauts du registre de la S1, pipeline vert de bout en bout
- 🛠️ Exercice : `exercices/framework-advanced/03-refactoring`

### Bloc 2 — Faire évoluer (R6.Real.05 + R6.Real.06)

### **Séance 4 — Faire évoluer en TDD** (4h)
- Le cycle **rouge → vert → remaniement** sur un kata PHP court (échauffement)
- **Outside-in** : une nouvelle fonctionnalité de l'application commence par un test HTTP qui échoue, puis descend vers les tests unitaires
- Écrire le minimum pour passer au vert, puis remanier
- 🛠️ Atelier : une user story nouvelle de l'application héritée entièrement écrite test d'abord
- 🛠️ Exercice : `exercices/framework-advanced/04-tdd`

### **Séance 5 — Événements et files d'attente** (4h)
- Le problème : une action qui fait trop de choses (enregistrer + notifier + recalculer) et qui ralentit la réponse
- **Événements et écouteurs** : découpler « ce qui s'est passé » de « ce qu'on en fait »
- **Files d'attente** : une tâche (job) qui part en arrière-plan ; `queue:work`, le driver `database`
- **Mail / notifications** envoyés depuis un job, prévisualisés avec Mailpit (Sail)
- Tester sans effet de bord : `Event::fake`, `Queue::fake`, `Mail::fake` (**doublures de test**)
- 🛠️ Atelier : une notification déclenchée par un événement de l'application héritée, testée avec les fakes
- 🛠️ Exercice : `exercices/framework-advanced/05-events-queues`

### **Séance 6 — Découpler : API et services externes** (4h)
- Suite directe de la slide « Pourquoi pas `routes/api.php` ? » de la séance 7 du Sem5 : un client **externe** sans session
- `install:api`, **Sanctum** (jetons d'API), **API Resources** pour contrôler la forme du JSON
- Appeler un **service externe** avec le client HTTP de Laravel, derrière une **interface** (adaptateur) liée dans le conteneur — introduction douce aux ports / adaptateurs
- Tester sans réseau : `Http::fake`, tests d'API avec `Sanctum::actingAs`
- 🛠️ Atelier : un point d'API authentifié par jeton + un service externe simulé, tous deux testés
- 🛠️ Exercice : `exercices/framework-advanced/06-api-adapters`

### Bloc 3 — Livrer (AC31.03)

### **Séance 7 — Livraison continue** (4h)
- Sail est un environnement de **développement** : ce qui change en production (`APP_ENV`, `APP_DEBUG`, secrets, `config:cache`, `optimize`)
- Construire une **image de production** (Dockerfile multi-étapes : Composer, `npm run build`, PHP-FPM) ⚖️
- Migrations en production (`migrate --force`), cache Redis (suite de la séance 7 du Sem5), worker de file d'attente
- **Pipeline de livraison** : tests → qualité → construction → déploiement d'une préproduction depuis `main` ; revenir en arrière
- 🛠️ Atelier : l'application héritée déployée automatiquement à chaque fusion sur `main`
- 🛠️ Exercice : `exercices/framework-advanced/07-continuous-delivery`

### **Séance 8 — Revue de code et restitution** (4h)
- **Revue de code** par pull request entre pairs : grille de relecture, commentaires constructifs, suggestions GitHub
- **Compte rendu des modifications** (livrable SAÉ 6.Real.01) : défauts trouvés, tests ajoutés, remaniements, évolutions, couverture avant / après
- Restitution : démonstration courte du pipeline et d'une évolution justifiée
- 🛠️ Exercice : `exercices/framework-advanced/08-review`

---

## Répartition séance / travail personnel

| Séance | Atelier en séance (socle, application héritée) | Travail personnel (WishFlix personnel) | Bonus |
|--------|---------------------------|-----------------------------|-------|
| S1 | Cartographie, registre des défauts, tests de fumée | Tests de fumée de WishFlix | Diagramme des modèles généré |
| S2 | Tests de caractérisation, couverture, pipeline CI | Pipeline CI sur WishFlix, badge dans le README | Matrice PHP 8.3 / 8.4 |
| S3 | Deux remaniements sous filet, Pint + Larastan en CI | Un remaniement du `GameController` de WishFlix | Niveau Larastan relevé |
| S4 | Une user story en TDD | Une user story WishFlix en TDD (ex. avis sur un jeu) | Kata supplémentaire |
| S5 | Notification par événement + job, testée | Mail « un jeu de votre wishlist sort » | Tâche planifiée (`schedule`) |
| S6 | API par jeton + service externe simulé | API en lecture du catalogue WishFlix | Pagination et filtres d'API |
| S7 | Déploiement continu de la préproduction | Déploiement de WishFlix | Retour arrière automatisé |
| S8 | Revue croisée, compte rendu | — | — |

---

## Domaine des démonstrations : Campus Quest (état de fin de Sem5)

| Notion | Démonstration Campus Quest |
|---|---|
| Rétroconception | Campus Quest relu comme si on le découvrait ; défauts présents dans le code du Sem5 (contrôleurs, absence de tests) |
| Caractérisation | Classement, acceptation de quête (HTML et JSON), back-office du maître du jeu |
| Remaniement | `QuestController` → action injectée, scopes de quêtes |
| TDD | Nouvelle règle : bonus d'XP pour une quête acceptée le jour de sa création ⚖️ |
| Événements / files | « Quête acceptée » → notification au maître du jeu |
| API / adaptateur | API des quêtes ; service externe « horaires des lieux du campus » simulé |
| Livraison | Campus Quest déployé en préproduction |

---

## Application héritée commune ⚖️

À fournir aux étudiants (archive ou dépôt modèle GitHub), **sans tests**, avec des défauts semés et documentés dans un fichier réservé au formateur. Proposition : un domaine nouveau pour les étudiants (ex. location de jeux de société : `Game`, `Member`, `Rental`), assez petit pour être cartographié en une séance (≈ 5 modèles, ≈ 15 routes).

Défauts à semer (un ou deux par séance du bloc 1) : contrôleur de 200 lignes, validation recopiée dans deux méthodes, requête N+1 sur la liste, logique métier dans une vue Blade, un bug réel à figer en caractérisation puis à corriger.

---

## Évaluation (proposition)

| Niveau | Contenu | Poids indicatif |
|--------|---------|-----------------|
| **Socle** | Parties A réalisées sur l'application héritée (pipeline vert à chaque point de contrôle) | 40 % |
| **Attendu** | User stories sur le WishFlix personnel (tests, CI, remaniement, évolution, déploiement) | 30 % |
| **Compte rendu** | Document de modifications + qualité de la revue de code donnée | 20 % |
| **Bonus** | Au choix | 10 % |

Critères transverses : pipeline vert sur `main`, commits atomiques, pull requests relues, README à jour.

---

## Outils et packages par séance

| Séance | Outils / concepts |
|--------|-------------------|
| S1 | `route:list`, Debugbar, PHPUnit ⚖️, `RefreshDatabase`, factories, `actingAs` |
| S2 | Assertions HTTP et base, couverture (Xdebug via Sail), GitHub Actions |
| S3 | Conteneur de services, classes d'action, scopes, Pint, Larastan |
| S4 | Cycle rouge-vert-remaniement, outside-in |
| S5 | Events, Listeners, Jobs, Queues, Mail, Mailpit, fakes |
| S6 | `install:api`, Sanctum, API Resources, HTTP Client, `Http::fake` |
| S7 | Dockerfile de production, Redis, `optimize`, pipeline de déploiement |
| S8 | Pull requests, revue de code |

---

## Liens avec les autres cours du dépôt

- `courses/Framework` : prérequis direct (Sem5)
- `courses/Tdd` : cycle rouge-vert-remaniement, anatomie d'un test (exercices en Deno/TypeScript : prévoir un kata PHP)
- `courses/DesignPattern`, `courses/hexagonal-architecture` : lectures pour les S3 et S6
- `courses/Docker` : rappels pour la S7
- `courses/Ci-Cd` : QCM uniquement à ce jour ; à coordonner avec R5.Real.07 (Automatisation de la chaîne de production) : le Sem6 **réinvestit** la CI/CD du Sem5, il ne la réenseigne pas

---

## Conséquences sur le cours du Sem5 (`courses/Framework`)

Non appliquées à ce jour :

- séance 8 du Sem5 : tests réduits à un premier contact (lancer `php artisan test`, lire deux tests fournis), le reste en atelier projet et préparation de soutenance
- Exercice 07 du Sem5 : retirer la mention « les branches JSON de vos routes seront testées » en séance 8 (déplacé en séance 2 du Sem6)
- Évaluation du Sem5 : README et propreté du dépôt valorisés, le projet étant repris au Sem6

---

## ⚖️ Points à arbitrer

1. **Application héritée** : domaine, taille, défauts semés ; dépôt modèle GitHub ou archive Moodle ; branches de reprise `checkpoint-sXX`
2. **PHPUnit ou Pest** : PHPUnit par défaut dans cette proposition (lien direct avec la documentation et le code de `vendor/`), Pest plus lisible pour débuter
3. **Cible de déploiement** (S7) : serveur de l'IUT, hébergeur gratuit, petit serveur privé — conditionne la livraison continue réelle
4. **Volume réel** du Sem6 dans la maquette locale et date de départ en stage (le Sem6 est souvent court)
5. **Coordination** avec l'enseignant de R5.Real.07 (CI/CD au Sem5) et avec la SAÉ 6.Real.01 (même application héritée ou non)
6. **Version de Laravel** : rester sur Laravel 12 ou faire de la **montée de version** une évolution de l'application héritée (bonus ou séance dédiée)
