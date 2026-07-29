# � Exercice 04 — Le carnet de terrain

Seul cette fois — synthèse de la séance

> 📖 Réf. officielle : [Synchronizing with Effects](https://fr.react.dev/learn/synchronizing-with-effects#fetching-data)

## 🎯 Objectif

Jusqu'ici, chaque fetch se déclenchait soit au montage (`[]`), soit sur un
clic. Ce dernier exercice introduit un troisième cas, très courant : **un
`useEffect` qui dépend d'une valeur qui change** (`[slugChoisi]`), et qui
refait automatiquement le fetch chaque fois que cette valeur change.

C'est exactement le pattern que tu réutiliseras dans quelques séances avec
React Router, pour charger les données d'un article selon son `id` dans
l'URL.

**Durée estimée** : 25-30 min

---

## 🎓 Prérequis

- Exercices 01, 02 et 03 de cette séance terminés

---

## 📂 Fichier à éditer

```
CarnetDeTerrain.tsx
```

---

## 🧭 Consignes

1. **Premier `useEffect`, au montage (`[]`)** : fetch sur
   `/data/liste-monstres.json`, `setListe` avec le résultat, puis
   `setSlugChoisi` avec le slug du **premier** élément de la liste (pour que
   le `<select>` ait une valeur dès le départ)
2. **Second `useEffect`, avec `[slugChoisi]` comme dépendance** (pas un
   tableau vide !) : fetch sur `` `/data/monstres/${slugChoisi}.json` ``
3. Dans ce second effet, si `slugChoisi` est encore une chaîne vide, ne fais
   rien (`return` immédiatement, avant tout fetch)
4. Utilise `try` / `catch` / `finally` pour remplir `monstre`, `isLoading`,
   `error`
5. Gère le rendu conditionnel : chargement, erreur, résultat

---

## ✅ Critères de réussite

- [ ] À l'ouverture, le premier monstre de la liste s'affiche automatiquement
- [ ] Changer la sélection dans le `<select>` recharge et affiche le nouveau
      monstre, sans rechargement de page
- [ ] "Chargement..." s'affiche brièvement à chaque changement de sélection

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Pourquoi deux `useEffect` et pas un seul ?</strong></summary>

Le premier effet a une responsabilité : charger la liste des noms, **une
seule fois**. Le second a une autre responsabilité : charger le détail d'**un**
monstre, **chaque fois que la sélection change**. Deux dépendances
différentes (`[]` vs `[slugChoisi]`) veulent dire deux effets séparés.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
useEffect(() => {
  async function loadListe() {
    const res = await fetch("/data/liste-monstres.json")
    const data: MonstreResume[] = await res.json()
    setListe(data)
    if (data.length > 0) setSlugChoisi(data[0].slug)
  }
  loadListe()
}, [])

useEffect(() => {
  if (!slugChoisi) return

  async function loadMonstre() {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`/data/monstres/${slugChoisi}.json`)
      if (!res.ok) throw new Error("Monstre introuvable")
      const data: Monstre = await res.json()
      setMonstre(data)
    } catch {
      setError("Monstre introuvable")
    } finally {
      setIsLoading(false)
    }
  }
  loadMonstre()
}, [slugChoisi])
```
</details>

<!--
Exercice autonome — ne pas donner la solution avant que la majorité ait terminé.
Aide graduée si blocage : indice 1 "combien de useEffect faut-il, et pourquoi ?", indice 2 montrer juste la ligne du tableau de dépendances du second effet.
Ce pattern à deux useEffect (liste + détail dépendant d'une sélection) sera repris tel quel en S8-S9 avec React Router (id dans l'URL au lieu d'un select) — le mentionner explicitement en clôture de séance.
-->
