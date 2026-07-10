---
layout: two-cols-header
layoutClass: gap-x-4
---

# useEffect <small>(🪝 Hook React) — Synchroniser avec un système extérieur</small>

Exécuter du code après le rendu, une fois l'écran mis à jour

::left::

````md magic-move
```tsx
// ❌ Effet de bord pendant le rendu — interdit
// Le rendu doit rester un calcul pur.
function PageTitle({ title }: { title: string }) {
  document.title = title // sans contrôle, à chaque rendu

  return <h1>{title}</h1>
}
```

```tsx
// ✅ useEffect — exécuté après le rendu
// On synchronise le composant avec le navigateur.
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

::bottom::

<v-click>

**Les 3 cas du tableau de dépendances**

- `[]` → l'Effet s'exécute **une seule fois**, au montage
- **pas de tableau** → l'Effet s'exécute **à chaque rendu**
- `[dep]` → l'Effet s'exécute au montage **et** quand `dep` change

</v-click>

<!--
D'après la doc React : les Effets permettent d'exécuter du code après le rendu
pour synchroniser le composant avec un système extérieur (navigateur, réseau, widget tiers…).
Le rendu doit rester pur : pas d'effets de bord pendant le calcul du JSX.
useEffect « retarde » le code jusqu'à ce que le rendu se reflète à l'écran.

Explication du code sans useEffect :
1. Le rendu n'est plus pur : le rendu doit être un calcul (props + state → JSX).
   Modifier le DOM ou une API externe pendant ce calcul casse la prévisibilité.
2. Le code s'exécute à chaque rendu, même si title n'a pas changé → réécritures inutiles.
3. Pendant le rendu, le DOM n'est pas encore mis à jour : on n'y touche pas.
4. Risque de boucles / exécutions multiples : StrictMode et le rendu concurrent
   peuvent exécuter le rendu plusieurs fois.
5. useEffect décale l'exécution après le rendu et le tableau de dépendances [title]
   contrôle quand le code se relance.

Les 3 cas de dépendances sont LE point de confusion n°1 de toute la séance : les faire reformuler à voix haute par un apprenant avant de continuer.
Ne pas encore parler de cleanup ici — un concept à la fois.
-->
