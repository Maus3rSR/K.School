---
layout: two-cols-header
layoutClass: gap-x-4
---

# Formulaire contrôlé

Gérer la soumission avec onSubmit

::left::

```tsx {monaco}
import { useState } from 'react'

interface FormData {
  name: string
  email: string
}

function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("Envoyé :", form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name"  value={form.name}  onChange={handleChange} placeholder="Nom" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <button type="submit">Envoyer</button>
    </form>
  )
}
```

::right::

**Points clés**

<v-click>

**e.preventDefault()**

Empêche le rechargement de page (comportement HTML natif du formulaire).

</v-click>

<v-click>

**Un seul state pour plusieurs champs**

```tsx
const [form, setForm] = useState<FormData>({ name: "", email: "" })
// ...
setForm({ ...form, [e.target.name]: e.target.value })
//        ^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//        spread   mise à jour du champ ciblé
```

</v-click>

<v-click>

**Alternatively: un state par champ**

```tsx
const [name,  setName]  = useState("")
const [email, setEmail] = useState("")
```

Plus verbeux mais plus lisible pour les débutants.

</v-click>

<!--
e.preventDefault() : le tester sans — la page se recharge et on perd tout. Très parlant en live.
Le spread ...form est un rappel de l'immutabilité : on crée un nouvel objet, on ne mute pas l'existant.
[e.target.name] est une clé dynamique d'objet (computed property) — peut être déroutant, l'expliquer.
-->
