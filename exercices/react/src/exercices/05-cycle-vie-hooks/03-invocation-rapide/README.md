# 🔮 Exercice 03 — L'invocation rapide

> 📖 Réf. officielle : [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)

## 🎯 Objectif

Donner le focus **automatiquement** au champ de saisie dès que le composant
apparaît à l'écran, pour pouvoir invoquer un monstre sans avoir à cliquer
dans le champ au préalable.

**Durée estimée** : 15-20 min

---

## 🎓 Prérequis

- Exercices 01 et 02 de cette séance terminés
- Avoir vu en cours : `useRef`, l'attribut `ref`, `useRef<HTMLInputElement>`

---

## 📂 Fichier à éditer

```
InvocationRapide.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Déclare la ref

Juste après le `useState`, déclare une ref typée pour l'input :

```tsx
const inputRef = useRef<HTMLInputElement>(null)
```

N'oublie pas d'importer `useRef` et `useEffect` :

```tsx
import { useState, useRef, useEffect } from "react"
```

### Étape 2 — Donne le focus au montage

Ajoute un `useEffect` qui s'exécute une seule fois, à l'apparition du
composant, et qui donne le focus à l'input :

```tsx
useEffect(() => {
  inputRef.current?.focus()
}, [])
```

### Étape 3 — Relie la ref à l'input

Sur la balise `<input>`, ajoute la prop `ref` :

```tsx
<input ref={inputRef} ... />
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Pourquoi `?.` avant `.focus()` ?</strong></summary>

`inputRef.current` peut valoir `null` (avant le premier rendu, ou si le
`ref` n'a pas encore été relié). `?.` évite une erreur si jamais
`current` est `null` — c'est une sécurité de typage TypeScript.
</details>

<details>
<summary><strong>Indice 2 — Pourquoi useEffect et pas directement dans le corps du composant ?</strong></summary>

`inputRef.current` ne contient le vrai élément DOM qu'**après** le rendu.
`useEffect` s'exécute aussi après le rendu — c'est le seul endroit fiable
pour l'utiliser.
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
import { useState, useRef, useEffect } from "react"

export default function InvocationRapide() {
  const [nom, setNom] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="card w-80 bg-base-100 shadow-lg">
      <div className="card-body gap-3">
        <h2 className="card-title">🔮 Invocation rapide</h2>
        <input
          ref={inputRef}
          type="text"
          placeholder="Nom du monstre à invoquer..."
          className="input input-bordered w-full"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        {nom && (
          <p className="text-sm opacity-70">
            ✨ "{nom}" apparaît dans un nuage de fumée...
          </p>
        )}
      </div>
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Dès le chargement de la page, le curseur clignote déjà dans le champ
- [ ] Taper du texte affiche le message "✨ ... apparaît dans un nuage de fumée"
- [ ] Aucun clic n'est nécessaire pour commencer à écrire
- [ ] Pas d'erreur TypeScript ni d'erreur dans la console

---

## 🚀 Pour aller plus loin

- Vide le champ automatiquement (et redonne le focus) 1 seconde après
  l'invocation, avec un second `useEffect`.
