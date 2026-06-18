---
layout: two-cols-header
layoutClass: gap-x-4
---

# Lire les props

Du composant figé au composant alimenté par des données

::left::

````md magic-move
```tsx
// Avant : tout est écrit en dur
function Card() {
  return (
    <div className="card">
      <h2>Ada Lovelace</h2>
      <p>Pionnière du code</p>
    </div>
  )
}
```

```tsx
// 1. On reçoit les données : un paramètre props
function Card(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>{props.role}</p>
    </div>
  )
}
```

```tsx
// 2. Déstructuration : on extrait les champs
function Card({ name, role }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  )
}
```
````

::right::

**Avant : un composant figé**

Sans props, `Card` affiche toujours la même chose.

<div v-click="1">

**On reçoit les données dans `props`**

React passe toutes les données dans **un objet** `props`. On ajoute le paramètre, puis on l'utilise dans le JSX : `props.name`, `props.role`.

</div>

<div v-click="2">

**La déstructuration**

`{ name, role }` extrait directement les champs — code plus court, forme **recommandée**.

> 📖Pas à l'aise ? Voir [la déstructuration (MDN)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

</div>

<!--
Bien montrer la PROGRESSION : on part du composant figé de la slide précédente, on ajoute le paramètre, on s'en sert dans le JSX, puis on déstructure.
Rappel JS séance 1 : la déstructuration d'objet existe déjà en JavaScript — la version 2 est juste du sucre syntaxique équivalent à la version 1.
Les deux écritures (props.name vs { name }) sont valides : insister que la déstructuration est l'usage courant, mais garder props.name comme alternative pour ceux qui ne sont pas à l'aise.
Relier {name} dans le JSX aux accolades vues en séance 2.
-->
