# 🔍 Exercice 03 — Le filtre du bestiaire

> 📖 Réf. officielle : [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)

## 🎯 Objectif

Créer un **input contrôlé** qui filtre la liste des monstres en temps réel dès que l'utilisateur tape dans le champ de recherche.

**Durée estimée** : 20-30 min

---

## 🎓 Prérequis

- Exercices 01 et 02 de cette séance terminés
- Avoir vu en cours : input contrôlé (`value` + `onChange`), typer un événement `React.ChangeEvent<HTMLInputElement>`, dériver des données depuis le state

---

## 📂 Fichier à éditer

```
FiltreBestiaire.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — State `recherche` et input contrôlé

Remplace `const recherche = ""` par un vrai state :

```tsx
const [recherche, setRecherche] = useState<string>("")
```

Ensuite, lie l'`<input>` au state en ajoutant les deux props indispensables :

```tsx
<input
  value={recherche}
  onChange={handleChange}
  ...
/>
```

### Étape 2 — Handler `handleChange`

```tsx
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setRecherche(e.target.value)
}
```

`e.target.value` contient la valeur du champ à l'instant t.

### Étape 3 — Filtrer la liste

Dérive `monstresFiltres` depuis `recherche` :

```tsx
const monstresFiltres = MONSTRES.filter(m =>
  m.nom.toLowerCase().includes(recherche.toLowerCase())
)
```

Puis affiche le nombre de résultats :

```tsx
<p className="text-sm opacity-60">{monstresFiltres.length} monstre(s) trouvé(s)</p>
```

### Bonus — Message si liste vide

```tsx
{monstresFiltres.length === 0 && (
  <p className="text-center opacity-50 w-full py-4">Aucun monstre trouvé 😢</p>
)}
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Le duo value + onChange</strong></summary>

Un input contrôlé a toujours ces deux props ensemble :

```tsx
<input value={recherche} onChange={handleChange} />
```

Sans `value`, l'input n'est pas contrôlé (React ne sait pas ce qu'il contient).  
Sans `onChange`, l'input est en lecture seule et l'utilisateur ne peut pas taper.
</details>

<details>
<summary><strong>Indice 2 — Insensible à la casse</strong></summary>

```tsx
m.nom.toLowerCase().includes(recherche.toLowerCase())
```

On met tout en minuscules pour que "grib" trouve "Gribouillon".
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
import { useState } from "react"

const MONSTRES = [
  { nom: "Bidulor",    emoji: "👾", type: "spectral" },
  { nom: "Gribouillon", emoji: "🐙", type: "aquatique" },
  { nom: "Torchigon",  emoji: "🔥", type: "igné" },
  { nom: "Glurpax",    emoji: "🧪", type: "chimique" },
  { nom: "Ziboulon",   emoji: "⚡", type: "électrique" },
  { nom: "Croctaure",  emoji: "🌿", type: "végétal" },
  { nom: "Slimogon",   emoji: "🟢", type: "chimique" },
  { nom: "Vuoltrix",   emoji: "🌀", type: "spectral" },
]

export default function FiltreBestiaire() {
  const [recherche, setRecherche] = useState<string>("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRecherche(e.target.value)
  }

  const monstresFiltres = MONSTRES.filter(m =>
    m.nom.toLowerCase().includes(recherche.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <input
        type="text"
        placeholder="🔍 Rechercher un monstre…"
        className="input input-bordered w-full"
        value={recherche}
        onChange={handleChange}
      />

      <p className="text-sm opacity-60">{monstresFiltres.length} monstre(s) trouvé(s)</p>

      <div className="flex flex-wrap gap-3">
        {monstresFiltres.map((monstre) => (
          <div key={monstre.nom} className="card w-36 bg-base-100 shadow-sm border border-base-300">
            <div className="card-body items-center text-center p-3 gap-1">
              <span className="text-3xl">{monstre.emoji}</span>
              <p className="text-sm font-semibold">{monstre.nom}</p>
              <span className="badge badge-ghost text-xs">{monstre.type}</span>
            </div>
          </div>
        ))}
        {monstresFiltres.length === 0 && (
          <p className="text-center opacity-50 w-full py-4">Aucun monstre trouvé 😢</p>
        )}
      </div>
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] L'input est contrôlé (`value` + `onChange`)
- [ ] La liste se filtre en temps réel à chaque frappe
- [ ] La recherche est insensible à la casse
- [ ] Le nombre de résultats s'affiche correctement
- [ ] Pas d'erreur TypeScript ni d'erreur dans la console

---

## 🚀 Pour aller plus loin

- Ajoute un bouton "✕" qui vide le champ de recherche (`setRecherche("")`).
- Filtre aussi par `type` en ajoutant un `<select>` contrôlé.
