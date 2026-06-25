---
layout: two-cols-header
layoutClass: gap-x-4
---

# La prop `key` — indispensable

Comment React sait quoi mettre à jour dans une liste

::left::

<!-- IMAGE PLACEHOLDER
  Fichier cible : public/list-reconciliation.png
  Contenu : Deux arbres DOM côte à côte.
  Gauche (sans key) : une liste [A, B, C] → on supprime A → React doit re-rendre [B, C] entièrement.
  Droite (avec key) : la même liste avec key="id-a", key="id-b", key="id-c" → React supprime uniquement le nœud A, B et C sont réutilisés.
  Style : fond sombre, nœuds colorés, flèches de comparaison.
-->

```tsx
// ❌ Avertissement dans la console
{fruits.map((fruit) => (
  <li>{fruit}</li>
))}

// ✅ key stable et unique
{fruits.map((fruit) => (
  <li key={fruit}>{fruit}</li>
))}

// ⚠️ index comme key — à éviter si la liste change
{fruits.map((fruit, index) => (
  <li key={index}>{fruit}</li>
))}
```

::right::

**Pourquoi `key` est obligatoire**

React compare l'ancienne liste et la nouvelle pour ne mettre à jour que ce qui a changé.  
`key` lui permet d'identifier **quel élément est quel élément**.

<v-click>

**Règles pour une bonne `key`**

- **Unique** parmi les frères (siblings)
- **Stable** : ne change pas entre les rendus
- **Non basée sur l'index** si la liste peut être réordonnée, filtrée ou étendue

</v-click>

<v-click>

**Bonne source de `key`**

```tsx
// ✅ Identifiant métier stable
tasks.map((task) => (
  <TaskItem key={task.id} task={task} />
))
```

</v-click>

<!--
Montrer l'avertissement console en live : "Each child in a list should have a unique key prop."
Expliquer le bug de l'index : si on insère un élément en début de liste, React pense que l'élément 0 a changé → mauvaise animation, mauvais focus, bug de state.
Key n'est pas accessible comme prop dans le composant enfant.
-->
