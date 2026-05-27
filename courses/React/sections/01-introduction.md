---
layout: cover
background: https://cover.sli.dev?2
---

# Chapitre 01 - Introduction à React

---

# Introduction à React
Qu'est-ce que React ?

<v-clicks>

- **Bibliothèque JavaScript** créée par Facebook en **2013**
- Conçue pour construire des **interfaces utilisateur** (UI)
- Aujourd'hui maintenue par Meta + une large **communauté open-source**
- Utilisée par Netflix, Airbnb, WhatsApp, Instagram...

</v-clicks>

<!--
React n'est pas un framework complet (pas de routing, pas de gestion d'état inclus).
C'est une bibliothèque focalisée sur l'interface.
Analogie : React = LEGO, il fournit les briques, on assemble comme on veut.
-->

---

# Introduction à React
Un peu d'histoire

<v-clicks>

- **2011** — Facebook crée un proto interne pour gérer la complexité du fil d'actualité
- **2013** — Open-source lors de JSConf US
- **2015** — React Native pour les applications mobiles
- **2016** — React 15, adoption massive
- **2022** — React 18 avec le rendu concurrent
- **2023** — React.dev remplace reactjs.org

</v-clicks>

<!--
Insister sur le fait que React existe depuis + de 10 ans et est toujours au top.
C'est un gage de stabilité et d'employabilité pour la reconversion.
-->

---

# Introduction à React
Pourquoi apprendre React ?

<v-clicks>

- 🏆 **1er framework/bibliothèque front-end** selon Stack Overflow 2023
- 💼 **Très demandé** sur le marché de l'emploi
- 🔄 **Concept réutilisable** : Vue, Angular, Svelte partagent des idées similaires
- ⚛️ **Composants** : une manière universelle de penser l'UI
- 📱 React Native = iOS & Android avec les mêmes connaissances

</v-clicks>

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
layout: two-cols-header
---

# Introduction à React
SPA vs MPA — Le problème

::left::

## Site classique (MPA)
<small>Multi-Page Application</small>

<v-clicks>

- Chaque clic → le navigateur **recharge une page entière**
- Le serveur envoie un **nouveau HTML complet**
- Temps de chargement **visible** à chaque navigation
- URL change complètement

</v-clicks>

::right::

## Application moderne (SPA)
<small>Single-Page Application</small>

<v-clicks>

- **Un seul HTML** chargé au départ
- JavaScript **met à jour** uniquement les parties qui changent
- Navigation **instantanée**, sensation d'app native
- React est conçu pour faire des SPA

</v-clicks>

<!--
Analogie MPA : comme changer de chaîne à la télé — tout l'écran change.
Analogie SPA : comme une application mobile — l'interface se met à jour sans recharger.
Exemples MPA : sites e-commerce classiques, Wikipedia.
Exemples SPA : Gmail, Google Maps, Figma.
-->

---
layout: center
class: text-center
---

# Introduction à React
MPA vs SPA — En image

```
MPA :  [Page 1] → clic → [Page 2 entière] → clic → [Page 3 entière]
         ↑ rechargement complet à chaque fois

SPA :  [Shell HTML] → clic → [mise à jour partielle] → clic → [mise à jour partielle]
         ↑ chargé une seule fois, React gère le reste
```

<!--
Si possible, montrer en live : ouvrir Gmail et inspecter le réseau — très peu de rechargements complets.
Comparer avec un site classique WordPress.
-->

---

# Introduction à React
Comment React fonctionne ?

<v-clicks>

1. **Votre code React** décrit à quoi doit ressembler l'UI
2. React crée un **Virtual DOM** (copie légère du vrai DOM)
3. Quand les données changent, React **calcule les différences**
4. Il ne met à jour que les **parties modifiées** dans le vrai DOM

</v-clicks>

<v-click>

> ⚡ Résultat : performances optimisées, même sur de grandes applications

</v-click>

<!--
Ne pas rentrer dans les détails du Virtual DOM maintenant.
Juste planter la graine : React est intelligent et ne fait que le minimum nécessaire.
Pièges fréquents : "Le Virtual DOM c'est pas magique, c'est juste une optimisation."
-->

---
layout: default
---

# Introduction à React
Récapitulatif

<v-clicks>

- ✅ React = **bibliothèque JavaScript** pour créer des interfaces
- ✅ Créée par **Facebook en 2013**, très demandée en entreprise
- ✅ Basée sur des **composants** réutilisables
- ✅ Permet de créer des **SPA** : navigation rapide, expérience fluide
- ✅ Utilise un **Virtual DOM** pour optimiser les mises à jour

</v-clicks>

<!--
Pause de 2 minutes. Questions ?
Transition : maintenant qu'on sait POURQUOI React, voyons les prérequis JS modernes.
-->
