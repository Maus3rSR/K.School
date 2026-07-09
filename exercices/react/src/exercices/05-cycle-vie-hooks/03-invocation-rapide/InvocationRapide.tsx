import { useState } from "react"

export default function InvocationRapide() {
  const [nom, setNom] = useState<string>("")

  // 👉 Étape 1 — Déclare une ref typée pour l'input :
  //    useRef<HTMLInputElement>(null)

  // 👉 Étape 2 — useEffect au montage ([]) : donne le focus à l'input
  //    via la ref (inputRef.current?.focus())

  return (
    <div className="card w-80 bg-base-100 shadow-lg">
      <div className="card-body gap-3">
        <h2 className="card-title">🔮 Invocation rapide</h2>
        <input
          type="text"
          placeholder="Nom du monstre à invoquer..."
          className="input input-bordered w-full"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          // 👉 Étape 3 — Relie cet input à ta ref avec la prop `ref`
        />
        {nom && (
          <p className="text-sm opacity-70">
            ✨ "{nom}" apparaît dans un nuage de fumée...
          </p>
        )}
      </div>
    </div>
  )
}
