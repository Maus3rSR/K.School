import { Link } from "react-router-dom";

function Accueil() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Accueil du mini-bestiaire</h2>
      <p className="opacity-70">Bienvenue dans le chapitre Router.</p>
    </div>
  );
}

function Arene() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Arène</h2>
      <p className="opacity-70">Ici, les monstres s&apos;entraînent.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Contact</h2>
      <p className="opacity-70">Envoie un message au gardien du bestiaire.</p>
    </div>
  );
}

export default function MiniRoutes() {
  return (
    <div className="flex flex-col items-center gap-6">
      <nav className="flex gap-2 rounded-box bg-base-200 p-2">
        <Link to="/08-router/03-mini-routes" className="btn btn-ghost">
          Accueil
        </Link>
        <Link to="/08-router/03-mini-routes/arene" className="btn btn-ghost">
          Arène
        </Link>
        <Link to="/08-router/03-mini-routes/contact" className="btn btn-ghost">
          Contact
        </Link>
      </nav>

      {/* Ajoute ici un <Routes> avec trois <Route> : /, arene et contact */}
      <div className="alert alert-warning max-w-md text-sm">
        Dans ce <code>Routes</code> imbriqué, les chemins des <code>Route</code>{" "}
        restent relatifs : <code>/</code>, <code>arene</code> et{" "}
        <code>contact</code>.
      </div>
    </div>
  );
}
