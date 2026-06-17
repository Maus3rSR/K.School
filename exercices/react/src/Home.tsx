import { Link } from 'react-router-dom'
import { exercices } from './exercices'

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="hero rounded-box bg-gradient-to-br from-primary/20 to-secondary/20 p-10">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-5xl font-bold">🐲 MonsterDex</h1>
            <p className="py-4 text-lg opacity-80">
              Bienvenue ! Tu vas construire, pièce par pièce, une petite galerie de
              monstres rigolos — et apprendre à écrire tes premiers composants React.
            </p>
            <p className="text-sm opacity-60">
              Choisis un exercice dans le menu de gauche, ouvre son
              <code className="mx-1">README.md</code>, et code !
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {exercices.map((ex) => (
          <Link
            key={ex.path}
            to={ex.path}
            className="card bg-base-200 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="card-body">
              <span className="text-4xl">{ex.emoji}</span>
              <h2 className="card-title">
                {ex.numero} · {ex.titre}
              </h2>
              <p className="text-sm opacity-70">{ex.resume}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
