# 🗂️ Exercice 02 — La galerie de monstres

> 📖 Réf. officielle : [Rendering Lists](https://react.dev/learn/rendering-lists)

## 🎯 Objectif

Afficher un tableau d'objets typés (`Monstre[]`) en utilisant **`map()`** et la prop **`key`**, et combiner avec un affichage conditionnel pour le cas liste vide.

**Durée estimée** : 20-25 min

---

## 🎓 Prérequis

- Exercice 01 de cette séance terminé
- Avoir vu en cours : `Array.map()`, la prop `key`, tableaux typés (`Task[]`)

---

## 📂 Fichier à éditer

```
GalerieMonstres.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Remplacer la carte statique par un `.map()`

Supprime la carte statique et remplace-la par un `map()` sur `monstres`.  
Chaque élément doit avoir une prop `key` unique :

```tsx
{monstres.map((monstre) => (
  <div key={monstre.id} className="card w-44 bg-base-100 shadow-md border border-base-300">
    <div className="card-body items-center text-center p-4 gap-2">
      <span className="text-4xl">{monstre.emoji}</span>
      <h3 className="font-bold text-sm">{monstre.nom}</h3>
    </div>
  </div>
))}
```

### Étape 2 — Afficher le type dans un badge

À l'intérieur de chaque carte, ajoute un badge pour le type :

```tsx
<span className="badge badge-ghost text-xs">{monstre.type}</span>
```

### Étape 3 — Afficher la barre de PV

Ajoute une barre de progression pour les PV (max : 150) :

```tsx
<div className="w-full">
  <p className="text-xs opacity-60">❤️ {monstre.pv} PV</p>
  <progress className="progress progress-error w-full h-2" value={monstre.pv} max={150} />
</div>
```

### Étape 4 — Message si liste vide

Après le `<div className="flex flex-wrap ...">`, ajoute un message conditionnel :

```tsx
{monstres.length === 0 && (
  <p className="opacity-50 text-sm">Aucun monstre dans le bestiaire.</p>
)}
```

Pour tester, tu peux temporairement vider le tableau `monstres` à `[]`.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Pourquoi key est obligatoire ?</strong></summary>

React utilise `key` pour identifier chaque élément de liste et optimiser les re-rendus.  
Sans `key`, tu auras un avertissement dans la console et des bugs potentiels lors des mises à jour.

**Règles** :
- `key` doit être **unique dans la liste**
- Utilise l'`id` de l'objet si disponible, jamais l'index du tableau (sauf tableau statique)
- `key` ne se passe pas comme prop à l'enfant, elle est réservée à React

```tsx
// ✅ Bonne pratique
monstres.map((m) => <Carte key={m.id} ... />)

// ⚠️ Déconseillé (sauf liste statique non réordonnée)
monstres.map((m, i) => <Carte key={i} ... />)
```
</details>

<details>
<summary><strong>Indice 2 — Structure complète d'une carte</strong></summary>

```tsx
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
```
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
type Monstre = {
  id: number
  nom: string
  emoji: string
  type: string
  pv: number
}

const monstres: Monstre[] = [
  { id: 1, nom: "Dracobulon",  emoji: "🐉", type: "igné",     pv: 120 },
  { id: 2, nom: "Glubator",    emoji: "🐸", type: "aquatique", pv: 80  },
  { id: 3, nom: "Crânéos",     emoji: "💀", type: "obscur",   pv: 95  },
  { id: 4, nom: "Voltiflor",   emoji: "🌿", type: "végétal",  pv: 60  },
  { id: 5, nom: "Pyrostrix",   emoji: "🔥", type: "igné",     pv: 110 },
]

export default function GalerieMonstres() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">🗂️ Galerie du bestiaire</h2>

      <div className="flex flex-wrap gap-4">
        {monstres.map((monstre) => (
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

      {monstres.length === 0 && (
        <p className="opacity-50 text-sm">Aucun monstre dans le bestiaire.</p>
      )}
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Les 5 monstres s'affichent sous forme de cartes
- [ ] Chaque carte affiche l'emoji, le nom, le type et les PV
- [ ] Chaque carte a une prop `key` unique (`monstre.id`)
- [ ] Aucun avertissement "Each child in a list should have a unique key" dans la console
- [ ] Pas d'erreur TypeScript

---

## 🚀 Pour aller plus loin

- Trie les monstres par PV décroissants avant l'affichage (`.sort()`).
- Affiche un badge de couleur différente selon le type : rouge pour "igné", bleu pour "aquatique", etc.
