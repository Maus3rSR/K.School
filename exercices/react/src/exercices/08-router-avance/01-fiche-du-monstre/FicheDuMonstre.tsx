import { Link, Route, Routes, useParams } from "react-router-dom";

type Monstre = {
  id: number;
  nom: string;
  emoji: string;
  type: string;
  pv: number;
};

const MONSTRES: Monstre[] = [
  { id: 1, nom: "Dracobulon", emoji: "🐉", type: "igné", pv: 120 },
  { id: 2, nom: "Glubator", emoji: "🐸", type: "aquatique", pv: 80 },
  { id: 3, nom: "Crânéos", emoji: "💀", type: "obscur", pv: 95 },
];

function Accueil() {
  return (
    <p className="text-center opacity-70">
      Choisis un monstre ci-dessus pour afficher sa fiche.
    </p>
  );
}

function Fiche() {
  // 👉 Étape 1 — Récupère le paramètre `id` de l'URL avec useParams
  // 👉 Étape 2 — Retrouve le monstre correspondant dans MONSTRES
  //    Attention : l'id de l'URL est une string, monstre.id est un number
  // 👉 Étape 3 — Si aucun monstre ne correspond, affiche "Monstre introuvable"

  return <p className="text-center">Fiche à compléter…</p>;
}

export default function FicheDuMonstre() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <nav className="flex flex-wrap justify-center gap-2 rounded-box bg-base-200 p-2">
        {MONSTRES.map((monstre) => (
          <Link
            key={monstre.id}
            to={`/09-router-avance/01-fiche-du-monstre/${monstre.id}`}
            className="btn btn-outline btn-sm"
          >
            {monstre.emoji} {monstre.nom}
          </Link>
        ))}
      </nav>

      <div className="card w-full bg-base-100 border border-base-300 p-6">
        {/* 👉 Étape 4 — Ajoute un <Routes> avec une route index (Accueil) et une route dynamique ":id" (Fiche) */}
        <Accueil />
      </div>
    </div>
  );
}
