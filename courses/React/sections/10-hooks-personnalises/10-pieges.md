---
layout: two-cols-header
layoutClass: gap-x-4 text-sm
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

<v-click class="mt-4">

**Appeler un hook dans une condition**

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

**Penser qu'un hook partage l'état**

```tsx
function Header() { const [open] = useToggle() }
function Footer() { const [open] = useToggle() } // ❌ état séparé
```

Chaque appel crée son propre state. Pour partager, il faut **Context**.

</v-click>

<v-click class="mt-4">

**Utiliser un hook Context hors Provider**

```tsx
function Header() {
  const { theme } = useTheme() // ❌ hors <ThemeProvider>
}
```

Toujours wrapper l'arbre avec le Provider correspondant.

</v-click>

<!--
Ces 4 pièges couvrent les erreurs les plus fréquentes sur les custom hooks + Context.
Faire un tour rapide : lequel vous semble le plus probable pour vous ?
Bien insister sur le piège n°3 : c'est la confusion n°1 entre "réutiliser de la logique" et "partager un état".
-->
