---
layout: two-cols-header
layoutClass: gap-x-4
---

# Page de détail complète

Relier le paramètre d'URL à des données

::left::

```tsx {all|1-4|6|7,10-12|8,9|13-15|all}
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetch(`https://api.example.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [id])

  if (!product) return <p>Chargement...</p>

  return <h1>{product.name}</h1>
}
```

::right::

<div v-click="1">

1. `useParams` récupère l'ID depuis l'URL
2. `useEffect` recharge les données quand l'ID change
3. Vous affichez le détail de l'élément

</div>

<div v-click="2">

**Point d'attention** : `[id]` dans les dépendances est crucial. Sans lui, le composant ne se met pas à jour si vous changez d'ID sans quitter la page.

</div>

<!--
Connexion avec S7 (appel API) et S8 (Router). C'est le moment où tout s'assemble.
Faire noter que product peut être null au premier rendu, d'où le garde-fou `if (!product)`.
-->
