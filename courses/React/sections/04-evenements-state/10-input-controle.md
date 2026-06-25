---
layout: two-cols-header
layoutClass: gap-x-4
---

# Input contrôlé

Lier un champ de texte au state

::left::

````md magic-move
```tsx
// ❌ Input non contrôlé — React ne connaît pas la valeur
function Search() {
  return <input type="text" placeholder="Rechercher..." />
}
```

```tsx
// Étape 1 : on ajoute un state pour stocker la valeur
import { useState } from 'react'

function Search() {
  const [query, setQuery] = useState<string>("")

  return <input type="text" placeholder="Rechercher..." />
}
```

```tsx
// Étape 2 : on crée le handler qui met à jour le state
import { useState } from 'react'

function Search() {
  const [query, setQuery] = useState<string>("")

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setQuery(e.target.value)
  }

  return <input type="text" placeholder="Rechercher..." />
}
```

```tsx
// ✅ Étape 3 : on lie l'input au state via value + onChange
import { useState } from 'react'

function Search() {
  const [query, setQuery] = useState<string>("")

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setQuery(e.target.value)
  }

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Rechercher..."
      />
      <p>Vous tapez : {query}</p>
    </>
  )
}
```
````

::right::

**Non contrôlé** : React ne connaît pas la valeur — impossible de la lire ou de la valider.

<v-click>

**Contrôlé** :

- `value={query}` — React dicte ce qui s'affiche
- `onChange={handleChange}` — chaque frappe met à jour le state

</v-click>

<v-click>

**Comment ça marche**

```
Utilisateur tape "R"
       ↓
onChange déclenché → setQuery("R")
       ↓
Re-rendu : <input value="R" /> affiché
```

</v-click>

<!--
Montrer la différence live : un input avec value= vs sans value=.
La prop value + onChange est le duo indispensable d'un input contrôlé — on n'en met pas un sans l'autre.
e.target.value est la valeur saisie à l'instant t : bien l'expliquer.
-->
