---
layout: two-cols-header
layoutClass: gap-x-4
---

# useEffect <small>(🪝 Hook React)</small>

Exécuter du code en dehors du rendu

::left::

````md magic-move
```tsx
// ❌ Effet de bord pendant le rendu — interdit
function PageTitle({ title }: { title: string }) {
  document.title = title // s'exécute à chaque rendu, sans contrôle

  return <h1>{title}</h1>
}
```

```tsx
// ✅ useEffect — s'exécute après le rendu
import { useEffect } from 'react'

function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title
  }, [title])

  return <h1>{title}</h1>
}
```
````

::right::

<v-click>

```tsx
useEffect(() => {
  // le code de l'Effet
}, [dep1, dep2])
//  ^tableau de dépendances
```

</v-click>

<v-click>

**Les 3 cas du tableau de dépendances**

- `[]` → l'Effet s'exécute **une seule fois**, au montage
- **pas de tableau** → l'Effet s'exécute **à chaque rendu**
- `[dep]` → l'Effet s'exécute au montage **et** quand `dep` change

</v-click>

<!--
Le magic-move montre la différence entre "s'exécute pendant le rendu" (interdit, imprévisible) et "s'exécute après le rendu" (useEffect).
Les 3 cas de dépendances sont LE point de confusion n°1 de toute la séance : les faire reformuler à voix haute par un apprenant avant de continuer.
Ne pas encore parler de cleanup ici — un concept à la fois.
-->
