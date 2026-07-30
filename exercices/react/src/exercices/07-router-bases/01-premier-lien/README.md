# 🔗 Exercice 01 — Premier lien

> 📖 Réf. officielle : [Link](https://reactrouter.com/start/library/navigating#link)

## 🎯 Objectif

Remplacer les balises `<a>` internes par des `<Link>` de React Router pour que
la navigation se fasse **sans recharger la page**.

**Durée estimée** : 10-15 min

---

## 🎓 Prérequis

- Avoir vu en cours la différence entre `<a href>` et `<Link to>`
- Savoir importer un composant depuis `react-router-dom`

---

## 📂 Fichier à éditer

```
PremierLien.tsx
```

---

## 🧭 Instructions

1. Importe `Link` depuis `react-router-dom`.
2. Remplace chaque balise `<a>` par un composant `<Link>`.
3. Remplace l'attribut `href` par l'attribut `to`.
4. Garde les mêmes chemins : `/`, `/07-api/01-rencontre-sauvage` et
   `/07-api/02-bestiaire-distant`.

---

## 🆘 Besoin d'un coup de pouce ?

<details>
<summary><strong>Indice 1 — Pourquoi pas <code>&lt;a&gt;</code> ?</strong></summary>

Une balise `<a href="/...">"` demande au navigateur de quitter la page actuelle
et de tout recharger. Dans une SPA React, on veut éviter cela pour conserver
l'état de l'application.
</details>

<details>
<summary><strong>Indice 2 — Solution complète</strong></summary>

```tsx
import { Link } from "react-router-dom";

export default function PremierLien() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm opacity-70">
        Ces liens utilisent maintenant <code>&lt;Link&gt;</code>.
      </p>

      <nav className="flex gap-4">
        <Link to="/" className="btn btn-outline">
          Accueil
        </Link>
        <Link to="/07-api/01-rencontre-sauvage" className="btn btn-outline">
          Rencontre sauvage
        </Link>
        <Link to="/07-api/02-bestiaire-distant" className="btn btn-outline">
          Bestiaire distant
        </Link>
      </nav>
    </div>
  );
}
```
</details>

---

## ✅ Critères de réussite

- [ ] Les trois liens s'affichent correctement
- [ ] Cliquer sur un lien change de page sans rechargement visible du menu de
      gauche
- [ ] Aucune erreur TypeScript ni dans la console
