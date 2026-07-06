---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice autonome — Liste d'utilisateurs

Seul cette fois

::left::

```tsx
interface User {
  id: number
  name: string
  email: string
}

function UserList() {
  // À vous : reproduire le pattern de PostList
  // avec l'endpoint /users

  return null
}
```

::right::

**Consignes**

<v-click>

1. `fetch('https://jsonplaceholder.typicode.com/users')`
2. États `users`, `isLoading`, `error` typés
3. Vérifier `response.ok` avant de parser
4. Afficher `name` et `email` de chaque utilisateur

</v-click>

<v-click>

**Critère de réussite**

Le composant affiche "Chargement...", puis la liste de 10 utilisateurs, et affiche une erreur propre si l'URL est modifiée pour être invalide

</v-click>

<!--
Exercice autonome de 15-20 minutes — ne pas donner la solution avant que la majorité ait terminé.
Aide graduée si blocage : indice 1 "quel est le pattern qu'on vient de voir avec PostList ?", indice 2 "combien d'états faut-il déclarer ?", indice 3 montrer juste la ligne du fetch.
Faire tester volontairement une mauvaise URL pour vérifier que l'erreur s'affiche (et pas un plantage silencieux).
-->
