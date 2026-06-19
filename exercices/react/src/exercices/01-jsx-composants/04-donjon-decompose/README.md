# 🏰 Exercice 04 — Le donjon décomposé

> 📖 Réf. officielle : [Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)

## 🎯 Objectif

`DonjonMonolithique.tsx` est un composant qui fait **trop de choses à la fois** — c'est l'anti-pattern numéro 1 en React.

Tu vas le **découper** en trois composants réutilisables :

| Composant | Rôle |
|-----------|------|
| `Monstre` | Affiche un badge avec un emoji et un nom |
| `SalleDonjon` | Affiche une salle (titre + ses monstres) |
| `Tresor` | Affiche le coffre avec emoji, nom et rareté |

À la fin, `Donjon.tsx` n'aura plus **aucun JSX inline** — seulement des composants composés.

**Durée estimée** : 30-40 min

---

## 🎓 Prérequis

- Exercices 01, 02 et 03 de la séance terminés
- Avoir vu en cours : composition de composants, principe de responsabilité unique, import/export

---

## 📂 Fichiers à éditer

```
Monstre.tsx       — le composant badge (à compléter)
SalleDonjon.tsx   — le composant salle (à compléter)
Tresor.tsx        — le composant trésor (à compléter)
Donjon.tsx        — le composant assembleur (à compléter)
```

> ⚠️ `DonjonMonolithique.tsx` est la référence — ne le modifie pas.

---

## 🧭 Instructions pas à pas

### Étape 1 — Composant `Monstre`

Ouvre `Monstre.tsx`. Ce composant doit recevoir deux données : l'emoji et le nom.

Pour l'instant, **sans props TypeScript** (on verra ça en séance 2) :
fais simplement en sorte que ton composant affiche un emoji et un nom en dur :

```tsx
export default function Monstre() {
  return (
    <div className="flex items-center gap-2 badge badge-lg badge-ghost">
      <span>👾</span> Bidulor
    </div>
  )
}
```

Vérifie qu'il s'affiche bien si tu l'ajoutes temporairement dans `Donjon.tsx`.

### Étape 2 — Composant `Tresor`

Ouvre `Tresor.tsx`. Extrais le bloc JSX du trésor depuis `DonjonMonolithique.tsx`. Le résultat doit être identique visuellement.

### Étape 3 — Composant `SalleDonjon`

Ouvre `SalleDonjon.tsx`. Extrais le JSX d'une salle. Utilise `<Monstre />` à l'intérieur — `SalleDonjon` **compose** `Monstre`.

### Étape 4 — Assembler dans `Donjon`

Dans `Donjon.tsx`, remplace tous les blocs JSX inline par tes composants :

```tsx
import SalleDonjon from './SalleDonjon'
import Tresor from './Tresor'

export default function Donjon() {
  return (
    <div className="...">
      <h1 className="...">🏰 Donjon des Bits Perdus</h1>
      <SalleDonjon />
      <SalleDonjon />
      <Tresor />
    </div>
  )
}
```

### Étape 5 — Pour aller plus loin (optionnel)

Ajoute une troisième salle avec deux nouveaux monstres de ton choix.
Tu remarqueras à quel point c'est plus simple avec des composants qu'en copiant du JSX brut !

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Structure de SalleDonjon</strong></summary>

```tsx
export default function SalleDonjon() {
  return (
    <div className="rounded-box border border-warning/40 bg-warning/10 p-4">
      <h2 className="font-semibold mb-2">Salle des Ombres</h2>
      <div className="flex gap-3">
        <Monstre />
        <Monstre />
      </div>
    </div>
  )
}
```

Remarque : le nom de la salle est encore en dur. C'est volontaire — les props seront au menu de la séance 2 !
</details>

<details>
<summary><strong>Indice 2 — Structure de Tresor</strong></summary>

```tsx
export default function Tresor() {
  return (
    <div className="rounded-box border border-success/40 bg-success/10 p-4 text-center">
      <span className="text-4xl">💎</span>
      <p className="mt-1 font-bold">Cristal du JSX</p>
      <p className="text-sm opacity-70">Trésor légendaire</p>
    </div>
  )
}
```
</details>

<details>
<summary><strong>Indice 3 — Donjon final</strong></summary>

```tsx
import SalleDonjon from './SalleDonjon'
import Tresor from './Tresor'

export default function Donjon() {
  return (
    <div className="rounded-box border border-base-300 bg-base-200 p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">🏰 Donjon des Bits Perdus</h1>
      <SalleDonjon />
      <SalleDonjon />
      <Tresor />
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] `Donjon.tsx` ne contient plus de JSX inline (uniquement des composants)
- [ ] `SalleDonjon` utilise `<Monstre />` à l'intérieur
- [ ] Chaque composant est dans son propre fichier avec un `export default`
- [ ] Le rendu dans l'aperçu est visuellement identique à `DonjonMonolithique`
- [ ] Pas d'erreur dans la console

---

## 💡 Ce que cet exercice t'apprend

- **Principe de responsabilité unique** : un composant = une chose
- **Composition** : un composant peut en contenir d'autres
- **Réutilisabilité** : `<Monstre />` et `<SalleDonjon />` peuvent être utilisés ailleurs
- **Lisibilité** : `Donjon.tsx` est maintenant déclaratif — on lit *quoi*, pas *comment*
