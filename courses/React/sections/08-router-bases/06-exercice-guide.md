---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice guidé — 3 pages

À faire ensemble

::left::

```tsx
function App() {
  return (
    // 1. Envelopper avec BrowserRouter
    // 2. Ajouter une barre de navigation
    //    avec 3 NavLink : /, /about, /contact
    // 3. Déclarer les Routes vers
    //    <Home />, <About />, <Contact />
  )
}
```

::right::

**Consignes**

<v-click>

1. Créer les composants `Home`, `About` et `Contact`
2. Installer `react-router-dom`
3. Configurer `BrowserRouter`, `Routes` et `Route`
4. Remplacer les balises `<a>` par des `NavLink`

</v-click>

<v-click>

**Critère de réussite**

- L'URL change quand vous cliquez sur un lien
- Le bon composant s'affiche
- Le lien actif a un style différent

</v-click>

<!--
Exercice collectif de 10-15 minutes. Le formateur code en direct ou en mode "pair programming".
Faire vérifier l'URL dans la barre du navigateur et le retour arrière.
-->
