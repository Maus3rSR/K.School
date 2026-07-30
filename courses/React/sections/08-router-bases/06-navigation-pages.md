---
layout: two-cols-header
layoutClass: gap-x-4
---

# Assembler les pages

Un menu + un espace de contenu

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
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
```

::right::

**Ce qui se passe**

- Le menu est affiché **sur toutes les pages**
- `Routes` remplace uniquement la partie centrale selon l'URL
- Cliquer sur un lien change l'URL sans rechargement complet

<v-click>

**À retenir**

La navigation React Router reste dans le navigateur : l'application ne repart pas de zéro.

</v-click>

<!--
Faire le parallèle avec un site classique : le menu est commun, le contenu change. Sauf qu'ici tout reste dans la SPA.
C'est le moment de montrer concrètement dans le navigateur que la page ne clignote pas.
-->
