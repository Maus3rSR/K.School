# 🐉 Exercice 01 — Le monstre vivant

> 📖 Réf. officielle : [Conditional Rendering](https://react.dev/learn/conditional-rendering)

## 🎯 Objectif

Utiliser le **rendu conditionnel** (`&&` et ternaire `? :`) pour afficher ou masquer des éléments en fonction de l'état du monstre.

**Durée estimée** : 20-25 min

---

## 🎓 Prérequis

- Exercices de la séance 3 terminés
- Avoir vu en cours : rendu conditionnel avec `&&` et l'opérateur ternaire `? :`

---

## 📂 Fichier à éditer

```
MonstreVivant.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Affichage conditionnel avec `&&` et ternaire

**Ternaire** : Remplace l'emoji statique `🐉` par un ternaire :
- Si `estVivant` est `true`, affiche `🐉`
- Sinon, affiche `💀`

```tsx
<span className="text-7xl">{estVivant ? "🐉" : "💀"}</span>
```

**`&&`** : Affiche le badge "🛡️ Bouclier actif" **uniquement si** `bouclier` est `true` :

```tsx
{bouclier && <span className="badge badge-info">🛡️ Bouclier actif</span>}
```

**`&&`** : Affiche `⚠️ Dangereusement blessé !` uniquement si `estBlessé` est `true` :

```tsx
{estBlessé && <p className="text-warning font-semibold text-sm">⚠️ Dangereusement blessé !</p>}
```

### Étape 2 — Protéger avec le bouclier

Dans `handleAttaque`, le bouclier doit bloquer les dégâts. Si `bouclier` est actif :

```tsx
function handleAttaque() {
  if (bouclier) return
  setPv((prev) => Math.max(prev - 20, 0))
}
```

### Étape 3 — Soigner uniquement si vivant

Dans `handleSoin`, empêche de soigner un monstre mort et augmente les PV :

```tsx
function handleSoin() {
  if (!estVivant) return
  setPv((prev) => Math.min(prev + 30, pvMax))
}
```

Désactive aussi le bouton "Soigner" si `!estVivant` :

```tsx
<button ... disabled={!estVivant}>
```

### Étape 4 — Message de défaite

Affiche `☠️ Monstre vaincu !` uniquement si le monstre est mort :

```tsx
{!estVivant && <p className="text-error font-bold text-lg">☠️ Monstre vaincu !</p>}
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — La différence entre && et le ternaire</strong></summary>

- `{condition && <Element />}` : affiche l'élément **seulement si** la condition est vraie (rien sinon)
- `{condition ? <A /> : <B />}` : affiche `A` si vrai, `B` si faux

Utilise `&&` quand tu n'as qu'une seule "branche" à afficher.  
Utilise le ternaire quand tu veux alterner entre deux affichages.
</details>

<details>
<summary><strong>Indice 2 — Attention aux valeurs falsy avec &&</strong></summary>

```tsx
{0 && <p>Texte</p>}  // ⚠️ Affiche "0" dans le DOM !
{pv > 0 && <p>Texte</p>}  // ✅ Correct : expression booléenne
```

Toujours utiliser une **expression booléenne** avec `&&`.
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
import { useState } from "react"

export default function MonstreVivant() {
  const [pv, setPv] = useState<number>(80)
  const [bouclier, setBouclier] = useState<boolean>(false)

  const pvMax = 100
  const estVivant = pv > 0
  const estBlessé = pv <= 30

  function handleAttaque() {
    if (bouclier) return
    setPv((prev) => Math.max(prev - 20, 0))
  }

  function handleSoin() {
    if (!estVivant) return
    setPv((prev) => Math.min(prev + 30, pvMax))
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="card w-80 bg-base-100 shadow-lg">
        <div className="card-body items-center text-center gap-4">
          <span className="text-7xl">{estVivant ? "🐉" : "💀"}</span>
          <h2 className="card-title text-2xl">Dracobulon</h2>

          {bouclier && <span className="badge badge-info">🛡️ Bouclier actif</span>}

          <div className="w-full">
            <div className="flex justify-between text-sm mb-1">
              <span>❤️ PV</span>
              <span>{pv} / {pvMax}</span>
            </div>
            <progress
              className={`progress w-full ${estBlessé ? "progress-error" : "progress-success"}`}
              value={pv}
              max={pvMax}
            />
          </div>

          {estBlessé && <p className="text-warning font-semibold text-sm">⚠️ Dangereusement blessé !</p>}
          {!estVivant && <p className="text-error font-bold text-lg">☠️ Monstre vaincu !</p>}

          <div className="flex gap-2 mt-2">
            <button className="btn btn-error btn-sm" onClick={handleAttaque}>
              ⚔️ Attaquer (−20 PV)
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={handleSoin}
              disabled={!estVivant}
            >
              💊 Soigner (+30 PV)
            </button>
            <button
              className="btn btn-info btn-sm"
              onClick={() => setBouclier((b) => !b)}
            >
              🛡️ {bouclier ? "Retirer bouclier" : "Activer bouclier"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] L'emoji passe de `🐉` à `💀` quand les PV tombent à 0
- [ ] Le badge "🛡️ Bouclier actif" s'affiche uniquement quand le bouclier est activé
- [ ] "⚠️ Dangereusement blessé !" apparaît quand les PV sont ≤ 30
- [ ] "☠️ Monstre vaincu !" s'affiche quand les PV sont à 0
- [ ] Le bouclier bloque les attaques
- [ ] Le bouton "Soigner" est désactivé quand le monstre est mort
- [ ] Pas d'erreur TypeScript ni d'erreur dans la console

---

## 🚀 Pour aller plus loin

- Empêche d'activer le bouclier si le monstre est mort.
- Ajoute un bouton "Ressusciter" qui remet les PV à 50, uniquement affiché quand le monstre est mort.
