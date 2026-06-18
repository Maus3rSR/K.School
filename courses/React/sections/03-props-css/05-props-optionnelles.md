---
layout: two-cols-header
layoutClass: gap-x-4
---

# Props optionnelles

Toutes les données ne sont pas obligatoires

::left::

```tsx {all|3|6|all}
interface CardProps {
  name: string
  role?: string   // optionnelle
}

function Card({ name, role = "Invité" }: CardProps) {
  return <h2>{name} — {role}</h2>
}

// Les deux sont valides :
<Card name="Ada Lovelace" role="Pionnière du code" />
<Card name="Grace Hopper" />
```

::right::

<div v-click="1">

**Le `?` rend la prop optionnelle**

`role?` : le parent **peut** la fournir... ou pas. Pas d'erreur s'il l'oublie.

</div>

<div v-click="2">

**Une valeur par défaut**

`role = "Invité"` : la valeur utilisée quand le parent ne passe rien.

</div>

<div v-click="3">

> 💡 Sans valeur par défaut, une prop optionnelle non fournie vaut `undefined`.

</div>

<!--
Bien distinguer les deux mécanismes : le `?` (côté interface) autorise l'absence, le `= valeur` (côté déstructuration) fournit un repli.
Question type : "Que vaut role si on écrit <Card name="Grace Hopper" /> sans valeur par défaut ?" → undefined.
-->
