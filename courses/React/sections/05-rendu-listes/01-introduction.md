---
layout: two-cols-header
layoutClass: gap-x-4
---

# La liste de tâches — problème réel

Ce que vous savez déjà faire, et ce qui manque

::left::

```tsx
function TodoApp() {
  const [tasks, setTasks] = useState<string[]>([])
  const [done, setDone] = useState(false)

  return (
    <div>
      <h1>Mes tâches</h1>
      {/* ❓ Comment afficher "Terminé !" seulement si done = true ? */}
      {/* ❓ Comment afficher chaque tâche de tasks[] ? */}
    </div>
  )
}
```

::right::

**Ce que vous maîtrisez**

- `useState` pour mémoriser des données
- Props pour passer des données
- Événements pour réagir aux clics

<v-click>

**Ce qui manque**

- Afficher du JSX **seulement si** une condition est vraie
- Générer du JSX **pour chaque élément** d'un tableau
- Combiner les deux : une liste **filtrée**

</v-click>

<!--
Partir du teaser de S4 : "comment afficher quelque chose seulement si une condition est remplie ?"
Demander aux apprenants : "Si j'écris `if (done) { <p>Terminé</p> }` dans le JSX, ça marche ?"
→ Amener la distinction statement vs expression, fil conducteur de tout le rendu conditionnel.
-->
