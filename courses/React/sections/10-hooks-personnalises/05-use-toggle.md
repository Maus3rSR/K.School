---
layout: two-cols-header
layoutClass: gap-x-4
---

# useToggle en action

Réutiliser le même hook dans deux composants

::left::

```tsx {all|8-9|13-14|all}
function useToggle(initial = false): [boolean, () => void] {
  const [value, setValue] = useState(initial)
  function toggle() { setValue((v) => !v) }
  return [value, toggle]
}

function NotifPanel() {
  const [isOpen, toggle] = useToggle()
  return <button onClick={toggle}>Notifs : {isOpen ? 'ON' : 'OFF'}</button>
}

function Sidebar() {
  const [isOpen, toggle] = useToggle(true)
  return <button onClick={toggle}>Menu : {isOpen ? 'ON' : 'OFF'}</button>
}
```

::right::

<div v-click="1">

`NotifPanel` démarre fermé (`useToggle()`, valeur par défaut `false`).

</div>

<div v-click="2">

`Sidebar` démarre ouvert (`useToggle(true)`) — même hook, **état totalement indépendant**.

</div>

<!--
Faire tourner en live : cliquer sur un bouton ne modifie jamais l'autre. C'est la preuve visuelle que chaque appel à useToggle crée son propre useState.
Insister : useToggle n'est ni plus ni moins qu'une fonction JavaScript/TypeScript classique — pas de magie, pas de nouvelle syntaxe React à apprendre.
-->
