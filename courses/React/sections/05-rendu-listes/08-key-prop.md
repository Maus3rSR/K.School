---
layout: image-right
image: /list-reconciliation.png
backgroundSize: contain
---

# La prop `key`

Comment React sait quoi mettre à jour dans une liste

**Sans `key`**, React compare les éléments par position.  
Si on supprime le premier élément, il croit que **tout a changé**.

<v-click>

**Avec `key`**, React identifie chaque élément par son identifiant.  
Il sait exactement quel nœud supprimer → le DOM minimal est mis à jour.

</v-click>

<v-click>

**La réconciliation**

React compare l'ancien et le nouvel arbre.  
`key` lui dit *"cet élément de l'ancien arbre correspond à cet élément du nouveau"*.

</v-click>

<!--
Image : deux arbres DOM côte à côte.
Gauche (sans key) : liste [A, B, C] → suppression de A → React re-rend [B, C] entièrement car les positions ont changé.
Droite (avec key) : key="id-a", key="id-b", key="id-c" → React supprime uniquement le nœud A, B et C sont réutilisés.
Style suggéré : fond sombre, nœuds colorés (rouge pour supprimé, vert pour conservé), flèches de correspondance.
Fichier à placer dans : courses/React/public/list-reconciliation.png
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# La prop `key` — en pratique

Choisir la bonne valeur

::left::

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

// ✅ Identifiant métier — la meilleure key
{tasks.map((task) => (
  <TaskItem key={task.id} task={task} />
))}
```

::right::

**Règles pour une bonne `key`**

<v-clicks>

- **Obligatoire** sur chaque élément rendu par `map()`
- **Unique** parmi les frères (siblings) de la liste
- **Stable** : ne change pas entre les rendus
- **Non basée sur l'index** si la liste peut être réordonnée, filtrée ou étendue

</v-clicks>

<v-click>

**`key` n'est pas une prop**

```tsx
function TaskItem({ task }: TaskItemProps) {
  // ❌ task.key → undefined, React ne la transmet pas
  // ✅ utiliser task.id si vous avez besoin de l'id
}
```

</v-click>

<!--
Montrer l'avertissement console en live : "Each child in a list should have a unique key prop."
Bug de l'index : si on insère un élément en début de liste, React pense que l'élément 0 a changé → mauvaise animation, mauvais focus, bug de state d'un input dans la liste.
Key n'est jamais accessible comme prop dans le composant enfant — piège fréquent.
-->
