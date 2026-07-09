import { useState } from "react"

export default function RegenerationMonstre() {
  const [pv, setPv] = useState<number>(50)

  // 👉 Étape 1 — useEffect au montage ([]) : un setInterval qui augmente `pv`
  //    de 1 chaque seconde (sans dépasser 100). Ajoute un console.log dans
  //    l'intervalle pour suivre la régénération.

  // 👉 Étape 2 — Retourne une fonction de cleanup qui arrête l'intervalle
  //    avec clearInterval

  return (
    <div className="card w-72 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center gap-3">
        <span className="text-6xl">🦎</span>
        <h2 className="card-title">Regenexo</h2>
        <div className="w-full">
          <div className="flex justify-between text-sm mb-1">
            <span>❤️ PV</span>
            <span>{pv} / 100</span>
          </div>
          <progress className="progress progress-success w-full" value={pv} max={100} />
        </div>
      </div>
    </div>
  )
}
