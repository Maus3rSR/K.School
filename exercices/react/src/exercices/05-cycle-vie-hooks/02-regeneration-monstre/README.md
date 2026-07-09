# 💚 Exercice 02 — La régénération du monstre

> 📖 Réf. officielle : [Synchronizing with Effects — Cleanup](https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed)

## 🎯 Objectif

Faire régénérer les PV du monstre automatiquement, seconde après seconde,
avec `setInterval` dans un `useEffect` — puis **nettoyer** cet intervalle
pour qu'il ne continue pas à tourner une fois le monstre disparu.

**Durée estimée** : 20-25 min

---

## 🎓 Prérequis

- Exercice 01 de cette séance terminé
- Avoir vu en cours : `useEffect`, le cleanup (fonction retournée par l'Effet)

---

## 📂 Fichier à éditer

```
RegenerationMonstre.tsx
```

`Scene.tsx` te sert de terrain de jeu (bouton pour cacher/afficher le
monstre) — tu n'as pas besoin d'y toucher.

---

## 🧭 Instructions pas à pas

### Étape 1 — Ajoute l'intervalle de régénération

Dans un `useEffect` au montage, crée un `setInterval` qui augmente `pv` de 1
chaque seconde, sans jamais dépasser 100 :

```tsx
useEffect(() => {
  const id = setInterval(() => {
    setPv((p) => Math.min(p + 1, 100))
    console.log("🌀 Régénération en cours...")
  }, 1000)
}, [])
```

N'oublie pas d'importer `useEffect` :

```tsx
import { useState, useEffect } from "react"
```

### Étape 2 — Nettoie l'intervalle

Ouvre la console du navigateur, puis clique sur "🙈 Cacher le monstre" dans
l'aperçu. Le `console.log` continue à s'afficher : l'intervalle tourne dans
le vide alors que le composant a disparu. Corrige-le en retournant une
fonction de cleanup :

```tsx
useEffect(() => {
  const id = setInterval(() => {
    setPv((p) => Math.min(p + 1, 100))
    console.log("🌀 Régénération en cours...")
  }, 1000)

  return () => clearInterval(id)
}, [])
```

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Pourquoi Math.min(p + 1, 100) ?</strong></summary>

`Math.min(p + 1, 100)` garantit que `pv` ne dépasse jamais 100, sans avoir à
écrire un `if` séparé.
</details>

<details>
<summary><strong>Indice 2 — Que retourne un useEffect pour se nettoyer ?</strong></summary>

Une **fonction**, exécutée par React juste avant de démonter le composant (ou
avant de relancer l'Effet). C'est le seul mécanisme de cleanup :

```tsx
return () => clearInterval(id)
```
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
import { useState, useEffect } from "react"

export default function RegenerationMonstre() {
  const [pv, setPv] = useState<number>(50)

  useEffect(() => {
    const id = setInterval(() => {
      setPv((p) => Math.min(p + 1, 100))
      console.log("🌀 Régénération en cours...")
    }, 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="card w-72 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center gap-3">
        <span className="text-6xl">🦎</span>
        <h2 className="card-title">Regenexo</h2>
        <div className="w-full">
          <div className="flex justify-between text-sm mb-1">
            <span>❤️ PV</span>
            <span>{pv} / 100</span>
          </div>
          <progress className="progress progress-success w-full" value={pv} max={100} />
        </div>
      </div>
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Les PV augmentent automatiquement de 1 chaque seconde, jusqu'à 100 max
- [ ] Cliquer sur "Cacher le monstre" arrête les logs dans la console
- [ ] Re-cliquer sur "Faire apparaître" relance la régénération depuis 50
- [ ] Pas d'erreur TypeScript ni d'erreur dans la console

---

## 🚀 Pour aller plus loin

- Ajoute un bouton "💔 Blessure" qui retire 15 PV instantanément (la
  régénération doit continuer à fonctionner après).
- Affiche "💯 PV max !" quand `pv` atteint 100.
