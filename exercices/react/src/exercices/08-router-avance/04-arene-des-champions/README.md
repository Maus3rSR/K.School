# 🏟️ Exercice 04 — L'arène des champions

> 📖 Réf. officielle : [Routes imbriquées](https://reactrouter.com/start/library/routing#nested-routes) · [useParams](https://reactrouter.com/start/library/url-values#route-params)

## 🎯 Objectif

Combiner un **layout partagé** (`Outlet`) avec une **route enfant
dynamique** (`:id`) pour afficher la page de détail d'un champion à
l'intérieur d'un cadre commun.

**Durée estimée** : 25-30 min

---

## 🎓 Prérequis

- Exercices 01 et 02 terminés
- Savoir combiner `Outlet`, routes imbriquées et `useParams`

---

## 📂 Fichier à éditer

```
AreneDesChampions.tsx
```

---

## 🧭 Instructions

1. Importe `Outlet` depuis `react-router-dom` et remplace le commentaire dans
   `Layout` par `<Outlet />`.
2. Dans `Portrait`, récupère le paramètre `id` avec `useParams<{ id: string
   }>()`.
3. Retrouve le champion correspondant dans `CHAMPIONS` (attention aux types :
   `string` vs `number`).
4. Si aucun champion ne correspond, affiche `"Champion introuvable"`. Sinon,
   affiche son emoji, son nom, son titre et son nombre de victoires.
5. Dans `AreneDesChampions`, ajoute un `<Routes>` avec une
   `<Route path="/" element={<Layout />}>`.
6. À l'intérieur, déclare une route **index** (`Accueil`) et une route
   `":id"` (`Portrait`).

> 💡 Ici, la route dynamique `:id` est **enfant** de la route layout : le
> menu et le cadre (déclarés dans `Layout`) restent affichés en permanence
> pendant que seul le contenu du portrait change selon l'`id` choisi.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Où placer la route dynamique ?</strong></summary>

La route `":id"` se déclare **à l'intérieur** de la `<Route
path="/" element={<Layout />}>`, au même niveau que la route `index` :

```tsx
<Route path="/" element={<Layout />}>
  <Route index element={<Accueil />} />
  <Route path=":id" element={<Portrait />} />
</Route>
```
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
import { Link, Outlet, Route, Routes, useParams } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <h2 className="text-2xl font-bold">🏟️ Arène des champions</h2>
      <nav className="flex flex-wrap justify-center gap-2 rounded-box bg-base-200 p-2">
        {CHAMPIONS.map((champion) => (
          <Link
            key={champion.id}
            to={`/09-router-avance/04-arene-des-champions/${champion.id}`}
            className="btn btn-outline btn-sm"
          >
            {champion.emoji} {champion.nom}
          </Link>
        ))}
      </nav>

      <div className="card w-full bg-base-100 border border-base-300 p-6">
        <Outlet />
      </div>
    </div>
  );
}

function Portrait() {
  const { id } = useParams<{ id: string }>();
  const champion = CHAMPIONS.find((c) => c.id === Number(id));

  if (!champion) {
    return <p className="text-center text-error">Champion introuvable</p>;
  }

  return (
    <div className="text-center">
      <p className="text-5xl">{champion.emoji}</p>
      <h3 className="text-xl font-bold">{champion.nom}</h3>
      <p className="opacity-70">{champion.titre}</p>
      <p className="mt-2">🏆 {champion.victoires} victoires</p>
    </div>
  );
}

export default function AreneDesChampions() {
  return (
    <div className="flex justify-center">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path=":id" element={<Portrait />} />
        </Route>
      </Routes>
    </div>
  );
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Le titre et le menu de l'arène restent affichés en permanence
- [ ] Cliquer sur un champion affiche son portrait dans le cadre
- [ ] Un `id` inconnu dans l'URL affiche "Champion introuvable"
- [ ] Aucune erreur TypeScript ni dans la console
