import { useState } from "react"

type Monstre = {
  nom: string
  emoji: string
  type: string
}

export default function FormulaireMonstre() {
  // 👉 Étape 1 — Déclare trois states : `nom`, `emoji`, `type` (tous string, initialisés à "")
  const nom = ""
  const emoji = ""
  const type = ""

  // 👉 Étape 4 — Déclare un state `monstres` de type Monstre[], initialisé à []
  const monstres: Monstre[] = []

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // 👉 Étape 2 — Empêche le rechargement de page
    // 👉 Étape 3 — Si `nom` est vide, ne fais rien (return)
    // 👉 Étape 4 — Ajoute le nouveau monstre dans `monstres` puis vide les champs
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg">
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-md">
        <div className="card-body gap-3">
          <h2 className="card-title">➕ Créer un monstre</h2>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nom *"
              className="input input-bordered flex-1"
              // 👉 Étape 1 — Lie cet input : value={nom} + onChange
            />
            <input
              type="text"
              placeholder="Emoji"
              className="input input-bordered w-24"
              // 👉 Étape 1 — Lie cet input : value={emoji} + onChange
            />
          </div>

          <input
            type="text"
            placeholder="Type (ex: igné, aquatique…)"
            className="input input-bordered w-full"
            // 👉 Étape 1 — Lie cet input : value={type} + onChange
          />

          <button type="submit" className="btn btn-primary">
            Ajouter au bestiaire
          </button>
        </div>
      </form>

      {/* 👉 Étape 4 — Affiche la liste des monstres créés */}
      <div className="flex flex-wrap gap-3">
        {monstres.map((monstre, index) => (
          <div key={index} className="card w-36 bg-base-100 shadow-sm border border-base-300">
            <div className="card-body items-center text-center p-3 gap-1">
              <span className="text-3xl">{monstre.emoji || "❓"}</span>
              <p className="text-sm font-semibold">{monstre.nom}</p>
              {monstre.type && (
                <span className="badge badge-ghost text-xs">{monstre.type}</span>
              )}
            </div>
          </div>
        ))}

        {/* 👉 Bonus — Affiche un message si aucun monstre n'a encore été créé */}
      </div>
    </div>
  )
}
