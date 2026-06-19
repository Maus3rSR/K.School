import type { ReactNode } from "react"
import './FicheCombat.css'

// 👉 Étape 1 — Complète cette interface
interface FicheCombatProps {
  nom: string
  emoji: string
  pv: number
  attaque: number
  // 👉 Ajoute `rarete` (type union : "commun" | "rare" | "legendaire", optionnelle, défaut "commun")
  // 👉 Ajoute `children` (optionnel) pour la section capacités
}

export default function FicheCombat({ nom, emoji, pv, attaque }: FicheCombatProps) {
  // 👉 Étape 2 — Calcule la className du conteneur en combinant
  //    "fiche-combat" et `fiche-combat--${rarete}`
  const classeConteneur = "fiche-combat"

  // 👉 Étape 3 — Calcule le label de rareté affiché (ex: "✦ Rare")
  const labelRarete = "Commun"

  return (
    <div className={classeConteneur}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-4xl">{emoji}</span>
        {/* 👉 Étape 3 — Affiche le badge de rareté avec la classe CSS */}
        <span className="fiche-combat__rarete">{labelRarete}</span>
      </div>

      <h2 className="text-lg font-bold">{nom}</h2>

      <div className="fiche-combat__stats">
        <div className="fiche-combat__stat">
          <strong>❤️ {pv}</strong>
          <span>PV</span>
        </div>
        <div className="fiche-combat__stat">
          <strong>⚔️ {attaque}</strong>
          <span>ATK</span>
        </div>
      </div>

      {/* 👉 Étape 4 — Affiche la section capacités uniquement si children est fourni */}
    </div>
  )
}
