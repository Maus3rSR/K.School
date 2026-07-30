import { Link } from "react-router-dom";

function Accueil() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Accueil</h2>
      <p className="opacity-70">Le MonsterDex, version multi-pages.</p>
    </div>
  );
}

function Liste() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Liste des monstres</h2>
      <p className="opacity-70">Le bestiaire s&apos;affichera ici.</p>
    </div>
  );
}

function Ajouter() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Ajouter un monstre</h2>
      <p className="opacity-70">Formulaire de création à venir.</p>
    </div>
  );
}

export default function NavigationComplete() {
  return (
    <div className="flex flex-col items-center gap-6">
      <nav className="flex gap-2 rounded-box bg-base-200 p-2">
        <Link to="/08-router/04-navigation-complete" className="btn btn-ghost">
          Accueil
        </Link>
        <Link
          to="/08-router/04-navigation-complete/liste"
          className="btn btn-ghost"
        >
          Liste
        </Link>
        <Link
          to="/08-router/04-navigation-complete/ajouter"
          className="btn btn-ghost"
        >
          Ajouter
        </Link>
      </nav>

      {/* 
        À toi : remplacer les <Link> par des <NavLink> stylés,
        puis ajouter un <Routes> avec les trois routes relatives : /, liste, ajouter.
      */}

      <div className="alert alert-info max-w-md text-sm">
        Objectif : le lien de la page active doit avoir une apparence
        différente, et le contenu doit changer sans rechargement.
      </div>
    </div>
  );
}
