---
layout: two-cols-header
layoutClass: gap-x-4
---

# Formulaire contrôlé

Combiner plusieurs states et onSubmit

::left::

````md magic-move {maxHeight:'400px'}
```tsx
// Point de départ : un form HTML classique, aucun state
function ContactForm() {
  return (
    <form>
      <input placeholder="Nom" />
      <input placeholder="Email" />
      <button type="submit">Envoyer</button>
    </form>
  )
}
```

```tsx
// Étape 1 : un state par champ
import { useState } from 'react'

function ContactForm() {
  const [name,  setName]  = useState<string>("")
  const [email, setEmail] = useState<string>("")

  return (
    <form>
      <input placeholder="Nom" />
      <input placeholder="Email" />
      <button type="submit">Envoyer</button>
    </form>
  )
}
```

```tsx
// Étape 2 : on lie chaque input à son state
import { useState } from 'react'

function ContactForm() {
  const [name,  setName]  = useState<string>("")
  const [email, setEmail] = useState<string>("")

  return (
    <form>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nom"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Envoyer</button>
    </form>
  )
}
```

```tsx
// ✅ Étape 3 : onSubmit avec e.preventDefault()
import { useState } from 'react'

function ContactForm() {
  const [name,  setName]  = useState<string>("")
  const [email, setEmail] = useState<string>("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("Envoyé :", { name, email })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nom"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Envoyer</button>
    </form>
  )
}
```
````

::right::

**Form HTML natif** — React ne connaît pas les valeurs, impossible de les lire à la soumission.

<div v-click="1">

**Un state par champ** — simple, lisible, chacun son setter.

</div>

<div v-click="2">

**Inputs contrôlés** — `value` + `onChange` sur chaque champ.

</div>

<div v-click="3">

évènement **onSubmit** — déclenché quand l'utilisateur soumet le formulaire.

**`e.preventDefault()`** — empêche le rechargement de page natif du `<form>`.

Testez sans : la page se recharge et tout disparaît.

</div>

<!--
e.preventDefault() : le tester sans en live — très efficace pédagogiquement.
Un state par champ est volontairement le chemin principal ici — plus verbeux mais transparent.
La version objet est mentionnée pour les curieux mais pas détaillée : elle sera naturelle en S7 (état API loading/error/data).
-->
