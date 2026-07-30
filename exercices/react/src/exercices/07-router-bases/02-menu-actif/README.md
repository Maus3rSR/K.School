# 🧭 Exercice 02 — Menu actif

> 📖 Réf. officielle : [NavLink](https://reactrouter.com/start/library/navigating#navlink)

## 🎯 Objectif

Créer un menu de navigation qui indique visuellement **sur quelle page on se
trouve**, grâce au composant `NavLink` et à sa fonction `className`.

**Durée estimée** : 15-20 min

---

## 🎓 Prérequis

- Exercice 01 — Premier lien terminé
- Avoir vu en cours la différence entre `Link` et `NavLink`

---

## 📂 Fichier à éditer

```
MenuActif.tsx
```

---

## 🧭 Instructions

1. Remplace les imports `Link` par `NavLink`.
2. Remplace les composants `<Link>` par des `<NavLink>`.
3. Transforme la prop `className` en fonction qui reçoit `{ isActive }`.
4. Applique `btn btn-primary` quand le lien est actif, sinon `btn btn-ghost`.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — La signature de la fonction className</strong></summary>

```tsx
className={({ isActive }) =>
  isActive ? "btn btn-primary" : "btn btn-ghost"
}
```

React Router appelle cette fonction à chaque changement d'URL et te dit si la
route correspondante est active.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
import { NavLink } from "react-router-dom";

export default function MenuActif() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "btn btn-primary" : "btn btn-ghost";

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm opacity-70">
        Le lien de la page en cours est maintenant mis en évidence.
      </p>

      <nav className="flex gap-2 rounded-box bg-base-200 p-2">
        <NavLink to="/" className={linkClass}>
          Accueil
        </NavLink>
        <NavLink to="/07-api/01-rencontre-sauvage" className={linkClass}>
          Rencontre
        </NavLink>
        <NavLink to="/07-api/02-bestiaire-distant" className={linkClass}>
          Bestiaire
        </NavLink>
      </nav>
    </div>
  );
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Le lien pointant vers la page actuelle a un style différent des autres
- [ ] La navigation reste sans rechargement
- [ ] Aucune erreur TypeScript ni dans la console
