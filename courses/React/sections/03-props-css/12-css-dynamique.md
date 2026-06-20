---
layout: two-cols-header
layoutClass: gap-x-4
---

# Une classe qui dépend d'une prop

Quand les props pilotent le style

::left::

```tsx {all|2|8|14-15|all}
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

<img src="/css-variants.jpg" class="h-20 rounded mt-2" alt="CSS variants illustration" />
<p class="text-xs opacity-50 mt-1">📷 Unsplash</p>

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

**Quand s'en servir ?**

Quand l'**apparence dépend d'une donnée** : bouton `primary`/`danger`, badge `success`/`warning`, élément `active`/`disabled`.

</div>

<div v-click="4">

> ✅ Un seul composant `Button`, plusieurs apparences selon la prop — au lieu de dupliquer un composant par style.

</div>

<!--
Aboutissement de la séance : les deux moitiés (props + CSS) fusionnent.
Cas d'usage concrets : variantes de boutons, badges de statut, états actif/inactif, tailles (sm/md/lg). Le point clé : on choisit la CLASSE, le CSS reste figé dans le fichier.
Anti-pattern à éviter : un composant ButtonPrimary + un ButtonDanger séparés — la prop variant remplace cette duplication.
Introduire en douceur le type union "primary" | "danger" — utile et impressionnant pour montrer la puissance de TS.
Rappeler les accolades JSX (séance 2) : on est juste en train d'y mettre une expression au lieu d'une chaîne fixe.
-->
