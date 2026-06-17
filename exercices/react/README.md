# 🐲 MonsterDex — Exercices React

Projet d'entraînement pour le cours **React + TypeScript** de K.School.

Tu vas construire, exercice après exercice, une petite application : une galerie
de monstres rigolos. Chaque exercice te fait pratiquer une notion du cours.

## 🚀 Démarrer

Depuis ce dossier :

```bash
pnpm install   # une seule fois, depuis la racine du dépôt
pnpm dev       # lance le serveur de développement (Vite)
```

Ouvre l'URL affichée et **navigue entre les
exercices** grâce au menu de gauche.

## 🗂️ Organisation

```
src/
├── main.tsx          
├── App.tsx           
├── Home.tsx          
├── exercices.ts      
├── components/
│   └── Exercice.tsx 
└── exercices/        # C'est dans ces dossiers que vous travaillez
    └── 01-jsx-composants/        # Thématique 1 — JSX & Composants
        ├── 01-premier-monstre/   # Exercice 1
        ├── 02-chasse-aux-bugs/   # Exercice 2
        └── 03-import-export/     # Exercice 3
```

Chaque dossier d'exercice contient :
- un **`README.md`** avec les consignes (objectif, étapes, indices, critères) ;
- le ou les **fichiers `.tsx`** à compléter.