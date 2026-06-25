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
  {
    label: "Séance 3 · Événements & State",
    exercices: [
      {
        path: "/04-state/01-compteur-monstre",
        numero: "01",
        titre: "Le compteur de monstre",
        emoji: "⚔️",
        resume:
          "Gère les points de vie d'un monstre avec useState et des boutons d'action.",
        fichiers: [
          "src/exercices/03-evenements-state/01-compteur-monstre/CompteurMonstre.tsx",
        ],
      },
      {
        path: "/04-state/02-identite-monstre",
        numero: "02",
        titre: "L'identité du monstre",
        emoji: "🎲",
        resume:
          "Gère plusieurs states string indépendants pour générer aléatoirement l'identité d'un monstre.",
        fichiers: [
          "src/exercices/03-evenements-state/02-identite-monstre/IdentiteMonstre.tsx",
        ],
      },
      {
        path: "/04-state/03-filtre-bestiaire",
        numero: "03",
        titre: "Le filtre du bestiaire",
        emoji: "🔍",
        resume:
          "Crée un input contrôlé pour filtrer la liste des monstres en temps réel.",
        fichiers: [
          "src/exercices/03-evenements-state/03-filtre-bestiaire/FiltreBestiaire.tsx",
        ],
      },
      {
        path: "/04-state/04-formulaire-monstre",
        numero: "04",
        titre: "Le formulaire du bestiaire",
        emoji: "📝",
        resume:
          "Synthèse de la séance : formulaire contrôlé, onSubmit, e.preventDefault() et state tableau.",
        fichiers: [
          "src/exercices/03-evenements-state/04-formulaire-monstre/FormulaireMonstre.tsx",
        ],
      },
    ],
  },
];

export const exercices: Exercice[] = seances.flatMap((s) => s.exercices);
