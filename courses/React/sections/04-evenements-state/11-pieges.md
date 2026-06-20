---
layout: two-cols-header
layoutClass: gap-x-4
---

# Pièges courants

Les erreurs à éviter avec useState

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

**❌ Appeler un hook conditionnellement**

```tsx
// ❌ Interdit — les hooks doivent être au niveau supérieur
function Component({ show }: { show: boolean }) {
  if (show) {
    const [count, setCount] = useState(0)  // ❌ hook conditionnel
  }
}
```

</v-click>

::right::

<v-click at="2">

**❌ Oublier le setter et lire l'ancienne valeur**

```tsx
// ❌ count est un snapshot — il ne change pas immédiatement
function handleClick() {
  setCount(count + 1)
  setCount(count + 1)  // count est encore 0 !
}

// ✅ Forme fonctionnelle — utilise la valeur courante
function handleClick() {
  setCount(prev => prev + 1)
  setCount(prev => prev + 1)  // s'accumulent correctement
}
```

</v-click>

<v-click>

**Règle des Hooks (officielle)**

> Appeler les hooks **uniquement** au niveau supérieur d'un composant,  
> **jamais** dans un `if`, une boucle, ou une fonction imbriquée.

</v-click>

<!--
Ces 3 pièges sont les plus fréquents en production — y revenir lors du projet pratique.
La forme fonctionnelle setCount(prev => prev + 1) sera utile en S5 pour les tableaux.
La règle des hooks est imposée par React — ESLint peut la vérifier automatiquement (plugin eslint-plugin-react-hooks).
-->
