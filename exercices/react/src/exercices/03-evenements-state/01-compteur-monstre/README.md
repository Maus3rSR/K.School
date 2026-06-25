# ⚔️ Exercice 01 — Le compteur de monstre

> 📖 Réf. officielle : [Adding Interactivity — State](https://react.dev/learn/state-a-components-memory)

## 🎯 Objectif

Rendre le composant `CompteurMonstre` **interactif** en utilisant `useState` pour gérer les points de vie et le nombre d'attaques d'un monstre.

**Durée estimée** : 20-30 min

---

## 🎓 Prérequis

- Exercices des séances 1 et 2 terminés
- Avoir vu en cours : `useState`, les événements React (`onClick`), la convention `[valeur, setValeur]`

---

## 📂 Fichier à éditer

```
CompteurMonstre.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Déclare le state `pv`

Remplace la variable `const pv = 100` par un vrai state :

```tsx
const [pv, setPv] = useState<number>(100)
```

Affiche `pv` dans le `<span>` à côté de "-- / 100" et passe `pv` à la prop `value` de la `<progress>`.

### Étape 2 — Déclare le state `attaques`

```tsx
const [attaques, setAttaques] = useState<number>(0)
```

Affiche `attaques` dans le `<p>` à la place de "--".

### Étape 3 — Implémente `handleAttaque`

Dans cette fonction, diminue `pv` de 10 et incrémente `attaques` de 1 :

```tsx
setPv(pv - 10)
setAttaques(attaques + 1)
```

### Étape 4 — Implémente `handleSoin`

Augmente `pv` de 20 **sans dépasser 100** :

```tsx
setPv(Math.min(pv + 20, 100))
```

### Bonus — Message de défaite

Affiche `☠️ Monstre vaincu !` uniquement si `pv <= 0` :

```tsx
{pv <= 0 && <p className="text-error font-bold">☠️ Monstre vaincu !</p>}
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Déclarer deux states</strong></summary>

```tsx
const [pv, setPv] = useState<number>(100)
const [attaques, setAttaques] = useState<number>(0)
```

Chaque state a sa propre responsabilité : `pv` pour la vie, `attaques` pour le compteur.
</details>

<details>
<summary><strong>Indice 2 — La barre de progression</strong></summary>

```tsx
<progress className="progress progress-error w-full" value={pv} max={100} />
```

`value` doit recevoir le state `pv`, pas un nombre en dur.
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
import { useState } from "react"

export default function CompteurMonstre() {
  const [pv, setPv] = useState<number>(100)
  const [attaques, setAttaques] = useState<number>(0)

  function handleAttaque() {
    setPv(pv - 10)
    setAttaques(attaques + 1)
  }

  function handleSoin() {
    setPv(Math.min(pv + 20, 100))
  }

  return (
    <div className="card w-72 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center gap-3">
        <span className="text-6xl">🐉</span>
        <h2 className="card-title">Dracobulon</h2>

        <div className="w-full">
          <div className="flex justify-between text-sm mb-1">
            <span>❤️ PV</span>
            <span>{pv} / 100</span>
          </div>
          <progress className="progress progress-error w-full" value={pv} max={100} />
        </div>

        <p className="text-sm opacity-60">Attaques portées : {attaques}</p>

        <div className="flex gap-2 mt-2">
          <button className="btn btn-error btn-sm" onClick={handleAttaque}>
            ⚔️ Attaquer (−10 PV)
          </button>
          <button className="btn btn-success btn-sm" onClick={handleSoin}>
            💊 Soigner (+20 PV)
          </button>
        </div>

        {pv <= 0 && <p className="text-error font-bold">☠️ Monstre vaincu !</p>}
      </div>
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Les PV s'affichent (valeur initiale : 100)
- [ ] "Attaquer" diminue les PV de 10 et incrémente le compteur
- [ ] "Soigner" augmente les PV de 20 (max 100)
- [ ] La barre de progression reflète les PV en temps réel
- [ ] Pas d'erreur TypeScript ni d'erreur dans la console

---

## 🚀 Pour aller plus loin

- Empêche de cliquer sur "Attaquer" si `pv <= 0` (prop `disabled`).
- Ajoute un bouton "Réinitialiser" qui remet `pv` à 100 et `attaques` à 0.
