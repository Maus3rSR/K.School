# 📚 Exercice 03 — Le bestiaire

> 📖 Réf. officielle : [Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)

## 🎯 Objectif

Jusqu'ici, un fichier = un composant. Mais une vraie application range ses
composants dans **des fichiers séparés** que l'on **importe** là où on en a besoin.

Tu vas :
1. construire un composant `CarteMonstre` réutilisable (dans son propre fichier) ;
2. l'**importer** dans `Bestiaire` et l'afficher **plusieurs fois** pour composer
   ta galerie de monstres. 🐲🐙👾

**Durée estimée** : 30-40 min

---

## 🎓 Prérequis

- Avoir fait les exercices 01 et 02
- Comprendre un composant et le JSX de base
- Avoir vu en cours : `import` / `export`, `export default`

---

## 📂 Fichiers à éditer

```
CarteMonstre.tsx   ← le composant réutilisable
Bestiaire.tsx      ← la galerie qui le compose
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Complète `CarteMonstre.tsx`

Ce fichier exporte **par défaut** un composant `CarteMonstre`. Remplis sa carte :
emoji, nom et petite description d'un monstre. Exemple :

```tsx
export default function CarteMonstre() {
  return (
    <div className="card w-56 bg-base-100 shadow-md">
      <div className="card-body items-center text-center">
        <span className="text-6xl">👾</span>
        <h2 className="card-title">Pixelou</h2>
        <p className="text-sm">Né d'un bug, devenu mascotte.</p>
      </div>
    </div>
  )
}
```

> 💡 `export default` signifie : « ce fichier exporte **ce** composant comme
> élément principal ». On pourra l'importer **sans accolades**.

### Étape 2 — Observe l'import dans `Bestiaire.tsx`

En haut de `Bestiaire.tsx`, la ligne suivante **importe** ton composant :

```tsx
import CarteMonstre from './CarteMonstre'
```

- `./CarteMonstre` = le fichier voisin (pas besoin d'écrire `.tsx`).
- Pas d'accolades autour de `CarteMonstre` → car c'est un `export default`.

### Étape 3 — Compose ta galerie

Dans le `return` de `Bestiaire`, affiche **plusieurs** `<CarteMonstre />` :

```tsx
<CarteMonstre />
<CarteMonstre />
<CarteMonstre />
```

Réutiliser un composant, c'est exactement ça : on écrit la carte **une fois**,
on l'affiche **autant de fois** qu'on veut. 🎉

> ℹ️ Pour l'instant les 3 cartes sont identiques — c'est normal ! On apprendra à
> les rendre différentes avec les **props** à la séance suivante.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — « Cannot find module './CarteMonstre' »</strong></summary>

Vérifie que le nom dans l'import correspond **exactement** au nom du fichier
(`CarteMonstre`) et qu'ils sont bien dans le **même dossier** (`./`).
</details>

<details>
<summary><strong>Indice 2 — default vs nommé</strong></summary>

- `export default` → import **sans** accolades : `import CarteMonstre from './CarteMonstre'`
- `export` (nommé) → import **avec** accolades : `import { CarteMonstre } from './CarteMonstre'`

Ici, on utilise `export default`, donc **pas** d'accolades.
</details>

<details>
<summary><strong>Indice 3 — Bestiaire complet</strong></summary>

```tsx
import CarteMonstre from './CarteMonstre'

export default function Bestiaire() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <CarteMonstre />
      <CarteMonstre />
      <CarteMonstre />
      <CarteMonstre />
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] `CarteMonstre.tsx` affiche une vraie carte (emoji + nom + description)
- [ ] `Bestiaire.tsx` **importe** `CarteMonstre`
- [ ] Au moins **3 cartes** s'affichent dans l'aperçu
- [ ] Aucune erreur rouge dans le terminal
- [ ] Tu sais expliquer la différence entre `export default` et un export nommé

---

## 🚀 Pour aller plus loin (bonus)

1. **Passe en export nommé** : remplace `export default function CarteMonstre`
   par `export function CarteMonstre`, puis adapte l'import dans `Bestiaire`
   (`import { CarteMonstre } from './CarteMonstre'`).
2. Crée un **deuxième** composant `EnTeteBestiaire` (titre de la galerie) dans son
   propre fichier, importe-le et affiche-le au-dessus des cartes.
