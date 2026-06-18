---
layout: two-cols-header
layoutClass: gap-x-4
---

# Styliser un composant de bout en bout

Props + CSS réunis

::left::

```tsx {none|1-3|5-8|all}
// ProfileCard.tsx
import './ProfileCard.css'

function ProfileCard({ name, role }: CardProps) {
  return (
    <div className="profile-card">
      <h2 className="profile-card__name">{name}</h2>
      <p className="profile-card__role">{role}</p>
    </div>
  )
}
```

::right::

<div v-click="1">

**Les données viennent des props**

`name` et `role` rendent la carte réutilisable.

</div>

<div v-click="2">

**L'apparence vient du CSS**

Chaque élément porte une `className` ciblée par `ProfileCard.css`.

</div>

<div v-click="3">

> ✅ Un composant **configurable** (props) **et** **présentable** (CSS).

</div>

<!--
Slide de synthèse de la moitié CSS : on assemble tout ce qui précède sur un exemple concret.
Convention de nommage des classes (profile-card__name) = BEM, à mentionner brièvement comme bonne pratique optionnelle.
C'est l'exemple à reprendre tel quel dans l'exercice de la séance.
-->
