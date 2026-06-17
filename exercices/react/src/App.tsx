import { NavLink, Route, Routes } from "react-router-dom";
import { exercices } from "./exercices";
import Exercice from "./components/Exercice";
import Home from "./Home";
import PremierMonstre from "./exercices/01-jsx-composants/01-premier-monstre/PremierMonstre";
import AfficheReparee from "./exercices/01-jsx-composants/02-chasse-aux-bugs/AfficheReparee";
import Bestiaire from "./exercices/01-jsx-composants/03-import-export/Bestiaire";

function Sidebar() {
  return (
    <aside className="w-72 shrink-0 border-r border-base-300 bg-base-200/40 p-4">
      <NavLink to="/" className="btn btn-ghost text-xl normal-case mb-2">
        🐲 MonsterDex
      </NavLink>
      <p className="px-2 text-xs uppercase tracking-wide opacity-60">
        Séance 2 · JSX & Composants
      </p>
      <ul className="menu mt-2 w-full gap-1">
        {exercices.map((ex) => (
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
          <Route
            path="/02-jsx/01-premier-monstre"
            element={
              <Exercice meta={exercices[0]}>
                <PremierMonstre />
              </Exercice>
            }
          />
          <Route
            path="/02-jsx/02-chasse-aux-bugs"
            element={
              <Exercice meta={exercices[1]}>
                <AfficheReparee />
              </Exercice>
            }
          />
          <Route
            path="/02-jsx/03-import-export"
            element={
              <Exercice meta={exercices[2]}>
                <Bestiaire />
              </Exercice>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
