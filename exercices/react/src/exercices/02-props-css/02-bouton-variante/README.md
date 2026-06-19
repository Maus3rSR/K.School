# 🎨 Exercice 02 — Le bouton à variantes

> 📖 Réf. officielle : [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)

## 🎯 Objectif

Créer un composant `BoutonVariante` qui accepte une prop `variant` et adapte sa **classe CSS** en conséquence — sans dupliquer le composant.

Un parent l'utilisera ainsi :

```tsx
<BoutonVariante variant="primary" label="Valider" />
<BoutonVariante variant="danger" label="Supprimer" />
<BoutonVariante variant="ghost" label="Annuler" />
```

**Durée estimée** : 20-30 min

---

## 🎓 Prérequis

- Exercice 01 de cette séance terminé
- Avoir vu en cours : props optionnelles, CSS dynamique, type union TypeScript

---

## 📂 Fichier à éditer

```
BoutonVariante.tsx
```

---

## 🧭 Instructions pas à pas

### Étape 1 — Complète l'interface

Ajoute la prop `variant` avec un **type union** qui accepte trois valeurs :

```ts
variant: "primary" | "danger" | "ghost"
```

### Étape 2 — Calcule la className

Utilise un template literal pour composer la classe DaisyUI :

```tsx
const className = `btn btn-${variant}`
```

### Étape 3 — Applique la className

Passe `className` à `<button>`. Observe le résultat dans l'aperçu.

### Étape 4 — Ajoute une prop `disabled` optionnelle

Déclare `disabled?: boolean` dans l'interface (valeur par défaut : `false`) et passe-la à l'élément `<button>`.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Type union</strong></summary>

```ts
interface BoutonVarianteProps {
  label: string
  variant: "primary" | "danger" | "ghost"
}
```

TypeScript bloquera tout appel avec `variant="success"` ou une valeur non listée.
</details>

<details>
<summary><strong>Indice 2 — className dynamique</strong></summary>

```tsx
const className = `btn btn-${variant}`
```

Si `variant` vaut `"danger"`, la chaîne résultante sera `"btn btn-danger"`.
</details>

<details>
<summary><strong>Indice 3 — Solution complète</strong></summary>

```tsx
interface BoutonVarianteProps {
  label: string
  variant: "primary" | "danger" | "ghost"
  disabled?: boolean
}

export default function BoutonVariante({ label, variant, disabled = false }: BoutonVarianteProps) {
  const className = `btn btn-${variant}`

  return (
    <button className={className} disabled={disabled}>
      {label}
    </button>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] La prop `variant` est typée avec un type union (3 valeurs)
- [ ] La `className` est construite dynamiquement avec la prop
- [ ] Les trois boutons de la scène ont des couleurs différentes
- [ ] TypeScript affiche une erreur si on passe `variant="invalid"`

---

## 🚀 Pour aller plus loin

- Ajoute une prop `size?: "sm" | "md" | "lg"` et combine-la dans la className : `btn btn-${variant} btn-${size}`.
