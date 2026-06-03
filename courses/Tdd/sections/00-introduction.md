---
layout: cover
background: https://cover.sli.dev?2
---

# Chapitre 00 - Introduction

<!--
Durée : 25 minutes
Objectif : Créer le besoin pour le TDD — pas encore de code, donner envie
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Introduction

Le cycle du développeur sans filet

::left::

<div v-click>

## Le quotidien sans TDD

"J'écris du code" → "Je teste manuellement" → "Ça marche" → "J'oublie" → "Je casse quelque chose" → "Je ne sais plus quoi a cassé"

</div>

::right::

<div v-click>

## Les conséquences concrètes

- Peur de modifier du code existant
- Régressions silencieuses découvertes en production
- Temps perdu à débugger au lieu de créer
- Le projet devient fragile avec le temps

</div>

<!--
Demander : "Qui a déjà cassé quelque chose en pensant ne rien changer ?" — lever les mains.
Laisser le silence s'installer avant d'avancer. Ce cycle est universel.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Introduction

Écrire des tests n'est pas faire du TDD

::left::

<div v-click>

## Écrire des tests APRÈS le code

- On code, ça fonctionne, on écrit un test pour le prouver
- Les tests suivent le code — ils valident ce qui existe déjà
- Résultat : tests couplés à l'implémentation, fragiles

</div>

<div v-click class="mt-6">

## TDD — Test FIRST

- On écrit un test **avant** le code
- Le test décrit **ce que** le code doit faire
- On écrit le code pour satisfaire le test
- Résultat : code conçu pour être testable dès le départ

</div>

::right::

<div v-click>

> "TDD n'est pas une technique de test. C'est une technique de **conception**."
>
> — Kent Beck

</div>

<!--
Insister sur le mot "conception" — c'est le point central de cette slide.
TDD force à réfléchir à l'interface avant l'implémentation : comment je veux utiliser ce code ?
La distinction "test after" vs "test first" est fondamentale pour la suite du cours.
-->

---

# Introduction

Red. Green. Refactor.

<div v-click>

## RED — Écrire un test qui échoue

Le test décrit le comportement attendu. Il n'existe pas encore de code pour le faire passer.

</div>

<div v-click class="mt-4">

## GREEN — Écrire le minimum de code pour le faire passer

Pas d'optimisation, pas de perfectionnisme. Juste ce qu'il faut pour que le test soit vert.

</div>

<div v-click class="mt-4">

## REFACTOR — Améliorer le code en sécurité

Le test passe. On peut nettoyer, simplifier, restructurer — sans craindre de casser quelque chose.

</div>

<div v-click class="mt-8">

**Ce cycle, répété des dizaines de fois par heure, est la discipline fondamentale du TDD.**

</div>

<!--
Ne pas détailler chaque étape — le prochain chapitre décortique Red, Green, Refactor en profondeur.
L'objectif ici est de planter le décor : TDD, c'est un rythme, une cadence, pas une règle ponctuelle.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Introduction

Ce que TDD apporte concrètement

::left::

<div v-click>

**Confiance pour modifier du code existant**

Les tests forment un filet de sécurité — chaque changement est validé en quelques secondes.

</div>

<div v-click class="mt-4">

**Détection immédiate des régressions**

Un test rouge après une modification indique exactement ce qui a cassé, et où.

</div>

<div v-click class="mt-4">

**Code conçu pour être simple et testable**

Écrire le test en premier pousse naturellement vers des interfaces claires et des responsabilités bien délimitées.

</div>

::right::

<div v-click>

**Documentation vivante**

Les tests décrivent le comportement attendu — ils restent vrais ou le build échoue.

</div>

<div v-click class="mt-4">

**Refactoring sans peur**

Améliorer, restructurer, renommer — le filet de tests signale immédiatement tout problème.

</div>

<div v-click class="mt-4">

**Feedback en quelques secondes, pas en production**

Les bugs sont attrapés au moment où le code est écrit, pas six mois plus tard.

</div>

<!--
Les bénéfices se ressentent après quelques heures de pratique — pas immédiatement.
Prévenir les apprenants : les premières heures de TDD peuvent sembler lentes.
La vitesse revient rapidement, et elle s'accompagne d'une solidité nouvelle.
-->

---
layout: center
class: text-center
---

# Introduction
&nbsp;

> 💬 Selon vous, quel est le moment idéal pour écrire un test — avant ou après avoir écrit le code ?

<!--
Laisser 2-3 réponses s'exprimer, ne pas trancher encore.
Accueillir les deux points de vue sans les corriger — la suite du cours le fera naturellement.
Enchaîner vers le cycle Red-Green-Refactor en détail.
-->
