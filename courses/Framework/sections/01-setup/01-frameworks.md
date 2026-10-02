---
layout: cover
background: https://cover.sli.dev?2
---

# Chapitre 01 - Qu'est-ce qu'un framework ?

---

# Qu'est-ce qu'un framework ?
Le problème du code "from scratch"

Sans framework, chaque projet PHP doit réinventer :

- Le **routage** des URLs
- La **gestion des requêtes** et des réponses HTTP
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

# Qu'est-ce qu'un framework ?
Définition

Un **framework** est un cadre de travail qui impose :

- Une **structure de projet** standardisée
- Un ensemble de **bibliothèques** compatibles entre elles
- Des **conventions** pour organiser le code
- Des **patterns** éprouvés (MVC, injection de dépendances...)

<v-click>

Vous ne partez plus d'une page blanche. Vous remplissez les cases d'un puzzle déjà dessiné.

</v-click>

<!--
Différence clé avec une librairie : un framework vous appelle, vous n'appelez pas seulement le framework.
C'est le principe d'inversion de contrôle.
-->

---
layout: two-cols-header
layoutClass: gap-x-8
---

# Qu'est-ce qu'un framework ?
Bibliothèque vs Framework : qui appelle qui ?

::left::

<div class="flex flex-col items-center gap-2">

**📚 Bibliothèque**

<div class="w-60 text-center px-4 py-2 rounded-lg border-2 border-blue-500 bg-blue-500/10 font-semibold">Votre code</div>
<div class="text-sm opacity-70">↓ appelle</div>
<div class="w-60 text-center px-4 py-2 rounded-lg border-2 border-gray-400 bg-gray-400/10 font-semibold">Bibliothèque</div>
<div class="text-sm opacity-70">↓ retourne un résultat</div>
<div class="w-60 text-center px-4 py-2 rounded-lg border-2 border-blue-500 bg-blue-500/10 font-semibold">Votre code continue</div>
<div class="text-sm opacity-70">🎮 Vous gardez le contrôle</div>

</div>

<div v-click="1">

Une bibliothèque **répond à vos questions**

</div>

::right::

<div class="flex flex-col items-center gap-2">

**🏗️ Framework**

<div class="w-60 text-center px-4 py-2 rounded-lg border-2 border-orange-500 bg-orange-500/10 font-semibold">Framework</div>
<div class="text-sm opacity-70">↓ appelle selon ses conventions</div>
<div class="w-60 text-center px-4 py-2 rounded-lg border-2 border-blue-500 bg-blue-500/10 font-semibold">Votre code<br><span class="text-sm font-normal opacity-70">contrôleur, vue, modèle</span></div>
<div class="text-sm opacity-70">↓ rend la main</div>
<div class="w-60 text-center px-4 py-2 rounded-lg border-2 border-orange-500 bg-orange-500/10 font-semibold">Framework</div>
<div class="text-sm opacity-70">🔄 Le framework a le contrôle</div>

</div>

<div v-click="1">

Un framework **pose le cadre de vos réponses**

</div>

<!--
Analogie bibliothèque = un dictionnaire que vous consultez quand vous voulez.
Framework = un guide de rédaction qui structure votre document.
Ce renversement s'appelle l'inversion de contrôle.
-->

---

# Qu'est-ce qu'un framework ?
Frameworks populaires côté serveur

| Langage | Frameworks |
|---------|------------|
| PHP | Symfony, **Laravel** |
| JavaScript / TypeScript | NestJS, Express, AdonisJS |
| Python | Django, Flask, FastAPI |
| Ruby | Ruby on Rails |
| Java | Spring Boot |

<!--
Insister sur la transversalité des concepts : routing, contrôleur, ORM, injection de dépendances.
Ceux qui connaissent NestJS reconnaîtront beaucoup d'idées.
-->

---

# Talk — Stack Overflow Developer Survey 2025
Le paysage des frameworks web

Le **Stack Overflow Developer Survey 2025** interroge plus de 49 000 développeurs dans 177 pays sur les technologies qu'ils utilisent.

<v-click>

Dans la catégorie **Web frameworks and technologies**, on observe :

</v-click>

<v-click>

