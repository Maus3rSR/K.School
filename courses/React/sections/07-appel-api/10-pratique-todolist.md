---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice guidé — Liste de tâches

À vous de jouer

::left::

```tsx
interface Todo {
  id: number
  title: string
  completed: boolean
}

function TodoList() {
  // 1. Déclarer todos (Todo[]), isLoading (true),
  //    error (string | null)

  // 2. useEffect au montage : fonction async interne
  //    qui fetch sur
  //    https://jsonplaceholder.typicode.com/todos
  //    → setTodos, 
  //      catch → setError,
  //      finally → isLoading

  // 3. Rendu conditionnel : 
  //    loading, puis error,
  //    puis la liste avec map()

  return null
}
```

::right::

**À faire ensemble**

<v-click>

1. 3 `useState` typés
2. Fonction `async` interne avec `try`/`catch`/`finally`, appelée dans `useEffect(..., [])`
3. `if (isLoading)` → `if (error)` → `map()`

</v-click>

<v-click>

**Solution**

```tsx {*}{maxHeight: '200px'}
const [todos, setTodos] = useState<Todo[]>([])
const [isLoading, setIsLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
  async function loadTodos() {
    try {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      )
      const data: Todo[] = await res.json()
      setTodos(data)
    } catch {
      setError('Erreur de chargement')
    } finally {
      setIsLoading(false)
    }
  }
  loadTodos()
}, [])
```

</v-click>

<!--
Laisser 8-10 minutes de pratique avant de révéler la solution — c'est l'exercice central de la séance, ne pas presser.
Sujet volontairement différent de PostList (vu dans les slides précédentes) : la liste de tâches (todos) force à réappliquer le pattern sans pouvoir recopier le code déjà affiché à l'écran.
Vérifier que chacun ouvre les DevTools (onglet Network) pour observer la vraie requête partir.
-->
