---
layout: two-cols-header
layoutClass: gap-x-4
---

# Décomposer une UI en composants

*Thinking in React — Step 1 : Break the UI into a component hierarchy*

::left::

```
┌─────────────────────────────┐
│  FilterableProductTable     │
│  ┌───────────────────────┐  │
│  │  SearchBar            │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │  ProductTable         │  │
│  │  ┌─────────────────┐  │  │
│  │  │ ProductCategoryRow│ │  │
│  │  └─────────────────┘  │  │
│  │  ┌─────────────────┐  │  │
│  │  │  ProductRow     │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

::right::

**Règle du principe de responsabilité unique** :

Un composant devrait idéalement ne faire **qu'une seule chose**.

<v-click>

S'il grossit → **le décomposer** en sous-composants.

</v-click>

<v-click>

> Si votre JSON est bien structuré, la hiérarchie des composants **reflète naturellement** la structure des données.

</v-click>

<!--
Exemple tiré de : https://react.dev/learn/thinking-in-react
La hiérarchie dans le code ASCII représente l'exemple officiel React (table de produits filtrables).
Principe de responsabilité unique = concept clé à ancrer dès maintenant.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# L'UI comme un arbre

*Understanding Your UI as a Tree · react.dev*

::left::

```
        App
       /   \
  Header   Main
           /  \
        Card  Card
        /
     Avatar
```

- **Racine** (`App`) — composant de départ
- **Composants parents** — contiennent d'autres composants
- **Feuilles** (`Avatar`, `Card`) — sans enfants, souvent réutilisés

::right::

React modélise vos composants en **arbre de rendu**

<v-click>

Avantages :
- Comprendre le **flux de données** (parent → enfant)
- Identifier les composants **lourds** (proches de la racine)
- Repérer les composants **fréquemment re-rendus** (feuilles)

</v-click>

<!--
Référence : https://react.dev/learn/understanding-your-ui-as-a-tree
Ne pas aller trop loin sur le render tree — juste planter l'idée visuelle.
Ce concept reviendra naturellement quand on parlera du state et des re-rendus.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Atomic Design ↔ React

*Brad Frost · bradfrost.com/blog/link/thinking-about-react-atomically*

::left::

## Atomic Design

| Niveau | Exemple |
|--------|---------|
| ⚛️ Atomes | `<Button>`, `<Input>`, `<Label>` |
| 🧪 Molécules | `<SearchBar>` = Input + Button |
| 🦠 Organismes | `<Header>` = Logo + Nav + SearchBar |
| 📄 Templates | Mise en page générale |
| 🖥️ Pages | Instance réelle avec données |

::right::

## React suit ce principe naturellement

<v-click>

> *"React, at its core, follows Atomic Design inherently by encouraging developers to keep components as simple and as broken down as possible."*

<div class="text-sm opacity-60">— Brad Frost</div>

</v-click>

<v-click>

Chaque composant React = **une brique** qu'on assemble avec d'autres.

</v-click>

<!--
Source : https://bradfrost.com/blog/link/thinking-about-react-atomically/
Atomic Design est un vocabulaire commun avec les designers — utile en contexte professionnel.
Ne pas imposer la terminologie stricte : c'est une inspiration, pas une règle.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Composer des composants

Un composant peut en **contenir** d'autres

::left::

```tsx {none|1-5|7-11|13-20|all}
function Avatar() {
  return (
    <img src="photo.jpg" alt="Avatar" />
  )
}

function Label({ text }: { text: string }) {
  return (
    <p>{text}</p>
  )
}

function Card() {
  return (
    <div className="card">
      <Avatar />
      <Label text="Kevin Unfricht" />
    </div>
  )
}
```

::right::

<div v-click="1">

**`Avatar`** — composant feuille, affiche une image

</div>

<div v-click="2">

**`Label`** — composant feuille, affiche du texte

</div>

<div v-click="3">

**`Card`** — composant parent qui **compose** les deux

</div>

<div v-click="4">

> C'est la puissance de React : assembler des briques simples pour créer des interfaces complexes.

</div>

<!--
Introduire { text } dans Label très brièvement — juste montrer que ça existe.
Les props seront approfondies en séance 3.
-->

---
layout: two-cols-header
---

# Organisation des fichiers

Convention recommandée pour un projet React

::left::

## Par composant simple

```
src/
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Avatar.tsx
├── pages/
│   ├── Home.tsx
│   └── About.tsx
└── App.tsx
```

::right::

## Par dossier (composant complexe)

```
src/
├── components/
│   ├── Card/
│   │   ├── index.tsx
│   │   ├── Card.module.css
│   │   └── CardHeader.tsx
│   └── Button.tsx
└── App.tsx
```

<!--
Pas de règle absolue — l'important est la cohérence au sein d'un projet.
Commencer simple (fichier unique) et passer au dossier quand un composant grossit.
-->

---
layout: center
class: text-center
---

# Chapitre 02 — Composants & JSX

&nbsp;

> 💬 On sait créer des composants et les composer.<br/>
> Mais comment passer des **données différentes** à un même composant selon le contexte ?

<!--
Transition vers la séance 3 : les props.
Laisser la question ouvrir la curiosité — ne pas répondre maintenant.
Exemple à poser : "Notre Card affiche toujours le même nom et la même photo — comment en faire une vraie brique réutilisable ?"
-->
