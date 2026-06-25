import { useState } from "react"

const MONSTRES = [
  { nom: "Bidulor",    emoji: "👾", type: "spectral" },
  { nom: "Gribouillon", emoji: "🐙", type: "aquatique" },
  { nom: "Torchigon",  emoji: "🔥", type: "igné" },
  { nom: "Glurpax",    emoji: "🧪", type: "chimique" },
  { nom: "Ziboulon",   emoji: "⚡", type: "électrique" },
  { nom: "Croctaure",  emoji: "🌿", type: "végétal" },
  { nom: "Slimogon",   emoji: "🟢", type: "chimique" },
  { nom: "Vuoltrix",   emoji: "🌀", type: "spectral" },
]

export default function FiltreBestiaire() {
  // 👉 Étape 1 — Déclare un state `recherche` de type string, initialisé à ""
  const recherche = ""

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // 👉 Étape 2 — Met à jour `recherche` avec e.target.value
  }

  // 👉 Étape 3 — Filtre MONSTRES : garde ceux dont le nom contient `recherche` (insensible à la casse)
  //   Indice : .filter(m => m.nom.toLowerCase().includes(recherche.toLowerCase()))
  const monstresFiltres = MONSTRES

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <input
        type="text"
        placeholder="🔍 Rechercher un monstre…"
        className="input input-bordered w-full"
        // 👉 Étape 1 — Lie cet input au state : ajoute value={recherche} et onChange={handleChange}
      />

      {/* 👉 Étape 3 — Affiche le nombre de monstres trouvés */}
      <p className="text-sm opacity-60">-- monstre(s) trouvé(s)</p>

      <div className="flex flex-wrap gap-3">
        {monstresFiltres.map((monstre) => (
          <div
            key={monstre.nom}
            className="card w-36 bg-base-100 shadow-sm border border-base-300"
          >
            <div className="card-body items-center text-center p-3 gap-1">
              <span className="text-3xl">{monstre.emoji}</span>
              <p className="text-sm font-semibold">{monstre.nom}</p>
              <span className="badge badge-ghost text-xs">{monstre.type}</span>
            </div>
          </div>
        ))}

        {/* 👉 Bonus — Affiche "Aucun monstre trouvé" si la liste est vide */}
      </div>
    </div>
  )
}
