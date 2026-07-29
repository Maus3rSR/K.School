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
import CompteurMonstre from "./exercices/03-evenements-state/01-compteur-monstre/CompteurMonstre";
import IdentiteMonstre from "./exercices/03-evenements-state/02-identite-monstre/IdentiteMonstre";
import FiltreBestiaire from "./exercices/03-evenements-state/03-filtre-bestiaire/FiltreBestiaire";
import FormulaireMonstre from "./exercices/03-evenements-state/04-formulaire-monstre/FormulaireMonstre";
import MonstreVivant from "./exercices/04-rendu-conditionnel-listes/01-monstre-vivant/MonstreVivant";
import GalerieMonstres from "./exercices/04-rendu-conditionnel-listes/02-galerie-monstres/GalerieMonstres";
import FiltreBestiaireType from "./exercices/04-rendu-conditionnel-listes/03-filtre-type/FiltreBestiaire";
import BestiaireComplet from "./exercices/04-rendu-conditionnel-listes/04-bestiaire-complet/BestiaireComplet";
import RugissementMonstre from "./exercices/05-cycle-vie-hooks/01-rugissement-monstre/RugissementMonstre";
import RegenerationScene from "./exercices/05-cycle-vie-hooks/02-regeneration-monstre/Scene";
import InvocationRapide from "./exercices/05-cycle-vie-hooks/03-invocation-rapide/InvocationRapide";
import ChronometreCombat from "./exercices/05-cycle-vie-hooks/04-chronometre-combat/ChronometreCombat";
import RencontreSauvage from "./exercices/06-appel-api/01-rencontre-sauvage/RencontreSauvage";
import BestiaireDistant from "./exercices/06-appel-api/02-bestiaire-distant/BestiaireDistant";
import MonsterdexFragile from "./exercices/06-appel-api/03-monsterdex-fragile/MonsterdexFragile";
import CarnetDeTerrain from "./exercices/06-appel-api/04-carnet-de-terrain/CarnetDeTerrain";

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
          {/* Séance 3 · Événements & State */}
          <Route
            path="/04-state/01-compteur-monstre"
            element={
              <Exercice meta={allExercices[8]}>
                <CompteurMonstre />
              </Exercice>
            }
          />
          <Route
            path="/04-state/02-identite-monstre"
            element={
              <Exercice meta={allExercices[9]}>
                <IdentiteMonstre />
              </Exercice>
            }
          />
          <Route
            path="/04-state/03-filtre-bestiaire"
            element={
              <Exercice meta={allExercices[10]}>
                <FiltreBestiaire />
              </Exercice>
            }
          />
          <Route
            path="/04-state/04-formulaire-monstre"
            element={
              <Exercice meta={allExercices[11]}>
                <FormulaireMonstre />
              </Exercice>
            }
          />
          {/* Séance 4 · Rendu conditionnel & Listes */}
          <Route
            path="/05-listes/01-monstre-vivant"
            element={
              <Exercice meta={allExercices[12]}>
                <MonstreVivant />
              </Exercice>
            }
          />
          <Route
            path="/05-listes/02-galerie-monstres"
            element={
              <Exercice meta={allExercices[13]}>
                <GalerieMonstres />
              </Exercice>
            }
          />
          <Route
            path="/05-listes/03-filtre-type"
            element={
              <Exercice meta={allExercices[14]}>
                <FiltreBestiaireType />
              </Exercice>
            }
          />
          <Route
            path="/05-listes/04-bestiaire-complet"
            element={
              <Exercice meta={allExercices[15]}>
                <BestiaireComplet />
              </Exercice>
            }
          />
          {/* Séance 5 · Cycle de vie & Hooks */}
          <Route
            path="/06-hooks/01-rugissement-monstre"
            element={
              <Exercice meta={allExercices[16]}>
                <RugissementMonstre />
              </Exercice>
            }
          />
          <Route
            path="/06-hooks/02-regeneration-monstre"
            element={
              <Exercice meta={allExercices[17]}>
                <RegenerationScene />
              </Exercice>
            }
          />
          <Route
            path="/06-hooks/03-invocation-rapide"
            element={
              <Exercice meta={allExercices[18]}>
                <InvocationRapide />
              </Exercice>
            }
          />
          <Route
            path="/06-hooks/04-chronometre-combat"
            element={
              <Exercice meta={allExercices[19]}>
                <ChronometreCombat />
              </Exercice>
            }
          />
          {/* Séance 6 · Appel d'API */}
          <Route
            path="/07-api/01-rencontre-sauvage"
            element={
              <Exercice meta={allExercices[20]}>
                <RencontreSauvage />
              </Exercice>
            }
          />
          <Route
            path="/07-api/02-bestiaire-distant"
            element={
              <Exercice meta={allExercices[21]}>
                <BestiaireDistant />
              </Exercice>
            }
          />
          <Route
            path="/07-api/03-monsterdex-fragile"
            element={
              <Exercice meta={allExercices[22]}>
                <MonsterdexFragile />
              </Exercice>
            }
          />
          <Route
            path="/07-api/04-carnet-de-terrain"
            element={
              <Exercice meta={allExercices[23]}>
                <CarnetDeTerrain />
              </Exercice>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
