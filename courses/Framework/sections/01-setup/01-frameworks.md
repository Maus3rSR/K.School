---
layout: chapter
transition: slide-left | slide-right
number: 01
duration: 40 min
---

# Qu'est-ce qu'un framework ?

- Comprendre la différence entre framework et librairie
- Identifier les frameworks serveur populaires et la place de Laravel
- Expliquer les avantages d'utiliser un framework

---
transition: slide-up | slide-down
---

# Qu'est-ce qu'un framework ?
Diagnostic

Et vous, qu'en pensez-vous ?

<Quiz
  question="Selon vous, qu'est-ce qu'un framework ?"
  :options="[
    'Un langage de programmation, comme PHP ou JavaScript',
    'Un cadre de travail qui impose une structure et appelle votre code',
    'Un logiciel pour écrire du code, comme VS Code',
    'Une base de données pour stocker les informations du site'
  ]"
  :answer="1"
/>

<!--
Quiz de diagnostic : faire voter la salle avant de cliquer pour mesurer ce que les apprenants savent déjà.
Pas de jugement sur les réponses — on y reviendra tout au long du chapitre (définition, inversion de contrôle).
-->

---
transition: slide-up | slide-down
---

# Qu'est-ce qu'un framework ?
Le problème du code "from scratch"

Sans framework, chaque projet PHP doit réinventer :

- Le **<KeyTerm>routage</KeyTerm>** des URLs
- La **gestion des <KeyTerm>requêtes</KeyTerm> et des <KeyTerm>réponses</KeyTerm> HTTP**
- L'accès à la base de données
- La **sécurité** (CSRF, authentification)
- La **gestion des formulaires**

<v-click>

> 🎯 Résultat : du code redondant, difficile à maintenir et à faire évoluer.

</v-click>

<!--
Analogie : reconstruire une maison en fabriquant ses propres briques, tuyaux et câbles.
Un framework, c'est un kit de construction standardisé.
-->

---
transition: slide-up | slide-down
---

# Qu'est-ce qu'un framework ?
Définition

<Definition term="Framework" translation="(Cadre de travail)">

Un framework fournit à la fois :

- Une **architecture logicielle** : structure du projet, règles, façon dont les composants interagissent
- Des **outils** prêts à l'emploi (routing, accès BDD, formulaires...) regroupés dans des librairies
- Des **conventions** et des **patterns** éprouvés (MVC, <KeyTerm>injection de dépendances</KeyTerm>...)

</Definition>

<Analogy title="Comme un kit de construction" icon="🏗️">

Un framework, c'est un kit de construction standardisé : vous ne partez plus d'une page blanche, vous remplissez les cases d'un puzzle déjà dessiné.

</Analogy>

<!--
Différence clé avec une librairie : un framework vous appelle, vous n'appelez pas seulement le framework.
C'est le principe d'inversion de contrôle.
-->

---
layout: two-cols-header
layoutClass: gap-x-8
transition: slide-up | slide-down
---

# Qu'est-ce qu'un framework ?
Librairie vs framework : qui appelle qui ?

::left::

<div class="flex flex-col items-center gap-1">

**📚 Librairie**

<div class="w-56 text-center px-3 py-1 text-sm rounded-lg border-2 border-blue-500 bg-blue-500/10 font-semibold">Votre code</div>
<div class="text-xs opacity-70">↓ appelle quand vous voulez</div>
<div class="w-56 text-center px-3 py-1 text-sm rounded-lg border-2 border-gray-400 bg-gray-400/10 font-semibold">Librairie</div>
<div class="text-xs opacity-70">↓ retourne un résultat</div>
<div class="w-56 text-center px-3 py-1 text-sm rounded-lg border-2 border-blue-500 bg-blue-500/10 font-semibold">Votre code continue</div>
<div class="text-xs opacity-70">🎮 Vous contrôlez le flux</div>

</div>

<div v-click="1" class="text-sm mt-4">

Une <KeyTerm>librairie</KeyTerm> répond à **un besoin précis**. Vous l'appelez quand vous voulez, elle n'impose rien à votre projet. *Ex : Axios, Lodash*

</div>

::right::

<div class="flex flex-col items-center gap-1">

**🏗️ Framework**

