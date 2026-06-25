---
layout: two-cols-header
layoutClass: gap-x-4
---

# Filtrer un tableau avant de l'afficher

`filter()` puis `map()` — deux étapes distinctes

::left::

```tsx {none|1-8|10-14|16-21|all}
interface Task {
  id: number
  label: string
  done: boolean
}

const tasks: Task[] = [/* ... */]

// Étape 1 : filter() — garder uniquement les tâches non terminées
const activeTasks = tasks.filter((task) => !task.done)

// activeTasks = sous-ensemble de tasks, toujours du type Task[]

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

**Enchaîner en une ligne**

```tsx
tasks
  .filter((task) => !task.done)
  .map((task) => (
    <TaskItem key={task.id} task={task} />
  ))
```

</div>

<div v-click="4">

**`filter()` retourne toujours un tableau `Task[]`**

→ TypeScript infère le type automatiquement après un `filter()`.

</div>

<!--
Montrer les deux approches : variables intermédiaires (plus lisible) vs chaîne (plus concis).
Insister : filter() et map() ne mutent pas le tableau — rappel d'immutabilité de S4.
Question : "Quelle est la différence entre filter() et find() ?" → filter retourne un tableau, find retourne un élément ou undefined.
-->
