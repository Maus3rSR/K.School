---
layout: two-cols-header
layoutClass: gap-x-4
---

# useParams typé

Lire la valeur présente dans l'URL

::left::

```tsx {all|1,4|7|9-11|13|all}
import { useParams } from 'react-router-dom'

interface Product {
  id: number
  name: string
}

function ProductDetail() {
  const params = useParams()
  const id = Number(params.id)

  const product = products.find((p) => p.id === id)

  return <h1>Détail de {product?.name}</h1>
}
```

::right::

<div v-click="1">

`useParams()` renvoie un objet `{ id: '7' }` lorsque l'URL est `/products/7`.

</div>

<div v-click="2">

**Tout est `string` !** `:id` arrive sous forme de texte, donc `Number()` convertit la valeur si vous voulez un nombre.

</div>

<div v-click="3">

Typage explicite (optionnel mais recommandé) :

```tsx
const { id } = useParams<{ id: string }>()
```

</div>

<!--
Piège à anticiper : params.id est une string. Beaucoup d'apprenants comparent p.id === params.id sans conversion et ne comprennent pas pourquoi ça ne marche pas.
Faire noter que useParams n'est utilisable que dans un composant affiché par une Route dynamique.
-->
