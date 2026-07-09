import { useState } from "react"

export default function MonstreVivant() {
  const [pv, setPv] = useState<number>(80)
  const [bouclier, setBouclier] = useState<boolean>(false)

  const pvMax = 100
  const estVivant = pv > 0
  const estBlessé = pv <= 30

  function handleAttaque() {
    // 👉 Étape 2 — Si le bouclier est actif, ne fait rien (return)
    // 👉 Étape 2 — Sinon, diminue pv de 20 (sans descendre sous 0)
    setPv((prev) => Math.max(prev - 20, 0))
  }

  function handleSoin() {
    // 👉 Étape 3 — Augmente pv de 30 (sans dépasser pvMax)
    // 👉 Étape 3 — N'oublie pas : un monstre mort ne peut pas être soigné !
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="card w-80 bg-base-100 shadow-lg">
        <div className="card-body items-center text-center gap-4">

          {/* 👉 Étape 1 — Remplace ce texte par un ternaire :
                          affiche "🐉" si estVivant, "💀" sinon */}
          <span className="text-7xl">🐉</span>

          <h2 className="card-title text-2xl">Dracobulon</h2>

          {/* 👉 Étape 1 — Affiche le badge "🛡️ Bouclier actif" uniquement si bouclier est true */}

          <div className="w-full">
            <div className="flex justify-between text-sm mb-1">
              <span>❤️ PV</span>
              <span>{pv} / {pvMax}</span>
            </div>
            <progress
              className={`progress w-full ${estBlessé ? "progress-error" : "progress-success"}`}
              value={pv}
              max={pvMax}
            />
          </div>

          {/* 👉 Étape 1 — Affiche "⚠️ Dangereusement blessé !" uniquement si estBlessé est true */}

          {/* 👉 Étape 4 — Affiche "☠️ Monstre vaincu !" si le monstre est mort */}

          <div className="flex gap-2 mt-2">
            <button
              className="btn btn-error btn-sm"
              onClick={handleAttaque}
            >
              ⚔️ Attaquer (−20 PV)
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={handleSoin}
              // 👉 Étape 3 — Désactive ce bouton si le monstre est mort
            >
              💊 Soigner (+30 PV)
            </button>
            <button
              className="btn btn-info btn-sm"
              onClick={() => setBouclier((b) => !b)}
            >
              🛡️ {bouclier ? "Retirer bouclier" : "Activer bouclier"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
