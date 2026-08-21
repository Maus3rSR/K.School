---
layout: two-cols-header
layoutClass: gap-x-4
---

# Pièges classiques

Erreurs à éviter avec les routes dynamiques

::left::

<v-click>

**Oublier que `useParams` renvoie des strings**

```tsx
// ❌ id est une string, la comparaison échoue
const product = products.find((p) => p.id === params.id)

// ✅ Convertir en number avant de comparer
const product = products.find((p) => p.id === Number(params.id))
```

</v-click>

<v-click>

**Appeler `useParams` hors d'une Route**

```tsx
// ❌ useParams renvoie {} si le composant n'est pas dans une Route
function RandomComponent() {
  const { id } = useParams()
}
```

</v-click>

::right::

<v-click>

**Oublier le `Outlet` dans un layout**

```tsx
// ❌ Les routes imbriquées n'ont nulle part où s'afficher
function Layout() {
  return <div>Contenu du layout</div>
}
```

</v-click>

<v-click>

**Confondre `navigate` et un appel à `setState`**

```tsx
// ❌ Cela ne change pas l'URL
setPage('/dashboard')

// ✅ Cela navigue vers /dashboard
const navigate = useNavigate()
navigate('/dashboard')
```

</v-click>

<!--
Ces pièges sont fréquents en entreprise. Faire un tour rapide : lequel vous semble le plus probable ?
-->
