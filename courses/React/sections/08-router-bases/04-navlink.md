---
layout: two-cols-header
layoutClass: gap-x-4
---

# NavLink : le lien actif

Indiquer visuellement la page en cours

::left::

```tsx {none|1|3-6|all}
import { NavLink } from 'react-router-dom'

<nav>
  <NavLink to="/">
    Accueil
  </NavLink>
  <NavLink to="/about">
    À propos
  </NavLink>
</nav>
```

::right::

<div v-click="1">

`NavLink` fonctionne comme `Link`, mais peut styler le lien actif.

</div>

<div v-click="2">

Avec une fonction `className`, React Router indique si la route correspond :

```tsx
<NavLink
  to="/about"
  className={({ isActive }) =>
    isActive ? 'link active' : 'link'
  }
>
  À propos
</NavLink>
```

</div>

<!--
Expliquer la différence : Link = navigation simple, NavLink = navigation avec état actif.
La fonction className est un pattern courant : préparer les apprenants à le voir souvent.
-->
