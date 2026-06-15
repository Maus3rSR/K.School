---
layout: cover
background: https://cover.sli.dev?2
---

# Chapitre 01 - Introduction à React

---

# Introduction à React
Qu'est-ce que React ?

- **Bibliothèque JavaScript** créée par Facebook en **2013**
- Conçue pour construire des **interfaces utilisateur** (UI)
- Aujourd'hui maintenue par Meta + une large **communauté open-source**
- Utilisée par Netflix, Airbnb, WhatsApp, Instagram...

<!--
React n'est pas un framework complet (pas de routing, pas de gestion d'état inclus).
C'est une bibliothèque focalisée sur l'interface.
Analogie : React = LEGO, il fournit les briques, on assemble comme on veut.
-->

---

# Introduction à React
Pourquoi apprendre React ?

- 🏆 **1ère bibliothèque front-end** selon Stack Overflow 2023
- 💼 **Très demandé** sur le marché de l'emploi
- 🔄 **Concept réutilisable** : Vue, Angular, Svelte partagent des idées similaires
- ⚛️ **Composants** : une manière universelle de penser l'UI
- 📱 React Native = iOS & Android avec les mêmes connaissances

<!--
Question à poser : "Qui a déjà entendu parler de React ?"
Rassurer : apprendre React, c'est aussi apprendre à penser en composants, une compétence transférable partout.
-->

---
layout: center
class: text-center
---

# Introduction à React
&nbsp;

React permet de **découper** votre interface en **petites pièces réutilisables** :

## Les Composants <small>_(Components)_</small>

<!--
Le concept central de tout le cours. Y revenir souvent.
Analogie : un composant c'est comme un widget/gadget autonome qu'on peut brancher n'importe où.
-->

---
layout: image-right
image: /spa-vs-mpa.jpg
backgroundSize: contain
---

# Introduction à React
SPA vs MPA

## Site classique (MPA)

<v-click>

- Chaque clic → **rechargement complet** de la page
- Le serveur renvoie un **nouveau HTML** à chaque fois

</v-click>

## Application moderne (SPA)

<v-click>

- **Un seul HTML** chargé au départ
- JavaScript (React) met à jour **uniquement ce qui change**

</v-click>

<div class="text-sm opacity-60 mt-2">

🔗 [SPA vs MPA : Comparaison complète](https://themindstudios.com/blog/spa-vs-mpa/)

</div>

<!--
Analogie MPA : comme changer de chaîne à la télé — tout l'écran change.
Analogie SPA : comme une application mobile — l'interface se met à jour sans recharger.
Exemples MPA : sites e-commerce classiques, Wikipedia.
Exemples SPA : Gmail, Google Maps, Figma.
Image : gauche = MPA (cycle requête/réponse complet), droite = SPA (chargement initial unique).
🔗 Source image : https://themindstudios.com/blog/spa-vs-mpa/
-->

---

# Introduction à React
JavaScript existait déjà... pourquoi React ?


- **JavaScript permettait déjà l'interactivité** (jQuery, vanilla JS) — menus déroulants, sliders, etc.
- **Problème** : Sur une **application complexe** (type Facebook), le code devenait un **cauchemar à maintenir**
- **Le vrai besoin** : Gérer des **interfaces dynamiques à grande échelle** sans que le code ne devienne ingérable


<v-click>

## La solution de React <span class="text-sm opacity-70">(et Vue, Angular, etc.)</span>

- **Composants** : Découper l'UI en briques **réutilisables** et **indépendantes**
- **Virtual DOM** <span class="text-sm opacity-70">(React & Vue)</span> : Mettre à jour uniquement ce qui a changé, **sans manipuler directement le DOM**
- **Data binding unidirectionnel** : Flux de données prévisible, bugs plus faciles à tracer

</v-click>

<!--
Piège à éviter : "JavaScript ne suffisait pas" → FAUX. Il suffisait pour de l'interactivité simple.
Mais React a révolutionné la façon d'organiser le code sur des apps complexes.
Analogie : JavaScript = tournevis. React = perceuse-visseuse avec embouts interchangeables.
-->

---
layout: image-right
image: /virtual-dom.jpg
backgroundSize: contain
---

# Introduction à React
Comment React fonctionne ?

<v-clicks>

1. **Votre code React** décrit à quoi doit ressembler l'UI
2. React crée un **Virtual DOM** (copie légère du vrai DOM)
3. Quand les données changent, React **calcule les différences**
4. Il ne met à jour que les **parties modifiées** dans le vrai DOM

</v-clicks>

<br/>

<v-click>

> ⚡ Résultat : performances optimisées, même sur de grandes applications

</v-click>

<div class="text-sm opacity-60 mt-2">

🔗 [Qu'est-ce que le Virtual DOM ?](https://code-garage.com/blog/qu-est-ce-que-le-virtual-dom)

</div>

<!--
Ne pas rentrer dans les détails du Virtual DOM maintenant.
Juste planter la graine : React est intelligent et ne fait que le minimum nécessaire.
Pièges fréquents : "Le Virtual DOM c'est pas magique, c'est juste une optimisation."
🔗 Source image : https://code-garage.com/blog/qu-est-ce-que-le-virtual-dom
-->