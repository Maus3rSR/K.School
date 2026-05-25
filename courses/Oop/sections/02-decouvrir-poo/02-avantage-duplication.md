---
layout: two-cols-header
layoutClass: gap-x-4
---

# Découvrir la POO

Avantage 1 : Éviter la Duplication de Code

::left::
<div v-click>

**❌ Sans POO**

```ts {*}{maxHeight:'300px'}
let contact1 = { 
    nom: "Alice",
    email: "alice@email.com"
}
let contact2 = { 
    nom: "Bob",
    email: "bob@email.com"
}

// Envoyer email à Alice
emailService.send({
  to: contact1.email,
  subject: `Bienvenue ${contact1.nom}`,
  body: templateEngine
    .render('welcome', contact1),
  tracking: analyticsService
    .createTracker(contact1.email)
})

// Envoyer email à Bob - MÊME CODE !
emailService.send({
  to: contact2.email,
  subject: `Bienvenue ${contact2.nom}`,
  body: templateEngine
    .render('welcome', contact2),
  tracking: analyticsService
    .createTracker(contact2.email)
})
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

  envoyerEmail(template) {
    emailService.send({
      to: this.email,
      subject: `Bienvenue ${this.nom}`,
      body: templateEngine
        .render(template, this),
      tracking: analyticsService
        .createTracker(this.email)
    })
  }
}

let contact1 = new Contact(
    "Alice",
    "alice@email.com"
)
let contact2 = new Contact(
    "Bob",
    "bob@email.com"
)

contact1.envoyerEmail('welcome')
contact2.envoyerEmail('welcome')
```

</div>

::bottom::
<div v-click>

**Le comportement complexe est écrit une seule fois**

</div>

<!--
Montrer que la duplication n'est pas juste 2 lignes mais toute la logique métier
Pseudo-code réaliste avec services externes
-->

