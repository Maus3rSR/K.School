---
layout: two-cols-header
layoutClass: gap-x-4
---

# Lire les props

Recevoir et utiliser les données dans l'enfant

::left::

````md magic-move
```tsx
// 1. Tout reçu dans un seul objet : props
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

<div v-click="1">

**Un seul argument : `props`**

React passe toutes les données dans **un objet** `props`. On lit `props.name`, `props.role`.

</div>

<div v-click="2">

**La déstructuration**

`{ name, role }` extrait directement les champs.<br/>Code plus court et plus lisible — c'est la forme **recommandée**.

</div>

<!--
Rappel JS séance 1 : la déstructuration d'objet existe déjà en JavaScript.
Montrer que les deux versions sont équivalentes : la 2e est juste du sucre syntaxique.
Bien relier {name} dans le JSX aux accolades vues en séance 2.
-->
