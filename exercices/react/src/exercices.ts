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
        resume: "Une affiche est pleine d'erreurs JSX. À toi de la réparer !",
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
  {
    label: "Séance 4 · Rendu conditionnel & Listes",
    exercices: [
      {
        path: "/05-listes/01-monstre-vivant",
        numero: "01",
        titre: "Le monstre vivant",
        emoji: "🐉",
        resume:
          "Utilise && et le ternaire pour afficher ou masquer des éléments selon l'état du monstre.",
        fichiers: [
          "src/exercices/04-rendu-conditionnel-listes/01-monstre-vivant/MonstreVivant.tsx",
        ],
      },
      {
        path: "/05-listes/02-galerie-monstres",
        numero: "02",
        titre: "La galerie de monstres",
        emoji: "🗂️",
        resume:
          "Affiche un tableau d'objets typés Monstre[] avec map() et la prop key.",
        fichiers: [
          "src/exercices/04-rendu-conditionnel-listes/02-galerie-monstres/GalerieMonstres.tsx",
        ],
      },
      {
        path: "/05-listes/03-filtre-type",
        numero: "03",
        titre: "Le filtre du bestiaire",
        emoji: "🔎",
        resume:
          "Filtre dynamiquement la liste de monstres par type avec useState et filter().",
        fichiers: [
          "src/exercices/04-rendu-conditionnel-listes/03-filtre-type/FiltreBestiaire.tsx",
        ],
      },
      {
        path: "/05-listes/04-bestiaire-complet",
        numero: "04",
        titre: "Le bestiaire complet",
        emoji: "📖",
        resume:
          "Synthèse : recherche, filtrage multi-critères, badge de rareté typé et suppression.",
        fichiers: [
          "src/exercices/04-rendu-conditionnel-listes/04-bestiaire-complet/BestiaireComplet.tsx",
        ],
      },
    ],
  },
  {
    label: "Séance 5 · Cycle de vie & Hooks",
    exercices: [
      {
        path: "/06-hooks/01-rugissement-monstre",
        numero: "01",
        titre: "Le rugissement du monstre",
        emoji: "🔊",
        resume:
          "Utilise useEffect pour faire rugir le monstre automatiquement à son apparition.",
        fichiers: [
          "src/exercices/05-cycle-vie-hooks/01-rugissement-monstre/RugissementMonstre.tsx",
        ],
      },
      {
        path: "/06-hooks/02-regeneration-monstre",
        numero: "02",
        titre: "La régénération du monstre",
        emoji: "💚",
        resume:
          "Ajoute un intervalle de régénération avec useEffect, puis nettoie-le pour éviter la fuite.",
        fichiers: [
          "src/exercices/05-cycle-vie-hooks/02-regeneration-monstre/RegenerationMonstre.tsx",
        ],
      },
      {
        path: "/06-hooks/03-invocation-rapide",
        numero: "03",
        titre: "L'invocation rapide",
        emoji: "🔮",
        resume:
          "Utilise useRef pour donner le focus automatique à un champ dès le montage.",
        fichiers: [
          "src/exercices/05-cycle-vie-hooks/03-invocation-rapide/InvocationRapide.tsx",
        ],
      },
      {
        path: "/06-hooks/04-chronometre-combat",
        numero: "04",
        titre: "Le chronomètre de combat",
        emoji: "⏱️",
        resume:
          "Synthèse de la séance : deux useEffect distincts, cleanup et useRef combinés.",
        fichiers: [
          "src/exercices/05-cycle-vie-hooks/04-chronometre-combat/ChronometreCombat.tsx",
        ],
      },
    ],
  },
  {
    label: "Séance 6 · Appel d'API",
    exercices: [
      {
        path: "/07-api/01-rencontre-sauvage",
        numero: "01",
        titre: "Rencontre sauvage",
        emoji: "🎣",
        resume:
          "Premier fetch dans un useEffect au montage, avec typage de la réponse de PokéAPI.",
        fichiers: [
          "src/exercices/06-appel-api/01-rencontre-sauvage/RencontreSauvage.tsx",
        ],
      },
      {
        path: "/07-api/02-bestiaire-distant",
        numero: "02",
        titre: "Le bestiaire distant",
        emoji: "📡",
        resume:
          "Charge une liste de Pokémon en gérant les 3 états typés : data, isLoading, error.",
        fichiers: [
          "src/exercices/06-appel-api/02-bestiaire-distant/BestiaireDistant.tsx",
        ],
      },
      {
        path: "/07-api/03-monsterdex-fragile",
        numero: "03",
        titre: "Le Monsterdex fragile",
        emoji: "🔍",
        resume:
          "Fetch déclenché par un clic, avec vérification de response.ok pour gérer les 404.",
        fichiers: [
          "src/exercices/06-appel-api/03-monsterdex-fragile/MonsterdexFragile.tsx",
        ],
      },
      {
        path: "/07-api/04-carnet-de-terrain",
        numero: "04",
        titre: "Le carnet de terrain",
        emoji: "�",
        resume:
          "Synthèse de la séance : deux useEffect, le second refetchant à chaque changement de sélection.",
        fichiers: [
          "src/exercices/06-appel-api/04-carnet-de-terrain/CarnetDeTerrain.tsx",
        ],
      },
    ],
  },
];

export const exercices: Exercice[] = seances.flatMap((s) => s.exercices);
