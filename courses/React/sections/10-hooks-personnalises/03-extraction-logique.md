---
layout: two-cols-header
layoutClass: gap-x-4
---

# Extraire une logique existante

De la duplication à un hook réutilisable

::left::

````md magic-move
```tsx
// ❌ Logique dupliquée dans le composant
function NotifPanel() {
  const [isOpen, setIsOpen] = useState(false)

  function toggle() {
    setIsOpen((v) => !v)
  }

  return <button onClick={toggle}>{isOpen ? 'Ouvert' : 'Fermé'}</button>
}
```

```tsx
// ✅ Étape 1 : on isole le state et la fonction
// dans une fonction à part, préfixée "use"
function NotifPanel() {
  return <button onClick={toggle}>{isOpen ? 'Ouvert' : 'Fermé'}</button>
}

function useToggle() {
  const [isOpen, setIsOpen] = useState(false)

  function toggle() {
    setIsOpen((v) => !v)
  }

  return [isOpen, toggle]
}
```

```tsx
// ✅ Étape 2 : le composant appelle le hook
function NotifPanel() {
  const [isOpen, toggle] = useToggle()
  return <button onClick={toggle}>{isOpen ? 'Ouvert' : 'Fermé'}</button>
}

function useToggle() {
  const [isOpen, setIsOpen] = useState(false)

  function toggle() {
    setIsOpen((v) => !v)
  }

  return [isOpen, toggle]
}
```
````

::right::

<div v-click="1">

Rien de magique : un hook personnalisé est une **fonction normale** qui appelle `useState` à l'intérieur.

</div>

<div v-click="2">

`NotifPanel` et `Sidebar` peuvent maintenant tous les deux appeler `useToggle()` — chacun garde **son propre état**, isolé.

</div>

<!--
Point clé à faire ressortir : useToggle() appelé dans deux composants différents ne partage PAS l'état. Chaque appel crée sa propre instance de useState.
C'est souvent une source de confusion : certains apprenants pensent qu'un hook personnalisé "partage" un state global — ce n'est pas le cas, ce n'est pas un contexte.
-->
