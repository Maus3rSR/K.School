# 📖 Exercice 04 — Le bestiaire complet

> 📖 Réf. officielle : [Rendering Lists](https://react.dev/learn/rendering-lists) · [Conditional Rendering](https://react.dev/learn/conditional-rendering)

## 🎯 Objectif

**Exercice de synthèse** : combiner rendu conditionnel, listes avec `map()`, filtrage de tableau avec plusieurs critères, et suppression d'éléments — le tout avec des tableaux d'objets TypeScript typés.

**Durée estimée** : 35-45 min

---

## 🎓 Prérequis

- Exercices 01, 02 et 03 de cette séance terminés
- Avoir vu en cours : `Monstre[]`, type union, `Record<K,V>`, `filter()`, `map()`

---

## 📂 Fichier à éditer

```
BestiaireComplet.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Les states de filtrage

Déclare les deux states manquants :

```tsx
const [recherche, setRecherche] = useState<string>("")
const [afficherUniquementRares, setAfficherUniquementRares] = useState<boolean>(false)
```

Lie l'input de recherche :

```tsx
<input
  value={recherche}
  onChange={(e) => setRecherche(e.target.value)}
  ...
/>
```

Lie la checkbox :

```tsx
<input
  type="checkbox"
  checked={afficherUniquementRares}
  onChange={(e) => setAfficherUniquementRares(e.target.checked)}
  ...
/>
```

### Étape 2 — Filtrage multi-critères

Calcule `monstresFiltres` en appliquant les deux filtres :

```tsx
const monstresFiltres: Monstre[] = monstres
  .filter((m) => m.nom.toLowerCase().includes(recherche.toLowerCase()))
  .filter((m) => !afficherUniquementRares || m.rarété === "rare" || m.rarété === "légendaire")
```

Puis affiche le compteur et mappe sur `monstresFiltres`.

Pour le badge de rareté, utilise le dictionnaire `BADGE_RARETE` :

```tsx
<span className={`badge text-xs ${BADGE_RARETE[monstre.rarété]}`}>{monstre.rarété}</span>
```

### Étape 3 — Supprimer un monstre

Dans `handleSupprimer`, filtre le state `monstres` pour exclure l'id à supprimer :

```tsx
function handleSupprimer(id: number) {
  setMonstres((prev) => prev.filter((m) => m.id !== id))
}
```

Branche le bouton 🗑️ :

```tsx
<button onClick={() => handleSupprimer(monstre.id)} ...>🗑️</button>
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Chaîner plusieurs .filter()</strong></summary>

```tsx
const monstresFiltres = monstres
  .filter((m) => m.nom.toLowerCase().includes(recherche.toLowerCase()))
  .filter((m) => !afficherUniquementRares || m.rarété === "rare" || m.rarété === "légendaire")
```

Le premier filtre s'applique sur le texte de recherche.  
Le second s'applique sur la rareté : si la checkbox est décochée (`!afficherUniquementRares` est `true`), tout passe ; sinon, seuls les rare et légendaires passent.
</details>

<details>
<summary><strong>Indice 2 — Supprimer sans muter le state</strong></summary>

```tsx
setMonstres((prev) => prev.filter((m) => m.id !== id))
```

`filter()` retourne un **nouveau tableau** sans l'élément supprimé.  
Ne jamais appeler `.splice()` directement sur le state.
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
import { useState } from "react"

type Rarété = "commun" | "rare" | "légendaire"

type Monstre = {
  id: number
  nom: string
  emoji: string
  type: string
  pv: number
  rarété: Rarété
}

const MONSTRES_INITIAUX: Monstre[] = [
  { id: 1, nom: "Dracobulon",  emoji: "🐉", type: "igné",     pv: 120, rarété: "légendaire" },
  { id: 2, nom: "Glubator",    emoji: "🐸", type: "aquatique", pv: 80,  rarété: "commun"     },
  { id: 3, nom: "Crânéos",     emoji: "💀", type: "obscur",   pv: 95,  rarété: "rare"        },
  { id: 4, nom: "Voltiflor",   emoji: "🌿", type: "végétal",  pv: 60,  rarété: "commun"      },
  { id: 5, nom: "Pyrostrix",   emoji: "🔥", type: "igné",     pv: 110, rarété: "rare"        },
]

const BADGE_RARETE: Record<Rarété, string> = {
  commun:     "badge-ghost",
  rare:       "badge-info",
  légendaire: "badge-warning",
}

export default function BestiaireComplet() {
  const [monstres, setMonstres] = useState<Monstre[]>(MONSTRES_INITIAUX)
  const [recherche, setRecherche] = useState<string>("")
  const [afficherUniquementRares, setAfficherUniquementRares] = useState<boolean>(false)

  const monstresFiltres: Monstre[] = monstres
    .filter((m) => m.nom.toLowerCase().includes(recherche.toLowerCase()))
    .filter((m) => !afficherUniquementRares || m.rarété === "rare" || m.rarété === "légendaire")

  function handleSupprimer(id: number) {
    setMonstres((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold">📖 Bestiaire complet</h2>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <input
          type="text"
          placeholder="🔍 Rechercher par nom…"
          className="input input-bordered w-full sm:w-72"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-warning"
            checked={afficherUniquementRares}
            onChange={(e) => setAfficherUniquementRares(e.target.checked)}
          />
          <span className="text-sm">⭐ Rares & Légendaires seulement</span>
        </label>
      </div>

      <p className="text-sm opacity-60">{monstresFiltres.length} monstre(s) trouvé(s) sur {monstres.length}</p>

      <div className="flex flex-col gap-3">
        {monstresFiltres.map((monstre) => (
          <div key={monstre.id} className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body flex-row items-center p-4 gap-4">
              <span className="text-4xl shrink-0">{monstre.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold">{monstre.nom}</h3>
                  <span className={`badge text-xs ${BADGE_RARETE[monstre.rarété]}`}>{monstre.rarété}</span>
                </div>
                <p className="text-sm opacity-60">{monstre.type}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs opacity-60">❤️ {monstre.pv}</span>
                  <progress className="progress progress-error flex-1 h-2" value={monstre.pv} max={150} />
                </div>
              </div>
              <button
                className="btn btn-ghost btn-sm text-error opacity-60 hover:opacity-100"
                onClick={() => handleSupprimer(monstre.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {monstresFiltres.length === 0 && (
        <p className="opacity-50 text-sm">Aucun monstre trouvé.</p>
      )}
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] La barre de recherche filtre les monstres par nom en temps réel
- [ ] La checkbox "Rares & Légendaires" filtre correctement
- [ ] Les deux filtres fonctionnent simultanément
- [ ] Le badge de rareté a la bonne couleur (`badge-ghost`, `badge-info`, `badge-warning`)
- [ ] Le bouton 🗑️ supprime le monstre de la liste
- [ ] Le compteur est mis à jour après chaque action
- [ ] "Aucun monstre trouvé." s'affiche si la liste filtrée est vide
- [ ] Pas d'erreur TypeScript ni d'erreur dans la console

---

## 🚀 Pour aller plus loin

- Ajoute un bouton "Réinitialiser" qui remet la liste à `MONSTRES_INITIAUX`.
- Ajoute un tri par PV (croissant / décroissant) via un `<select>` contrôlé.
