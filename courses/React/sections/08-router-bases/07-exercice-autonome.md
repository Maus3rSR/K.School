---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice autonome — Ajouter une page

Seul cette fois

::left::

```tsx
function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/about">À propos</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Ajoutez la route /team ici */}
      </Routes>
    </BrowserRouter>
  )
}
```

::right::

**Consignes**

<v-click>

1. Créer un composant `Team`
2. Ajouter un `NavLink` vers `/team`
3. Ajouter la `Route` correspondante
4. Tester que `/team` affiche bien le nouveau contenu

</v-click>

<v-click>

**Critère de réussite**

La page `Team` est accessible depuis le menu et possède son propre style actif.

</v-click>

<!--
Exercice autonome de 10-15 minutes. Vérifier que chacun manipule vraiment les 3 briques : NavLink + Route + composant.
Aide graduée : indice 1 "quel chemin ?", indice 2 "où placer le NavLink ?", indice 3 montrer juste la ligne de Route.
-->
