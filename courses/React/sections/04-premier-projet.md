---
layout: cover
background: https://cover.sli.dev?5
---

# Chapitre 04 - Premier Projet React

---

# Premier Projet React
Vite — L'outil de build moderne

- **Vite** (prononcé "vite" 🇫🇷) — créé par Evan You (auteur de Vue.js)
- Démarre un serveur de développement en **millisecondes**
- Remplace Create React App (CRA), plus lent et obsolète
- Fournit des templates prêts à l'emploi, dont **react-ts**

<!--
CRA était l'outil officiel React pendant des années, mais il est trop lent et non maintenu.
Vite = outil de choix en 2024 pour les projets React.
-->

---

# Premier Projet React
Créer le projet

**Note: Allez dans le dossier où vous voulez créer le projet, qui sera nommé 'WishFlix', et ouvrez le dans VSCode**

```bash
# Créer un projet React + TypeScript avec Vite
# Normalement à la place de '.' on met le nom du projet, mais comme on est déjà dans le dossier, on met '.' pour éviter de créer un sous-dossier
pnpm create vite@latest .

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev
```

<v-click>

Ouvrez votre navigateur sur **http://localhost:5173** 🎉

</v-click>

<!--
Lancer en live avec les apprenants. Attendre que tout le monde ait le serveur démarré.
Si erreur "node not found" → vérifier l'installation de Node.js (version 18+).
-->

---
layout: two-cols-header
---

# Premier Projet React
Structure du projet

::left::

```
mon-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.tsx       ← Composant principal
│   ├── index.css
│   ├── main.tsx      ← Point d'entrée
│   └── vite-env.d.ts
├── index.html        ← L'unique HTML
├── package.json
├── tsconfig.json     ← Config TypeScript
└── vite.config.ts    ← Config Vite
```

::right::

- **`index.html`** — la seule page HTML (SPA !)
- **`src/main.tsx`** — point d'entrée de l'app
- **`src/App.tsx`** — composant racine
- **`.tsx`** — fichiers React avec TypeScript
- **`tsconfig.json`** — règles TypeScript
- **`package.json`** — dépendances et scripts

<!--
Ouvrir le projet dans VSCode en live.
Montrer chaque fichier pendant l'explication.
Insister : on ne touche presque jamais à index.html — React s'en occupe.
-->

---

# Premier Projet React
Le fichier `main.tsx`

```tsx {all|1-3|5|7-11}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- Importe React et les outils de rendu
- Cible l'élément `#root` dans `index.html`
- Monte le composant `<App />` dans la page
- `StrictMode` : active des avertissements utiles en développement

<!--
StrictMode ne change rien en production — il aide à détecter les mauvaises pratiques.
Le ! après getElementById est une assertion TypeScript ("je garantis que cet élément existe").
-->

---

# Premier Projet React
Le fichier `App.tsx`

```tsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Vite + React</h1>
      <button onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
    </div>
  )
}

export default App
```

<!--
Ne pas expliquer useState en détail maintenant (séance 4).
Montrer que : 1) c'est une fonction, 2) elle retourne du HTML-like, 3) elle est exportée.
-->

---
layout: center
---

# Premier Projet React
&nbsp;

Modifions ensemble notre premier composant !

```tsx
function App() {
  return (
    <div>
      <h1>Bonjour React ! 👋</h1>
      <p>Mon premier projet React + TypeScript</p>
    </div>
  )
}

export default App
```

> Sauvegardez et regardez le navigateur se mettre à jour **instantanément** ⚡

<!--
Exercice en live : demander aux apprenants de modifier le titre avec leur prénom.
C'est le HMR (Hot Module Replacement) de Vite — pas besoin de rafraîchir manuellement.
-->

---
layout: two-cols-header
---

# Premier Projet React
Scripts disponibles

::left::

## Développement
```bash
pnpm dev
```

- Démarre le serveur local
- Hot reload automatique
- Ouvert sur **http://localhost:5173**

## Build de production
```bash
pnpm build
```

- Optimise et compile le code
- Crée le dossier `dist/`

::right::

## Prévisualiser le build
```bash
pnpm preview
```

- Sert le dossier `dist/` localement
- Simule le comportement en production

## Vérification TypeScript
```bash
pnpm type-check  # (si configuré)
tsc --noEmit
```

<!--
pnpm dev = ce qu'on utilise 99% du temps.
pnpm build = quand on veut déployer l'application.
-->

---
layout: center
class: text-center
---

# Premier Projet React
&nbsp;

> 💬 Votre projet tourne dans le navigateur. Qu'est-ce qui vous a **surpris** pendant l'installation ?

<!--
Féliciter les apprenants — ils ont créé leur premier projet React !
Homework suggéré : modifier App.tsx pour afficher leur nom et une couleur préférée.
Prochaine séance : JSX/TSX en profondeur et création de nos premiers composants.
-->
