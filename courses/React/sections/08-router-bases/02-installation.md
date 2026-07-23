---
layout: two-cols-header
layoutClass: gap-x-4
---

# Installer React Router

Ajouter une bibliothèque au projet Vite

::left::

```bash
# Depuis la racine du projet React + TypeScript
pnpm add react-router-dom
```

```bash
# Si vous utilisez npm
npm install react-router-dom
```

::right::

**Vérifier l'installation**

<v-click>

Dans `package.json`, vous devez voir :

```json
"dependencies": {
  "react": "^...",
  "react-dom": "^...",
  "react-router-dom": "^..."
}
```

</v-click>

<v-click>

**TypeScript** est pris en charge : les types sont inclus dans le paquet `react-router-dom`.

</v-click>

<!--
Préciser qu'il n'y a pas de @types/react-router-dom à installer en plus depuis la v6.
Si un apprenant utilise npm, vérifier que react-router-dom apparaît bien dans dependencies (et pas devDependencies).
-->