- **Node.js** ~49 % — le runtime JavaScript côté serveur le plus cité
- **React** ~45 % — leader des frameworks frontaux
- **Next.js** ~21 % — framework React full-stack en forte croissance
- **Express** ~20 % — framework Node.js léger et très répandu

</v-click>

<!--
Ces chiffres montrent que JavaScript/TypeScript domine le paysage web mondial.
Mais les frameworks PHP restent très présents, notamment en Europe.
-->

---

# Talk — Stack Overflow Developer Survey 2025
Où se situent PHP et Laravel ?

<v-click>

Dans le même classement :

- **WordPress** ~14 % *(CMS PHP)*
- **Laravel** ~9 % *(PHP)*
- **NestJS** ~7 % *(TypeScript)*
- **Symfony** ~4 % *(PHP)*
- **Drupal** ~2 % *(CMS PHP)*

</v-click>

<v-click>

> 💡 Laravel est le framework PHP le plus cité, devant Symfony, et même devant NestJS, son équivalent côté TypeScript.

</v-click>

<v-click>

⚠️ **Mais attention** : ce classement mélange runtimes, frameworks frontaux, CMS et back-end. Il ne mesure pas directement le marché de l'emploi local.

</v-click>

<!--
Souligner que Laravel est populaire parmi les répondants, mais que Symfony reste très présent en production (Drupal, Magento, Sylius, PrestaShop).
La France est historiquement un marché Symfony-fort.
Chiffres SO 2025 : NestJS 6,7 %, Laravel 8,9 %.
-->

---

# Talk — Stack Overflow Developer Survey 2025
Pourquoi ce choix pour ce cours ?

- **Laravel** combine une courbe d'apprentissage accessible avec un écosystème mature
- Il est très demandé dans les **startups, agences web et SaaS**
- Il expose les mêmes concepts fondamentaux que Symfony ou NestJS : routing, ORM, injection de dépendances, tests
- Une fois ces bases acquises, passer à un autre framework devient beaucoup plus simple

<!--
Le but n'est pas de dire que Laravel est "le meilleur", mais qu'il est un excellent compromis pédagogique et professionnel pour cette formation.
-->

---

# Qu'est-ce qu'un framework ?
Frameworks côté client

Les navigateurs utilisent aussi des frameworks pour construire l'interface :

- **React**, **Vue**, **Angular**, **Svelte**
- Ils manipulent le DOM et gèrent l'état de l'application

<v-click>

Laravel, lui, travaille **côté serveur** :

- Il reçoit une requête HTTP
- Il prépare une réponse (souvent en HTML avec Blade)
- Il peut servir de **back-end** pour une SPA ou une API

</v-click>

<!--
Le cours se concentre sur Laravel côté serveur.
On pourra évoquer en fin de module les possibilités API.
-->

---

# Qu'est-ce qu'un framework ?
Pourquoi utiliser un framework ?

- **Productivité** : on écrit moins de code répétitif
- **Maintenabilité** : la structure est connue de tous
- **Sécurité** : les failles courantes sont déjà anticipées
- **Recrutement** : un standard industriel reconnu
- **Évolutivité** : on peut remplacer un composant sans tout casser

<!--
Donner un exemple concret : la protection CSRF dans les formulaires est gérée nativement.
-->

---

# Qu'est-ce qu'un framework ?
Quiz

<Quiz
  question="Qu'est-ce qui distingue un framework d'une bibliothèque ?"
  :options="[
    'Un framework est toujours plus léger qu\'une bibliothèque',
    'Le framework appelle votre code selon ses propres conventions',
    'Une bibliothèque impose la structure de votre projet',
    'Un framework ne fonctionne qu\'avec PHP'
  ]"
  :answer="1"
/>

<!--
Faire voter la salle avant de cliquer. Revenir sur l'inversion de contrôle si besoin.
-->

---

# Qu'est-ce qu'un framework ?
Quiz

<Quiz
  question="Parmi ces frameworks, lequel est écrit en PHP ?"
  :options="['NestJS', 'Django', 'Laravel', 'Spring Boot']"
  :answer="2"
/>

<!--
NestJS = TypeScript, Django = Python, Spring Boot = Java.
-->
