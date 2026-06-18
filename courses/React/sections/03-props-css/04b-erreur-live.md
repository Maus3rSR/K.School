---
layout: two-cols-header
layoutClass: gap-x-4
---

# TypeScript vous protège, en live

Essayez : retirez une prop et observez l'erreur

::left::

```ts {monaco}
interface CardProps {
  name: string
  role: string
}

function Card({ name, role }: CardProps) {
  return `${name} — ${role}`
}

// 👇 Il manque la prop "role"
Card({ name: "Ada Lovelace" })
```

::right::

**Une vraie erreur, tout de suite**

TypeScript souligne l'appel en **rouge** : `role` est obligatoire et manquant.

<v-click>

**À tester ensemble**

- Ajoutez `role: "..."` → l'erreur disparaît
- Tapez `name: 42` → nouvelle erreur de **type**
- Survolez `Card` → l'éditeur affiche la signature attendue

</v-click>

<!--
Éditeur Monaco interactif : on PEUT modifier le code en direct pendant le cours.
Exemple volontairement en TS pur (pas de JSX) pour que le vérificateur de types fonctionne sans dépendre des types React.
Objectif : rendre tangible le "filet de sécurité" du typage des props vu à la slide précédente.
-->
