# 🔍 Exercice 03 — Le Monsterdex fragile

> 📖 Réf. officielle : [Response.ok — MDN](https://developer.mozilla.org/fr/docs/Web/API/Response/ok)

## 🎯 Objectif

Déclencher un `fetch` **sur clic** (pas au montage) et gérer proprement le
cas où l'API renvoie une erreur HTTP (404) — le piège n°1 de la séance :
`fetch` ne rejette **pas** sa promesse sur un statut en erreur, il faut
vérifier `response.ok` soi-même.

Chaque monstre est un fichier séparé (`/data/monstres/flamix.json`,
`/data/monstres/ombrelune.json`...). Taper un slug qui n'existe pas déclenche
un **vrai** 404 renvoyé par le serveur de développement Vite.

**Durée estimée** : 20-25 min

---

## 🎓 Prérequis

- Exercices 01 et 02 de cette séance terminés
- Avoir vu en cours : `response.ok`, `throw new Error(...)` dans un `try`

---

## 📂 Fichier à éditer

```
MonsterdexFragile.tsx
```

---

## 🧭 Instructions pas à pas

La fonction `chercherMonstre` est appelée directement au clic sur le bouton
(pas dans un `useEffect` : ici le déclencheur est une action utilisateur).

### Étape 1 — Le fetch

```tsx
const res = await fetch(`/data/monstres/${slug.toLowerCase()}.json`)
```

### Étape 2 — Vérifier `response.ok`

Un slug inconnu renvoie un statut `404` (le fichier n'existe simplement pas),
mais `fetch` ne le considère pas comme une erreur — la promesse se résout
normalement. Il faut donc vérifier `res.ok` et lever une erreur manuellement
si c'est faux :

```tsx
if (!res.ok) {
  throw new Error("Monstre introuvable")
}
```

### Étape 3 — Parser et stocker le résultat

```tsx
const data: Monstre = await res.json()
setMonstre(data)
```

### Étape 4 — `catch` et `finally`

```tsx
} catch {
  setError("Monstre introuvable")
} finally {
  setIsLoading(false)
}
```

N'oublie pas d'englober les étapes 1 à 3 dans un `try`.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Pourquoi ce fetch n'est-il pas dans un `useEffect` ?</strong></summary>

Cette recherche est déclenchée par une action de l'utilisateur (le clic), pas
par le montage du composant. `useEffect` sert à synchroniser avec des
événements du cycle de vie, pas avec des interactions — un gestionnaire
d'événement classique (`onClick`) suffit ici.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
async function chercherMonstre() {
  setIsLoading(true)
  setError(null)

  try {
    const res = await fetch(`/data/monstres/${slug.toLowerCase()}.json`)
    if (!res.ok) {
      throw new Error("Monstre introuvable")
    }
    const data: Monstre = await res.json()
    setMonstre(data)
  } catch {
    setError("Monstre introuvable")
  } finally {
    setIsLoading(false)
  }
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Chercher "flamix" affiche sa carte
- [ ] Chercher un slug inexistant ("azertyui") affiche le message d'erreur,
      pas un plantage ni un objet vide
- [ ] "Chargement..." s'affiche pendant la requête

---

## 🚀 Pour aller plus loin

- Désactive le bouton "Chercher" tant que `slug` est vide.
- Déclenche aussi la recherche avec la touche Entrée (`onKeyDown`).
