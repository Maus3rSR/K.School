# 📦 Exercice 03 — L'encart enveloppant

> 📖 Réf. officielle : [Passing JSX as children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)

## 🎯 Objectif

Faire en sorte que le composant `Encart` puisse **envelopper n'importe quel contenu** grâce à la prop spéciale `children`.

```tsx
<Encart titre="Créatures du bestiaire">
  <p>🐙 Gribouillon — maître des 8 tentacules</p>
  <p>👾 Bidulor — collecteur de props rares</p>
</Encart>
```

**Durée estimée** : 15-20 min

---

## 🎓 Prérequis

- Exercices 01 et 02 de cette séance terminés
- Avoir vu en cours : la prop `children`, `React.ReactNode`

---

## 📂 Fichier à éditer

```
Encart.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Déclare `children` dans l'interface

```ts
children: React.ReactNode
```

`React.ReactNode` est le type de "tout ce que React sait afficher".

### Étape 2 — Reçois `children` dans la fonction

Ajoute `children` dans la déstructuration des props.

### Étape 3 — Affiche `children`

Dans le `return`, place `{children}` là où le commentaire l'indique.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — L'import manquant</strong></summary>

`React.ReactNode` est déjà importé en haut du fichier :

```ts
import type { ReactNode } from "react"
```

Dans l'interface, tu peux donc écrire `ReactNode` directement.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
import type { ReactNode } from "react"

interface EncartProps {
  titre: string
  children: ReactNode
}

export default function Encart({ titre, children }: EncartProps) {
  return (
    <div className="rounded-box border border-base-300 bg-base-200 p-4">
      <h2 className="mb-2 font-bold">{titre}</h2>
      {children}
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] `children: ReactNode` est dans l'interface
- [ ] `children` est reçu par déstructuration
- [ ] Le contenu passé entre les balises s'affiche dans l'aperçu
- [ ] Aucune erreur TypeScript

---

## 🚀 Pour aller plus loin

- Ajoute une prop `couleur?: "info" | "warning" | "success"` qui change la classe de bordure (`border-info`, `border-warning`, `border-success`).
