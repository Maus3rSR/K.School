---
layout: two-cols-header
layoutClass: gap-x-4
---

# Un besoin : arrêter de copier-coller

Deux composants, la même logique répétée

::left::

```tsx
function NotifPanel() {
  const [isOpen, setIsOpen] = useState(false)
  function toggle() { setIsOpen((v) => !v) }
  // ...
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  function toggle() { setIsOpen((v) => !v) }
  // ...
}
```

<v-click>

Le même trio `useState` + `toggle` réécrit deux fois, mot pour mot.

</v-click>

::right::

**Le problème**

- Duplication : un bug corrigé dans un composant doit être recopié partout ailleurs
- Aucun moyen de partager cette logique **sans** partager de JSX

::bottom::

<v-click>

React répond à ce besoin avec les **hooks personnalisés** : extraire une logique à état dans une fonction réutilisable.

</v-click>

<!--
Contexte : vous connaissez déjà useState (S4) et useEffect (S6, S7). Le déclic à provoquer : "ce code, je l'ai déjà écrit ailleurs".
Bien insister sur la différence avec un composant : un hook personnalisé ne retourne pas de JSX, juste de la logique et des valeurs.
-->
