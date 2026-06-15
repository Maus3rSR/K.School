---
layout: two-cols-header
layoutClass: gap-x-4
---

# Organisation des fichiers

Convention recommandée pour un projet React simple

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

## Par composant complexe

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

::bottom::

<v-click>

> 💡 Les composants **métier** (ex : `InvoiceForm`, `ProductCatalog`) sont plus complexes — ils méritent **leur propre dossier par feature** avec leurs styles, tests et sous-composants.

</v-click>

<v-click>

<div class="text-sm opacity-70 mt-2">

> 📌 **Smart vs Dumb components** — les composants *dumb* (présentation pure) vont dans `components/`, les composants *smart* (logique + données) dans `features/` ou `pages/`.

🔗 [Bulletproof React — Project Structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)

🔗 [Dan Abramov — Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

</div>

</v-click>

<!--
Pas de règle absolue — l'important est la cohérence au sein d'un projet.
Commencer simple (fichier unique) et passer au dossier quand un composant grossit.
-->

---
layout: image-right
image: https://cover.sli.dev?5
---

# Convention de nommage

- **Composants** : PascalCase (`Button.tsx`, `UserCard.tsx`)
- **Fichiers utils** : camelCase (`utils.ts`, `apiClient.ts`)
- **1 composant = 1 fichier** (sauf collections liées)
- **Dossier = nom du composant** (`Card/index.tsx`)

<br/>

> 💡 L'organisation évolue avec la taille du projet — commencez simple

<!--
Ne pas paralyser avec la structure parfaite. Un dossier components/ suffit au début.
L'Atomic Design peut guider l'organisation mais ne doit pas imposer une complexité prématurée.
-->
