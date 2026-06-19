# ⚔️ Exercice 04 — La fiche de combat

> 📖 Réf. officielle : [Passing Props](https://react.dev/learn/passing-props-to-a-component) · [Passing JSX as children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)

## 🎯 Objectif

Compléter `FicheCombat.tsx`, un composant qui mobilise **toutes les notions de la séance** :

- Interface TypeScript complète (props obligatoires + optionnelles)
- Valeur par défaut (`rarete = "commun"`)
- `children` pour une section capacités facultative
- `className` dynamique pilotée par une prop
- Fichier CSS dédié (déjà importé)

Le résultat attendu dans l'aperçu :

| Bidulor 👾 | Gribouillon 🐙 | Torchigon 🔥 |
|-----------|--------------|------------|
| Commun · 40 PV · 12 ATK | Rare · 75 PV · 28 ATK · 2 capacités | Légendaire · 120 PV · 55 ATK · 3 capacités |

**Durée estimée** : 35-45 min

---

## 🎓 Prérequis

- Exercices 01, 02 et 03 de la séance terminés
- Avoir vu en cours : interface TypeScript, type union, props optionnelles, `children`, CSS dynamique

---

## 📂 Fichier à éditer

```
FicheCombat.tsx
```

`FicheCombat.css` est déjà fourni — les classes `.fiche-combat--commun`, `.fiche-combat--rare` et `.fiche-combat--legendaire` appliquent les couleurs automatiquement.

---

## 🧭 Instructions pas à pas

### Étape 1 — Complète l'interface

Ajoute les deux props manquantes dans `FicheCombatProps` :

```ts
rarete?: "commun" | "rare" | "legendaire"
children?: ReactNode
```

Puis ajoute-les dans la déstructuration avec la valeur par défaut de `rarete` :

```tsx
function FicheCombat({ nom, emoji, pv, attaque, rarete = "commun", children }: FicheCombatProps)
```

### Étape 2 — Classe dynamique du conteneur

Compose la className avec la rareté :

```tsx
const classeConteneur = `fiche-combat fiche-combat--${rarete}`
```

Inspecte l'aperçu : la couleur de la bordure doit changer selon la rareté.

### Étape 3 — Label de rareté

Affiche un label lisible selon la valeur de `rarete` :

```tsx
const labelRarete =
  rarete === "legendaire" ? "✦ Légendaire"
  : rarete === "rare"     ? "✦ Rare"
  :                         "Commun"
```

### Étape 4 — Section capacités conditionnelle

Affiche `children` uniquement quand il est fourni :

```tsx
{children && (
  <div className="fiche-combat__capacites">
    <p className="font-semibold mb-1">Capacités</p>
    {children}
  </div>
)}
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice — Interface complète</strong></summary>

```ts
interface FicheCombatProps {
  nom: string
  emoji: string
  pv: number
  attaque: number
  rarete?: "commun" | "rare" | "legendaire"
  children?: ReactNode
}
```
</details>

<details>
<summary><strong>Indice — Solution complète</strong></summary>

```tsx
import type { ReactNode } from "react"
import './FicheCombat.css'

interface FicheCombatProps {
  nom: string
  emoji: string
  pv: number
  attaque: number
  rarete?: "commun" | "rare" | "legendaire"
  children?: ReactNode
}

export default function FicheCombat({
  nom, emoji, pv, attaque,
  rarete = "commun",
  children,
}: FicheCombatProps) {
  const classeConteneur = `fiche-combat fiche-combat--${rarete}`

  const labelRarete =
    rarete === "legendaire" ? "✦ Légendaire"
    : rarete === "rare"     ? "✦ Rare"
    :                         "Commun"

  return (
    <div className={classeConteneur}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-4xl">{emoji}</span>
        <span className="fiche-combat__rarete">{labelRarete}</span>
      </div>
      <h2 className="text-lg font-bold">{nom}</h2>
      <div className="fiche-combat__stats">
        <div className="fiche-combat__stat">
          <strong>❤️ {pv}</strong>
          <span>PV</span>
        </div>
        <div className="fiche-combat__stat">
          <strong>⚔️ {attaque}</strong>
          <span>ATK</span>
        </div>
      </div>
      {children && (
        <div className="fiche-combat__capacites">
          <p className="font-semibold mb-1">Capacités</p>
          {children}
        </div>
      )}
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] L'interface contient toutes les props (4 obligatoires + 2 optionnelles)
- [ ] `rarete` a la valeur par défaut `"commun"` dans la déstructuration
- [ ] La bordure change de couleur selon la rareté (vert/bleu/orange)
- [ ] Le badge affiche "Commun", "✦ Rare" ou "✦ Légendaire"
- [ ] La section "Capacités" n'apparaît pas sur Bidulor (pas de `children`)
- [ ] Elle apparaît sur Gribouillon et Torchigon
- [ ] Pas d'erreur TypeScript

---

## 🚀 Pour aller plus loin

- Ajoute une prop `vitesse?: number` (défaut : 10) et affiche-la dans les stats.
- Ajoute une prop `estKO?: boolean` qui applique une classe CSS `opacity-50 grayscale` au conteneur quand le monstre est hors combat.
