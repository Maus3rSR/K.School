# 🏯 Exercice 02 — Le quartier général

> 📖 Réf. officielle : [Routes imbriquées](https://reactrouter.com/start/library/routing#nested-routes)

## 🎯 Objectif

Construire un **layout partagé** (menu + cadre commun) qui affiche un contenu
différent selon la page grâce à des **routes imbriquées** et au composant
`Outlet`.

**Durée estimée** : 20-25 min

---

## 🎓 Prérequis

- Exercice 01 terminé
- Avoir vu en cours : routes imbriquées, `Outlet`

---

## 📂 Fichier à éditer

```
QuartierGeneral.tsx
```

---

## 🧭 Instructions

1. Importe `Outlet` depuis `react-router-dom`.
2. Dans `Layout`, remplace le commentaire par `<Outlet />` : c'est
   l'emplacement où s'affichera le contenu de la route enfant active.
3. Dans `QuartierGeneral`, ajoute un `<Routes>` avec une `<Route path="/"
   element={<Layout />}>`.
4. À l'intérieur de cette route, déclare trois routes **enfants** :
   - une route `index` qui affiche `Accueil`
   - `"entrainement"` qui affiche `Entrainement`
   - `"boutique"` qui affiche `Boutique`

> 💡 Le chemin de la route parente (`/`) est automatiquement préfixé aux
> chemins des routes enfants : `"entrainement"` correspond donc à
> `/09-router-avance/02-quartier-general/entrainement`. C'est pour ça que les
> chemins des routes enfants restent relatifs, sans `/` au début.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — À quoi sert Outlet ?</strong></summary>

`Outlet` est un emplacement réservé dans le layout. React Router y insère
automatiquement le composant de la route enfant qui correspond à l'URL
actuelle — un peu comme la prop `children`, mais décidé par le routeur plutôt
que par le composant parent.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
import { Link, Outlet, Route, Routes } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <nav className="flex gap-2 rounded-box bg-base-200 p-2">
        <Link to="/09-router-avance/02-quartier-general" className="btn btn-ghost btn-sm">
          Accueil
        </Link>
        <Link to="/09-router-avance/02-quartier-general/entrainement" className="btn btn-ghost btn-sm">
          Entraînement
        </Link>
        <Link to="/09-router-avance/02-quartier-general/boutique" className="btn btn-ghost btn-sm">
          Boutique
        </Link>
      </nav>

      <div className="card w-full bg-base-100 border border-base-300 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default function QuartierGeneral() {
  return (
    <div className="flex justify-center">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="entrainement" element={<Entrainement />} />
          <Route path="boutique" element={<Boutique />} />
        </Route>
      </Routes>
    </div>
  );
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Le menu et le cadre restent affichés en permanence
- [ ] Cliquer sur "Entraînement" ou "Boutique" change uniquement le contenu du
      cadre
- [ ] L'URL se met à jour sans rechargement
- [ ] Aucune erreur TypeScript ni dans la console
