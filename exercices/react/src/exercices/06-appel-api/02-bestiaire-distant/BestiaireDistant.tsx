import { useEffect, useState } from "react";

interface MonstreResume {
  id: number;
  nom: string;
  emoji: string;
  element: string;
}

export default function BestiaireDistant() {
  const [monstres, setMonstres] = useState<MonstreResume[]>([]);

  // 👉 Étape 1 — Déclare isLoading (boolean, true par défaut)
  //    et error (string | null, null par défaut)

  useEffect(() => {
    async function loadMonstres() {
      // 👉 Étape 2 — fetch sur "/data/bestiaire.json"
      //    la réponse est directement un tableau MonstreResume[]
      // 👉 Étape 3 — try/catch/finally :
      //    - succès → setMonstres(data)
      //    - échec → setError(...)
      //    - finally → setIsLoading(false)
    }
    loadMonstres();
  }, []);

  // 👉 Étape 4 — Rendu conditionnel :
  //    if (isLoading) → "Chargement..."
  //    if (error) → afficher l'erreur
  //    sinon → la liste

  return (
    <ul className="menu bg-base-100 rounded-box w-64 shadow">
      {monstres.map((m) => (
        <li key={m.id}>
          <span className="capitalize">
            {m.emoji} {m.nom}
          </span>
        </li>
      ))}
    </ul>
  );
}
