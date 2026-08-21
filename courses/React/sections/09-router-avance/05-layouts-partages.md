---
layout: two-cols-header
layoutClass: gap-x-4
---

# Layouts partagés

Une même structure pour plusieurs pages

::left::

```tsx {all|11|all}
function MainLayout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/products">Produits</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </header>
      <Outlet />
      <footer>Mon application</footer>
    </>
  )
}
```

::right::

<div v-click="1">

`<Outlet />` marque l'emplacement où le contenu des pages imbriquées s'insère.

</div>

<div v-click="2">

Enveloppez toutes les routes dans un seul layout : le menu et le footer apparaissent partout, sans les recopier dans chaque composant.

```tsx
<Route path="/" element={<MainLayout />}>
  <Route path="" element={<Home />} />
  <Route path="products" element={<ProductList />} />
  <Route path="products/:id" element={<ProductDetail />} />
</Route>
```

</div>

<!--
C'est l'application concrète de Outlet. Le layout permet de ne pas dupliquer le header/footer.
Faire remarquer que path="" (ou "") est la route index pour le chemin parent.
-->
