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
5. Ajoute la prop `end` sur le lien `/08-router/02-menu-actif` pour qu'il ne
   reste pas actif quand tu es sur "Inventaire" ou "Combats".

> 💡 Ces trois liens pointent vers `/08-router/02-menu-actif`,
> `/08-router/02-menu-actif/inventaire` et
> `/08-router/02-menu-actif/combats` : ils restent dans cet exercice sans
> jamais te faire quitter la page. C'est ce qui te permet d'observer le lien
> actif changer.
>
> ⚠️ Évite les chemins **relatifs** (`to="inventaire"` tout seul) ici : sans
> `<Routes>` imbriqué pour servir de point de repère, chaque clic les
> résout par rapport à l'URL courante et non par rapport à la page, ce qui
> les fait s'empiler (`/inventaire/inventaire/combats/...`).

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
        <NavLink to="/08-router/02-menu-actif" end className={linkClass}>
          Profil
        </NavLink>
        <NavLink
          to="/08-router/02-menu-actif/inventaire"
          className={linkClass}
        >
          Inventaire
        </NavLink>
        <NavLink to="/08-router/02-menu-actif/combats" className={linkClass}>
          Combats
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
- [ ] Cliquer sur "Inventaire" ou "Combats" complète l'URL sans quitter cet
      exercice, et sans rechargement
- [ ] Aucune erreur TypeScript ni dans la console
