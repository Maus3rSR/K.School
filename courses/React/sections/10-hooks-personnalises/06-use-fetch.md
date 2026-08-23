---
layout: two-cols-header
layoutClass: gap-x-4
---

# useFetch — extraire le pattern de S7

::left::

```tsx {*}{maxHeight:'350px'}
function PostList() {
  const [posts, setPosts] =
    useState<Post[]>([])
  const [isLoading, setIsLoading] =
    useState(true)
  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch('/posts')
        setPosts(await res.json())
      } catch {
        setError('Erreur chargement')
      } finally {
        setIsLoading(false)
      }
    }
    loadPosts()
  }, [])

  if (isLoading) return <p>Chargement...</p>
  if (error) return <p>{error}</p>
  return (
    <ul>
      {posts.map(
        (p) => <li key={p.id}>{p.title}</li>
      )}
    </ul>
  )
}
```

::right::

```tsx {*}{maxHeight:'350px'}
function PostList() {
  const { data: posts, isLoading, error } =
    useFetch<Post[]>('/posts')

  // Affichage...
}

function useFetch<T>(url: string) {
  const [data, setData] =
    useState<T | null>(null)
  const [isLoading, setIsLoading] =
    useState(true)
  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(url)
        setData(await res.json())
      } catch {
        setError('Erreur chargement')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [url])

  return { data, isLoading, error }
}

```

<!--
Comparaison visuelle : le même code vu en S7 (API), d'abord dans le composant, puis extrait dans useFetch.
Objectif : montrer que le hook n'introduit aucune syntaxe magique, c'est juste le pattern loading/error/data déplacé.
-->
