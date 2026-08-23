import { useState } from "react";

const BESTIAIRE = [
  { id: 1, nom: "Flamix", emoji: "🔥🐲", element: "Feu" },
  { id: 2, nom: "Glacielle", emoji: "❄️🦋", element: "Glace" },
  { id: 3, nom: "Racinelle", emoji: "🌱🐢", element: "Plante" },
  { id: 4, nom: "Électrog", emoji: "⚡🐿️", element: "Électrique" },
  { id: 5, nom: "Ombrelune", emoji: "🌙🐺", element: "Ombre" },
];

// TODO: crée un hook useLocalStorage<T>(key, initialValue) qui synchronise
// un state avec le stockage local du navigateur.

export default function MonstreFavori() {
  // TODO: remplace useState par useLocalStorage<number>("monstreFavori", 1).
  const [favoriId, setFavoriId] = useState(1);

  const monstre = BESTIAIRE.find((m) => m.id === favoriId);

  return (
    <div className="flex flex-col items-center gap-4 w-80">
      <label className="form-control w-full">
        <span className="label-text mb-1">Ton monstre favori</span>
        <select
          className="select select-bordered w-full"
          value={favoriId}
          onChange={(e) => setFavoriId(Number(e.target.value))}
        >
          {BESTIAIRE.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nom}
            </option>
          ))}
        </select>
      </label>

      {monstre && (
        <div className="card w-full bg-base-100 shadow-lg">
          <div className="card-body items-center text-center gap-2">
            <span className="text-6xl">{monstre.emoji}</span>
            <h2 className="card-title">{monstre.nom}</h2>
            <span className="badge badge-outline">{monstre.element}</span>
          </div>
        </div>
      )}

      <p className="text-xs opacity-60">
        Ton choix doit survivre à un rechargement de la page.
      </p>
    </div>
  );
}
