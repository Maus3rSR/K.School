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

<TermCard term="pnpm" translation="(Perfomant Node Package Manager)" definition="Gestionnaire de paquets alternatif à npm, plus rapide et économe en espace disque" />

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

## npx — Exécuter des binaires sans installer

```bash
# Exécuter un outil temporairement sans l'installer globalement
npx create-vite mon-app
npx tsc --init
```

<v-click>

> `npx` = exécute le **binaire** d'un paquet : d'abord dans `node_modules` local, sinon télécharge temporairement

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
layout: two-cols-header
layoutClass: gap-x-4
---

# L'écosystème React
`package.json` — La carte d'identité d'un projet NodeJS

::left::

```json {all|2-4|5-9|10-13|14-18}
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

::right::

<div v-click="1" class="text-sm">

**Métadonnées**
- Nom, version
- `private: true` → évite pub accidentelle

</div>

<div v-click="2" class="text-sm">

**Scripts**
- Raccourcis commandes
- `pnpm dev` = `"vite"`

</div>

<div v-click="3" class="text-sm">

**Dependencies**
- Paquets **nécessaires en production**
- Envoyés au navigateur des utilisateurs

</div>

<div v-click="4" class="text-sm">

**DevDependencies**
- Outils de **développement uniquement**
- Restent sur la machine du dev (build, tests...)

</div>

<!--
Chaque highlight correspond à un v-click explicatif.
Bien distinguer dependencies (prod) vs devDependencies (dev uniquement).
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# L'écosystème React
`tsconfig.json` — La configuration TypeScript

::left::

```json {all|2|3-5|6-10}
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["src"]
}
```

::right::

<div v-click="1" class="text-sm">

**`compilerOptions`**
- Conteneur des options de compilation (TS > JS)

</div>

<div v-click="2" class="text-sm">

**Options de base**
- `target` : version JS cible
- `lib` : APIs disponibles (DOM...)
- `module` : système de modules
- `moduleResolution` : comment résoudre les imports
- etc.

</div>

<div v-click="3" class="text-sm">

**Options React & qualité**
- `strict` : contrôles stricts de TypeScript
- `noUnused*` : détecte variables inutilisées
- etc.

</div>

<!--
Ne pas s'attarder trop longtemps ici — ce fichier est généré automatiquement par Vite.
Les apprenants n'ont pas à le modifier pendant la formation.
📚 Référence : https://www.typescriptlang.org/tsconfig
-->

---
layout: center
class: text-center
---

# L'écosystème React
&nbsp;

> 💬 Vous clonez un projet React existant. À quel moment savez-vous que tous les outils sont correctement installés et que vous pouvez coder sereinement ?

<!--
Réponses attendues : quand npm install finit sans erreur, quand npm run dev démarre, quand on voit l'application dans le navigateur.
Cette question prépare l'importance du premier lancement réussi du projet.
Transition : "C'est exactement ce qu'on va faire maintenant — créer un projet propre, le lancer, et vérifier que tout fonctionne ensemble."
-->
