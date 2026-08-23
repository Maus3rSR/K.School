import { useEffect, useState } from "react";

interface MonstreLegendaire {
  id: number;
  nom: string;
  emoji: string;
  habitat: string;
  dangerosite: number;
}

// TODO: crée un hook générique useFetch<T>(url) qui encapsule le pattern
// data / isLoading / error déjà vu en cours.

export default function CodexMonstres() {
  // TODO: remplace cette logique par useFetch<MonstreLegendaire[]>("/data/codex-monstres.json").
  const [monstres, setMonstres] = useState<MonstreLegendaire[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCodex() {
      try {
        const res = await fetch("/data/codex-monstres.json");
        const data: MonstreLegendaire[] = await res.json();
        setMonstres(data);
      } catch {
        setError("Le codex est introuvable.");
      } finally {
        setIsLoading(false);
      }
    }
    loadCodex();
  }, []);

  if (isLoading) return <p>Chargement du codex...</p>;
  if (error) return <p className="text-error">❌ {error}</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {monstres.map((monstre) => (
        <div key={monstre.id} className="card bg-base-100 shadow-md">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{monstre.emoji}</span>
              <h3 className="card-title">{monstre.nom}</h3>
            </div>
            <span className="badge badge-outline">{monstre.habitat}</span>
            <p className="text-sm opacity-80">
              Dangerosité : {"⭐".repeat(monstre.dangerosite)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
