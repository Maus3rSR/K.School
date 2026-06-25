---
layout: two-cols-header
layoutClass: gap-x-4
---

# Le state est un snapshot

La valeur est figée pendant un rendu

::left::

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  function handleTripleClick() {
    setCount(count + 1)  // count = 0
    setCount(count + 1)  // count = 0 encore !
    setCount(count + 1)  // count = 0 encore !
    // résultat attendu : 3 — résultat réel : 1
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleTripleClick}>+3 ?</button>
    </div>
  )
}
```

::right::

**Pourquoi ?**

<v-click>

Pendant un rendu, `count` est une constante — sa valeur est **figée au moment où la fonction s'exécute**.

Appeler `setCount(count + 1)` trois fois revient à appeler `setCount(0 + 1)` trois fois.

</v-click>

<v-click>

**La solution : la forme fonctionnelle**

```tsx
function handleTripleClick() {
  setCount(prev => prev + 1)  // prev = 0 → 1
  setCount(prev => prev + 1)  // prev = 1 → 2
  setCount(prev => prev + 1)  // prev = 2 → 3
}
```

`prev` reçoit la **valeur la plus récente**, même dans le même handler.

</v-click>

<!--
Faire tester le code Monaco en live : cliquer "+3 ?" → le compteur monte de 1, pas de 3.
Ce comportement est une source fréquente de bugs — le voir en pratique marque bien plus qu'une explication.
La forme fonctionnelle sera réutilisée en S5 pour les tableaux (map, filter).
-->
