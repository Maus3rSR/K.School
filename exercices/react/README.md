# 🐲 MonsterDex — Exercices React

Projet d'entraînement pour le cours **React + TypeScript** de K.School.

Tu vas construire, exercice après exercice, une petite application : une galerie
de monstres rigolos. Chaque exercice te fait pratiquer une notion du cours.

## 🚀 Démarrer

Depuis ce dossier (`exercices/react/`) :

```bash
pnpm install   # une seule fois, depuis la racine du dépôt
pnpm dev       # lance le serveur de développement (Vite)
```

Ouvre l'URL affichée (par défaut http://localhost:5173) et **navigue entre les
exercices** grâce au menu de gauche.

> 💡 **Un seul projet, un seul `pnpm dev`.** Contrairement aux autres packages
> d'exercices (un script par exercice), un composant React ne se lance pas seul :
> il faut le serveur Vite. La navigation entre exercices se fait donc **par
> les routes** (React Router), pas par des scripts npm séparés.

## 🗂️ Organisation

```
src/
├── main.tsx          # point d'entrée (monte le routeur)
├── App.tsx           # layout + menu + routes
├── Home.tsx          # page d'accueil
├── exercices.ts      # liste des exercices (menu + pages)
├── components/
│   └── Exercice.tsx  # cadre commun (titre, doc, aperçu)
└── exercices/
    └── 02-jsx-composants/        # Séance 2 — JSX & Composants
        ├── 01-premier-monstre/
        ├── 02-chasse-aux-bugs/
        └── 03-import-export/
```

Chaque dossier d'exercice contient :
- un **`README.md`** avec les consignes (objectif, étapes, indices, critères) ;
- le ou les **fichiers `.tsx`** à compléter.

## 📚 Exercices disponibles

| # | Exercice | Notion | Réf. react.dev |
|---|----------|--------|----------------|
| 01 | Ton premier monstre | Écrire un composant | [your-first-component](https://react.dev/learn/your-first-component) |
| 02 | La chasse aux bugs | Règles du JSX | [writing-markup-with-jsx](https://react.dev/learn/writing-markup-with-jsx) |
| 03 | Le bestiaire | Import / export & composition | [importing-and-exporting-components](https://react.dev/learn/importing-and-exporting-components) |

## 🧰 Stack

React 19 · TypeScript · Vite · React Router · Tailwind CSS v4 · daisyUI v5

## 🛠️ Scripts

| Commande | Effet |
|----------|-------|
| `pnpm dev` | Serveur de dev avec rechargement à chaud |
| `pnpm build` | Build de production |
| `pnpm typecheck` | Vérifie les types TypeScript |
