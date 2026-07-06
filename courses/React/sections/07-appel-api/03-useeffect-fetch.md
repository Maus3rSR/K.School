---
layout: two-cols-header
layoutClass: gap-x-4
---

# useEffect pour charger des données

Le fetch a besoin d'un déclencheur

::left::

```tsx {none|1|3-5|7-9|all}
interface Post {
  id: number
  title: string
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data: Post[]) => setPosts(data))
  }, [])

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

<div v-click="1">

`useState<Post[]>([])` — un tableau vide au départ, en attendant la réponse

</div>

<div v-click="2">

`useEffect(..., [])` — exécuter le fetch **une seule fois**, au montage (S6)

</div>

<div v-click="3">

`setPosts(data)` met à jour le state → **re-rendu** avec les vraies données, `map()` fait le reste (S5)

</div>

<!--
Ce slide est la synthèse concrète de S5 + S6 : rendu conditionnel/listes + useEffect au montage, appliqués à un vrai cas d'usage.
Faire tourner en live et montrer le "flash" : liste vide au premier rendu, puis remplie après la réponse réseau — transition naturelle vers le prochain concept (état de chargement).
-->
