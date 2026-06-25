---
layout: two-cols-header
layoutClass: gap-x-4
---

# JSX n'accepte que des expressions

La règle qui explique tout le rendu conditionnel

::left::

```tsx {none|1-5|7-13|all}
// ❌ INTERDIT dans JSX
// if est un statement, pas une valeur
return (
  <div>
    if (isLogged) { <p>Bonjour</p> }  {/* Erreur */}
  </div>
)

// ✅ JSX accepte des expressions
// Une expression = quelque chose qui produit une valeur
return (
  <div>
    { isLogged ? <p>Bonjour</p> : null }
  </div>
)
```

::right::

<div v-click="1">

**`if` = un statement**

Il contrôle le flux d'exécution.  
Il ne **retourne** rien.  
→ Interdit entre `{ }` dans JSX.

</div>

<div v-click="2">

**`? :` = une expression**

Elle **produit une valeur** : soit `<p>Bonjour</p>`, soit `null`.  
→ JSX peut l'afficher.

</div>

<div v-click="3">

**La règle d'or**

> Entre `{ }` dans JSX, tout ce qui s'y trouve doit être une **expression** qui retourne quelque chose.

</div>

<!--
C'est le concept clé de la séance — prendre le temps de le faire comprendre.
Exemple oral : "Une expression, c'est comme une question avec une réponse. `if` n'a pas de réponse, il prend une décision."
Montrer que `null` et `undefined` ne rendent rien — React les ignore silencieusement.
-->
