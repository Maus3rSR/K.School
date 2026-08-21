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
  { id: 4, nom: "Voltiflor", emoji: "🌿", type: "végétal", pv: 60 },
];

function Layout() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <nav className="flex items-center gap-3 rounded-box bg-base-200 p-2">
        <Link
          to="/09-router-avance/05-monsterdex-v2"
          className="btn btn-ghost btn-sm"
        >
          🏠 Bestiaire
        </Link>
      </nav>

      <div className="card w-full bg-base-100 border border-base-300 p-6">
        {/* 👉 Étape 1 — Affiche ici le contenu de la route enfant avec <Outlet /> */}
      </div>
    </div>
  );
}

function Bestiaire() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-bold text-center">📖 Le bestiaire</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {MONSTRES.map((monstre) => (
          <Link
            key={monstre.id}
            to={`/09-router-avance/05-monsterdex-v2/${monstre.id}`}
            className="btn btn-outline btn-sm"
          >
            {monstre.emoji} {monstre.nom}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Detail() {
  // 👉 Étape 2 — Récupère le paramètre `id` de l'URL avec useParams
  // 👉 Étape 3 — Retrouve le monstre correspondant dans MONSTRES
  // 👉 Étape 4 — Si aucun monstre ne correspond, affiche "Monstre introuvable"
  // 👉 Étape 5 — Récupère la fonction navigate avec useNavigate
  // 👉 Étape 6 — Ajoute un bouton "⬅️ Retour au bestiaire" qui appelle navigate(-1)

  return <p className="text-center">Détail à compléter…</p>;
}

export default function MonsterdexV2() {
  return (
    <div className="flex justify-center">
      {/*
        👉 Étape 7 — Déclare un <Routes> avec une <Route path="/" element={<Layout />}>
        👉 Étape 8 — À l'intérieur, ajoute une route index (Bestiaire) et une route
           dynamique ":id" (Detail)
      */}
    </div>
  );
}
