---
layout: two-cols-header
layoutClass: gap-x-4
---

# useRef pour accéder au DOM

Le problème du focus automatique, enfin résolu

::left::

```tsx {none|1|3|5-7|9|all}
import { useRef, useEffect } from 'react'

function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return <input ref={inputRef} />
}
```

::right::

<div v-click="1">

`useRef<HTMLInputElement>(null)` — typé avec l'élément DOM ciblé, valeur initiale `null`

</div>

<div v-click="2">

`ref={inputRef}` — React remplit `inputRef.current` avec le vrai élément `<input>` après le montage

</div>

<div v-click="3">

Dans `useEffect`, `inputRef.current` **existe déjà** → on peut appeler `.focus()` dessus

</div>

<div v-click="4">

`?.` — au cas où `current` serait encore `null` (sécurité de typage)

</div>

<!--
Boucler explicitement sur l'accroche de début de séance : "voici enfin la réponse au problème du focus automatique".
Insister sur l'ordre : le ref est rempli APRÈS le rendu, donc useEffect (qui s'exécute aussi après le rendu) est le seul endroit fiable pour l'utiliser.
Autres cas d'usage à mentionner rapidement : scroll vers un élément, mesurer une taille avec getBoundingClientRect().
-->
