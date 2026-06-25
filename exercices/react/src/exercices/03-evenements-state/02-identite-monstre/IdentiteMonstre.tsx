import { useState } from "react"

const NOMS_ALEATOIRES = [
  "Glurpax", "Ziboulon", "Croctaure", "Furfangue",
  "Slimogon", "Torchibulle", "Grognekos", "Vuoltrix",
]

export default function IdentiteMonstre() {
  // 👉 Étape 1 — Déclare un state `nom` de type string, initialisé à "Monstre sans nom"
  const nom = "Monstre sans nom"

  // 👉 Étape 2 — Déclare un state `emoji` de type string, initialisé à "❓"
  const emoji = "❓"

  function handleNomAleatoire() {
    // 👉 Étape 3 — Tire un nom au hasard dans NOMS_ALEATOIRES et met à jour le state `nom`
    // Indice : Math.floor(Math.random() * NOMS_ALEATOIRES.length)
  }

  function handleEmojiAleatoire() {
    // 👉 Étape 4 — Tire un emoji au hasard dans ce tableau et met à jour le state `emoji`
    const EMOJIS = ["🐉", "👾", "🐙", "🔥", "🧟", "🦠", "🐲", "👹"]
  }

  function handleReset() {
    // 👉 Étape 5 — Remet `nom` à "Monstre sans nom" et `emoji` à "❓"
  }

  return (
    <div className="card w-72 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center gap-3">
        {/* 👉 Étape 1 & 2 — Affiche emoji et nom depuis les states */}
        <span className="text-6xl">❓</span>
        <h2 className="card-title">Monstre sans nom</h2>

        <div className="flex flex-col gap-2 w-full mt-2">
          <button className="btn btn-primary btn-sm" onClick={handleNomAleatoire}>
            🎲 Nom aléatoire
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleEmojiAleatoire}>
            🎲 Emoji aléatoire
          </button>
          <button className="btn btn-ghost btn-sm" onClick={handleReset}>
            🔄 Réinitialiser
          </button>
        </div>
      </div>
    </div>
  )
}
