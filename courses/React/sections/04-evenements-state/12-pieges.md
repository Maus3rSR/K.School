---
layout: two-cols-header
layoutClass: gap-x-4
---

# Pièges courants

Les deux erreurs les plus fréquentes

::left::

**❌ Muter le state directement**

```tsx
// ❌ Mutation directe — React ne re-rend pas
const [user, setUser] = useState({ name: "Ada" })
user.name = "Alan"  // l'objet change, 
//                     React ne le sait pas

// ✅ Créer un nouvel objet
// { ...user } copie toutes
// les propriétés existantes
setUser({ ...user, name: "Alan" })
```

<v-click>

> Même règle pour les tableaux : toujours créer un **nouveau** tableau, ne jamais `push` directement.

</v-click>

<v-click>

📖 `{ ...user }` utilise le **spread operator** — pas encore vu en cours.  
[Spread syntax — MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

</v-click>

::right::

<v-click at="3">

**❌ Appeler un hook conditionnellement**

```tsx
// ❌ Interdit
function Component({ show }: { show: boolean }) {
  if (show) {
    const [count, setCount] = useState(0)  // ❌
  }
} 
// ✅ Hook au niveau supérieur, condition à l'intérieur
function Component({ show }: { show: boolean }) {
  const [count, setCount] = useState(0)  // ✅

  if (!show) return null
  return <p>{count}</p>
}
```

</v-click>

<v-click>

**Règle des Hooks**

> Appeler les hooks **uniquement** au niveau supérieur du composant,  
> **jamais** dans un `if`, une boucle, ou une fonction imbriquée.

ESLint le détecte automatiquement avec `eslint-plugin-react-hooks`.

</v-click>

<!--
Mutation directe : le tester en live est frappant — React ne re-rend pas, l'affichage reste figé alors que l'objet a changé.
Le tableau push sera le piège central en S5 : cette slide en pose les bases.
La règle des Hooks peut sembler abstraite — ESLint la rend concrète avec un soulignage rouge immédiat.

{ ...user } utilise le "spread operator" (opérateur de décomposition) — concept JS non encore vu à ce stade.
Si des questions émergent, pointer vers : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax
Pour l'instant, retenir juste : "ça copie l'objet, puis on écrase ce qu'on veut modifier".
-->
