# 🗺️ Exercice 03 — Mini routes

> 📖 Réf. officielle : [Routes et Route](https://reactrouter.com/start/library/routing)

## 🎯 Objectif

Utiliser `Routes` et `Route` pour afficher un contenu différent selon l'URL,
à l'intérieur d'un même composant.

**Durée estimée** : 20-25 min

---

## 🎓 Prérequis

- Exercices 01 et 02 terminés
- Avoir vu en cours : `BrowserRouter`, `Routes`, `Route`

---

## 📂 Fichier à éditer

```
MiniRoutes.tsx
```

---

## 🧭 Instructions

1. Importe `Routes` et `Route` depuis `react-router-dom`.
2. Dans le `return`, ajoute un bloc `<Routes>...</Routes>` à l'endroit indiqué.
3. Déclare trois routes avec les chemins relatifs `/`, `arene` et `contact`.
4. Associe chaque `Route` à un des trois petits composants déjà écrits :
   `Accueil`, `Arene` ou `Contact`.

> 💡 `BrowserRouter` est déjà configuré dans `src/main.tsx` de MonsterDex. Tu
> n'as donc pas besoin de l'ajouter ici : utilise directement `Routes` et
> `Route`.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Syntaxe de base</strong></summary>

```tsx
<Routes>
  <Route path="/" element={<Accueil />} />
  <Route path="arene" element={<Arene />} />
  <Route path="contact" element={<Contact />} />
</Routes>
```

Dans un `Routes` imbriqué, les chemins sont relatifs à la route parente.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
import { Link, Routes, Route } from "react-router-dom";

function Accueil() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Accueil du mini-bestiaire</h2>
      <p className="opacity-70">Bienvenue dans le chapitre Router.</p>
    </div>
  );
}

function Arene() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Arène</h2>
      <p className="opacity-70">Ici, les monstres s'entraînent.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Contact</h2>
      <p className="opacity-70">Envoie un message au gardien du bestiaire.</p>
    </div>
  );
}

export default function MiniRoutes() {
  return (
    <div className="flex flex-col items-center gap-6">
      <nav className="flex gap-2 rounded-box bg-base-200 p-2">
        <Link to="." className="btn btn-ghost">
          Accueil
        </Link>
        <Link to="arene" className="btn btn-ghost">
          Arène
        </Link>
        <Link to="contact" className="btn btn-ghost">
          Contact
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="arene" element={<Arene />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Cliquer sur "Accueil", "Arène" ou "Contact" affiche le bon contenu
- [ ] L'URL se met à jour sans rechargement
- [ ] Aucune erreur TypeScript ni dans la console
