---
layout: two-cols-header
layoutClass: gap-x-4
---

# `className` au lieu de `class`

La première différence JSX / HTML pour le style

::left::

```tsx {all|2|all}
// En HTML
<div class="card">...</div>

// En JSX / React
<div className="card">...</div>
```

::right::

**Pourquoi ce changement ?**

`class` est un **mot réservé** de JavaScript. JSX utilise donc `className`.

<div v-click="1">

**À part le nom, tout est identique**

- Une ou plusieurs classes : `className="card big"`
- Les classes pointent vers vos règles CSS

</div>

<Alert type="warning">
Écrire <code>class="..."</code> en JSX ne plante pas, mais le style ne s'applique pas.
</Alert>

<!--
Rappel séance 2 : on avait déjà croisé "JSX n'est pas tout à fait du HTML". className en est l'exemple le plus fréquent.
Piège ultra-courant chez les débutants : oublier le "Name" → le style ne marche pas et aucune erreur visible.
-->
