---
layout: cover
background: https://cover.sli.dev?45
---

# Chapitre 03b - L'écosystème React

---
layout: two-cols-header
layoutClass: gap-x-6
---

# L'écosystème React
Les outils — Vue d'ensemble

::left::

<TermCard term="Node.js" definition="Environnement d'exécution JavaScript côté serveur, nécessaire pour les outils de développement front-end" />

<TermCard term="npm" translation="(Node Package Manager)" definition="Gestionnaire de paquets par défaut de Node.js" />

<TermCard term="pnpm" definition="Gestionnaire de paquets alternatif à npm, plus rapide et économe en espace disque" />

::right::

<TermCard term="package.json" definition="Fichier de configuration du projet : dépendances, scripts, métadonnées" />

<TermCard term="tsconfig.json" definition="Fichier de configuration TypeScript : règles du compilateur pour le projet" />

<TermCard term="TypeScript" definition="Sur-ensemble typé de JavaScript compilé vers du JS standard" />

<!--
Ce tableau d'outils est le kit de survie de tout développeur React.
Ils seront tous présents dans chaque projet créé pendant la formation.
-->

---

# L'écosystème React
Node.js — Le moteur

<v-clicks>

- **Node.js** = JavaScript qui tourne **en dehors du navigateur**
- Permet d'exécuter les outils de développement : Vite, compilateur TS, gestionnaire de paquets...
- **Pas utilisé directement** dans vos composants React — c'est l'infrastructure
- Version recommandée : **Node 18+** (LTS)

</v-clicks>

<v-click>

📚 Documentation : [nodejs.org](https://nodejs.org/) — [Téléchargement LTS](https://nodejs.org/en/download)

```bash
node --version   # Vérifier l'installation
# v20.x.x ✅
```

</v-click>

<!--
Analogie : Node.js c'est comme une cuisine professionnelle — vous n'y mangez pas directement,
mais sans elle vous ne pouvez pas préparer les plats (votre application).
Piège classique : "Node.js c'est pas React, c'est juste l'environnement qui fait tourner les outils."
-->

---
layout: two-cols-header
---

# L'écosystème React
npm — Le gestionnaire de paquets

::left::

## C'est quoi ?
- Livré **avec Node.js** automatiquement
- Accède à **+2 millions de paquets** sur [npmjs.com](https://www.npmjs.com/)
- Gère les dépendances de votre projet

## Commandes essentielles

```bash
# Installer toutes les dépendances du projet
npm install

# Installer un paquet spécifique
npm install react-router-dom

# Lancer un script du package.json
npm run dev
npm run build
```

::right::

## npx — Exécuter sans installer

```bash
# Créer un projet sans installer l'outil globalement
npx create-vite mon-app
```

<v-click>

> `npx` = exécute un paquet **temporairement** sans le garder installé

</v-click>

<v-click>

📚 Documentation : [docs.npmjs.com](https://docs.npmjs.com/)

</v-click>

<!--
npm install = lit le package.json et télécharge tout ce qui est listé.
npm run = exécute un script défini dans "scripts" du package.json.
npx = pratique pour les outils one-shot comme les générateurs de projet.
-->

---
layout: two-cols-header
---

# L'écosystème React
pnpm — Le remplaçant moderne de npm

::left::

## Avantages vs npm

<v-clicks>

- ⚡ **2-3x plus rapide** que npm
- 💾 **Économe en espace** : partage les paquets entre projets (store global)
- 🔒 **Strict** : évite les dépendances fantômes
- ✅ **Compatible** avec tous les projets npm

</v-clicks>

::right::

## Commandes équivalentes

| npm | pnpm |
|-----|------|
| `npm install` | `pnpm install` |
| `npm install X` | `pnpm add X` |
| `npm run dev` | `pnpm dev` |
| `npm run build` | `pnpm build` |
| `npx X` | `pnpm dlx X` |

<v-click>

📚 Documentation : [pnpm.io](https://pnpm.io/fr/)

</v-click>

<!--
On utilise pnpm dans ce cours. La logique est identique à npm.
Si les apprenants ont un projet existant avec npm, ils peuvent migrer avec "pnpm import".
pnpm dlx = équivalent de npx pour pnpm.
-->

---

# L'écosystème React
`package.json` — La carte d'identité du projet

```json {all|2-4|5-9|10-14|15-18}
{
  "name": "mon-app",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "~5.6.0",
    "vite": "^6.0.0"
  }
}
```

<!--
dependencies = paquets nécessaires en production (React lui-même).
devDependencies = paquets nécessaires seulement en développement (TypeScript, Vite...).
scripts = raccourcis de commandes. "pnpm dev" exécute la valeur de "dev".
-->

---

# L'écosystème React
`tsconfig.json` — La configuration TypeScript

```json {all|2|3-5|6-10}
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["src"]
}
```

<v-clicks>

- **`strict: true`** — active tous les contrôles TypeScript stricts (recommandé)
- **`jsx: "react-jsx"`** — permet d'utiliser JSX/TSX dans les fichiers React
- **`include: ["src"]`** — TypeScript surveille uniquement le dossier `src/`

</v-clicks>

<!--
Ne pas s'attarder trop longtemps ici — ce fichier est généré automatiquement par Vite.
Les apprenants n'ont pas à le modifier pendant la formation.
Juste savoir qu'il existe et à quoi il sert.
📚 Référence : https://www.typescriptlang.org/tsconfig
-->

---
layout: default
---

# L'écosystème React
Récapitulatif — Les outils de votre quotidien

<v-clicks>

- ✅ **Node.js** — moteur JS côté machine, indispensable pour les outils front-end
- ✅ **npm** — gestionnaire de paquets par défaut, commandes `install` / `run` / `npx`
- ✅ **pnpm** — alternative rapide et économe, on l'utilise dans ce cours
- ✅ **package.json** — manifeste du projet : dépendances + scripts
- ✅ **TypeScript** — JS avec types, détecte les erreurs à l'écriture
- ✅ **tsconfig.json** — règles du compilateur TypeScript, généré automatiquement

</v-clicks>

<v-click>

> Tous ces fichiers seront **déjà configurés** quand on crée un projet avec Vite 👉

</v-click>

<!--
Transition naturelle vers le chapitre suivant : on va créer le projet et tous ces fichiers
apparaîtront automatiquement. Les apprenants pourront les reconnaître.
-->
