// eslint-disable-next-line @typescript-eslint/no-explicit-any
import CarteMonstreProps from "./CarteMonstreProps" assert { type: "module" };
import type { ComponentType } from "react";

// Cast nécessaire : le composant est incomplet tant que l'apprenant n'a pas déclaré les props
const Carte = CarteMonstreProps as ComponentType<{
  nom: string;
  emoji: string;
  description: string;
}>;

export default function Scene() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Carte nom="Bidulor" emoji="👾" description="Un monstre curieux qui adore le JSX." />
      <Carte nom="Gribouillon" emoji="🐙" description="Dessine des composants avec ses 8 tentacules." />
      <Carte nom="Torchigon" emoji="🔥" description="Brûle les bugs avant qu'ils ne compilent." />
    </div>
  );
}
