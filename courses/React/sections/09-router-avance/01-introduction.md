---
layout: two-cols-header
layoutClass: gap-x-4
---

# Un besoin : la page de détail

Comment afficher le détail de n'importe quel produit ?

::left::

Vous voulez une page pour chaque produit :

```tsx
<Route path="/products/1" element={<ProductDetail />} />
<Route path="/products/2" element={<ProductDetail />} />
<Route path="/products/3" element={<ProductDetail />} />
// ... et pour les 500 autres produits ?
```

<v-click>

Impossible d'écrire une `Route` produit par produit !

</v-click>

::right::

**Le besoin**

Une seule `Route` doit accepter n'importe quel identifiant :

- `/products/7`
- `/products/42`
- `/products/103`

::bottom::

<v-click>

**React Router** répond à ce besoin avec les **routes dynamiques** : une partie de l'URL devient variable.

</v-click>

<!--
Contexte : vous maîtrisez déjà la création d'une liste (S5) et la navigation entre pages fixes (S8), où chaque page a sa propre Route écrite à la main.
Le déclic à provoquer : "et si vous avez 500 produits, vous écrivez 500 Route ?" Cette question amène naturellement au besoin d'un segment variable dans l'URL.
-->
