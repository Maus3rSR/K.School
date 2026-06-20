---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice guidé — Compteur

Mettre en pratique useState et les événements

::left::

```tsx {monaco}
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <div>
      <p>Compteur : {count}</p>
      <button onClick={() => setCount(count - 1)}>−</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

::right::

**À faire ensemble**

<v-clicks>

1. Observer le state initial `0`
2. Cliquer `+` → `count` passe à `1`, l'affichage change
3. Cliquer `−` → descend jusqu'à un minimum ?
4. Cliquer `Reset` → revient à `0`

</v-clicks>

<v-click>

**Défi : ajouter des limites**

```tsx
// Ne pas descendre en dessous de 0
onClick={() => setCount(Math.max(0, count - 1))}

// Ne pas dépasser 10
onClick={() => setCount(Math.min(10, count + 1))}
```

</v-click>

<!--
Faire coder ce composant de zéro avec les apprenants avant de montrer la solution.
Étapes suggérées : 1) déclarer le state, 2) afficher count, 3) brancher les boutons.
Le défi Math.max / Math.min montre qu'on peut mettre de la logique dans le setter.
-->
