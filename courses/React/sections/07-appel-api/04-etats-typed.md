---
layout: two-cols-header
layoutClass: gap-x-4
---

# Loading, error, data — les 3 états

Toute requête réseau passe par ces 3 états

::left::

```tsx {none|7-9|11-17|19-25|all}
interface Post {
  id: number
  title: string
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data: Post[]) => setPosts(data))
      .catch(() => setError('Impossible de charger les posts'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <p>Chargement...</p>
  if (error) return <p>❌ {error}</p>
  return (
    <ul>
      {posts.map((post) => <li key={post.id}>{post.title}</li>)}
    </ul>
  )
}
```

::right::

<div v-click="1">

`posts`, `isLoading`, `error` — les 3 états typés, initialisés avant toute réponse

</div>

<div v-click="2">

Le `useEffect` remplit ces états : `setPosts` en cas de succès, `setError` en cas d'échec, `setIsLoading(false)` dans tous les cas via `finally`

</div>

<div v-click="3">

Rendu conditionnel (S5) : un seul de ces 3 cas s'affiche à la fois — jamais deux en même temps

</div>

<!--
Insister sur l'ordre des if : loading d'abord, error ensuite, données en dernier — cet ordre garantit qu'on ne peut pas afficher "Chargement..." ET les données en même temps.
.finally() est présenté ici sans être un nouveau concept central — juste "s'exécute dans tous les cas, succès ou échec".
Le typage error: string | null anticipe le prochain concept (gestion des erreurs).
-->
