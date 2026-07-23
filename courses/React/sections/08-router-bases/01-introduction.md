---
layout: two-cols-header
layoutClass: gap-x-4
---

# Une seule page, plusieurs contenus

Comment naviguer sans recharger l'application ?

::left::

```tsx
function App() {
  const [page, setPage] = useState('home')

  return (
    <div>
      <button onClick={() => setPage('home')}>Accueil</button>
      <button onClick={() => setPage('about')}>À propos</button>

      {page === 'home' && <Home />}
      {page === 'about' && <About />}
    </div>
  )
}
```

::right::

**Ça fonctionne, mais...**

- L'URL ne change pas : impossible de partager un lien
- Le bouton "Précédent" du navigateur ne marche pas
- On ne peut pas rafraîchir sur une "page" précise

<v-click>

**React Router** résout ces problèmes en synchronisant l'URL avec ce que React affiche.

</v-click>

<!--
Contexte : les apprenants maîtrisent useState + rendu conditionnel (S5). C'est exactement le même besoin : afficher un composant plutôt qu'un autre.
Leur faire ressentir le problème : demander "si je copie l'URL actuelle et que je l'envoie à quelqu'un, il verra quoi ?"
-->
