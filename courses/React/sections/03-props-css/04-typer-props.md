---
layout: two-cols-header
layoutClass: gap-x-4
---

# Typer les props avec TypeScript

Décrire la forme attendue des données

::left::

````md magic-move
```tsx
// Sans typage : aucune aide, aucune sécurité
function Card({ name, role }) {
  return <h2>{name} — {role}</h2>
}
```

```tsx
// 1. On décrit la forme avec une interface
interface CardProps {
  name: string
  role: string
}
```

```tsx
// 2. On applique l'interface aux props
interface CardProps {
  name: string
  role: string
}

function Card({ name, role }: CardProps) {
  return <h2>{name} — {role}</h2>
}
```
````

::right::

<div v-click="1">

**Une `interface`**

Elle décrit chaque prop et son **type** : `name` et `role` sont des `string`.

</div>

<div v-click="2">

**On la branche sur les props**

`: CardProps` indique à React **et** à votre éditeur ce que le composant attend.

</div>

<div v-click="3">

> ✅ Autocomplétion, et **erreur immédiate** si vous oubliez une prop ou vous trompez de type.

</div>

<!--
C'est le cœur TypeScript de la séance (cf. programme : "Interfaces pour props").
Démo live conseillée : appeler <Card name="..." /> sans role → montrer l'erreur rouge dans l'éditeur.
Préciser : interface vs type — pour les props, l'usage courant est interface, mais `type` marche aussi.
-->
