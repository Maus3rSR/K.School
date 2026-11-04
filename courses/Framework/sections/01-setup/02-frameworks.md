---
layout: chapter
transition: slide-left | slide-right
number: 02
duration: 20 min
---

# Pourquoi un framework ?

- Distinguer un framework d'une librairie : qui appelle qui ?
- Situer Laravel parmi les frameworks serveur

<!--
Chapitre volontairement court (≈ 20 min, théorie seule) : il occupe le temps du téléchargement Docker.
Jeter un œil aux terminaux pendant le quiz : les installations doivent défiler.
-->

---
transition: slide-up | slide-down
---

# Qu'est-ce qu'un framework ?

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
Quiz de diagnostic : faire voter la salle à main levée avant de cliquer, pour mesurer ce que les apprenants savent déjà.
Pas de jugement sur les réponses — on y revient avec la définition et l'inversion de contrôle.
Moment léger : « VS Code n'est pas un framework… même si certains l'utilisent comme un mode de vie. »
-->

---
layout: two-cols-header
layoutClass: gap-x-8
transition: slide-up | slide-down
---

# Ce que WishFlix vous demanderait « from scratch »

::left::

Votre projet du module : un **catalogue de jeux vidéo** avec fiche détaillée, wishlist personnelle, connexion et back-office.

Sans framework, vous devriez tout réinventer :

- Le **<KeyTerm>routage</KeyTerm>** des URL
- Les <KeyTerm>requêtes</KeyTerm> et les <KeyTerm>réponses</KeyTerm> HTTP
- L'accès à la base de données
- La **sécurité** : CSRF, mots de passe, sessions
- La validation des **formulaires**

::right::

<Browser url="localhost">
  <Placeholder :w="800" :h="500" text="WishFlix+statique+-+catalogue" />
</Browser>

<v-click>

> 🎯 Résultat : du code redondant, difficile à maintenir et à sécuriser.

</v-click>

<!--
Remontrer en 30 secondes la maquette statique de WishFlix (démo de l'accueil) : c'est l'objectif du module.
Analogie : reconstruire une maison en fabriquant ses propres briques, tuyaux et câbles.
-->

---
transition: slide-up | slide-down
---

# Définition

<Definition term="Framework" translation="(Cadre de travail)">

Un framework fournit à la fois :

- Une **architecture logicielle** : structure du projet, règles, façon dont les composants interagissent
- Des **outils** prêts à l'emploi (routing, accès BDD, formulaires...) regroupés dans des librairies
- Des **conventions** et des **patterns** éprouvés (MVC, injection de dépendances...)

</Definition>

<Analogy title="Comme un kit de construction" icon="🏗️">

Un framework, c'est un kit de construction standardisé : vous ne partez plus d'une page blanche, vous remplissez les cases d'un puzzle déjà dessiné.

</Analogy>

<!--
Différence clé avec une librairie : un framework vous appelle, vous n'appelez pas seulement le framework.
C'est le principe d'inversion de contrôle : slide suivante.
-->

---
layout: two-cols-header
layoutClass: gap-x-8
transition: slide-up | slide-down
---

# Librairie ou framework : qui appelle qui ?

::left::

<div class="flex flex-col items-center gap-1">

**📚 <KeyTerm>Librairie</KeyTerm> : vous l'appelez**

<div class="w-56 text-center px-3 py-1 text-sm rounded-lg border-2 border-blue-500 bg-blue-500/10 font-semibold">Votre code</div>
<div v-click="1" class="flex flex-col items-center gap-1">
<div class="text-xs opacity-70">↓ appelle quand vous voulez</div>
<div class="w-56 text-center px-3 py-1 text-sm rounded-lg border-2 border-gray-400 bg-gray-400/10 font-semibold">Librairie</div>
</div>
<div v-click="2" class="flex flex-col items-center gap-1">
<div class="text-xs opacity-70">↓ retourne un résultat</div>
<div class="w-56 text-center px-3 py-1 text-sm rounded-lg border-2 border-blue-500 bg-blue-500/10 font-semibold">Votre code continue</div>
<div class="text-xs opacity-70">🎮 Vous contrôlez le flux · <em>ex. Axios, Lodash</em></div>
</div>

</div>

::right::

<div class="flex flex-col items-center gap-1">

**🏗️ <KeyTerm>Framework</KeyTerm> : il vous appelle**

<div v-click="3" class="w-56 text-center px-3 py-1 text-sm rounded-lg border-2 border-orange-500 bg-orange-500/10 font-semibold">Framework</div>
<div v-click="4" class="flex flex-col items-center gap-1">
<div class="text-xs opacity-70">↓ appelle votre code selon ses règles</div>
<div class="w-56 text-center px-3 py-1 text-sm rounded-lg border-2 border-blue-500 bg-blue-500/10 font-semibold">Votre code<br><span class="text-xs font-normal opacity-70">route, vue, modèle</span></div>
</div>
<div v-click="5" class="flex flex-col items-center gap-1">
<div class="text-xs opacity-70">↓ rend la main</div>
<div class="w-56 text-center px-3 py-1 text-sm rounded-lg border-2 border-orange-500 bg-orange-500/10 font-semibold">Framework</div>
<div class="text-xs opacity-70">🔄 Le framework contrôle le flux · <em>ex. Laravel, Symfony</em></div>
</div>

</div>

::bottom::

<div v-click="6" class="mt-4 text-center">

Ce renversement s'appelle l'<KeyTerm>inversion de contrôle</KeyTerm>.

</div>

<!--
Dérouler le schéma clic par clic : à gauche, VOTRE code part en premier ; à droite, le framework démarre, puis appelle votre code.
Principe d'Hollywood : « Ne nous appelez pas, c'est nous qui vous appellerons. » (moment léger : jouer le producteur de cinéma).
Un framework contient lui-même des librairies : la différence n'est pas la taille, mais qui pilote le flux d'exécution.
Vous verrez concrètement au chapitre 04 que vous n'écrivez jamais le `main` : Laravel reçoit la requête et appelle votre route.
Lecture complémentaire : https://laconsole.dev/blog/differences-librairie-framework
-->

---
layout: image-right
image: /so-survey-2025.png
backgroundSize: contain
transition: slide-up | slide-down
---

# Laravel dans le paysage

**Laravel** : framework PHP open source (2011), centré sur la productivité. Version du cours : **Laravel 12** (PHP 8.3+).

[Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/technology#1-web-frameworks-and-technologies), *Web frameworks* :

- **Next.js** ~21 % · **Express** ~20 % · **ASP.NET Core** ~20 %
- **Laravel** ~9 % · **NestJS** ~7 % · **Symfony** ~4 %

<v-click>

⚠️ Ce classement mélange frameworks front, back et CMS : il ne mesure pas le marché de l'emploi local. Comparaison Laravel / Symfony / NestJS : **annexe** en fin de deck.

</v-click>

<!--
Talk court (2 min max). Chiffres SO 2025 : Next.js 20,8 %, Express 19,9 %, ASP.NET Core 19,7 %, Laravel 8,9 %, NestJS 6,7 %, Symfony ~4 %. WordPress ~14 % est un CMS.
La France est historiquement un marché Symfony-fort : connaître Laravel facilite la bascule (mêmes concepts : routing, ORM, injection de dépendances).
Ne pas dérouler l'annexe en séance. Slogan historique : « The PHP Framework for Web Artisans » : d'où la console Artisan, vue au chapitre 04.
Moment léger : « Oui, PHP a 30 ans. Non, il n'est pas mort : il a juste arrêté de lire ses mails. »
Fin du chapitre : regarder où en sont les téléchargements avant d'enchaîner.
-->
