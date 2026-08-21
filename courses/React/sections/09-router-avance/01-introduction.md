---
layout: two-cols-header
layoutClass: gap-x-4
---

# Des pages pour chaque élément

Comment afficher une page de détail avec une URL propre ?

::left::

Imaginons une liste de produits :

```tsx
<ul>
  {products.map((product) => (
    <li key={product.id}>
      {product.name}
    </li>
  ))}
</ul>
```

<v-click>

Quand vous cliquez sur un produit, vous voulez arriver sur `/products/7`.

</v-click>

::right::

**Pourquoi une URL propre ?**

- Vous pouvez copier-coller le lien d'un produit
- Le bouton **Précédent** fonctionne
- Le favori mène directement au bon contenu

<v-click>

**React Router** crée des routes dynamiques avec `useParams` pour lire la valeur dans l'URL.

</v-click>

<!--
Contexte : les apprenants savent déjà créer une liste (S5) et naviguer entre pages fixes (S8). Le besoin naturel est d'aller voir le détail d'un élément.
Faire ressentir le besoin : "si je veux partager le lien du produit 7, quelle URL est la plus propre ?"
-->
