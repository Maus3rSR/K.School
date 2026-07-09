type Monstre = {
  id: number
  nom: string
  emoji: string
  type: string
  pv: number
}

const monstres: Monstre[] = [
  { id: 1, nom: "Dracobulon",  emoji: "🐉", type: "igné",     pv: 120 },
  { id: 2, nom: "Glubator",    emoji: "🐸", type: "aquatique", pv: 80  },
  { id: 3, nom: "Crânéos",     emoji: "💀", type: "obscur",   pv: 95  },
  { id: 4, nom: "Voltiflor",   emoji: "🌿", type: "végétal",  pv: 60  },
  { id: 5, nom: "Pyrostrix",   emoji: "🔥", type: "igné",     pv: 110 },
]

export default function GalerieMonstres() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">🗂️ Galerie du bestiaire</h2>

      {/* 👉 Étape 1 — Remplace ce tableau statique par un .map() sur `monstres`
                      Chaque carte doit recevoir une prop key={monstre.id} */}
      <div className="flex flex-wrap gap-4">
        <div className="card w-44 bg-base-100 shadow-md border border-base-300">
          <div className="card-body items-center text-center p-4 gap-2">
            <span className="text-4xl">❓</span>
            <h3 className="font-bold text-sm">Monstre 1</h3>
            {/* 👉 Étape 2 — Affiche le type dans un badge */}
            {/* 👉 Étape 3 — Affiche la barre de PV (progress) */}
          </div>
        </div>
      </div>

      {/* 👉 Étape 4 — Affiche "Aucun monstre dans le bestiaire." si le tableau est vide */}
    </div>
  )
}
