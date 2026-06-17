export type Exercice = {
  path: string;
  numero: string;
  titre: string;
  emoji: string;
  resume: string;
  fichiers: string[];
};

export const exercices: Exercice[] = [
  {
    path: "/02-jsx/01-premier-monstre",
    numero: "01",
    titre: "Ton premier monstre",
    emoji: "🥚",
    resume: "Écris ta toute première fonction-composant qui retourne du JSX.",
    fichiers: [
      "src/exercices/02-jsx-composants/01-premier-monstre/PremierMonstre.tsx",
    ],
  },
  {
    path: "/02-jsx/02-chasse-aux-bugs",
    numero: "02",
    titre: "La chasse aux bugs",
    emoji: "🐛",
    resume: "Une affiche est pleine d\u2019erreurs JSX. À toi de la réparer !",
    fichiers: [
      "src/exercices/02-jsx-composants/02-chasse-aux-bugs/AfficheReparee.tsx",
    ],
  },
  {
    path: "/02-jsx/03-import-export",
    numero: "03",
    titre: "Le bestiaire",
    emoji: "📚",
    resume:
      "Découpe ton code en fichiers, puis compose ton bestiaire de monstres.",
    fichiers: [
      "src/exercices/02-jsx-composants/03-import-export/CarteMonstre.tsx",
      "src/exercices/02-jsx-composants/03-import-export/Bestiaire.tsx",
    ],
  },
];
