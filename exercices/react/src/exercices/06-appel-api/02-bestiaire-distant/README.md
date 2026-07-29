# 📡 Exercice 02 — Le bestiaire distant

> 📖 Réf. officielle : [Response.ok — MDN](https://developer.mozilla.org/fr/docs/Web/API/Response/ok)

## 🎯 Objectif

Charger une **liste** de monstres depuis un fichier JSON local en gérant les
3 états typiques d'un appel réseau : chargement, erreur, données.

**Durée estimée** : 20-25 min

---

## 🎓 Prérequis

- Exercice 01 de cette séance terminé
- Avoir vu en cours : les 3 états `data` / `isLoading` / `error`, le bloc
  `try` / `catch` / `finally`

---

## 📂 Fichier à éditer

```
BestiaireDistant.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Déclare les 3 états

```tsx
const [isLoading, setIsLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
```

(`monstres` est déjà déclaré.)

### Étape 2 — Le fetch

```tsx
const res = await fetch("/data/bestiaire.json")
const data: MonstreResume[] = await res.json()
```

### Étape 3 — `try` / `catch` / `finally`

```tsx
try {
  // ton fetch de l'étape 2
  setMonstres(data)
} catch {
  setError("Impossible de charger le bestiaire")
} finally {
  setIsLoading(false)
}
```

### Étape 4 — Rendu conditionnel

Avant le `return` de la liste, ajoute :

```tsx
if (isLoading) return <p>Chargement...</p>
if (error) return <p className="text-error">❌ {error}</p>
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Pourquoi l'ordre des `if` compte ?</strong></summary>

`isLoading` doit être vérifié en premier : tant qu'on charge, on ne sait pas
encore s'il y a une erreur. Ensuite `error`, puis enfin les données — cet
ordre garantit qu'un seul état s'affiche à la fois.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
import { useEffect, useState } from "react"

interface MonstreResume {
  id: number
  nom: string
  emoji: string
  element: string
}

export default function BestiaireDistant() {
  const [monstres, setMonstres] = useState<MonstreResume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMonstres() {
      try {
        const res = await fetch("/data/bestiaire.json")
        const data: MonstreResume[] = await res.json()
        setMonstres(data)
      } catch {
        setError("Impossible de charger le bestiaire")
      } finally {
        setIsLoading(false)
      }
    }
    loadMonstres()
  }, [])

  if (isLoading) return <p>Chargement...</p>
  if (error) return <p className="text-error">❌ {error}</p>

  return (
    <ul className="menu bg-base-100 rounded-box w-64 shadow">
      {monstres.map((m) => (
        <li key={m.id}>
          <span className="capitalize">
            {m.emoji} {m.nom}
          </span>
        </li>
      ))}
    </ul>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] "Chargement..." s'affiche brièvement puis la liste des 5 monstres apparaît
- [ ] Si tu casses volontairement l'URL (ex: `/data/bestiaireeee.json`), le
      message d'erreur s'affiche (et pas un plantage silencieux)
- [ ] Jamais deux états affichés en même temps

---

## 🚀 Pour aller plus loin

- Ajoute un champ de recherche qui filtre la liste par `element` avec
  `.filter()`, une fois les monstres chargés.
