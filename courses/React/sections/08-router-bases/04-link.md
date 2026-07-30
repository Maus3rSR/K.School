---
layout: two-cols-header
layoutClass: gap-x-4
---

# Link : naviguer sans recharger

Remplacer les balises `<a>` internes

::left::

```tsx {none|1|3-5|4|all}
import { Link } from 'react-router-dom'

<nav>
  <Link to="/about">
    À propos
  </Link>
</nav>
```

::right::

<div v-click="1">

`Link` remplace `<a href>` pour les liens internes de l'application.

</div>

<div v-click="2">

La prop `to` indique le chemin cible : React Router met à jour l'URL **sans recharger la page**.

</div>

<!--
Bien insister sur la différence avec <a href> : Link évite le rechargement complet et garde l'état de l'application (SPA).
C'est la brique de base ; NavLink (slide suivante) en est une variante avec un style pour le lien actif.
-->
