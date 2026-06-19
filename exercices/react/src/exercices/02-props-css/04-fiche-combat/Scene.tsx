import FicheCombat from "./FicheCombat"
import type { ComponentType, ReactNode } from "react"

// Cast nécessaire tant que l'interface n'est pas complète
const Fiche = FicheCombat as ComponentType<{
  nom: string
  emoji: string
  pv: number
  attaque: number
  rarete?: "commun" | "rare" | "legendaire"
  children?: ReactNode
}>

export default function Scene() {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      <Fiche nom="Bidulor" emoji="👾" pv={40} attaque={12} rarete="commun" />

      <Fiche nom="Gribouillon" emoji="🐙" pv={75} attaque={28} rarete="rare">
        <p>🌊 Jet d'encre — réduit l'ATK ennemie</p>
        <p>🪤 Tentacule piège — immobilise 1 tour</p>
      </Fiche>

      <Fiche nom="Torchigon" emoji="🔥" pv={120} attaque={55} rarete="legendaire">
        <p>🔥 Embrasement — brûle 3 tours</p>
        <p>💥 Explosion finale — dégâts de zone</p>
        <p>🛡️ Écailles de braise — réduit les dégâts</p>
      </Fiche>
    </div>
  )
}
