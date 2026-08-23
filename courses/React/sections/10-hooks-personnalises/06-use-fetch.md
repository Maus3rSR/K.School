---
layout: two-cols-header
layoutClass: gap-x-4
---

# useFetch — extraire le pattern de S7

Le trio loading/error/data, réutilisable

::left::

```tsx {all|1|2-4|6-16|18|all}{maxHeight:'350px'}
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(url)
        setData(await res.json())
      } catch {
        setError('Impossible de charger les données')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [url])

  return { data, isLoading, error }
}

const { data: posts, isLoading, error } = useFetch<Post[]>('/posts')
```

::right::

<div v-click="1">

Reconnaissez ce code ? C'est **exactement** le pattern loading/error/data de la séance sur les API — déplacé dans un hook.

</div>

<div v-click="2">

Le generic `<T>` remplace `Post[]` codé en dur : `useFetch<Post[]>`, `useFetch<User>`... un seul hook pour tous les appels API.

</div>

<div v-click="3">

Retourner un **objet** plutôt qu'un tuple ici : l'ordre importe peu, et les noms (`data`, `isLoading`, `error`) sont plus lisibles à l'appel.

</div>

<!--
Ce slide est le point d'orgue de la séance : relier explicitement à 07-appel-api/09-etats-typed.md, déjà vu par les apprenants.
Discussion possible : pourquoi un objet ici et un tuple pour useToggle ? Règle empirique : peu de valeurs de retour et ordre naturel → tuple (comme useState) ; plusieurs valeurs nommées → objet.
-->
