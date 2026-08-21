---
layout: two-cols-header
layoutClass: gap-x-4
---

# Pièges classiques

Erreurs à éviter avec les hooks personnalisés

::left::

<v-click>

**Oublier le préfixe `use`**

```tsx
// ❌ Le linter ne peut plus vérifier
// les règles des Hooks à l'intérieur
function toggleLogic() {
  const [v, setV] = useState(false)
}
```

</v-click>

<v-click>

**Appeler le hook dans une condition**

```tsx
// ❌ Toujours interdit, même pour
// un hook personnalisé
if (isReady) {
  const { data } = useFetch(url)
}
```

</v-click>

::right::

<v-click>

**Faire retourner du JSX à un hook**

```tsx
// ❌ Un hook personnalisé n'affiche
// rien : ce serait un composant
function useToggle() {
  return <button>Toggle</button>
}
```

</v-click>

<!--
Ces pièges sont fréquents chez les débutants qui découvrent les hooks personnalisés. Faire un tour rapide : lequel vous semble le plus probable pour vous ?
Piège 1 : bien insister, le préfixe "use" n'est pas juste une convention esthétique, eslint-plugin-react-hooks s'en sert réellement pour analyser le code.
-->
