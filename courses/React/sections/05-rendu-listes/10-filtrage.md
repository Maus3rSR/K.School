---
layout: two-cols-header
layoutClass: gap-x-4
---

# Filtrer un tableau avant de l'afficher

`filter()` puis `map()` — deux étapes distinctes

::left::

```tsx {all|9-11|13-16|18-19|all}
interface Task {
  id: number
  label: string
  done: boolean
}

const tasks: Task[] = [/* ...data... */]

// Étape 1 : filter() — garder uniquement les tâches non terminées
// activeTasks = sous-ensemble de tasks, toujours du type Task[]
const activeTasks = tasks.filter((task) => !task.done)

// Étape 2 : map() — transformer en JSX
const taskItems = activeTasks.map((task) => (
  <TaskItem key={task.id} task={task} />
))

// Étape 3 : utiliser dans le JSX
return <ul>{taskItems}</ul>
```

::right::

<div v-click="1">

**`filter()` — ne garde que ce qui passe le test**

```
[✅ A, ❌ B, ✅ C, ❌ D]
         ↓ filter(!done)
[✅ A, ✅ C]
```

Le tableau original n'est **pas modifié**.

</div>

<div v-click="2">

**`map()` — transforme chaque élément**

```
[A, C]
  ↓ map()
[<TaskItem />, <TaskItem />]
```

</div>

<div v-click="3">

Note: On peut afficher une variable qui contient du JSX.

</div>

<!--
Montrer les deux approches : variables intermédiaires (plus lisible) vs chaîne (plus concis).
Insister : filter() et map() ne mutent pas le tableau — rappel d'immutabilité de S4.
Question : "Quelle est la différence entre filter() et find() ?" → filter retourne un tableau, find retourne un élément ou undefined.
-->
