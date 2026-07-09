# ⏱️ Exercice 04 — Le chronomètre de combat

> 📖 Réf. officielle : [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)

## 🎯 Objectif

Combiner tout ce que tu as appris cette séance : un `useEffect` avec
`setInterval` **et son cleanup**, plus un `useRef` pour donner le focus
automatique à un champ de saisie.

C'est l'exercice de **synthèse** de la séance.

**Durée estimée** : 30-40 min

---

## 🎓 Prérequis

- Exercices 01, 02 et 03 de cette séance terminés
- Avoir vu en cours : `useEffect`, cleanup, `useRef` pour le DOM

---

## 📂 Fichier à éditer

```
ChronometreCombat.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Déclare la ref et relie-la à l'input

```tsx
const noteRef = useRef<HTMLInputElement>(null)
```

Puis sur la balise `<input>` :

```tsx
<input ref={noteRef} ... />
```

N'oublie pas d'importer `useRef` et `useEffect` :

```tsx
import { useState, useRef, useEffect } from "react"
```

### Étape 2 — Focus automatique sur la note

Ajoute un premier `useEffect`, au montage, qui donne le focus à `noteRef` :

```tsx
useEffect(() => {
  noteRef.current?.focus()
}, [])
```

### Étape 3 — Le chronomètre qui tourne

Ajoute un **second** `useEffect`, séparé du premier, qui incrémente
`secondes` chaque seconde et nettoie son intervalle :

```tsx
useEffect(() => {
  const id = setInterval(() => {
    setSecondes((s) => s + 1)
  }, 1000)

  return () => clearInterval(id)
}, [])
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Pourquoi deux useEffect séparés ?</strong></summary>

Le focus et le chronomètre sont deux responsabilités indépendantes. Un
`useEffect` = une seule raison de se déclencher. Les mélanger dans un seul
Effet rendrait le code plus difficile à comprendre et à nettoyer.
</details>

<details>
<summary><strong>Indice 2 — Pourquoi `setSecondes((s) => s + 1)` et pas `setSecondes(secondes + 1)` ?</strong></summary>

Dans le callback de `setInterval`, `secondes` viendrait de la version du
composant au moment où l'Effet a été créé (une seule fois). La forme
fonctionnelle `(s) => s + 1` garantit de toujours partir de la dernière
valeur réelle.
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
import { useState, useRef, useEffect } from "react"

export default function ChronometreCombat() {
  const [secondes, setSecondes] = useState<number>(0)
  const noteRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    noteRef.current?.focus()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setSecondes((s) => s + 1)
    }, 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="card w-80 bg-base-100 shadow-lg">
      <div className="card-body gap-3">
        <h2 className="card-title">⏱️ Chronomètre de combat</h2>
        <p className="text-4xl font-mono text-center">{secondes}s</p>
        <input
          ref={noteRef}
          type="text"
          placeholder="Note tactique..."
          className="input input-bordered w-full"
        />
      </div>
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Le curseur est déjà positionné dans le champ "Note tactique" au chargement
- [ ] Le chronomètre s'incrémente automatiquement, une fois par seconde
- [ ] Deux `useEffect` distincts sont utilisés, chacun avec sa propre responsabilité
- [ ] Le `useEffect` du chronomètre retourne bien un cleanup (`clearInterval`)
- [ ] Pas d'erreur TypeScript ni d'erreur dans la console

---

## 🚀 Pour aller plus loin

- Ajoute un bouton "⏸️ Pause" / "▶️ Reprendre" qui arrête et relance le
  chronomètre (indice : un state `enPause`, et une condition dans l'Effet).
- Stocke le temps le plus long jamais atteint dans un `useRef` (pas un
  `useState`, puisque tu n'as pas besoin de re-rendu pour ça) et affiche-le.
