import { useState } from "react"

export default function CompteurMonstre() {
  // 👉 Étape 1 — Déclare un state `pv` (points de vie) initialisé à 100
  const pv = 100

  // 👉 Étape 2 — Déclare un state `attaques` (nombre d'attaques) initialisé à 0

  function handleAttaque() {
    // 👉 Étape 3 — Diminue `pv` de 10 et incrémente `attaques` de 1
  }

  function handleSoin() {
    // 👉 Étape 4 — Augmente `pv` de 20 (sans dépasser 100)
  }

  return (
    <div className="card w-72 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center gap-3">
        <span className="text-6xl">🐉</span>
        <h2 className="card-title">Dracobulon</h2>

        <div className="w-full">
          <div className="flex justify-between text-sm mb-1">
            <span>❤️ PV</span>
            {/* 👉 Étape 1 — Affiche `pv` ici */}
            <span>-- / 100</span>
          </div>
          <progress
            className="progress progress-error w-full"
            value={0}
            max={100}
          />
        </div>

        <p className="text-sm opacity-60">
          {/* 👉 Étape 2 — Affiche le nombre d'attaques */}
          Attaques portées : --
        </p>

        <div className="flex gap-2 mt-2">
          <button className="btn btn-error btn-sm" onClick={handleAttaque}>
            ⚔️ Attaquer (−10 PV)
          </button>
          <button className="btn btn-success btn-sm" onClick={handleSoin}>
            💊 Soigner (+20 PV)
          </button>
        </div>

        {/* 👉 Bonus — Affiche "☠️ Monstre vaincu !" si pv <= 0 */}
      </div>
    </div>
  )
}
