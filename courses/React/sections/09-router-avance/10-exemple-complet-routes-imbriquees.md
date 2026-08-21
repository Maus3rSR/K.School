---
layout: two-cols-header
layoutClass: gap-x-4
---

# Routes imbriquées : un exemple complet

Index, layouts et routes dynamiques dans une seule déclaration

::left::

```tsx
<Routes>
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />

  <Route element={<AuthLayout />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>

  <Route path="concerts">
    <Route index element={<ConcertsHome />} />
    <Route path=":city" element={<City />} />
    <Route path="trending" element={<Trending />} />
  </Route>
</Routes>
```

::right::

<div v-click>

**Trois motifs réunis**

- `index` affiche une page sans segment supplémentaire (`/`, `/concerts`).
- `element={<AuthLayout />}` sans `path` partage un layout autour de plusieurs routes (`/login`, `/register`).
- `:city` capture un paramètre d'URL dynamique (`/concerts/paris`).

</div>

::bottom::

<div v-click class="text-xs">

**URL correspondantes**

<div class="grid grid-cols-2 gap-x-4">

<div>

- `/` → `<Home />`
- `/concerts` → `<ConcertsHome />`

</div>

<div>

- `/concerts/paris` → `<City />` avec `{ city: 'paris' }`
- `/login` → `<AuthLayout />` + `<Login />`

</div>

</div>

</div>

<!--
Faire remarquer que chaque Route a un rôle précis : index, layout ou segment dynamique. Insister sur le fait que le layout sans path est un bloc réutilisable pour plusieurs pages.
-->
