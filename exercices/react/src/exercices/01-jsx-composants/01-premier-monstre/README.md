# 🥚 Exercice 01 — Ton premier monstre

> 📖 Réf. officielle : [Your First Component](https://react.dev/learn/your-first-component)

## 🎯 Objectif

Écrire ta **toute première fonction-composant** React. Un composant, c'est juste
une fonction JavaScript qui **retourne du JSX** (le markup à afficher).

À la fin, un petit monstre rigolo s'affichera dans l'aperçu. 🎉

**Durée estimée** : 20-30 min

---

## 🎓 Prérequis

- Avoir lancé le projet avec `pnpm dev`
- Avoir vu en cours : qu'est-ce que JSX, qu'est-ce qu'un composant
- Notions JavaScript : fonction, `return`

---

## 📂 Fichier à éditer

```
PremierMonstre.tsx
```

L'aperçu se trouve sur la page **« 01 · Ton premier monstre »** (menu de gauche).

---

## 🧭 Instructions pas à pas

### Étape 1 — Repère le composant

Ouvre le fichier. Tu y trouves une fonction qui **commence par une majuscule** :
`PremierMonstre`. C'est obligatoire en React — un composant commence **toujours**
par une majuscule, sinon React le prend pour une simple balise HTML.

### Étape 2 — Retourne ta carte

Remplace le contenu du `return` par une carte DaisyUI. Tu peux t'inspirer de ceci :

```tsx
return (
  <div className="card w-64 bg-base-100 shadow-xl mx-auto">
    <div className="card-body items-center text-center">
      <span className="text-7xl">👾</span>
      <h2 className="card-title">Bidulor</h2>
      <p>Un monstre curieux qui adore le JSX.</p>
    </div>
  </div>
)
```

> 💡 Le `return` tient sur plusieurs lignes : il faut donc l'entourer de
> **parenthèses** `( ... )`.

### Étape 3 — Personnalise ton monstre

Change l'emoji, le nom et la description. Invente le monstre le plus fun possible !
Quelques idées d'emojis : 👾 🐙 👹 🤖 🐲 🦖 👻 🦑

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — « Rien ne s'affiche / page blanche »</strong></summary>

Vérifie que ta fonction **retourne** bien quelque chose (`return ( ... )`) et que
le `return` est entouré de parenthèses si le JSX est sur plusieurs lignes.
</details>

<details>
<summary><strong>Indice 2 — « Mon style ne s'applique pas »</strong></summary>

En JSX, on écrit `className` et **pas** `class`. C'est l'erreur n°1 quand on vient
du HTML !
</details>

<details>
<summary><strong>Indice 3 — Solution de référence</strong></summary>

```tsx
export default function PremierMonstre() {
  return (
    <div className="card w-64 bg-base-100 shadow-xl mx-auto">
      <div className="card-body items-center text-center">
        <span className="text-7xl">🐲</span>
        <h2 className="card-title">Draguignou</h2>
        <p>Crache du JSX au lieu de feu.</p>
      </div>
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Le composant `PremierMonstre` retourne du JSX (plus de texte « apparaîtra ici »)
- [ ] Une carte avec un emoji, un nom et une description s'affiche dans l'aperçu
- [ ] Tu utilises `className` (et non `class`)
- [ ] Aucune erreur rouge dans le terminal `pnpm dev`

---

## 🚀 Pour aller plus loin

- Ajoute un bouton DaisyUI (`<button className="btn btn-primary">Adopter</button>`).
- Essaie de mettre l'emoji dans un cercle avec la classe `avatar`.
