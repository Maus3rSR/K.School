# 🧩 Exercice 04 — Navigation complète

Synthèse du chapitre

## 🎯 Objectif

Combiner `NavLink` (lien actif stylé) et `Routes`/`Route` (contenu qui change)
pour créer une mini-navigation multi-pages fonctionnelle.

**Durée estimée** : 20-25 min

---

## 🎓 Prérequis

- Exercices 01, 02 et 03 terminés
- Savoir utiliser `NavLink`, `Routes` et `Route`

---

## 📂 Fichier à éditer

```
NavigationComplete.tsx
```

---

## 🧭 Instructions

1. Remplace les imports `Link` par `NavLink`.
2. Crée une fonction `linkClass` qui retourne `btn btn-primary` si le lien est
   actif, sinon `btn btn-ghost`.
3. Remplace les `<Link>` par des `<NavLink>` utilisant cette fonction. Ajoute
   la prop `end` sur le lien vers `/08-router/04-navigation-complete` pour
   qu'il ne reste pas actif sur "Liste" ou "Ajouter".
4. Ajoute un bloc `<Routes>...</Routes>` juste après la navigation.
5. Déclare trois routes relatives : `/`, `liste` et `ajouter`.
6. Associe chaque route au composant correspondant : `Accueil`, `Liste` ou
   `Ajouter`.

> ⚠️ Garde des chemins **absolus** sur les `<NavLink>` (comme dans le fichier
> de départ) : sans `<Routes>` imbriqué comme point de repère, un chemin
> relatif (`to="liste"`) se résoudrait par rapport à l'URL courante et
> s'empilerait à chaque clic. Les chemins des `Route` déclarées dans le
> `<Routes>`, eux, restent relatifs à la route parente.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Ordre des étapes</strong></summary>

Commence par transformer la barre de navigation en `NavLink`, puis ajoute le
`<Routes>` en dessous. Teste au fur et à mesure : d'abord les liens actifs,
ensuite le changement de contenu.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
import { NavLink, Routes, Route } from "react-router-dom";

function Accueil() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Accueil</h2>
      <p className="opacity-70">Le MonsterDex, version multi-pages.</p>
    </div>
  );
}

function Liste() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Liste des monstres</h2>
      <p className="opacity-70">Le bestiaire s'affichera ici.</p>
    </div>
  );
}

function Ajouter() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Ajouter un monstre</h2>
      <p className="opacity-70">Formulaire de création à venir.</p>
    </div>
  );
}

export default function NavigationComplete() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "btn btn-primary" : "btn btn-ghost";

  return (
    <div className="flex flex-col items-center gap-6">
      <nav className="flex gap-2 rounded-box bg-base-200 p-2">
        <NavLink to="/08-router/04-navigation-complete" end className={linkClass}>
          Accueil
        </NavLink>
        <NavLink
          to="/08-router/04-navigation-complete/liste"
          className={linkClass}
        >
          Liste
        </NavLink>
        <NavLink
          to="/08-router/04-navigation-complete/ajouter"
          className={linkClass}
        >
          Ajouter
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="liste" element={<Liste />} />
        <Route path="ajouter" element={<Ajouter />} />
      </Routes>
    </div>
  );
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Le menu affiche trois liens avec `NavLink`
- [ ] Le lien de la page active est stylé différemment
- [ ] Cliquer sur chaque lien affiche le contenu correspondant
- [ ] La page ne se recharge pas
- [ ] Aucune erreur TypeScript ni dans la console
