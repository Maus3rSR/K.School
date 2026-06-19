export type Exercice = {
  path: string;
  numero: string;
  titre: string;
  emoji: string;
  resume: string;
  fichiers: string[];
};

export const seances: { label: string; exercices: Exercice[] }[] = [
  {
    label: "Séance 1 · JSX & Composants",
    exercices: [
      {
        path: "/02-jsx/01-premier-monstre",
        numero: "01",
        titre: "Ton premier monstre",
        emoji: "🥚",
        resume:
          "Écris ta toute première fonction-composant qui retourne du JSX.",
        fichiers: [
          "src/exercices/02-jsx-composants/01-premier-monstre/PremierMonstre.tsx",
        ],
      },
      {
        path: "/02-jsx/02-chasse-aux-bugs",
        numero: "02",
        titre: "La chasse aux bugs",
        emoji: "🐛",
        resume: "Une affiche est pleine d’erreurs JSX. À toi de la réparer !",
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
      {
        path: "/02-jsx/04-donjon-decompose",
        numero: "04",
        titre: "Le donjon décomposé",
        emoji: "🏰",
        resume:
          "Démantèle un bloc JSX monolithique en composants réutilisables.",
        fichiers: [
          "src/exercices/01-jsx-composants/04-donjon-decompose/Monstre.tsx",
          "src/exercices/01-jsx-composants/04-donjon-decompose/SalleDonjon.tsx",
          "src/exercices/01-jsx-composants/04-donjon-decompose/Tresor.tsx",
          "src/exercices/01-jsx-composants/04-donjon-decompose/Donjon.tsx",
        ],
      },
    ],
  },
  {
    label: "Séance 2 · Props & CSS",
    exercices: [
      {
        path: "/03-props/01-carte-monstre",
        numero: "01",
        titre: "La carte personnalisable",
        emoji: "🃏",
        resume: "Passe des props à un composant pour le rendre réutilisable.",
        fichiers: [
          "src/exercices/02-props-css/01-carte-monstre/CarteMonstreProps.tsx",
        ],
      },
      {
        path: "/03-props/02-bouton-variante",
        numero: "02",
        titre: "Le bouton à variantes",
        emoji: "🎨",
        resume:
          "Utilise un type union pour adapter la className selon la prop variant.",
        fichiers: [
          "src/exercices/02-props-css/02-bouton-variante/BoutonVariante.tsx",
        ],
      },
      {
        path: "/03-props/03-encart",
        numero: "03",
        titre: "L'encart enveloppant",
        emoji: "📦",
        resume:
          "Découvre la prop children pour envelopper n'importe quel contenu.",
        fichiers: ["src/exercices/02-props-css/03-encart/Encart.tsx"],
      },
      {
        path: "/03-props/04-fiche-combat",
        numero: "04",
        titre: "La fiche de combat",
        emoji: "⚔️",
        resume:
          "Synthèse de la séance : props typées, valeur par défaut, children et CSS dynamique.",
        fichiers: [
          "src/exercices/02-props-css/04-fiche-combat/FicheCombat.tsx",
        ],
      },
    ],
  },
];

export const exercices: Exercice[] = seances.flatMap((s) => s.exercices);
