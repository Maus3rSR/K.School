import BoutonVariante from "./BoutonVariante";
import type { ComponentType } from "react";

// Cast nécessaire : la prop `variant` est à compléter par l'apprenant
const Bouton = BoutonVariante as ComponentType<{
  variant: "primary" | "danger" | "ghost";
  label: string;
}>;

export default function Scene() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Bouton variant="primary" label="Valider" />
      <Bouton variant="danger" label="Supprimer" />
      <Bouton variant="ghost" label="Annuler" />
    </div>
  );
}
