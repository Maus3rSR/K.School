import type { ReactNode } from "react"

interface EncartProps {
  titre: string
  // 👉 Ajoute la prop `children` avec le bon type
}

export default function Encart({ titre }: EncartProps) {
  return (
    <div className="rounded-box border border-base-300 bg-base-200 p-4">
      <h2 className="mb-2 font-bold">{titre}</h2>
      {/* 👉 Affiche children ici */}
    </div>
  )
}
