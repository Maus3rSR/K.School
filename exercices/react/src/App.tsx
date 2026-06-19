import { NavLink, Route, Routes } from "react-router-dom";
import { seances } from "./exercices";
import Exercice from "./components/Exercice";
import Home from "./Home";
import PremierMonstre from "./exercices/01-jsx-composants/01-premier-monstre/PremierMonstre";
import AfficheReparee from "./exercices/01-jsx-composants/02-chasse-aux-bugs/AfficheReparee";
import Bestiaire from "./exercices/01-jsx-composants/03-import-export/Bestiaire";
import Donjon from "./exercices/01-jsx-composants/04-donjon-decompose/Donjon";
import Scene01 from "./exercices/02-props-css/01-carte-monstre/Scene";
import Scene02 from "./exercices/02-props-css/02-bouton-variante/Scene";
import Scene03 from "./exercices/02-props-css/03-encart/Scene";
import Scene04 from "./exercices/02-props-css/04-fiche-combat/Scene";

const allExercices = seances.flatMap((s) => s.exercices);

function Sidebar() {
  return (
    <aside className="w-72 shrink-0 border-r border-base-300 bg-base-200/40 p-4">
      <NavLink to="/" className="btn btn-ghost text-xl normal-case mb-2">
        🐲 MonsterDex
      </NavLink>
      {seances.map((seance) => (
        <div key={seance.label} className="mb-4">
          <p className="px-2 text-xs uppercase tracking-wide opacity-60 mt-2">
            {seance.label}
          </p>
          <ul className="menu mt-1 w-full gap-1">
            {seance.exercices.map((ex) => (
              <li key={ex.path}>
                <NavLink
                  to={ex.path}
                  className={({ isActive }) =>
                    isActive ? "active font-semibold" : ""
                  }
                >
                  <span className="text-lg">{ex.emoji}</span>
                  <span>
                    {ex.numero} · {ex.titre}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen bg-base-100 text-base-content">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden p-6 md:p-10">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Séance 2 */}
          <Route
            path="/02-jsx/01-premier-monstre"
            element={
              <Exercice meta={allExercices[0]}>
                <PremierMonstre />
              </Exercice>
            }
          />
          <Route
            path="/02-jsx/02-chasse-aux-bugs"
            element={
              <Exercice meta={allExercices[1]}>
                <AfficheReparee />
              </Exercice>
            }
          />
          <Route
            path="/02-jsx/03-import-export"
            element={
              <Exercice meta={allExercices[2]}>
                <Bestiaire />
              </Exercice>
            }
          />
          <Route
            path="/02-jsx/04-donjon-decompose"
            element={
              <Exercice meta={allExercices[3]}>
                <Donjon />
              </Exercice>
            }
          />
          {/* Séance 2 · Props & CSS */}
          <Route
            path="/03-props/01-carte-monstre"
            element={
              <Exercice meta={allExercices[4]}>
                <Scene01 />
              </Exercice>
            }
          />
          <Route
            path="/03-props/02-bouton-variante"
            element={
              <Exercice meta={allExercices[5]}>
                <Scene02 />
              </Exercice>
            }
          />
          <Route
            path="/03-props/03-encart"
            element={
              <Exercice meta={allExercices[6]}>
                <Scene03 />
              </Exercice>
            }
          />
          <Route
            path="/03-props/04-fiche-combat"
            element={
              <Exercice meta={allExercices[7]}>
                <Scene04 />
              </Exercice>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
