---
layout: chapter
transition: slide-left | slide-right
number: 03
duration: 17 min
---

# Mesurer avec la Debugbar

- Installer `fruitcake/laravel-debugbar` en dépendance de dev
- Lire l'onglet Queries : nombre, durées, doublons
- Mesurer un avant / après — le réflexe optimisation

<!--
Transition : en S3, le N+1 a été constaté ; personne ne compte ses requêtes
à la main. La Debugbar les affiche dans la page, à chaque rechargement.
Tag Campus Quest de fin de chapitre : s4-ch3-debugbar.
Moment léger : « le N+1 n'est pas un bug que vous voyez — c'est un bug que vous mesurez ».
Découpage : ≈ 5 min de slides (≈ 4 slides), démo flash ≈ 3 min — moments : installation
`--dev`, onglet Queries sur /quests, comptage du N+1 ; micro-pratique ≈ 9 min
(slide « À vous », étape A3 du README — installer + noter les chiffres dans REPONSES.md).
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="La page `/quests` affiche 30 quêtes ; chaque carte lit la catégorie de sa quête. Environ combien de requêtes SQL la page exécute-t-elle ?"
  :options="[
    '1 : Laravel met les catégories en cache automatiquement',
    '2 : une pour les quêtes, une pour toutes les catégories',
    'Environ 31 : une pour la liste, une par quête',
    'Ça dépend du navigateur, pas du serveur'
  ]"
  :answer="2"
/>

<!--
Pré-test : le N+1 a été constaté en S3 (une pour la liste, une par quête) — la réponse est déjà connue,
mais la salle a-t-elle retenu le mécanisme ? La Debugbar va le rendre visible dans la page.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Installation en une commande

::left::

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail composer require fruitcake/laravel-debugbar --dev', out: '   INFO  Package fruitcake/laravel-debugbar installed.' }
  ]"
/>

- `--dev` : installée dans `require-dev` — **jamais en production**
- Auto-découverte : la barre apparaît en bas de chaque page, **rien à configurer**

::right::

<v-click>

<Alert type="warning">

Un <KeyTerm>profiler</KeyTerm> affiche vos requêtes SQL : utile en dev, dangereux en prod — c'est pour ça qu'il reste en `require-dev`.

</Alert>

</v-click>

<v-click>

Pour la désactiver ponctuellement : `DEBUGBAR_ENABLED=false` dans `.env`.

</v-click>

<!--
Le package s'appelle fruitcake/laravel-debugbar (ex barryvdh/) : v4.x, compatible Laravel 12.
Si la barre n'apparaît pas : page HTML complète requise (pas de réponse JSON), storage/ inscriptible, APP_DEBUG=true.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Lire l'onglet Queries

::left::

<Browser url="localhost/quests" title="Campus Quest">
  <Placeholder :w="800" :h="500" text="Onglet+Queries+Debugbar" />
</Browser>

::right::

**Ce que l'onglet liste, par page :**

- le **nombre total** de requêtes exécutées
- le **SQL réel** de chacune, avec sa durée en ms
- les **doublons** : deux fois la même requête = un signal d'alarme

<v-click>

Rituel : recharger la page → onglet Queries → compter, repérer les durées anormales et les répétitions.

</v-click>

<!--
Faire lire le SQL réel par la salle : c'est la concrétisation du dd() — chaque requête est traçable jusqu'à la ligne de code qui l'a lancée.
Les doublons : un with() oublié se voit immédiatement (la même requête categories × 30).
-->

---
layout: fact
transition: slide-up | slide-down
---

# Le N+1, enfin visible

<div class="grid grid-cols-3 gap-8">
  <Stat value="≈ 33" label="requêtes sur /quests" color="red" />
  <Stat value="30" label="fois la même requête categories" color="orange" />
  <Stat value="1" label="clic pour s'en rendre compte" color="blue" />
</div>

<!--
Les compteurs exacts varient (session, formulaire des catégories) : ce qui compte c'est l'ordre de grandeur et la lecture des requêtes listées.
Soutenance S9 : « une optimisation mesurée » est exigée — cet avant/après Debugbar est exactement la preuve attendue.
Le rituel à transmettre : modifier → recharger → lire le compteur → noter les deux chiffres (REPONSES.md en atelier).
-->

---
transition: slide-up | slide-down
---

# À vous : mesurer votre accueil

<Exercise title="WishFlix — installer la Debugbar et compter" duration="9 min" level="guidé"
  :criteria="[
    'fruitcake/laravel-debugbar est installée en require-dev',
    'L\'onglet Queries s\'ouvre sur la page d\'accueil',
    'Le nombre de requêtes AVANT correction est noté dans REPONSES.md, avec le SQL qui se répète'
  ]"
  :hints="[
    './vendor/bin/sail composer require fruitcake/laravel-debugbar --dev',
    'Rechargez / : la barre apparaît en bas — onglet Queries',
    'Ne corrigez rien encore : on mesure d\'abord, on corrige au chapitre suivant'
  ]">

**Exercice** `04-requetes` — étape **A3** du README.

Installez la barre, ouvrez l'onglet Queries sur `/` et **notez** le nombre de requêtes et le SQL qui se répète (le `categories` par carte — c'est le <KeyTerm>N+1</KeyTerm>).

**Spécificités WishFlix** : votre page exécute déjà plusieurs requêtes (catalogue, jeu à la une, meilleures notes, filtre) — le total inclut tout ; c'est le `categories … where id = ?` répété qui doit sauter aux yeux.

</Exercise>

<!--
Pas de point de contrôle ici : il suit la correction du N+1 (chapitre 04).
Palier de rattrapage : tag Campus Quest s4-ch3-debugbar.
-->
