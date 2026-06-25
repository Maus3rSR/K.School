---
layout: two-cols-header
layoutClass: gap-x-4
---

# Formulaire contrôlé

Combiner plusieurs states et onSubmit

::left::

```tsx {monaco}
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

::right::

**Points clés**

<v-click>

**e.preventDefault()**

Empêche le rechargement de page — comportement HTML natif du `<form>`.

Testez sans : la page se recharge et tout disparaît.

</v-click>

<v-click>

**Un state par champ**

Simple, lisible, facile à déboguer. Chaque champ a son propre setter.

```tsx
const [name,  setName]  = useState("")
const [email, setEmail] = useState("")
```

</v-click>

<v-click>

**Pour aller plus loin**

Un objet dans le state (pattern avancé) :

```tsx
const [form, setForm] = useState({ name: "", email: "" })
setForm({ ...form, name: "Ada" })
```

</v-click>

<!--
e.preventDefault() : le tester sans en live — très efficace pédagogiquement.
Un state par champ est volontairement le chemin principal ici — plus verbeux mais transparent.
La version objet est mentionnée pour les curieux mais pas détaillée : elle sera naturelle en S7 (état API loading/error/data).
-->
