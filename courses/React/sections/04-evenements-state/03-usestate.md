---
layout: two-cols-header
layoutClass: gap-x-4
---

# useState <small>(🪝 Hook React)</small>

La mémoire d'un composant

::left::

````md magic-move
```tsx
// ❌ Variable locale — ne déclenche pas de rendu
function Counter() {
  let count = 0

  function handleClick() {
    count = count + 1
  }

  return <button onClick={handleClick}>{count}</button>
}
```

```tsx
// ✅ useState — React sait qu'il faut mettre à jour
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return <button onClick={handleClick}>{count}</button>
}
```
````

::right::

**Anatomie de useState**

<v-click>

```tsx
const [count, setCount] = useState(0)
//     ^        ^                  ^
//     valeur   setter             valeur initiale
```

- `count` — la valeur actuelle (**lecture**)
- `setCount` — la fonction pour la modifier (**écriture**)
- `0` — la valeur au premier rendu

</v-click>

<v-click>

**Convention de nommage**

```tsx
const [name,    setName]    = useState("")
const [isOpen,  setIsOpen]  = useState(false)
const [score,   setScore]   = useState(0)
//      état    setter
```

</v-click>

<!--
La déstructuration du tableau [valeur, setter] peut surprendre — rappeler que c'est la même syntaxe que const [a, b] = [1, 2].
Insister sur la convention setXxx : React n'impose pas le nom mais c'est une norme de l'écosystème.
Le magic-move montre visuellement la transformation du code : avant → après.
-->
