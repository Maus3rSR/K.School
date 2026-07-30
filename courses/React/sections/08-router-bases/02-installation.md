---
layoutClass: gap-x-4
---

# Installer React Router

Ajouter une bibliothèque au projet Vite

::code-group

```bash [pnpm]
# Depuis la racine du projet React + TypeScript
pnpm add react-router-dom
```

```bash [npm]
# Si vous utilisez npm
npm install react-router-dom
```

::

**Vérifier l'installation**

Dans `package.json`, vous devez voir :

```json
"dependencies": {
  "react": "^...",
  "react-dom": "^...",
  "react-router-dom": "^..."
}
```

**TypeScript** est pris en charge : les types sont inclus dans le paquet `react-router-dom`.

<!--
Préciser qu'il n'y a pas de @types/react-router-dom à installer en plus depuis la v6.
Si un apprenant utilise npm, vérifier que react-router-dom apparaît bien dans dependencies (et pas devDependencies).
-->
