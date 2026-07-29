import { useState } from "react";

interface Monstre {
  id: number;
  nom: string;
  emoji: string;
  element: string;
  puissance: number;
  description: string;
}

export default function MonsterdexFragile() {
  const [slug, setSlug] = useState("");
  const [monstre, setMonstre] = useState<Monstre | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function chercherMonstre() {
    setIsLoading(true);
    setError(null);

    // 👉 Étape 1 — fetch sur
    //    `/data/monstres/${slug.toLowerCase()}.json`

    // 👉 Étape 2 — vérifie response.ok : si c'est faux,
    //    lève une erreur avec `throw new Error(...)`
    //    (un slug inconnu renvoie un vrai statut 404, le fichier n'existe pas)

    // 👉 Étape 3 — sinon, parse le JSON et setMonstre

    // 👉 Étape 4 — catch → setError("Monstre introuvable")
    //    finally → setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-4 w-72">
      <div className="join">
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="flamix, ombrelune..."
          className="input input-bordered join-item"
        />
        <button onClick={chercherMonstre} className="btn btn-primary join-item">
          Chercher
        </button>
      </div>

      {isLoading && <p>Chargement...</p>}
      {error && <p className="text-error">❌ {error}</p>}
      {monstre && (
        <div className="card w-72 bg-base-100 shadow-lg">
          <div className="card-body items-center text-center gap-2">
            <span className="text-6xl">{monstre.emoji}</span>
            <h2 className="card-title capitalize">{monstre.nom}</h2>
            <span className="badge badge-outline">{monstre.element}</span>
          </div>
        </div>
      )}
    </div>
  );
}
