---
layout: two-cols-header
layoutClass: gap-x-4
---

# Découvrir la POO

Avantage 2 : Garantir la Cohérence des Données

::left::

<div v-click>

**❌ Sans POO**

```ts {*}{maxHeight:'300px'}
let contact = { 
  nom: "Alice", 
  email: "alice@email.com",
  emailVerifie: true
}

// Ailleurs dans le code...
contact.email = "nouvelle-adresse"
// ⚠️ OUBLI : emailVerifie devrait être false !

// Plus tard...
if (contact.emailVerifie) {
  // Envoi à une mauvaise adresse !
  emailService.sendImportant(contact.email)
}
```

**Données incohérentes = bugs**

</div>

::right::

<div v-click>

**✅ Avec POO**

```ts {*}{maxHeight:'300px'}
class Contact {
  #email
  #emailVerifie

  constructor(nom, email) {
    this.nom = nom
    this.#email = email
    this.#emailVerifie = false
  }

  changerEmail(nouvelEmail) {
    if (!this.#validerFormatEmail(nouvelEmail)) {
      throw new Error("Email invalide")
    }
    this.#email = nouvelEmail
    this.#emailVerifie = false // Cohérence garantie !
    this.#envoyerEmailVerification()
  }

  get email() { return this.#email }
  get estVerifie() { return this.#emailVerifie }
}
```

**La méthode garantit la cohérence**

</div>

<!--
Montrer un vrai problème de cohérence de données
Les attributs privés (#) protègent les données
La méthode assure que les règles métier sont respectées
-->

