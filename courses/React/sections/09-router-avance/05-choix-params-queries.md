---
layout: two-cols-header
layoutClass: gap-x-4
---

# Params ou query string ?

Comment choisir

::left::

**Identifier une ressource**

- L'URL cible un objet précis
- Le paramètre fait partie du chemin
- Exemple : `/products/42`

```tsx
const { id } = useParams<{ id: string }>()
```

::right::

**Filtrer, trier, configurer**

- L'URL précise l'affichage sans changer de page
- Les options viennent après le `?`
- Exemple : `/products?category=shoes`

```tsx
const [searchParams] = useSearchParams()
const category = searchParams.get('category')
```

::bottom::

<v-click>

**Les deux peuvent coexister**

```text
/products/42?source=newsletter
```

- `useParams` peut lire `42`
- `useSearchParams` peut lire `source`

</v-click>

<!--
Faire un exemple concret : page produit + tracking de campagne marketing. /products/42 est la ressource, ?source=newsletter est l'option.
-->
