---
layout: two-cols-header
layoutClass: gap-x-4
---

# useRef <small>(🪝 Hook React)</small>

Une valeur qui survit sans provoquer de re-rendu

::left::

````md magic-move
```tsx
// ❌ useState provoque un re-rendu à chaque incrémentation
function ClickCounter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1) // re-rendu à chaque clic
    console.log('Rendu déclenché')
  }

  return <button onClick={handleClick}>Cliquer</button>
}
```

```tsx
// ✅ useRef garde la valeur sans re-rendu
import { useRef } from 'react'

function ClickCounter() {
  const countRef = useRef(0)

  function handleClick() {
    countRef.current = countRef.current + 1 // pas de re-rendu
    console.log('Total clics :', countRef.current)
  }

  return <button onClick={handleClick}>Cliquer</button>
}
```
````

::right::

<v-click>

```tsx
const countRef = useRef(0)
//                       ^valeur initiale

countRef.current // lecture et écriture
```

</v-click>

<v-click>

**useState vs useRef**

- `useState` → change la valeur **provoque** un re-rendu
- `useRef` → change la valeur **ne provoque pas** de re-rendu

</v-click>

<!--
Ce contre-exemple est volontairement abstrait (compteur de clics invisible) pour bien isoler la différence de comportement avant d'introduire le vrai cas d'usage : accéder au DOM.
Piège à anticiper : un apprenant voudra afficher countRef.current dans le JSX en pensant que ça se mettra à jour — expliquer que non, puisque rien ne déclenche de re-rendu.
-->
