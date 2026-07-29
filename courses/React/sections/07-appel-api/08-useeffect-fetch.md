---
layout: two-cols-header
layoutClass: gap-x-4
---

# useEffect pour charger des données

Le fetch a besoin d'un déclencheur

::left::

```tsx {all|9-16|all}{maxHeight:'400px'}
interface Post {
  id: number
  title: string
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function loadPosts() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data: Post[] = await res.json()
      setPosts(data)
    }
    loadPosts()
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

`useEffect(..., [])` — exécuter le chargement **une seule fois**, au montage

Le callback de `useEffect` **ne peut pas être `async` directement** — on déclare une fonction `async` à l'intérieur, puis on l'appelle immédiatement

</div>

<!--
Ce slide est la synthèse concrète de S5 + S6 : rendu conditionnel/listes + useEffect au montage, appliqués à un vrai cas d'usage.
Le point 3 (async interdit directement sur le callback de useEffect) est LE piège central de cette adaptation à React — bien le nommer explicitement, il sera repris dans la slide des pièges fréquents.
Pourquoi cette limite existe : useEffect attend soit rien (undefined), soit une fonction de nettoyage — jamais une Promise. Une fonction async renvoie toujours une Promise, ce qui casserait ce contrat.
Faire tourner en live et montrer le "flash" : liste vide au premier rendu, puis remplie après la réponse réseau — transition naturelle vers le prochain concept (état de chargement).
-->
