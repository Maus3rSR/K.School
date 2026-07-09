import { useState } from "react"

type Rarété = "commun" | "rare" | "légendaire"

type Monstre = {
  id: number
  nom: string
  emoji: string
  type: string
  pv: number
  rarété: Rarété
}

const MONSTRES_INITIAUX: Monstre[] = [
  { id: 1, nom: "Dracobulon",  emoji: "🐉", type: "igné",     pv: 120, rarété: "légendaire" },
  { id: 2, nom: "Glubator",    emoji: "🐸", type: "aquatique", pv: 80,  rarété: "commun"     },
  { id: 3, nom: "Crânéos",     emoji: "💀", type: "obscur",   pv: 95,  rarété: "rare"        },
  { id: 4, nom: "Voltiflor",   emoji: "🌿", type: "végétal",  pv: 60,  rarété: "commun"      },
  { id: 5, nom: "Pyrostrix",   emoji: "🔥", type: "igné",     pv: 110, rarété: "rare"        },
]

const BADGE_RARETE: Record<Rarété, string> = {
  commun:      "badge-ghost",
  rare:        "badge-info",
  légendaire:  "badge-warning",
}

export default function BestiaireComplet() {
  const [monstres, setMonstres] = useState<Monstre[]>(MONSTRES_INITIAUX)

  // 👉 Étape 1 — Déclare un state `recherche` (string, initialisé à "")
  // 👉 Étape 1 — Déclare un state `afficherUniquementRares` (boolean, initialisé à false)

  // 👉 Étape 2 — Calcule `monstresFiltres` :
  //    Filtre par `recherche` (insensible à la casse, sur le nom)
  //    Si `afficherUniquementRares` est true, garde uniquement rare et légendaire
  const monstresFiltres: Monstre[] = monstres

  function handleSupprimer(id: number) {
    // 👉 Étape 3 — Supprime le monstre avec cet id du state `monstres`
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold">📖 Bestiaire complet</h2>

      {/* 👉 Étape 1 — Barre de recherche : input contrôlé lié à `recherche` */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <input
          type="text"
          placeholder="🔍 Rechercher par nom…"
          className="input input-bordered w-full sm:w-72"
        />

        {/* 👉 Étape 1 — Checkbox contrôlée liée à `afficherUniquementRares` */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="checkbox checkbox-warning" />
          <span className="text-sm">⭐ Rares & Légendaires seulement</span>
        </label>
      </div>

      {/* 👉 Étape 2 — Affiche le compteur de résultats */}
      <p className="text-sm opacity-60">-- monstre(s) trouvé(s) sur {monstres.length}</p>

      <div className="flex flex-col gap-3">
        {/* 👉 Étape 2 — Remplace ce contenu statique par un .map() sur `monstresFiltres` */}
        {monstresFiltres.map((monstre) => (
          <div key={monstre.id} className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body flex-row items-center p-4 gap-4">
              <span className="text-4xl shrink-0">{monstre.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold">{monstre.nom}</h3>
                  {/* 👉 Étape 2 — Affiche un badge de rareté avec la bonne classe depuis BADGE_RARETE */}
                  <span className={`badge text-xs`}>{monstre.rarété}</span>
                </div>
                <p className="text-sm opacity-60">{monstre.type}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs opacity-60">❤️ {monstre.pv}</span>
                  <progress className="progress progress-error flex-1 h-2" value={monstre.pv} max={150} />
                </div>
              </div>
              {/* 👉 Étape 3 — Bouton supprimer qui appelle handleSupprimer(monstre.id) */}
              <button className="btn btn-ghost btn-sm text-error opacity-60 hover:opacity-100">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 👉 Étape 2 — Affiche "Aucun monstre trouvé." si monstresFiltres est vide */}
    </div>
  )
}
