import { Link, Route, Routes, useParams } from "react-router-dom";

type Champion = {
  id: number;
  nom: string;
  emoji: string;
  titre: string;
  victoires: number;
};

const CHAMPIONS: Champion[] = [
  { id: 1, nom: "Krorog", emoji: "🦍", titre: "Le Colosse", victoires: 42 },
  { id: 2, nom: "Nyxia", emoji: "🦉", titre: "L'Ombre silencieuse", victoires: 37 },
  { id: 3, nom: "Ember", emoji: "🦎", titre: "La Flamme vive", victoires: 29 },
];

function Layout() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <h2 className="text-2xl font-bold">🏟️ Arène des champions</h2>
      <nav className="flex flex-wrap justify-center gap-2 rounded-box bg-base-200 p-2">
        {CHAMPIONS.map((champion) => (
          <Link
            key={champion.id}
            to={`/09-router-avance/04-arene-des-champions/${champion.id}`}
            className="btn btn-outline btn-sm"
          >
            {champion.emoji} {champion.nom}
          </Link>
        ))}
      </nav>

      <div className="card w-full bg-base-100 border border-base-300 p-6">
        {/* 👉 Étape 1 — Affiche ici le contenu de la route enfant avec <Outlet /> */}
      </div>
    </div>
  );
}

function Accueil() {
  return (
    <p className="text-center opacity-70">
      Choisis un champion pour découvrir son palmarès.
    </p>
  );
}

function Portrait() {
  // 👉 Étape 2 — Récupère le paramètre `id` de l'URL avec useParams
  // 👉 Étape 3 — Retrouve le champion correspondant dans CHAMPIONS
  // 👉 Étape 4 — Si aucun champion ne correspond, affiche "Champion introuvable"

  return <p className="text-center">Portrait à compléter…</p>;
}

export default function AreneDesChampions() {
  return (
    <div className="flex justify-center">
      {/*
        👉 Étape 5 — Déclare un <Routes> avec une <Route path="/" element={<Layout />}>
        👉 Étape 6 — À l'intérieur, ajoute une route index (Accueil) et une route
           dynamique ":id" (Portrait)
      */}
    </div>
  );
}
