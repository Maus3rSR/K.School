# 🎲 Exercice 02 — L'identité du monstre

> 📖 Réf. officielle : [useState — React](https://react.dev/reference/react/useState)

## 🎯 Objectif

Pratiquer la gestion de plusieurs states indépendants de type `string` et mettre à jour l'interface en réponse à des clics de boutons.

**Durée estimée** : 15-25 min

---

## 🎓 Prérequis

- Exercice 01 de cette séance terminé
- Avoir vu en cours : `useState<string>`, plusieurs states dans un même composant, convention `setXxx`

---

## 📂 Fichier à éditer

```
IdentiteMonstre.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — State `nom`

Remplace `const nom = "Monstre sans nom"` par :

```tsx
const [nom, setNom] = useState<string>("Monstre sans nom")
```

Affiche `nom` dans le `<h2>` à la place du texte en dur.

### Étape 2 — State `emoji`

```tsx
const [emoji, setEmoji] = useState<string>("❓")
```

Affiche `emoji` dans le `<span>`.

### Étape 3 — Nom aléatoire

Dans `handleNomAleatoire`, tire un indice aléatoire et appelle `setNom` :

```tsx
const index = Math.floor(Math.random() * NOMS_ALEATOIRES.length)
setNom(NOMS_ALEATOIRES[index])
```

### Étape 4 — Emoji aléatoire

Dans `handleEmojiAleatoire`, utilise le tableau `EMOJIS` déclaré dans la fonction :

```tsx
const index = Math.floor(Math.random() * EMOJIS.length)
setEmoji(EMOJIS[index])
```

### Étape 5 — Réinitialiser

```tsx
setNom("Monstre sans nom")
setEmoji("❓")
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Deux states indépendants</strong></summary>

```tsx
const [nom,   setNom]   = useState<string>("Monstre sans nom")
const [emoji, setEmoji] = useState<string>("❓")
```

Chaque state est indépendant : changer `nom` ne touche pas `emoji`.
</details>

<details>
<summary><strong>Indice 2 — Tirer un élément aléatoire dans un tableau</strong></summary>

```tsx
const index = Math.floor(Math.random() * NOMS_ALEATOIRES.length)
const nomChoisi = NOMS_ALEATOIRES[index]
```
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
import { useState } from "react"

const NOMS_ALEATOIRES = [
  "Glurpax", "Ziboulon", "Croctaure", "Furfangue",
  "Slimogon", "Torchibulle", "Grognekos", "Vuoltrix",
]

export default function IdentiteMonstre() {
  const [nom,   setNom]   = useState<string>("Monstre sans nom")
  const [emoji, setEmoji] = useState<string>("❓")

  function handleNomAleatoire() {
    const index = Math.floor(Math.random() * NOMS_ALEATOIRES.length)
    setNom(NOMS_ALEATOIRES[index])
  }

  function handleEmojiAleatoire() {
    const EMOJIS = ["🐉", "👾", "🐙", "🔥", "🧟", "🦠", "🐲", "👹"]
    const index = Math.floor(Math.random() * EMOJIS.length)
    setEmoji(EMOJIS[index])
  }

  function handleReset() {
    setNom("Monstre sans nom")
    setEmoji("❓")
  }

  return (
    <div className="card w-72 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center gap-3">
        <span className="text-6xl">{emoji}</span>
        <h2 className="card-title">{nom}</h2>

        <div className="flex flex-col gap-2 w-full mt-2">
          <button className="btn btn-primary btn-sm" onClick={handleNomAleatoire}>
            🎲 Nom aléatoire
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleEmojiAleatoire}>
            🎲 Emoji aléatoire
          </button>
          <button className="btn btn-ghost btn-sm" onClick={handleReset}>
            🔄 Réinitialiser
          </button>
        </div>
      </div>
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Le nom initial "Monstre sans nom" s'affiche
- [ ] "Nom aléatoire" change le nom à chaque clic
- [ ] "Emoji aléatoire" change l'emoji à chaque clic
- [ ] "Réinitialiser" remet les valeurs initiales
- [ ] Pas d'erreur TypeScript ni d'erreur dans la console

---

## 🚀 Pour aller plus loin

- Empêche que le même nom soit tiré deux fois de suite.
- Affiche un historique des 3 derniers noms générés.