<div class="w-56 text-center px-3 py-1 text-sm rounded-lg border-2 border-orange-500 bg-orange-500/10 font-semibold">Framework</div>
<div class="text-xs opacity-70">↓ appelle votre code selon ses règles</div>
<div class="w-56 text-center px-3 py-1 text-sm rounded-lg border-2 border-blue-500 bg-blue-500/10 font-semibold">Votre code<br><span class="text-xs font-normal opacity-70">contrôleur, vue, modèle</span></div>
<div class="text-xs opacity-70">↓ rend la main</div>
<div class="w-56 text-center px-3 py-1 text-sm rounded-lg border-2 border-orange-500 bg-orange-500/10 font-semibold">Framework</div>
<div class="text-xs opacity-70">🔄 Le framework contrôle le flux</div>

</div>

<div v-click="1" class="text-sm mt-4">

Un <KeyTerm>framework</KeyTerm> **impose la structure** du projet et appelle votre code au bon moment : c'est l'**inversion de contrôle**. *Ex : Laravel, Symfony*

</div>

<!--
Analogie librairie = un dictionnaire que vous consultez quand vous voulez.
Framework = un guide de rédaction qui structure votre document.
Ce renversement s'appelle l'inversion de contrôle (« principe d'Hollywood » : ne nous appelez pas, c'est nous qui vous appellerons).
Un framework contient lui-même des librairies : la différence n'est pas la taille, mais qui pilote le flux d'exécution.
Source / lecture complémentaire : https://laconsole.dev/blog/differences-librairie-framework
-->

---
transition: slide-up | slide-down
---

# Qu'est-ce qu'un framework ?
Frameworks populaires côté serveur

<ImageGrid :cols="4" size="md" :images="[
  { src: '/logos/laravel.png', alt: 'Laravel', caption: 'Laravel — PHP' },
  { src: '/logos/symfony.png', alt: 'Symfony', caption: 'Symfony — PHP' },
  { src: '/logos/nestjs.png', alt: 'NestJS', caption: 'NestJS — TypeScript' },
  { src: '/logos/express.png', alt: 'Express', caption: 'Express — JavaScript' },
  { src: '/logos/django.png', alt: 'Django', caption: 'Django — Python' },
  { src: '/logos/fastapi.png', alt: 'FastAPI', caption: 'FastAPI — Python' },
  { src: '/logos/rails.png', alt: 'Ruby on Rails', caption: 'Ruby on Rails — Ruby' },
  { src: '/logos/springboot.png', alt: 'Spring Boot', caption: 'Spring Boot — Java' }
]" />

<!--
Insister sur la transversalité des concepts : routing, contrôleur, ORM, injection de dépendances.
Ceux qui connaissent NestJS reconnaîtront beaucoup d'idées.
-->

---
layout: fact
transition: slide-up | slide-down
---

