---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice guidé — Détails de films

À faire ensemble

::left::

Vous disposez d'une liste de films :

```tsx
const movies = [
  { id: 1, title: 'Inception', year: 2010 },
  { id: 2, title: 'Interstellar', year: 2014 },
]
```

Objectif : afficher la fiche d'un film à l'URL `/movies/:id`.

::right::

**Consignes**

<v-click>

1. Créer les composants `MovieList` et `MovieDetail`
2. Ajouter la route `/movies` et `/movies/:id`
3. Dans `MovieDetail`, utiliser `useParams` pour lire l'ID
4. Afficher le titre et l'année du film correspondant

</v-click>

<v-click>

**Critère de réussite**

- `/movies` affiche la liste
- Cliquer sur un film amène à `/movies/1` avec les bonnes informations
- Si l'ID n'existe pas, afficher "Film non trouvé"

</v-click>

<!--
Exercice collectif de 15-20 minutes. Le formateur peut coder en direct ou guider étape par étape. L'entité est volontairement différente de products (domaine cinéma).
Aide graduée : indice 1 "quel hook pour lire l'URL ?", indice 2 "comment convertir l'ID ?", indice 3 montrer l'appel à movies.find.
-->
