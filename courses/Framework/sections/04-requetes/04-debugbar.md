---
layout: chapter
transition: slide-left | slide-right
number: 04
duration: 15 min
---

# Mesurer avec la Debugbar

- Installer `fruitcake/laravel-debugbar` en dépendance de dev
- Lire l'onglet Queries : nombre, durées, doublons
- Mesurer un avant / après — le réflexe optimisation

<!--
Transition : le query log de Tinker prouve le principe, mais personne ne compte
ses requêtes à la main. La Debugbar les affiche dans la page, à chaque rechargement.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Mesurer avec la Debugbar
Installation en une commande

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

# Mesurer avec la Debugbar
Lire l'onglet Queries

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
Faire lire le SQL réel par la salle : c'est la concrétisation du toSql() — chaque requête est traçable jusqu'à la ligne de code qui l'a lancée.
Les doublons : un with() oublié se voit immédiatement (la même requête categories × 30).
-->

---
layout: fact
transition: slide-up | slide-down
---

# Mesurer avec la Debugbar
L'avant / après, enfin visible

<div class="grid grid-cols-3 gap-8">
  <Stat value="32" label="requêtes avant (N+1 + formulaire)" color="red" />
  <Stat value="3" label="requêtes après with('category')" color="green" />
  <Stat value="1" label="clic pour s'en rendre compte" color="blue" />
</div>

<v-click>

C'est ce chiffre — **mesuré dans l'outil** — qui justifie une optimisation, pas l'intuition.

</v-click>

<!--
Les compteurs exacts varient (session, formulaire des catégories) : ce qui compte c'est l'ordre de grandeur et la lecture des requêtes listées.
Soutenance S9 : « une optimisation mesurée » est exigée — cet avant/après Debugbar est exactement la preuve attendue.
Le rituel à transmettre : modifier → recharger → lire le compteur → noter les deux chiffres (REPONSES.md en atelier).
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Mesurer avec la Debugbar
Telescope : le grand frère

::left::

**Même famille, autre calibre :**

- inspecte requêtes **et** exceptions, jobs, cache, mails
- garde un **historique** des requêtes entre les chargements
- s'installe via Composer + migration + dashboard `/telescope`

::right::

<v-click>

<Alert type="info">

Outil **plus lourd** réservé aux grosses investigations — pour mesurer le N+1 du catalogue, la Debugbar suffit largement.

</Alert>

</v-click>

<!--
Une slide d'aperçu seulement : pas d'installation aujourd'hui. Telescope sera utile quand les apprenants auront des jobs/queues (hors périmètre du module).
Analogie possible à l'oral : la Debugbar est la montre au poignet, Telescope la salle de contrôle.
-->
