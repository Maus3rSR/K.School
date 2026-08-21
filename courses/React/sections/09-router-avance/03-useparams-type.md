---
layout: two-cols-header
layoutClass: gap-x-4
---

# useParams typé

Lire la valeur présente dans l'URL

::left::

```tsx {all|9|10-12|all}
import { useParams } from 'react-router-dom'

interface Product {
  id: number
  name: string
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const numericId = Number(id)

  const product = products.find((p) => p.id === numericId)

  return <h1>Détail de {product?.name}</h1>
}
```

::right::

<div v-click="1">

`useParams<{ id: string }>()` lit l'URL et indique que `id` est une `string`.

Pour `/products/7`, vous obtenez `{ id: '7' }`.

</div>

<div v-click="2">

**Tout est `string` !** Si votre modèle attend un nombre, convertissez avec `Number(id)` avant de comparer, puis recherchez le produit correspondant.

</div>

<div v-click="3">

Sans typage explicite, `params.id` est `string | undefined`. Le generic aide TypeScript à vous prévenir si vous oubliez le nom du paramètre.

</div>

<!--
Piège à anticiper : id est une string. Beaucoup d'apprenants comparent p.id === id sans conversion et ne comprennent pas pourquoi ça ne marche pas.
Faire noter que useParams n'est utilisable que dans un composant affiché par une Route dynamique.
-->
