---
layout: two-cols-header
layoutClass: gap-x-4
---

# Découvrir la POO

Avantage 3 : Responsabilité Claire

::left::

<div v-click>

**❌ Sans POO**

```ts {*}{maxHeight:'300px'}
let contact = { nom: "Alice", email: "alice@email.com" }

// Qui est responsable de formater l'affichage ?
function afficherContact(contact) {
  return `${contact.nom} <${contact.email}>`
}

// Qui est responsable de la validation ?
function validerContact(contact) {
  return contact.nom && contact.email.includes('@')
}

// Qui est responsable de l'export ?
function exporterContactVersJSON(contact) {
  return JSON.stringify({
    displayName: contact.nom,
    emailAddress: contact.email
  })
}

// Fonctions éparpillées partout !
```

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

  // Le contact sait se formater
  toString() {
    return `${this.nom} <${this.email}>`
  }

  // Le contact sait se valider
  estValide() {
    return this.nom && this.email.includes('@')
  }

  // Le contact sait s'exporter
  toJSON() {
    return {
      displayName: this.nom,
      emailAddress: this.email
    }
  }
}
```
</div>

::bottom::
<div v-click>

**Chaque objet gère ses propres responsabilités**

</div>

<!--
Principe de responsabilité unique
L'objet encapsule ses propres comportements
Plus facile à maintenir et à tester
-->

