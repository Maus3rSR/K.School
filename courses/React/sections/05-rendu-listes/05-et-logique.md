---
layout: two-cols-header
layoutClass: gap-x-4
---

# L'opérateur `&&`

Afficher quelque chose **seulement si** une condition est vraie

::left::

```tsx {all|3|7-9|all}
function Notification({ count }: { count: number }) {
  return (
    <div>
      <h1>Boîte de réception</h1>

      {/* ✅ Affiché seulement si count > 0 */}
      { count > 0 &&
        <span className="badge">{count} nouveaux messages</span>
      }
    </div>
  )
}
```

::right::

<div v-click="1">

**Comment ça fonctionne**

```
condition && <JSX />
```

- Si `condition` est **truthy** → le JSX est rendu
- Si `condition` est **falsy** → rien n'est rendu

</div>

<div v-click="2">

**⚠️ Le piège du `0`**

```tsx
// ❌ Affiche "0" dans l'UI !
{ tasks.length && <Liste /> }

// ✅ Forcer un booléen
{ tasks.length > 0 && <Liste /> }
{ !!tasks.length && <Liste /> }
```

`0` est falsy, mais React l'**affiche quand même** car c'est un nombre, pas `null` ni `false`.

</div>

<!--
Ce piège du 0 est très fréquent chez les débutants — prendre le temps de le démontrer en live.
Demander aux apprenants : "Pourquoi tasks.length && est risqué ?" avant de révéler la réponse.
Règle simple : toujours forcer la condition en booléen avec `> 0` ou `!!` quand elle vient d'un nombre.
-->
