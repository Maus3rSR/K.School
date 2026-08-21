---
layout: two-cols-header
layoutClass: gap-x-4
---

# useSearchParams

Lire et modifier la query string

::left::

```tsx {all|4|6|10|all}
import { useSearchParams } from 'react-router-dom'

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category')

  return (
    <div>
      <button onClick={() => setSearchParams({ category: 'shoes' })}>
        Chaussures
      </button>
      {category && <p>Catégorie : {category}</p>}
    </div>
  )
}
```

::right::

<div v-click="1">

`useSearchParams()` retourne un tableau `[searchParams, setSearchParams]`.

</div>

<div v-click="2">

`searchParams.get('category')` lit la valeur de `?category=...` dans l'URL.

</div>

<div v-click="3">

`setSearchParams({ category: 'shoes' })` met à jour l'URL en ajoutant ou remplaçant les paramètres de recherche.

</div>

<!--
Exemple concret : un filtre de catégorie. Montrer que l'URL passe de /products à /products?category=shoes sans changer de route.
Faire attention : get() retourne string | null.
-->
