# 🔎 Exercice 03 — Le filtre du bestiaire

> 📖 Réf. officielle : [Rendering Lists — Filtering arrays](https://react.dev/learn/rendering-lists#filtering-arrays-of-items)

## 🎯 Objectif

Combiner `useState`, `Array.filter()` et `Array.map()` pour **filtrer dynamiquement** une liste de monstres par type.

**Durée estimée** : 25-30 min

---

## 🎓 Prérequis

- Exercices 01 et 02 de cette séance terminés
- Avoir vu en cours : `Array.filter()`, combinaison `filter` + `map`

---

## 📂 Fichier à éditer

```
FiltreBestiaire.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — State du filtre actif + boutons

Déclare un state pour mémoriser le type sélectionné :

```tsx
const [typeActif, setTypeActif] = useState<string>("tous")
```

Pour chaque bouton de filtre, change sa classe selon s'il est actif ou non :

```tsx
{types.map((t) => (
  <button
    key={t}
    className={`btn btn-sm capitalize ${typeActif === t ? "btn-primary" : "btn-ghost"}`}
    onClick={() => setTypeActif(t)}
  >
    {t}
  </button>
))}
```

### Étape 2 — Filtrer le tableau

Calcule la liste filtrée à partir de `typeActif` :

```tsx
const monstresFiltres: Monstre[] =
  typeActif === "tous"
    ? tousLesMonstres
    : tousLesMonstres.filter((m) => m.type === typeActif)
```

Puis affiche les monstres filtrés avec `.map()` (même structure de carte que l'exercice 02).

### Étape 3 — Afficher le compteur

Remplace "-- monstre(s)" par le nombre réel :

```tsx
<p className="text-sm opacity-60">{monstresFiltres.length} monstre(s) affiché(s)</p>
```

### Étape 4 — Message liste vide

Si aucun monstre ne correspond au filtre :

```tsx
{monstresFiltres.length === 0 && (
  <p className="opacity-50 text-sm">Aucun monstre de type « {typeActif} ».</p>
)}
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — filter() + map() en chaîne</strong></summary>

On peut aussi écrire en une seule expression :

```tsx
const monstresFiltres = typeActif === "tous"
  ? tousLesMonstres
  : tousLesMonstres.filter((m) => m.type === typeActif)
```

`filter()` retourne un **nouveau tableau**, ce qui permet d'enchaîner `.map()` directement dessus.  
L'original `tousLesMonstres` n'est jamais modifié.
</details>

<details>
<summary><strong>Indice 2 — Classe conditionnelle sur le bouton actif</strong></summary>

```tsx
className={`btn btn-sm capitalize ${typeActif === t ? "btn-primary" : "btn-ghost"}`}
```

L'interpolation de template literal permet de combiner des classes statiques et dynamiques.
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
import { useState } from "react"

type Monstre = {
  id: number
  nom: string
  emoji: string
  type: string
  pv: number
}

const tousLesMonstres: Monstre[] = [
  { id: 1, nom: "Dracobulon",  emoji: "🐉", type: "igné",     pv: 120 },
  { id: 2, nom: "Glubator",    emoji: "🐸", type: "aquatique", pv: 80  },
  { id: 3, nom: "Crânéos",     emoji: "💀", type: "obscur",   pv: 95  },
  { id: 4, nom: "Voltiflor",   emoji: "🌿", type: "végétal",  pv: 60  },
  { id: 5, nom: "Pyrostrix",   emoji: "🔥", type: "igné",     pv: 110 },
  { id: 6, nom: "Aquabulus",   emoji: "💧", type: "aquatique", pv: 75  },
  { id: 7, nom: "Nocturnix",   emoji: "🌑", type: "obscur",   pv: 88  },
]

const types = ["tous", "igné", "aquatique", "obscur", "végétal"]

export default function FiltreBestiaire() {
  const [typeActif, setTypeActif] = useState<string>("tous")

  const monstresFiltres: Monstre[] =
    typeActif === "tous"
      ? tousLesMonstres
      : tousLesMonstres.filter((m) => m.type === typeActif)

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">🔎 Filtre par type</h2>

      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            className={`btn btn-sm capitalize ${typeActif === t ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setTypeActif(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="text-sm opacity-60">{monstresFiltres.length} monstre(s) affiché(s)</p>

      <div className="flex flex-wrap gap-4">
        {monstresFiltres.map((monstre) => (
          <div key={monstre.id} className="card w-44 bg-base-100 shadow-md border border-base-300">
            <div className="card-body items-center text-center p-4 gap-2">
              <span className="text-4xl">{monstre.emoji}</span>
              <h3 className="font-bold text-sm">{monstre.nom}</h3>
              <span className="badge badge-ghost text-xs">{monstre.type}</span>
              <div className="w-full">
                <p className="text-xs opacity-60">❤️ {monstre.pv} PV</p>
                <progress className="progress progress-error w-full h-2" value={monstre.pv} max={150} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {monstresFiltres.length === 0 && (
        <p className="opacity-50 text-sm">Aucun monstre de type « {typeActif} ».</p>
      )}
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Par défaut, les 7 monstres sont affichés
- [ ] Cliquer sur un type filtre la liste en temps réel
- [ ] Le bouton actif est visuellement distinct des autres
- [ ] Le compteur reflète le nombre de monstres affichés
- [ ] Si aucun résultat, un message s'affiche
- [ ] Pas d'erreur TypeScript ni d'erreur dans la console

---

## 🚀 Pour aller plus loin

- Ajoute une barre de recherche par nom en plus du filtre par type (les deux doivent fonctionner ensemble).
- Affiche le nombre total de monstres pour chaque type dans les boutons (ex: "igné (2)").
