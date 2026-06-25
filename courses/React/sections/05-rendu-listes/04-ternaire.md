---
layout: two-cols-header
layoutClass: gap-x-4
---

# L'opérateur ternaire

Deux branches dans le JSX, en une seule expression

::left::

```tsx {all|3|4|5|all}
function StatusBadge({ isOnline }: { isOnline: boolean }) {
  return (
    <span>
      { isOnline
        ? <span className="badge green">En ligne</span>
        : <span className="badge red">Hors ligne</span>
      }
    </span>
  )
}
```

::right::

<div v-click="1">

**La structure**

```
condition ? si_vrai : si_faux
```

</div>

<div v-click="2">

**Si vrai** → `<span className="badge green">` est rendu

</div>

<div v-click="3">

**Si faux** → `<span className="badge red">` est rendu

</div>

<div v-click="4">

**Quand l'utiliser ?**

- Condition simple, **deux branches** avec du JSX différent
- Le résultat reste **lisible** en une ligne ou quelques lignes

**⚠️ À éviter**

Ternaires imbriqués : `a ? b ? c : d : e` → utiliser `if` avant le return

</div>

<!--
Insister sur la lisibilité : formatter sur plusieurs lignes (condition, ?, :) aide à lire.
Pièges : oublier les parenthèses autour du JSX multi-lignes → erreur de syntaxe.
Demander : "Que se passe-t-il si on met `null` comme branche fausse ?" → rien ne s'affiche, pas d'erreur.
-->
