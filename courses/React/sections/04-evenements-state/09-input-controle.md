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
// ✅ Input contrôlé — React pilote la valeur
import { useState } from 'react'

function Search() {
  const [query, setQuery] = useState<string>("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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

**Comment ça marche**

<v-click>

```
Utilisateur tape "R"
       ↓
onChange déclenché
       ↓
setQuery("R")
       ↓
Re-rendu avec query = "R"
       ↓
<input value="R" /> affiché
```

</v-click>

<v-click>

**Pourquoi "contrôlé" ?**

React **contrôle** la valeur affichée via `value={query}`.  
Sans `value`, l'input gère sa propre valeur en interne (non contrôlé).

</v-click>

<!--
Montrer la différence live : un input avec value= vs sans value=.
La prop value + onChange est le duo indispensable d'un input contrôlé — on n'en met pas un sans l'autre.
e.target.value est la valeur saisie à l'instant t : bien l'expliquer.
-->
