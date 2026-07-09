import { useState } from "react"

type Monstre = {
  id: number
  nom: string
  emoji: string
  type: string
  pv: number
}

const tousLesMonstres: Monstre[] = [
  { id: 1, nom: "Dracobulon",  emoji: "🐉", type: "igné",     pv: 120 },
  { id: 2, nom: "Glubator",    emoji: "🐸", type: "aquatique", pv: 80  },
  { id: 3, nom: "Crânéos",     emoji: "💀", type: "obscur",   pv: 95  },
  { id: 4, nom: "Voltiflor",   emoji: "🌿", type: "végétal",  pv: 60  },
  { id: 5, nom: "Pyrostrix",   emoji: "🔥", type: "igné",     pv: 110 },
  { id: 6, nom: "Aquabulus",   emoji: "💧", type: "aquatique", pv: 75  },
  { id: 7, nom: "Nocturnix",   emoji: "🌑", type: "obscur",   pv: 88  },
]

const types = ["tous", "igné", "aquatique", "obscur", "végétal"]

export default function FiltreBestiaire() {
  // 👉 Étape 1 — Déclare un state `typeActif` de type string, initialisé à "tous"
  const typeActif = "tous"

  // 👉 Étape 2 — Calcule `monstresFiltres` :
  //    si typeActif === "tous", retourne tousLesMonstres
  //    sinon, filtre avec .filter() pour ne garder que les monstres du typeActif
  const monstresFiltres: Monstre[] = tousLesMonstres

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">🔎 Filtre par type</h2>

      {/* 👉 Étape 1 — Pour chaque type dans `types`, affiche un bouton.
                      Le bouton actif doit avoir la classe "btn-primary", les autres "btn-ghost"
                      Au clic, met à jour typeActif */}
      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <button key={t} className="btn btn-sm btn-ghost capitalize">
            {t}
          </button>
        ))}
      </div>

      {/* 👉 Étape 3 — Affiche le nombre de monstres filtrés */}
      <p className="text-sm opacity-60">-- monstre(s) affiché(s)</p>

      {/* 👉 Étape 2 — Remplace cette ligne par un .map() sur `monstresFiltres` */}
      <div className="flex flex-wrap gap-4">
        <p className="opacity-40 text-sm">À compléter…</p>
      </div>

      {/* 👉 Étape 4 — Affiche un message si monstresFiltres est vide */}
    </div>
  )
}
