---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice guidé — Compteur

À vous de jouer

::left::

```tsx {monaco}
import { useState } from 'react'

function Counter() {
  // 1. Déclarer le state ici

  return (
    <div>
      <p>Compteur : {/* afficher le state */}</p>
      <button>−</button>
      <button>Reset</button>
      <button>+</button>
    </div>
  )
}
```

::right::

**À faire ensemble**

<v-clicks>

1. Déclarer `const [count, setCount] = useState<number>(0)`
2. Afficher `{count}` dans le `<p>`
3. Brancher `onClick` sur chaque bouton
4. Vérifier : clic `+` → l'affichage monte

</v-clicks>

<v-click>

**Solution**

```tsx
<button onClick={() => setCount(count - 1)}>−</button>
<button onClick={() => setCount(0)}>Reset</button>
<button onClick={() => setCount(count + 1)}>+</button>
```

**Défi** : limiter entre 0 et 10 avec `Math.max` / `Math.min`

</v-click>

<!--
Laisser 5-7 minutes de pratique avant de révéler la solution.
Étapes à guider si blocage : "Qu'est-ce que useState retourne ?" → [valeur, setter].
Le défi Math.max / Math.min montre qu'on peut mettre de la logique dans le setter sans créer de handler nommé.
-->
