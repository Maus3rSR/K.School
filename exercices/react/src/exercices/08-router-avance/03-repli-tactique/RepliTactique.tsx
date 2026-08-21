import { useState } from "react";
import { Route, Routes } from "react-router-dom";

function Combat() {
  const [dresseur, setDresseur] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // 👉 Étape 1 — Récupère la fonction navigate avec useNavigate
    // 👉 Étape 2 — Redirige vers "/09-router-avance/03-repli-tactique/capture-reussie"
    //    une fois le formulaire envoyé
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-center opacity-70">
        Un Dracobulon sauvage apparaît ! Entre ton nom de dresseur pour tenter
        de le capturer.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={dresseur}
          onChange={(e) => setDresseur(e.target.value)}
          placeholder="Ton nom de dresseur"
          className="input input-bordered"
          required
        />
        <button type="submit" className="btn btn-primary">
          🎯 Tenter la capture
        </button>
      </form>
    </div>
  );
}

function CaptureReussie() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-5xl">🎉</p>
      <h2 className="text-2xl font-bold">Capture réussie !</h2>
      {/* 👉 Étape 3 — Ajoute un bouton "Retourner au combat" qui appelle navigate(-1) */}
    </div>
  );
}

export default function RepliTactique() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      {/* 👉 Étape 4 — Ajoute un <Routes> avec une route index (Combat) et "capture-reussie" (CaptureReussie) */}
      <Combat />
    </div>
  );
}
