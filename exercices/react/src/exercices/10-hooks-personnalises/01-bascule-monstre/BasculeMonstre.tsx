import { useState } from "react";

// TODO: extraire la logique de bascule dans un hook useToggle.

export default function BasculeMonstre() {
  // TODO: remplace ce useState et cette fonction par un appel à useToggle.
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((v) => !v);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button type="button" className="btn btn-primary" onClick={toggle}>
        {isOpen ? "Masquer" : "Afficher"} la fiche de Toxigerme
      </button>

      {isOpen && (
        <div className="card w-80 bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Toxigerme</h2>
            <p className="text-sm opacity-80">
              Un petit monstre vénéneux qui adore les câlins, mais seulement
              avant le petit-déjeuner.
            </p>
            <span className="badge badge-outline">Type Poison</span>
          </div>
        </div>
      )}
    </div>
  );
}
