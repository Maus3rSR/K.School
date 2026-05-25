---
layout: two-cols-header
layoutClass: gap-x-4
---

# Découvrir la POO

Avantage 4 : Abstraction et Simplicité d'Usage

::left::

<div v-click>

**❌ Sans POO**

```ts {*}{maxHeight:'300px'}
let contact = {
    nom: "Alice",
    email: "alice@email.com"
}

// L'utilisateur doit connaître toute la complexité
const emailValide = 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)

if (!emailValide) {
  throw new Error("Email invalide")
}

const hash = crypto.createHash('md5')
  .update(contact.email.toLowerCase().trim())
  .digest('hex')

const gravatarUrl = 
    `https://gravatar.com/avatar/${hash}?d=identicon&s=200`

fetch(gravatarUrl)
  .then(response => response.blob())
  .then(blob => /* afficher l'avatar */)
```

**Complexité exposée à l'utilisateur**

</div>

::right::

<div v-click>

**✅ Avec POO**

```ts {*}{maxHeight:'300px'}
class Contact {
  constructor(nom, email) {
    this.nom = nom
    this.email = email
  }

  async chargerAvatar() {
    // Toute la complexité est cachée
    const hash = this.#genererGravatarHash()
    const url = this.#construireGravatarUrl(hash)
    const response = await fetch(url)
    return await response.blob()
  }

  #genererGravatarHash() { /* ... */ }
  #construireGravatarUrl(hash) { /* ... */ }
}

// Utilisation simple
const avatar = await contact.chargerAvatar()
```

**Interface simple, complexité cachée**

</div>

<!--
L'abstraction cache les détails d'implémentation
L'utilisateur n'a pas besoin de connaître le fonctionnement interne
Code plus lisible et maintenable
-->

