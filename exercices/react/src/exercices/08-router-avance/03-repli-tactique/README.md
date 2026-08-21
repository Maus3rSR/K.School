# 🚪 Exercice 03 — Repli tactique

> 📖 Réf. officielle : [useNavigate](https://reactrouter.com/start/library/navigating#usenavigate)

## 🎯 Objectif

Naviguer **sans que l'apprenant clique sur un lien** : rediriger après un
envoi de formulaire, puis revenir en arrière avec `navigate(-1)`.

**Durée estimée** : 15-20 min

---

## 🎓 Prérequis

- Exercices 01 et 02 terminés
- Avoir vu en cours : `Link`/`NavLink` vs `useNavigate`

---

## 📂 Fichier à éditer

```
RepliTactique.tsx
```

---

## 🧭 Instructions

1. Importe `useNavigate` depuis `react-router-dom`.
2. Dans `Combat`, appelle `useNavigate()` pour récupérer la fonction
   `navigate`.
3. Dans `handleSubmit`, une fois l'envoi du formulaire traité, appelle
   `navigate("/09-router-avance/03-repli-tactique/capture-reussie")`.
4. Dans `CaptureReussie`, ajoute un bouton qui appelle `navigate(-1)` au clic
   pour revenir à l'écran précédent dans l'historique.
5. Dans `RepliTactique`, ajoute un `<Routes>` avec une route index (`Combat`)
   et une route `"capture-reussie"` (`CaptureReussie`).

> 💡 Ici, on n'utilise **pas** de `<Link>` : la navigation est déclenchée par
> le code, en réaction à un événement (soumission de formulaire, clic sur un
> bouton), plutôt que par un clic direct sur un lien.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Quand utiliser useNavigate ?</strong></summary>

Pour une navigation classique (l'apprenant clique sur un lien), utilise
toujours `Link` ou `NavLink`. Réserve `useNavigate` aux cas où la navigation
doit se déclencher **après une action** : fin d'un formulaire, retour en
arrière, redirection automatique...
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

function Combat() {
  const [dresseur, setDresseur] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/09-router-avance/03-repli-tactique/capture-reussie");
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
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-5xl">🎉</p>
      <h2 className="text-2xl font-bold">Capture réussie !</h2>
      <button className="btn btn-ghost" onClick={() => navigate(-1)}>
        ↩️ Retourner au combat
      </button>
    </div>
  );
}

export default function RepliTactique() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <Routes>
        <Route index element={<Combat />} />
        <Route path="capture-reussie" element={<CaptureReussie />} />
      </Routes>
    </div>
  );
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Envoyer le formulaire affiche l'écran "Capture réussie !"
- [ ] Le bouton "Retourner au combat" ramène à l'écran de départ
- [ ] Aucun `<Link>` n'est utilisé pour ces deux navigations
- [ ] Aucune erreur TypeScript ni dans la console
