---
layout: two-cols-header
layoutClass: gap-x-4
---

# Des données en dur — jusqu'à quand ?

Ce que vous savez déjà faire, et ce qui manque

::left::

```tsx
function PostList() {
  // 🙄 Toujours les 3 mêmes posts, écrits à la main
  const posts = [
    { id: 1, title: 'Premier post' },
    { id: 2, title: 'Deuxième post' },
    { id: 3, title: 'Troisième post' },
  ]

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

::right::

**Ce que vous maîtrisez**

- `map()` pour afficher une liste (S5)
- `useEffect` au montage d'un composant (S6)
- Rendu conditionnel (S5)

::bottom::

<v-click>

**Ce qui manque**

- Aller chercher les données sur un **vrai serveur**
- Afficher un message pendant que ça charge
- Gérer le cas où **ça échoue**

</v-click>

<!--
Reprendre le teaser de S6 : "et si on allait chercher de vraies données sur Internet ?"
Le tableau posts en dur est volontairement identique en structure à ce qu'on va récupérer via l'API JSONPlaceholder — pour montrer que la partie affichage (map/key) ne change pas du tout.
-->
