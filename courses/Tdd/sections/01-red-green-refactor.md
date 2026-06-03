---
layout: cover
background: https://cover.sli.dev?3
---

# Chapitre 01 - Red. Green. Refactor.

<!--
Durée : 15 minutes
Objectif : Comprendre la logique du cycle avant de voir du code — aucune syntaxe Deno ici.
La démo FizzBuzz arrive en 02-anatomie-test.md.
-->

---
layout: default
---

# Red. Green. Refactor.

Le cycle fondamental

<div v-click>

**1. RED — Écrire un test qui échoue**

- Le test décrit le comportement attendu
- Il DOIT échouer — c'est la preuve qu'il teste quelque chose de réel

</div>

<div v-click>

**2. GREEN — Écrire le minimum de code pour passer**

- Pas "le bon code", le code **minimal**
- L'objectif unique : faire passer le test, rien de plus

</div>

<div v-click>

**3. REFACTOR — Améliorer sans casser**

- Nettoyer, renommer, simplifier
- Les tests restent verts — c'est le filet de sécurité

</div>

<!--
Insister sur "minimum de code" — c'est contre-intuitif mais délibéré.
Le code minimal n'est pas du mauvais code : c'est une discipline. On n'anticipe rien, on résout ce que le test demande.
Les 3 étapes forment une boucle : après le REFACTOR on repart en RED avec le test suivant.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Red. Green. Refactor.

Pourquoi le test DOIT échouer d'abord ?

::left::

<div v-click>

**Si un test passe sans code...**

- ...c'est qu'il ne teste rien
- ...ou que le code existant fait déjà ce qu'on veut (et on ne le savait pas)
- Un test qui ne peut pas échouer n'a aucune valeur

</div>

::right::

<div v-click>

**Le rouge est une information**

- "Ce comportement n'existe pas encore"
- On sait exactement ce qu'on va construire
- Le test passe au vert = preuve que le code produit est celui qui résout le problème

</div>

<!--
Analogie : un détecteur d'incendie qui ne déclenche jamais n'est pas rassurant, c'est suspect.
Si un test est toujours vert dès le départ, on n'a aucune certitude qu'il protège quoi que ce soit.
Le rouge initial est la seule façon de valider que le test est honnête.
-->

---
layout: default
---

# Red. Green. Refactor.

La règle des baby steps

<div v-click>

- Un seul test à la fois
- Le test le plus simple possible d'abord
- On ne pense pas à la suite — on résout le test actuel
- Chaque pas est minuscule, mais la direction est claire

</div>

<div v-click>

| | Sans baby steps | Avec baby steps |
|---|---|---|
| **Rythme** | On anticipe, on over-engineer, on code une heure sans feedback | Feedback toutes les 2-3 minutes, on voit avancer |
| **Risque** | Une erreur peut contaminer tout ce qu'on a écrit | Chaque pas est validé avant le suivant |

</div>

<!--
Les débutants ont tendance à sauter des étapes — rappeler que la discipline des petits pas est volontaire.
L'over-engineering est la tentation naturelle : "je sais où je vais, autant tout écrire d'un coup".
Le TDD répond : "si tu sais où tu vas, prouve-le un test à la fois".
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Red. Green. Refactor.

À quoi ressemble une session TDD ?

::left::

<div v-click>

**Une session de 10 minutes**

- 2 min : écrire un test (RED)
- 1 min : code minimal (GREEN)
- 1 min : refactoring si nécessaire
- Répéter...

Après 10 min : 3-4 comportements testés, code propre, zéro régression possible

</div>

::right::

<div v-click>

**Ce qu'on ressent au début**

- "C'est lent"
- "Je sais déjà ce que je vais coder"
- "Ces tests sont trop simples"

</div>

<div v-click>

**Ce qu'on réalise après**

- Les cas simples révèlent les cas complexes
- La "lenteur" évite des heures de debugging
- Le code produit est naturellement plus simple

</div>

<!--
La résistance au début est normale — c'est une discipline qui s'acquiert.
Insister : les "tests trop simples" sont souvent ceux qui révèlent les vrais cas limites.
La session de 10 minutes est un bon exercice concret à proposer lors des katas.
-->

---
layout: center
class: text-center
---

# Red. Green. Refactor.
&nbsp;

> "Quelle étape vous paraît la plus difficile a respecter — écrire le test en premier, s'arreter au minimum, ou ne refactorer que quand c'est vert ?"

<!--
Objectif : nommer les résistances naturelles avant la démo.
Laisser 2-3 réponses, ne pas trancher — toutes les réponses sont valides.
Enchaîner : "On va voir tout ça en pratique avec un premier vrai test" -> 02-anatomie-test.md
-->
