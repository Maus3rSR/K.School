---
layout: two-cols-header
layoutClass: gap-x-4
---

# BrowserRouter, Routes et Route

Les trois briques de la navigation

::left::

```tsx {none|1,4|6-8|all}
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
```

::right::

<div v-click="1">

`BrowserRouter` enveloppe toute l'application et synchronise l'URL.

</div>

<div v-click="2">

`Routes` regroupe les routes et ne retient qu'une seule correspondance.

</div>

<div v-click="3">

`Route` associe un `path` à un `element` : si l'URL correspond, le composant s'affiche.

</div>

<!--
Ordre de présentation : d'abord le conteneur (BrowserRouter), puis le sélecteur (Routes), enfin les règles (Route).
Insister : BrowserRouter est unique, souvent placé autour de <App /> ou directement dans App.
-->
