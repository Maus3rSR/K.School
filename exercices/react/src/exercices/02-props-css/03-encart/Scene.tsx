import Encart from "./Encart";
import type { ComponentType, ReactNode } from "react";

// Cast nécessaire : la prop `children` est à ajouter par l'apprenant
const Encadre = Encart as ComponentType<{ titre: string; children: ReactNode }>;

export default function Scene() {
  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto">
      <Encadre titre="Créatures du bestiaire">
        <p>🐙 Gribouillon — maître des 8 tentacules</p>
        <p>👾 Bidulor — collecteur de props rares</p>
        <p>🔥 Torchigon — brûleur de bugs invétéré</p>
      </Encadre>
      <Encadre titre="Règles du donjon">
        <ul className="list-disc pl-4">
          <li>Ne jamais muter les props.</li>
          <li>Toujours passer par le parent.</li>
          <li>Un composant = une responsabilité.</li>
        </ul>
      </Encadre>
    </div>
  );
}
