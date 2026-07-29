# 🎣 Exercice 01 — Rencontre sauvage

> 📖 Réf. officielle : [Fetch API — MDN](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)

## 🎯 Objectif

Réaliser ton tout premier appel réseau depuis un composant React : charger un
monstre depuis un fichier JSON (notre mini API locale, servie par Vite) et
l'afficher au montage du composant.

**Durée estimée** : 15-20 min

---

## 🎓 Prérequis

- `useState` et `useEffect` (séance précédente)
- Avoir vu en cours : `fetch`, `async`/`await`, le pattern
  `useEffect(() => { async function load() {...}; load() }, [])`

---

## 📂 Fichier à éditer

```
RencontreSauvage.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Importe `useEffect`

```tsx
import { useEffect, useState } from "react"
```

### Étape 2 — Charge le monstre au montage

Ajoute un `useEffect` avec un tableau de dépendances vide `[]`. À
l'intérieur, déclare une fonction `async` (le callback de `useEffect` ne peut
**jamais** être `async` directement), puis appelle-la immédiatement :

```tsx
useEffect(() => {
  async function loadMonstre() {
    const res = await fetch("/data/monstre-du-jour.json")
    const data: Monstre = await res.json()
    setMonstre(data)
  }
  loadMonstre()
}, [])
```

`/data/monstre-du-jour.json` est un fichier statique du dossier `public/` :
Vite le sert tel quel, exactement comme le ferait une vraie API REST.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Pourquoi `monstre` est-il `Monstre | null` ?</strong></summary>

Au tout premier rendu, la réponse réseau n'est pas encore arrivée : il n'y a
donc rien à afficher. `null` représente cet état "pas encore de donnée", et
le composant retourne un message de chargement tant que c'est le cas.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
import { useEffect, useState } from "react"

interface Monstre {
  id: number
  nom: string
  emoji: string
  element: string
}

export default function RencontreSauvage() {
  const [monstre, setMonstre] = useState<Monstre | null>(null)

  useEffect(() => {
    async function loadMonstre() {
      const res = await fetch("/data/monstre-du-jour.json")
      const data: Monstre = await res.json()
      setMonstre(data)
    }
    loadMonstre()
  }, [])

  if (!monstre) return <p>Chargement...</p>

  return (
    <div className="card w-72 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center gap-2">
        <span className="text-6xl">{monstre.emoji}</span>
        <h2 className="card-title capitalize">{monstre.nom}</h2>
        <span className="badge badge-outline">{monstre.element}</span>
      </div>
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Le composant affiche "Chargement..." brièvement, puis la carte du monstre
- [ ] Aucune erreur TypeScript ni erreur dans la console
- [ ] Ouvrir l'onglet Network des DevTools montre bien une requête vers `/data/monstre-du-jour.json`

---

## 🚀 Pour aller plus loin

- Regarde le contenu de `public/data/monstre-du-jour.json` et modifie-le : le
  changement apparaît au rechargement, sans toucher au code React.
