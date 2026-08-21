---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice autonome — Détail d'un livre

Seul cette fois

::left::

Vous partez de cette structure :

```tsx
<Route path="/" element={<AppLayout />}>
  <Route path="books" element={<BookList />} />
  {/* À compléter : /books/:id */}
</Route>
```

::right::

**Consignes**

<v-click>

1. Créer le composant `BookDetail`
2. Ajouter la route dynamique `/books/:id`
3. Utiliser `useParams` pour récupérer l'ISBN (string cette fois)
4. Afficher le titre, l'auteur et l'année du livre

</v-click>

<v-click>

**Critère de réussite**

- L'URL `/books/978-3-16-148410-0` affiche le bon livre
- `AppLayout` reste visible autour du contenu
- Le type du paramètre reste une `string`

</v-click>

<!--
Exercice autonome de 15-20 minutes. Le sujet change volontairement de films : livres/ISBN (string) pour forcer à ne pas convertir en number systématiquement.
Aide graduée : indice 1 "où placer BookDetail ?", indice 2 "useParams avec un generic ?", indice 3 montrer l'appel à books.find((b) => b.isbn === isbn).
-->
