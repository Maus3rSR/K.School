// 👉 Importe ici tes trois composants : SalleDonjon, Monstre, Tresor

export default function Donjon() {
  return (
    <div className="rounded-box border border-base-300 bg-base-200 p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">🏰 Donjon des Bits Perdus</h1>

      {/* 👉 Remplace les blocs JSX ci-dessous par tes composants */}

      {/* Salle 1 */}
      <div className="rounded-box border border-warning/40 bg-warning/10 p-4">
        <h2 className="font-semibold mb-2">Salle des Ombres</h2>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 badge badge-lg badge-ghost">
            <span>👾</span> Bidulor
          </div>
          <div className="flex items-center gap-2 badge badge-lg badge-ghost">
            <span>🐙</span> Gribouillon
          </div>
        </div>
      </div>

      {/* Salle 2 */}
      <div className="rounded-box border border-error/40 bg-error/10 p-4">
        <h2 className="font-semibold mb-2">Caverne de Feu</h2>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 badge badge-lg badge-ghost">
            <span>🔥</span> Torchigon
          </div>
          <div className="flex items-center gap-2 badge badge-lg badge-ghost">
            <span>🦖</span> Rochosaure
          </div>
        </div>
      </div>

      {/* Trésor */}
      <div className="rounded-box border border-success/40 bg-success/10 p-4 text-center">
        <span className="text-4xl">💎</span>
        <p className="mt-1 font-bold">Cristal du JSX</p>
        <p className="text-sm opacity-70">Trésor légendaire</p>
      </div>
    </div>
  )
}
