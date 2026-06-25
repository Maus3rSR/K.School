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
user.name = "Alan"  // l'objet change, React ne le sait pas

// ✅ Créer un nouvel objet
setUser({ ...user, name: "Alan" })
```

<v-click>

> Même règle pour les tableaux : toujours créer un **nouveau** tableau, ne jamais `push` directement.

</v-click>

::right::

<v-click at="2">

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
-->
