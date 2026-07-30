export default function PremierLien() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm opacity-70">
        Ces trois liens utilisent encore des balises <code>&lt;a&gt;</code>.{" "}
        Elles provoquent un rechargement complet de la page.
      </p>

      <nav className="flex gap-4">
        {/* Remplace ces liens par des <Link> de react-router-dom */}
        <a href="/" className="btn btn-outline">
          Accueil
        </a>
        <a href="/07-api/01-rencontre-sauvage" className="btn btn-outline">
          Rencontre sauvage
        </a>
        <a href="/07-api/02-bestiaire-distant" className="btn btn-outline">
          Bestiaire distant
        </a>
      </nav>

      <div className="alert alert-warning max-w-md text-sm">
        Astuce : clique sur un lien, puis regarde si le menu de gauche
        clignote. Avec <code>Link</code>, il ne devrait pas.
      </div>
    </div>
  );
}
