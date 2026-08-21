# 🪪 Exercice 01 — La fiche du monstre

> 📖 Réf. officielle : [Segments dynamiques](https://reactrouter.com/start/library/routing#dynamic-segments) · [useParams](https://reactrouter.com/start/library/url-values#route-params)

## 🎯 Objectif

Créer une route **dynamique** (`:id`) et lire sa valeur avec `useParams` pour
afficher la fiche du monstre correspondant.

**Durée estimée** : 20-25 min

---

## 🎓 Prérequis

- Avoir vu en cours : `Routes`, `Route`, `Link` (séance React Router bases)
- Notion de segment dynamique `:id` et de `useParams`

---

## 📂 Fichier à éditer

```
FicheDuMonstre.tsx
```

---

## 🧭 Instructions

1. Dans la fonction `Fiche`, récupère le paramètre `id` de l'URL grâce à
   `useParams<{ id: string }>()`.
2. Retrouve dans `MONSTRES` le monstre dont l'`id` correspond (attention :
   convertis l'un des deux côtés, `id` de l'URL est une **string**, `id` du
   monstre est un **number**).
3. Si aucun monstre ne correspond, affiche `"Monstre introuvable"`. Sinon,
   affiche son emoji, son nom, son type et ses PV.
4. Dans `FicheDuMonstre`, remplace `<Accueil />` par un bloc
   `<Routes>...</Routes>` avec :
   - une route **index** qui affiche `Accueil`
   - une route `":id"` qui affiche `Fiche`

> 💡 Les liens pointent vers des chemins absolus
> (`/09-router-avance/01-fiche-du-monstre/1`, `/…/2`, …). Le `<Routes>` que tu
> ajoutes est **imbriqué** dans cet exercice : ses chemins `index` et `":id"`
> restent donc relatifs à la route parente, exactement comme dans les
> exercices de la séance précédente.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Lire le paramètre</strong></summary>

```tsx
function Fiche() {
  const { id } = useParams<{ id: string }>();
  const monstre = MONSTRES.find((m) => m.id === Number(id));
  // ...
}
```
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
import { Link, Route, Routes, useParams } from "react-router-dom";

function Fiche() {
  const { id } = useParams<{ id: string }>();
  const monstre = MONSTRES.find((m) => m.id === Number(id));

  if (!monstre) {
    return <p className="text-center text-error">Monstre introuvable</p>;
  }

  return (
    <div className="text-center">
      <p className="text-5xl">{monstre.emoji}</p>
      <h2 className="text-2xl font-bold">{monstre.nom}</h2>
      <p className="opacity-70">{monstre.type}</p>
      <p className="mt-2">❤️ {monstre.pv} PV</p>
    </div>
  );
}

export default function FicheDuMonstre() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <nav className="flex flex-wrap justify-center gap-2 rounded-box bg-base-200 p-2">
        {MONSTRES.map((monstre) => (
          <Link
            key={monstre.id}
            to={`/09-router-avance/01-fiche-du-monstre/${monstre.id}`}
            className="btn btn-outline btn-sm"
          >
            {monstre.emoji} {monstre.nom}
          </Link>
        ))}
      </nav>

      <div className="card w-full bg-base-100 border border-base-300 p-6">
        <Routes>
          <Route index element={<Accueil />} />
          <Route path=":id" element={<Fiche />} />
        </Routes>
      </div>
    </div>
  );
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Cliquer sur un monstre affiche sa fiche complète
- [ ] Modifier l'`id` dans l'URL (ex : `.../99`) affiche "Monstre introuvable"
- [ ] L'URL se met à jour sans rechargement
- [ ] Aucune erreur TypeScript ni dans la console
