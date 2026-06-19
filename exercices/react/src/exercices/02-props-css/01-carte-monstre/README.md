# 🃏 Exercice 01 — La carte personnalisable

> 📖 Réf. officielle : [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)

## 🎯 Objectif

Rendre le composant `CarteMonstreProps` **réutilisable** en lui passant des données via des **props** : le nom, l'emoji et la description du monstre.

Un parent appellera le composant comme ceci :

```tsx
<CarteMonstreProps
  nom="Bidulor"
  emoji="👾"
  description="Un monstre curieux qui adore le JSX."
/>
```

**Durée estimée** : 20-30 min

---

## 🎓 Prérequis

- Exercices de la séance 2 terminés
- Avoir vu en cours : passer des props, les lire par déstructuration, les typer avec une interface

---

## 📂 Fichier à éditer

```
CarteMonstreProps.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Déclare l'interface

Dans `interface CarteMonstreProps`, déclare trois champs :

```ts
nom: string
emoji: string
description: string
```

### Étape 2 — Reçois les props

Dans la signature de la fonction, déstructure les props :

```tsx
export default function CarteMonstreProps({ nom, emoji, description }: CarteMonstreProps) {
```

### Étape 3 — Affiche les données

Remplace le texte « Props à brancher… » par les trois valeurs en JSX.

### Étape 4 — Appelle le composant depuis la scène

Le fichier `Scene.tsx` (dans ce dossier) appelle déjà `CarteMonstreProps` avec plusieurs monstres. Lance le projet et observe l'aperçu !

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — La déstructuration</strong></summary>

```tsx
function CarteMonstreProps({ nom, emoji, description }: CarteMonstreProps) {
```

C'est exactement comme déstructurer un objet JavaScript, mais directement dans les paramètres.
</details>

<details>
<summary><strong>Indice 2 — Afficher dans le JSX</strong></summary>

```tsx
<span className="text-7xl">{emoji}</span>
<h2 className="card-title">{nom}</h2>
<p>{description}</p>
```
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
interface CarteMonstreProps {
  nom: string
  emoji: string
  description: string
}

export default function CarteMonstreProps({ nom, emoji, description }: CarteMonstreProps) {
  return (
    <div className="card w-56 bg-base-100 shadow-md">
      <div className="card-body items-center text-center">
        <span className="text-7xl">{emoji}</span>
        <h2 className="card-title">{nom}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] L'interface déclare les trois props
- [ ] La fonction les reçoit par déstructuration
- [ ] Les trois valeurs s'affichent dans l'aperçu
- [ ] Pas d'erreur TypeScript ni d'erreur dans la console

---

## 🚀 Pour aller plus loin

- Ajoute une prop optionnelle `niveau?: number` (1 à 5) avec une valeur par défaut de `1`.
- Affiche des étoiles (⭐) en fonction du niveau.
