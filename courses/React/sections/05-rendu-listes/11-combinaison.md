---
layout: two-cols-header
layoutClass: gap-x-4
---

# Tout ensemble — la Todo List

Rendu conditionnel + liste typée + filtrage

::left::

```tsx {none|1-8|10-16|18-36|all}
interface Task {
  id: number
  label: string
  done: boolean
}

const [tasks, setTasks] = useState<Task[]>([])
const [showDone, setShowDone] = useState(true)

// Filtrage selon l'état showDone
const visibleTasks = showDone
  ? tasks
  : tasks.filter((task) => !task.done)

// Dériver le nombre de tâches terminées
const doneCount = tasks.filter((t) => t.done).length

return (
  <div>
    <button onClick={() => setShowDone(!showDone)}>
      {showDone ? "Masquer terminées" : "Afficher terminées"}
    </button>

    {/* Conditionnel : liste vide */}
    { visibleTasks.length === 0 && (
      <p>Aucune tâche à afficher.</p>
    )}

    { visibleTasks.length > 0 && (
      <ul>
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    )}

    <p>{doneCount} / {tasks.length} tâches terminées</p>
  </div>
)
```

::right::

**Ce que ce code combine**

<v-clicks>

- `useState<Task[]>` — liste typée en state
- `useState<boolean>` — toggle visible/caché
- `filter()` — sous-liste selon la condition
- `map()` — JSX pour chaque tâche visible
- `&&` — afficher le message "vide" seulement si nécessaire
- Ternaire — libellé du bouton selon l'état

</v-clicks>

<v-click>

**Données dérivées**

`doneCount` n'est pas un state — c'est une valeur **calculée** depuis `tasks`.  
Ne jamais dupliquer ce qu'on peut dériver. 🚫 `useState` pour ça.

</v-click>

<!--
C'est la slide de synthèse pratique — prendre le temps de lire le code ensemble.
Concept de "derived state" (donnée dérivée) : important pour éviter les états désynchronisés.
Si le temps le permet, coder cette todo list en live plutôt que de simplement montrer le code.
Pièges à anticiper : oublier key, utiliser index comme key, mettre doneCount dans un useState.
-->
