---
layout: two-cols-header
layoutClass: gap-x-4
---

# Typer les événements

TypeScript veut connaître la nature de l'événement

::left::

**Saisie dans un champ**

```tsx {all|8|all}
function Input() {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    console.log("Valeur :", e.target.value)
  }

  return <input onChange={handleChange} />
}
```

<div v-click="3">

> 💡 **Astuce** : laissez l'IDE inférer le type via l'autocomplétion.  
> Survolez le `e` pour voir le type suggéré.

</div>

::right::

**Mémo des types**

<v-click at="1">

<div class="text-sm">

| Événement | Type TypeScript |
|-----------|-----------------|
| `onClick` sur `<button>` | `React.MouseEvent<HTMLButtonElement>` |
| `onChange` sur `<input>` | `React.ChangeEvent<HTMLInputElement>` |
| `onSubmit` sur `<form>` | `React.FormEvent<HTMLFormElement>` |
| `onChange` sur `<select>` | `React.ChangeEvent<HTMLSelectElement>` |

</div>

</v-click>

<!--
Montrer l'autocomplétion en live dans l'éditeur : taper `e.` après avoir typé l'événement.
L'IDE propose clientX, target, preventDefault... → concret et utile.
e.target.value est la propriété la plus utilisée en formulaire — à bien mémoriser.
-->