# Qu'est-ce qu'un framework ?
[Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/technology#1-web-frameworks-and-technologies)

Le **Stack Overflow Developer Survey 2025** interroge plus de 49 000 développeurs dans 177 pays sur les technologies qu'ils utilisent.

Dans la catégorie **Web frameworks and technologies** :

<div class="grid grid-cols-4 gap-4 mt-6">
  <Stat value="21%" label="Next.js" color="purple" />
  <Stat value="20%" label="Express" color="gray" />
  <Stat value="20%" label="ASP.NET Core" color="blue" />
  <Stat value="15%" label="FastAPI" color="green" />
</div>

<!--
Seuls des frameworks sont affichés ici : Node.js est un environnement d'exécution et React une librairie, ils sont volontairement exclus du top.
Les frameworks PHP restent très présents, notamment en Europe.
-->

---
layout: image-right
image: /so-survey-2025.png
backgroundSize: contain
transition: slide-up | slide-down
---

# Qu'est-ce qu'un framework ?
PHP et Laravel dans le classement

Dans le même classement :

- **WordPress** ~14 % *(CMS PHP)*
- **Laravel** ~9 % *(PHP)*
- **NestJS** ~7 % *(TypeScript)*
- **Symfony** ~4 % *(PHP)*
- **Drupal** ~2 % *(CMS PHP)*

<v-click>

⚠️ **Mais attention** : ce classement mélange runtimes, frameworks frontaux, CMS et back-end. Il ne mesure pas directement le marché de l'emploi local.

</v-click>

<!--
Souligner que Laravel est populaire parmi les répondants, mais que Symfony reste très présent en production (Drupal, Magento, Sylius, PrestaShop).
La France est historiquement un marché Symfony-fort.
Chiffres SO 2025 : NestJS 6,7 %, Laravel 8,9 %.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Qu'est-ce qu'un framework ?
Pourquoi ce choix pour ce cours ?

::left::

| | Laravel | Symfony | NestJS |
|---|---|---|---|
| Langage | PHP | PHP | TypeScript |
| Prise en main | Rapide | Plus exigeante | Rapide si TS connu |
| Marché FR | Startups, agences, SaaS | Grands comptes, CMS | Équipes Node.js |
| Concepts | Routing, ORM, DI, tests | Les mêmes | Les mêmes |

::right::

- **Laravel** : courbe d'apprentissage accessible, écosystème mature, très demandé
- **Symfony** : très présent en France, vous le croiserez en entreprise
- **NestJS** : mêmes idées côté TypeScript

<KeyPoint variant="tip" title="Apprenez-en plusieurs" icon="🧭">

Les concepts sont transversaux. Maîtriser un framework, c'est pouvoir en apprendre un deuxième en quelques semaines — et savoir distinguer ce qui est **fondamental** de ce qui est **convention**.

</KeyPoint>

<!--
Le but n'est pas de dire que Laravel est "le meilleur", mais qu'il est un excellent compromis pédagogique et professionnel pour cette formation.
Rappeler que la France est historiquement un marché Symfony-fort : connaître Laravel facilite énormément la bascule vers Symfony (et inversement).
Ceux qui ont déjà fait du NestJS retrouveront modules/décorateurs sous forme de service providers/attributs.
-->

---
transition: slide-up | slide-down
---

# Qu'est-ce qu'un framework ?
Frameworks côté client

Les navigateurs utilisent aussi des frameworks pour construire l'interface :

- **Vue** et **React** sont les plus utilisés
- Ils manipulent le DOM et gèrent l'état de l'application

<v-click>

Laravel, lui, travaille **côté serveur** :

- Il reçoit une <KeyTerm>requête</KeyTerm> HTTP
- Il prépare une réponse (souvent en HTML avec <KeyTerm>Blade</KeyTerm>)
- Il peut servir de **back-end** pour une SPA ou une API

</v-click>

<!--
Le cours se concentre sur Laravel côté serveur.
On pourra évoquer en fin de module les possibilités API.
-->

---
transition: slide-up | slide-down
---

# Qu'est-ce qu'un framework ?
Pourquoi utiliser un framework ?

<div class="grid grid-cols-3 gap-4 mt-6">
  <div class="rounded-xl border-2 border-gray-400/30 bg-gray-400/5 px-4 py-3">
    <div class="text-2xl">🚀</div>
    <div class="font-bold mt-1">Productivité</div>
    <div class="text-sm opacity-80">Moins de code répétitif à écrire.</div>
  </div>
  <div class="rounded-xl border-2 border-gray-400/30 bg-gray-400/5 px-4 py-3">
    <div class="text-2xl">🧩</div>
    <div class="font-bold mt-1">Maintenabilité</div>
    <div class="text-sm opacity-80">Une structure connue de toute l'équipe.</div>
  </div>
  <div class="rounded-xl border-2 border-gray-400/30 bg-gray-400/5 px-4 py-3">
    <div class="text-2xl">🛡️</div>
    <div class="font-bold mt-1">Sécurité</div>
    <div class="text-sm opacity-80">Les failles courantes sont déjà anticipées.</div>
  </div>
  <div class="rounded-xl border-2 border-gray-400/30 bg-gray-400/5 px-4 py-3">
    <div class="text-2xl">💼</div>
    <div class="font-bold mt-1">Recrutement</div>
    <div class="text-sm opacity-80">Un standard industriel reconnu par les employeurs.</div>
  </div>
  <div class="rounded-xl border-2 border-gray-400/30 bg-gray-400/5 px-4 py-3">
    <div class="text-2xl">🔧</div>
    <div class="font-bold mt-1">Évolutivité</div>
    <div class="text-sm opacity-80">Remplacer un composant sans tout casser.</div>
  </div>
</div>

<!--
Donner un exemple concret : la protection CSRF dans les formulaires est gérée nativement.
-->
