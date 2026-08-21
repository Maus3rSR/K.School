---
layout: two-cols-header
layoutClass: gap-x-4
---

# Routes dynamiques

Les deux-points créent un segment variable

::left::

```tsx {all|1|5,9|6,8|7|all}
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
```

::right::

<div v-click="1">

`/products/:id` signifie : n'importe quel ID après `/products/`.

Exemples :
- `/products/7` fonctionne
- `/products/42` fonctionne
- `/products` passe par l'autre Route

</div>

<div v-click="2">

La partie `:id` est un **paramètre d'URL**. Vous la nommez comme vous voulez : `:slug`, `:userId`, `:category`.

</div>

<!--
Ordre de présentation : montrez d'abord la syntaxe, puis montrez des exemples concrets d'URL qui matchent. Laissez le moment d'écrire :id vous-même.
Attention : l'ordre des Route compte, mais Routes retient la première correspondance. Placez les routes les plus spécifiques avant les génériques si nécessaire.
-->
