# 📝 Exercice 04 — Le formulaire du bestiaire

> 📖 Réf. officielle : [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)

## 🎯 Objectif

Construire un **formulaire contrôlé complet** : trois inputs liés à leur state, soumission avec `onSubmit` + `e.preventDefault()`, et ajout du nouveau monstre dans une liste affichée dynamiquement.

C'est l'exercice de **synthèse** de la séance.

**Durée estimée** : 30-40 min

---

## 🎓 Prérequis

- Exercices 01, 02 et 03 de cette séance terminés
- Avoir vu en cours : formulaire contrôlé, `onSubmit`, `e.preventDefault()`, `useState` avec tableau

---

## 📂 Fichier à éditer

```
FormulaireMonstre.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Trois states pour les champs

Remplace les trois `const` par de vrais states :

```tsx
const [nom,   setNom]   = useState<string>("")
const [emoji, setEmoji] = useState<string>("")
const [type,  setType]  = useState<string>("")
```

Ensuite, lie chaque `<input>` à son state avec `value` et `onChange` :

```tsx
<input value={nom} onChange={e => setNom(e.target.value)} ... />
<input value={emoji} onChange={e => setEmoji(e.target.value)} ... />
<input value={type} onChange={e => setType(e.target.value)} ... />
```

### Étape 2 — Empêcher le rechargement

Dans `handleSubmit`, la première instruction doit être :

```tsx
e.preventDefault()
```

Sans ça, le navigateur recharge la page à chaque soumission.

### Étape 3 — Valider le formulaire

Si le champ `nom` est vide, on ignore la soumission :

```tsx
if (nom.trim() === "") return
```

### Étape 4 — Ajouter le monstre à la liste

Déclare le state pour la liste :

```tsx
const [monstres, setMonstres] = useState<Monstre[]>([])
```

Dans `handleSubmit`, crée le nouveau monstre et ajoute-le à la liste. **Important** : ne pas muter le tableau existant, créer un nouveau tableau :

```tsx
const nouveau: Monstre = { nom, emoji, type }
setMonstres([...monstres, nouveau])
```

Puis vide les champs pour préparer la prochaine saisie :

```tsx
setNom("")
setEmoji("")
setType("")
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Le spread operator pour les tableaux</strong></summary>

```tsx
setMonstres([...monstres, nouveau])
```

`[...monstres, nouveau]` crée un **nouveau tableau** avec tous les anciens éléments plus le nouveau.  
Ne jamais faire `monstres.push(nouveau)` — React ne détecterait pas le changement.
</details>

<details>
<summary><strong>Indice 2 — Vider les champs après soumission</strong></summary>

```tsx
setNom("")
setEmoji("")
setType("")
```

À placer après `setMonstres(...)` dans `handleSubmit`.
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
import { useState } from "react"

type Monstre = {
  nom: string
  emoji: string
  type: string
}

export default function FormulaireMonstre() {
  const [nom,      setNom]      = useState<string>("")
  const [emoji,    setEmoji]    = useState<string>("")
  const [type,     setType]     = useState<string>("")
  const [monstres, setMonstres] = useState<Monstre[]>([])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (nom.trim() === "") return
    const nouveau: Monstre = { nom, emoji, type }
    setMonstres([...monstres, nouveau])
    setNom("")
    setEmoji("")
    setType("")
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg">
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-md">
        <div className="card-body gap-3">
          <h2 className="card-title">➕ Créer un monstre</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nom *"
              className="input input-bordered flex-1"
              value={nom}
              onChange={e => setNom(e.target.value)}
            />
            <input
              type="text"
              placeholder="Emoji"
              className="input input-bordered w-24"
              value={emoji}
              onChange={e => setEmoji(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Type (ex: igné, aquatique…)"
            className="input input-bordered w-full"
            value={type}
            onChange={e => setType(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Ajouter au bestiaire
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-3">
        {monstres.map((monstre, index) => (
          <div key={index} className="card w-36 bg-base-100 shadow-sm border border-base-300">
            <div className="card-body items-center text-center p-3 gap-1">
              <span className="text-3xl">{monstre.emoji || "❓"}</span>
              <p className="text-sm font-semibold">{monstre.nom}</p>
              {monstre.type && (
                <span className="badge badge-ghost text-xs">{monstre.type}</span>
              )}
            </div>
          </div>
        ))}
        {monstres.length === 0 && (
          <p className="opacity-50 text-sm">Aucun monstre créé pour l'instant…</p>
        )}
      </div>
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Les trois inputs sont contrôlés (`value` + `onChange`)
- [ ] `e.preventDefault()` empêche le rechargement de page
- [ ] Soumettre avec `nom` vide n'ajoute rien
- [ ] Le monstre apparaît dans la liste après soumission
- [ ] Les champs sont vidés après chaque ajout
- [ ] Pas d'erreur TypeScript ni d'erreur dans la console

---

## 🚀 Pour aller plus loin

- Ajoute un bouton "🗑️" sur chaque carte pour supprimer le monstre de la liste.
- Affiche un badge "✨ Nouveau !" pendant 2 secondes après l'ajout (hint : `useState<boolean>`).
