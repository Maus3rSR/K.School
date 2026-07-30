import { Link } from "react-router-dom";

export default function MenuActif() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm opacity-70">
        Transforme les <code>Link</code> ci-dessous en <code>NavLink</code> pour
        que la page en cours soit mise en évidence.
      </p>

      <nav className="flex gap-2 rounded-box bg-base-200 p-2">
        <Link to="/" className="btn btn-ghost">
          Accueil
        </Link>
        <Link to="/07-api/01-rencontre-sauvage" className="btn btn-ghost">
          Rencontre
        </Link>
        <Link to="/07-api/02-bestiaire-distant" className="btn btn-ghost">
          Bestiaire
        </Link>
      </nav>

      <div className="alert alert-info max-w-md text-sm">
        Indice : la prop <code>className</code> de <code>NavLink</code> peut
        recevoir une fonction <code>({'{ isActive }'}) =&gt; ...</code>.
      </div>
    </div>
  );
}
