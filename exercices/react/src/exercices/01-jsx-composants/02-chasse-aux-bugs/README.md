# 🐛 Exercice 02 — La chasse aux bugs

> 📖 Réf. officielle : [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)

## 🎯 Objectif

Un stagiaire pressé a écrit l'affiche officielle du **MonsterDex**… mais son code
est rempli d'erreurs JSX et **refuse de s'afficher**. Mène l'enquête, trouve les
**4 bugs**, et répare l'affiche !

C'est normal de se tromper sur ces règles au début — elles sont justement le
piège n°1 quand on débute. Repérer ces erreurs te fera gagner des heures plus tard.

**Durée estimée** : 20-30 min

---

## 🎓 Prérequis

- Avoir fait l'exercice 01
- Avoir vu en cours : les règles du JSX (un seul parent, balises fermées, `className`)

---

## 📂 Fichier à éditer

```
AfficheReparee.tsx
```

---

## 🔎 Le code cassé à réparer

Voici l'affiche écrite par le stagiaire. **Recopie-la** dans `AfficheReparee.tsx`
(à la place du `return` actuel), puis corrige-la jusqu'à ce qu'elle s'affiche :

```tsx
export default function AfficheReparee() {
  const titre = "Concours du monstre le plus mignon"

  return (
    <h1 class="text-3xl font-bold">🏆 titre</h1>
    <div className="card bg-base-100 shadow-xl">
      <img src="https://placecats.com/300/200">
      <div className="card-body">
        <p>Vote pour ton monstre préféré avant vendredi !</p>
      </div>
    </div>
  )
}
```

> ⚠️ Tant que le code contient une erreur de syntaxe, Vite affiche un **écran
> d'erreur rouge**. C'est ton meilleur ami : lis le message, il t'indique souvent
> la ligne fautive.
> Pareil dans ton IDE grâce à TypeScript, en survolant il te donne des indices sur ce qui ne va pas.

---

## 🧭 Les 4 bugs à débusquer

Coche-les au fur et à mesure :

- [ ] **Bug 1** — Il y a **deux éléments à la racine** du `return`. JSX n'en autorise qu'un seul.
- [ ] **Bug 2** — `class` n'existe pas en JSX. Quel est le bon nom de l'attribut ?
- [ ] **Bug 3** — La balise `<img>` n'est pas fermée. En JSX, toute balise doit se fermer.
- [ ] **Bug 4** — `titre` s'affiche en toutes lettres au lieu de sa valeur. Comment insère-t-on une variable JS dans le JSX ?

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Un seul parent</strong></summary>

Quand tu veux renvoyer plusieurs éléments côte à côte, enveloppe-les dans un
**Fragment** : `<> ... </>`. Il regroupe sans ajouter de balise HTML.
</details>

<details>
<summary><strong>Indice 2 — Variables et balises</strong></summary>

- Pour afficher une variable JS dans le JSX : entoure-la d'**accolades** → `{titre}`.
- Une balise auto-fermante se termine par `/>` → `<img src="..." />`.
</details>

<details>
<summary><strong>Indice 3 — Affiche réparée complète</strong></summary>

```tsx
export default function AfficheReparee() {
  const titre = "Concours du monstre le plus mignon"

  return (
    <>
      <h1 className="text-3xl font-bold">🏆 {titre}</h1>
      <div className="card bg-base-100 shadow-xl">
        <img src="https://placecats.com/300/200" />
        <div className="card-body">
          <p>Vote pour ton monstre préféré avant vendredi !</p>
        </div>
      </div>
    </>
  )
}
```
</details>

---

## ✅ Critères de réussite

- [ ] L'affiche s'affiche sans aucune erreur rouge
- [ ] Le titre montre bien le **texte de la variable** (pas le mot « titre »)
- [ ] L'image s'affiche
- [ ] Tu as utilisé un Fragment `<>...</>` pour le parent unique
- [ ] Tu sais expliquer les 4 erreurs avec tes mots

---

## 🚀 Pour aller plus loin

Utilise le convertisseur officiel [transform.tools/html-to-jsx](https://transform.tools/html-to-jsx) :
colle du HTML, observe comment il devient du JSX valide.
