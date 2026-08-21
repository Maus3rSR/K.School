---
layout: two-cols-header
layoutClass: gap-x-4
---

# Page de détail complète

Relier le paramètre d'URL à des données

::left::

```tsx {all|5|8-12|all}
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

`useParams<{ id: string }>()` récupère l'ID depuis l'URL.

</div>

<div v-click="2">

`useEffect` recharge les données à chaque changement d'`id`. N'oubliez pas `[id]` dans les dépendances : sans lui, le composant ne se met pas à jour si vous changez d'URL sans quitter la page.

</div>

<div v-click="3">

Enfin, vous gérez le chargement (`if (!product)`) puis affichez le détail.

</div>

<!--
Connexion avec S7 (appel API) et S8 (Router). C'est le moment où tout s'assemble.
Faire noter que product peut être null au premier rendu, d'où le garde-fou `if (!product)`.
-->
