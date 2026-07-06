---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice guidé — Liste de posts

À vous de jouer

::left::

```tsx
interface Post {
  id: number
  title: string
}

function PostList() {
  // 1. Déclarer posts (Post[]), isLoading (true),
  //    error (string | null)

  // 2. useEffect au montage : fetch sur
  //    https://jsonplaceholder.typicode.com/posts
  //    → setPosts, catch → setError, finally → isLoading

  // 3. Rendu conditionnel : loading, puis error,
  //    puis la liste avec map()

  return null
}
```

::right::

**À faire ensemble**

<v-click>

1. 3 `useState` typés
2. `fetch` + `.then` + `.catch` + `.finally` dans `useEffect(..., [])`
3. `if (isLoading)` → `if (error)` → `map()`

</v-click>

<v-click>

**Solution**

```tsx
const [posts, setPosts] = useState<Post[]>([])
const [isLoading, setIsLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((data: Post[]) => setPosts(data))
    .catch(() => setError('Erreur de chargement'))
    .finally(() => setIsLoading(false))
}, [])
```

</v-click>

<!--
Laisser 8-10 minutes de pratique avant de révéler la solution — c'est l'exercice central de la séance, ne pas presser.
Vérifier que chacun ouvre les DevTools (onglet Network) pour observer la vraie requête partir.
-->
