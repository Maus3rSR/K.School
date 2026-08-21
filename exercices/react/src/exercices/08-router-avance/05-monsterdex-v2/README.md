# 🐲 Exercice 05 — MonsterDex v2

Synthèse du chapitre

## 🎯 Objectif

Combiner tout ce que tu as appris sur React Router avancé : **layout
partagé** (`Outlet`), **route dynamique** (`:id` + `useParams`) et
**navigation programmatique** (`useNavigate`).

**Durée estimée** : 30-35 min

---

## 🎓 Prérequis

- Exercices 01 à 04 terminés
- Savoir combiner `Outlet`, routes imbriquées, `useParams` et `useNavigate`

---

## 📂 Fichier à éditer

```
MonsterdexV2.tsx
```

---

## 🧭 Instructions

1. Dans `Layout`, importe `Outlet` et remplace le commentaire par
   `<Outlet />`.
2. Dans `Detail`, récupère le paramètre `id` avec `useParams<{ id: string
   }>()`.
3. Retrouve le monstre correspondant dans `MONSTRES`.
4. Si aucun monstre ne correspond, affiche `"Monstre introuvable"`. Sinon,
   affiche son emoji, son nom, son type et ses PV.
5. Récupère la fonction `navigate` avec `useNavigate()`.
6. Ajoute un bouton `"⬅️ Retour au bestiaire"` qui appelle `navigate(-1)` au
   clic.
7. Dans `MonsterdexV2`, ajoute un `<Routes>` avec une
   `<Route path="/" element={<Layout />}>`.
8. À l'intérieur, déclare une route **index** (`Bestiaire`) et une route
   `":id"` (`Detail`).

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Ordre des étapes</strong></summary>

Commence par le `<Routes>` imbriqué (étapes 7-8) pour pouvoir naviguer entre
`Bestiaire` et `Detail`. Ajoute ensuite `Outlet` dans `Layout`, puis termine
par la logique de `Detail` (`useParams`, recherche, `useNavigate`).
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
import { Link, Outlet, Route, Routes, useNavigate, useParams } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <nav className="flex items-center gap-3 rounded-box bg-base-200 p-2">
        <Link to="/09-router-avance/05-monsterdex-v2" className="btn btn-ghost btn-sm">
          🏠 Bestiaire
        </Link>
      </nav>

      <div className="card w-full bg-base-100 border border-base-300 p-6">
        <Outlet />
      </div>
    </div>
  );
}

function Detail() {
  const { id } = useParams<{ id: string }>();
  const monstre = MONSTRES.find((m) => m.id === Number(id));
  const navigate = useNavigate();

  if (!monstre) {
    return <p className="text-center text-error">Monstre introuvable</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-5xl">{monstre.emoji}</p>
      <h2 className="text-2xl font-bold">{monstre.nom}</h2>
      <p className="opacity-70">{monstre.type}</p>
      <p>❤️ {monstre.pv} PV</p>
      <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
        ⬅️ Retour au bestiaire
      </button>
    </div>
  );
}

export default function MonsterdexV2() {
  return (
    <div className="flex justify-center">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Bestiaire />} />
          <Route path=":id" element={<Detail />} />
        </Route>
      </Routes>
    </div>
  );
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Le menu du haut reste affiché en permanence
- [ ] Cliquer sur un monstre affiche sa fiche de détail
- [ ] Le bouton "Retour au bestiaire" ramène à la liste
- [ ] Un `id` inconnu dans l'URL affiche "Monstre introuvable"
- [ ] Aucune erreur TypeScript ni dans la console
