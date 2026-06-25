---
layout: two-cols-header
layoutClass: gap-x-4
---

# Pièges fréquents

Les erreurs que tout le monde fait au moins une fois

::left::

```tsx
// ❌ Piège 1 — key manquante
tasks.map((task) => <li>{task.label}</li>)
//   Warning : "Each child in a list should have a unique key prop"

// ❌ Piège 2 — key = index avec liste changeante
tasks.map((task, index) => <li key={index}>{task.label}</li>)
//   Bug silencieux si on insère ou réordonne

// ❌ Piège 3 — le 0 s'affiche
{ tasks.length && <ul>...</ul> }
//   Si tasks est vide → affiche "0" dans l'UI

// ❌ Piège 4 — if dans le JSX
return <div>{ if (x) { <p>Hello</p> } }</div>
//   SyntaxError : unexpected token

// ❌ Piège 5 — state dupliqué
const [doneCount, setDoneCount] = useState(0)
//   Utiliser filter().length à la place
```

::right::

**Les règles à retenir**

<v-clicks>

- `key` est **obligatoire** sur chaque élément rendu par `map()`
- `key` doit venir d'un **identifiant stable** — pas de l'index si la liste change
- `&&` avec un nombre : toujours forcer `nombre > 0 &&` ou `!!nombre &&`
- `if` n'est pas une expression — le mettre **avant** le `return` ou utiliser `? :`
- Ne jamais mettre dans un `useState` ce qu'on peut **calculer** depuis un autre state

</v-clicks>

<!--
Ces 5 pièges couvrent 90% des bugs rencontrés chez les apprenants sur cette séance.
Reproduire volontairement chaque bug en live, puis le corriger.
Piège 5 (state dupliqué) : introduire le concept de "single source of truth" — le compteur se calcule depuis tasks, pas depuis un state séparé.
-->
