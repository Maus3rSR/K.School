---
layout: two-cols-header
layoutClass: gap-x-4
---

# `if` avant le `return` <small>_(early return)_</small>

Le pattern le plus lisible pour des branches complexes

::left::

````md magic-move
```tsx
// 🔴 AVANT — tout dans le return
function Greeting({ isLogged }: { isLogged: boolean }) {
  return (
    <div>
      { isLogged ? <p>Bonjour 👋</p> : <p>Veuillez vous connecter</p> }
    </div>
  )
}
```

```tsx
// 🟢 APRÈS — if classique avant le return
function Greeting({ isLogged }: { isLogged: boolean }) {
  if (!isLogged) {
    return <p>Veuillez vous connecter</p>
  }

  return (
    <div>
      <p>Bonjour 👋</p>
    </div>
  )
}
```
````

::right::

<div v-click="1">

**Quand utiliser ce pattern ?**

- La logique de la condition est **complexe**
- Les deux branches ont **beaucoup de JSX** différent
- Retourner `null` pour ne rien afficher du tout

</div>

::bottom::

<div v-click="2">

**Retourner `null` = ne rien afficher**

```tsx
function Alert({ message }: { message: string | null }) {
  if (!message) return null

  return <div className="alert">{message}</div>
}
```

</div>

<!--
"Early return" : pattern très courant en React pour les cas de chargement, d'erreur, ou d'accès restreint.
Montrer que null ne génère pas d'erreur et ne laisse pas de nœud vide dans le DOM.
Limites : si la condition est simple (un seul niveau), le ternaire ou && sera plus concis.
-->
