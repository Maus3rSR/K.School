import { useState } from "react"

export default function ChronometreCombat() {
  const [secondes, setSecondes] = useState<number>(0)

  // 👉 Étape 1 — Déclare une ref typée pour l'input de note :
  //    useRef<HTMLInputElement>(null)

  // 👉 Étape 2 — useEffect au montage : donne le focus à la ref

  // 👉 Étape 3 — useEffect au montage : setInterval qui incrémente
  //    `secondes` chaque seconde, avec un cleanup (clearInterval)

  return (
    <div className="card w-80 bg-base-100 shadow-lg">
      <div className="card-body gap-3">
        <h2 className="card-title">⏱️ Chronomètre de combat</h2>
        <p className="text-4xl font-mono text-center">{secondes}s</p>
        <input
          type="text"
          placeholder="Note tactique..."
          className="input input-bordered w-full"
          // 👉 Étape 1 — Relie cet input à ta ref avec la prop `ref`
        />
      </div>
    </div>
  )
}
