---
layout: two-cols-header
layoutClass: gap-x-4
---

# Routes imbriquées

Partager un squelette de page

::left::

```tsx
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div>
      <nav>Menu admin</nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
```

::right::

Déclarez les routes à l'intérieur de la route parent :

```tsx
<Route path="admin" element={<AdminLayout />}>
  <Route path="users" element={<Users />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

::bottom::

<div v-click>

`/admin/users` affiche `<AdminLayout>` avec `<Users>` à la place de `<Outlet>`. Le menu `admin` reste présent sur **toutes** les sous-pages.

</div>

<!--
Concept clé : Outlet est un point d'insertion. Comparer à un emplacement réservé dans un formulaire.
Montrer visuellement que la barre de navigation reste fixe pendant que le contenu change.
-->
