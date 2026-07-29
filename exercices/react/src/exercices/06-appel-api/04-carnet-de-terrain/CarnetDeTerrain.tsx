import { useState } from "react";

interface MonstreResume {
  slug: string;
  nom: string;
}

interface Monstre {
  id: number;
  nom: string;
  emoji: string;
  element: string;
  puissance: number;
  description: string;
}

export default function CarnetDeTerrain() {
  const [liste, setListe] = useState<MonstreResume[]>([]);
  const [slugChoisi, setSlugChoisi] = useState<string>("");
  const [monstre, setMonstre] = useState<Monstre | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // À vous : reproduire le pattern des exercices précédents, en deux temps
  //
  // 1. useEffect au montage ([]) : fetch sur "/data/liste-monstres.json",
  //    setListe avec le résultat, puis setSlugChoisi avec le slug du
  //    premier élément de la liste
  //
  // 2. useEffect qui dépend de [slugChoisi] (pas de tableau vide !) :
  //    à chaque fois que slugChoisi change, refetch
  //    `/data/monstres/${slugChoisi}.json` et remplit monstre/isLoading/error
  //    (attention : ne rien faire si slugChoisi est encore vide)

  return (
    <div className="flex flex-col items-center gap-4 w-80">
      <select
        value={slugChoisi}
        onChange={(e) => setSlugChoisi(e.target.value)}
        className="select select-bordered w-full"
      >
        {liste.map((m) => (
          <option key={m.slug} value={m.slug}>
            {m.nom}
          </option>
        ))}
      </select>

      {isLoading && <p>Chargement...</p>}
      {error && <p className="text-error">❌ {error}</p>}
      {monstre && (
        <div className="card w-80 bg-base-100 shadow-lg">
          <div className="card-body items-center text-center gap-2">
            <span className="text-6xl">{monstre.emoji}</span>
            <h2 className="card-title capitalize">{monstre.nom}</h2>
            <span className="badge badge-outline">{monstre.element}</span>
            <p className="text-sm opacity-70">{monstre.description}</p>
            <div className="stat-value text-2xl">⚡ {monstre.puissance}</div>
          </div>
        </div>
      )}
    </div>
  );
}
