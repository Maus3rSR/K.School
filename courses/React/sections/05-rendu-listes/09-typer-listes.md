---
layout: two-cols-header
layoutClass: gap-x-4
---

# Typer les listes avec TypeScript

Des tableaux d'objets structurés

::left::

````md magic-move
```tsx
// 🔴 AVANT — tableau de strings, pas de structure
const tasks = ["Faire les courses", "Appeler le client"]

tasks.map((task) => (
  <li key={task}>{task}</li>
))
```

```tsx
// 🟢 APRÈS — interface + tableau typé
interface Task {
  id: number
  label: string
  done: boolean
}

const tasks: Task[] = [
  { id: 1, label: "Faire les courses", done: false },
  { id: 2, label: "Appeler le client", done: true },
]

tasks.map((task) => (
  <li key={task.id}>{task.label}</li>
))
```

```tsx
// 🟢 Composant avec props typées
interface Task {
  id: number
  label: string
  done: boolean
}

interface TaskItemProps {
  task: Task
}

function TaskItem({ task }: TaskItemProps) {
  return (
    <li style={{ textDecoration: task.done ? "line-through" : "none" }}>
      {task.label}
    </li>
  )
}
```
````

::right::

<div v-click="1">

**Pourquoi une interface ?**

- `task.id` → autocomplétion, pas de faute de frappe
- `task.dont` → erreur TypeScript immédiate
- Structure claire, réutilisable entre composants

</div>

<div v-click="2">

**`Task[]` — lire ce type**

> "Un tableau d'objets, chacun respectant l'interface `Task`"

```tsx
const [tasks, setTasks] = useState<Task[]>([])
//                                  ^^^^^^
//                         TypeScript sait ce que contient ce tableau
```

</div>

<div v-click="3">

**`key` = `task.id`**

L'`id` issu d'une base de données ou d'une API est toujours la meilleure `key` : stable, unique, métier.

</div>

<!--
Magic move en 3 étapes : string[] → Task[] → composant dédié.
Insister sur l'autocomplétion : montrer en live que VS Code propose task.id, task.label, task.done.
useState<Task[]>([]) : relier à S4 — le typage du state avec T[], déjà vu pour les primitives.
-->
