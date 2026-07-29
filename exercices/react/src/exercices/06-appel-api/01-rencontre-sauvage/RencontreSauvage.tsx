import { useState } from "react";

interface Monstre {
  id: number;
  nom: string;
  emoji: string;
  element: string;
}

export default function RencontreSauvage() {
  const [monstre, setMonstre] = useState<Monstre | null>(null);

  // 👉 Étape 1 — Importe useEffect depuis "react"

  // 👉 Étape 2 — useEffect au montage ([]) : déclare une fonction async
  //    interne qui fetch sur "/data/monstre-du-jour.json"
  //    (ce fichier JSON local fait office de mini API)
  //    puis setMonstre avec le résultat

  if (!monstre) return <p>Chargement...</p>;

  return (
    <div className="card w-72 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center gap-2">
        <span className="text-6xl">{monstre.emoji}</span>
        <h2 className="card-title capitalize">{monstre.nom}</h2>
        <span className="badge badge-outline">{monstre.element}</span>
      </div>
    </div>
  );
}
