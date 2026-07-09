import { useState } from "react"

export default function RugissementMonstre() {
  // 👉 Étape 1 — Déclare un state `rugit` (boolean) initialisé à true
  const rugit = true

  // 👉 Étape 2 — useEffect au montage ([]) : après 2000ms (setTimeout),
  //    passe `rugit` à false

  return (
    <div className="card w-72 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center gap-3">
        <span className="text-6xl">🐺</span>
        <h2 className="card-title">Dracorugis</h2>
        {rugit ? (
          <p className="text-warning font-semibold">🔊 Rugit d'un air menaçant !</p>
        ) : (
          <p className="opacity-50 text-sm">... le calme revient</p>
        )}
      </div>
    </div>
  )
}
