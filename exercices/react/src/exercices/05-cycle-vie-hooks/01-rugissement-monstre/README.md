# 🔊 Exercice 01 — Le rugissement du monstre

> 📖 Réf. officielle : [useEffect — React](https://react.dev/reference/react/useEffect)

## 🎯 Objectif

Faire rugir le monstre **automatiquement dès son apparition à l'écran**, puis
faire disparaître le message tout seul après 2 secondes, grâce à `useEffect`.

**Durée estimée** : 15-20 min

---

## 🎓 Prérequis

- Exercices des séances 1 à 4 terminés
- Avoir vu en cours : le cycle de vie d'un composant, `useEffect` et le tableau
  de dépendances vide `[]`

---

## 📂 Fichier à éditer

```
RugissementMonstre.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Déclare le state `rugit`

Remplace `const rugit = true` par un vrai state :

```tsx
const [rugit, setRugit] = useState<boolean>(true)
```

### Étape 2 — Ajoute un `useEffect` au montage

Juste après la déclaration du state, ajoute un Effet qui s'exécute **une
seule fois**, à l'apparition du composant, et qui fait disparaître le
rugissement après 2 secondes :

```tsx
useEffect(() => {
  setTimeout(() => setRugit(false), 2000)
}, [])
```

N'oublie pas d'importer `useEffect` :

```tsx
import { useState, useEffect } from "react"
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Pourquoi un tableau vide `[]` ?</strong></summary>

Le tableau vide signifie "exécute cet Effet **une seule fois**, juste après le
premier rendu". Sans lui, l'Effet se relancerait à chaque re-rendu et
redémarrerait le minuteur en boucle.
</details>

<details>
<summary><strong>Indice 2 — Où placer le useEffect ?</strong></summary>

Il doit être appelé directement dans le corps de la fonction, au même niveau
que le `useState`, jamais à l'intérieur d'une condition ou d'une fonction
imbriquée.
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
import { useState, useEffect } from "react"

export default function RugissementMonstre() {
  const [rugit, setRugit] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setRugit(false), 2000)
  }, [])

  return (
    <div className="card w-72 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center gap-3">
        <span className="text-6xl">🐺</span>
        <h2 className="card-title">Dracorugis</h2>
        {rugit ? (
          <p className="text-warning font-semibold">🔊 Rugit d'un air menaçant !</p>
        ) : (
          <p className="opacity-50 text-sm">... le calme revient</p>
        )}
      </div>
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Au chargement de la page, le message "🔊 Rugit d'un air menaçant !" est visible
- [ ] Après 2 secondes, le message change automatiquement pour "... le calme revient"
- [ ] Le changement se fait **sans action de l'utilisateur**
- [ ] Pas d'erreur TypeScript ni d'erreur dans la console

---

## 🚀 Pour aller plus loin

- Change la durée du rugissement à 5 secondes.
- Ajoute un `console.log` dans le `useEffect` pour observer dans la console à
  quel moment précis il s'exécute par rapport à l'affichage du composant.
