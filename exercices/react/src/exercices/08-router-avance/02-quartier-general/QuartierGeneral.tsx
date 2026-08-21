import { Link, Route, Routes } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <nav className="flex gap-2 rounded-box bg-base-200 p-2">
        <Link
          to="/09-router-avance/02-quartier-general"
          className="btn btn-ghost btn-sm"
        >
          Accueil
        </Link>
        <Link
          to="/09-router-avance/02-quartier-general/entrainement"
          className="btn btn-ghost btn-sm"
        >
          Entraînement
        </Link>
        <Link
          to="/09-router-avance/02-quartier-general/boutique"
          className="btn btn-ghost btn-sm"
        >
          Boutique
        </Link>
      </nav>

      <div className="card w-full bg-base-100 border border-base-300 p-6">
        {/* 👉 Étape 1 — Affiche ici le contenu de la route enfant avec <Outlet /> */}
      </div>
    </div>
  );
}

function Accueil() {
  return (
    <p className="text-center">Bienvenue au quartier général des monstres.</p>
  );
}

function Entrainement() {
  return (
    <p className="text-center">
      🏋️ Salle d&apos;entraînement : les PV augmentent chaque jour.
    </p>
  );
}

function Boutique() {
  return (
    <p className="text-center">
      🛒 Boutique : potions et objets rares en vente.
    </p>
  );
}

export default function QuartierGeneral() {
  return (
    <div className="flex justify-center">
      {/*
        👉 Étape 2 — Déclare un <Routes> avec une <Route path="/" element={<Layout />}>
        👉 Étape 3 — À l'intérieur de cette Route, ajoute trois routes enfants :
           une route index (Accueil), "entrainement" (Entrainement) et "boutique" (Boutique)
      */}
    </div>
  );
}
