---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-left | slide-right
---

# Campus Quest
Le catalogue devient vivant

En S3, les 3 tables existent et `/quests` lit la base — mais elle lit **tout**, tout le temps, et avec un N+1 caché dans chaque carte. Aujourd'hui, on interroge finement.

::left::

**Le fil du jour**

- Un catalogue **filtrable** : recherche par titre + filtre par catégorie
- Un N+1 **mesuré puis corrigé** — avec un vrai profiler
- Une page **Classement** : catégories par XP, lieux par quêtes
- Un catalogue **paginé** : 10 quêtes par page, filtres conservés

::right::

<v-click>

**Les tables de la S3, telles quelles**

- `quests` — title, description, xp, difficulty, featured
- `categories` — name : Quiz, Mission, Culture G
- `locations` — name : BU, Cafét, Amphi… (+ pivot `location_quest`)

</v-click>

::bottom::

> 🎯 Objectif : chaque page ne doit demander à la base **que ce dont elle a besoin** — et vous saurez le prouver.

<!--
Fil conducteur : le catalogue seedé en S3 devient aujourd'hui un vrai catalogue — recherche, filtre, tri, pages.
Annoncer la promesse mesurable : à la fin, la salle sait compter les requêtes d'une page et prouver une optimisation — compétence exigée à la soutenance S9.
Le classement « de la promo » (par joueur) attendra la S6 : pas encore de table user ↔ quest — on classera les catégories et les lieux.
-->
