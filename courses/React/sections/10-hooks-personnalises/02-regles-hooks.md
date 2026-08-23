---
layout: two-cols-header
layoutClass: gap-x-4
---

# Convention et règles des Hooks

Un nom et deux règles à respecter toujours

::left::

```tsx
// ✅ Convention de nommage
function useToggle() { /* ... */ }
function useFetch() { /* ... */ }

// ❌ Ne commence pas par "use"
function toggleLogic() { /* ... */ }
```

Le préfixe `use` n'est pas décoratif : React et les linters s'en servent pour vérifier que les règles des Hooks sont respectées.

::right::

<div v-click="1">

**Règle 1 — Niveau racine uniquement**

```tsx
function Panel() {
  if (isOpen) {
    const [x] = useState(0) // ❌ interdit
  }
}
```

</div>

<div v-click="2">

**Règle 2 — Seulement dans des composants ou des hooks**

```tsx
function handleClick() {
  useState(0) // ❌ pas dans une fonction classique
}
```

</div>

<!--
Ces deux règles ne sont pas nouvelles : elles s'appliquaient déjà à useState et useEffect depuis S4/S6. La nouveauté ici, c'est qu'elles s'appliquent EXACTEMENT pareil à l'intérieur d'un hook personnalisé.
Mentionner que le plugin ESLint eslint-plugin-react-hooks détecte ces erreurs automatiquement en entreprise.
-->
