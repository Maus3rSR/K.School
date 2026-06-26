---
layout: two-cols-header
layoutClass: gap-x-4
---

# Afficher une liste avec `map()`

Transformer un tableau de données en tableau de JSX

::left::

````md magic-move
```tsx
// 🔴 AVANT — répétition manuelle
function FruitList() {
  return (
    <ul>
      <li>🍎 Pomme</li>
      <li>🍌 Banane</li>
      <li>🍒 Cerise</li>
    </ul>
  )
}
```

```tsx
// 🟢 APRÈS — dynamique avec map()
const fruits = ["🍎 Pomme", "🍌 Banane", "🍒 Cerise"]

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  )
}
```
````

::right::

<div v-click="1">

**Ce que fait `map()`**

Pour chaque élément du tableau, vous retournez du JSX.  
React reçoit un **tableau de JSX** et l'affiche.

**Avant** — tableau de strings

`["🍎 Pomme", "🍌 Banane", "🍒 Cerise"]`

**Après** — rendu HTML

<ul>
  <li>🍎 Pomme</li>
  <li>🍌 Banane</li>
  <li>🍒 Cerise</li>
</ul>

</div>

::bottom::

<!--
Montrer d'abord le problème du code répétitif — les apprenants ont déjà vu ça en S3.
Insister : map() retourne un nouveau tableau, il ne modifie pas le tableau original.
La flèche dans map() doit retourner (return implicite avec parenthèses, ou return explicite).
Pièges : oublier les parenthèses autour du JSX multi-lignes dans l'arrow function.
-->
