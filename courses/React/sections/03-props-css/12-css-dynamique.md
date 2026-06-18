---
layout: two-cols-header
layoutClass: gap-x-4
---

# Une classe qui dépend d'une prop

Quand les props pilotent le style

::left::

```tsx {all|2|6|9-12|all}
interface ButtonProps {
  variant: "primary" | "danger"
  label: string
}

function Button({ variant, label }: ButtonProps) {
  return (
    <button className={`btn btn--${variant}`}>
      {label}
    </button>
  )
}

<Button variant="primary" label="Valider" />
<Button variant="danger" label="Supprimer" />
```

::right::

<div v-click="1">

**Un type précis**

`variant` n'accepte que `"primary"` ou `"danger"` — TypeScript bloque le reste.

</div>

<div v-click="2">

**Une className calculée**

Les accolades `{...}` insèrent la valeur : `btn--primary` ou `btn--danger`.

</div>

<div v-click="3">

> ✅ Un seul composant `Button`, plusieurs apparences selon la prop.

</div>

<!--
Aboutissement de la séance : les deux moitiés (props + CSS) fusionnent.
Introduire en douceur le type union "primary" | "danger" — utile et impressionnant pour montrer la puissance de TS.
Rappeler les accolades JSX (séance 2) : on est juste en train d'y mettre une expression au lieu d'une chaîne fixe.
-->
