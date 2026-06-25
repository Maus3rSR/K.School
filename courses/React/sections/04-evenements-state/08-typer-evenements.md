---
layout: two-cols-header
layoutClass: gap-x-4
---

# Typer les événements

TypeScript veut connaître la nature de l'événement

::left::

**Clic sur un bouton**

```tsx {all|2|all}
function Button() {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log("Position :", e.clientX, e.clientY)
  }

  return <button onClick={handleClick}>Clic</button>
}
```

<v-click at="2">

**Saisie dans un champ**

```tsx {all|2|all}
function Input() {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("Valeur :", e.target.value)
  }

  return <input onChange={handleChange} />
}
```

</v-click>

::right::

**Mémo des types**

<v-click at="1">

| Événement | Type TypeScript |
|-----------|-----------------|
| `onClick` sur `<button>` | `React.MouseEvent<HTMLButtonElement>` |
| `onChange` sur `<input>` | `React.ChangeEvent<HTMLInputElement>` |
| `onSubmit` sur `<form>` | `React.FormEvent<HTMLFormElement>` |
| `onChange` sur `<select>` | `React.ChangeEvent<HTMLSelectElement>` |

</v-click>

<div v-click="3">

> 💡 **Astuce** : laissez l'IDE inférer le type via l'autocomplétion.  
> Survolez le `e` pour voir le type suggéré.

</div>

<!--
Montrer l'autocomplétion en live dans l'éditeur : taper `e.` après avoir typé l'événement.
L'IDE propose clientX, target, preventDefault... → concret et utile.
e.target.value est la propriété la plus utilisée en formulaire — à bien mémoriser.
-->
