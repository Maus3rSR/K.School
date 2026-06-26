---
layout: two-cols-header
layoutClass: gap-x-4
---

# Expression vs Statement

Deux types de code, deux comportements opposés

::left::

```tsx {none|1-2|4-7|all}
// ✅ Expression — produit une valeur
const label = isLogged ? "Bonjour" : "Anonyme"

// ❌ Statement — prend une décision, ne produit rien
if (isLogged) {
  console.log("Bonjour")
}
```

::right::

<div v-click="1">

**Expression**

- **Produit une valeur** qu'on peut stocker, afficher, passer
- Exemples : `42`, `"texte"`, `a + b`, `condition ? x : y`, `fn()`

</div>

<div v-click="2">

**Statement**

- **Contrôle le flux** d'exécution (si, boucle, retour…)
- Ne **retourne rien** — il ne peut pas être utilisé là où une valeur est attendue
- Exemples : `if`, `for`, `while`, `switch`, `return`

</div>

<div v-click="3">

**La différence clé**

> Une expression répond à la question **"quelle est la valeur ?"**  
> Un statement répond à **"que faire ?"** — sans valeur en sortie.

</div>

<!--
Analogie orale : "Une expression, c'est comme une calculatrice — tu lui donnes quelque chose, elle te rend un résultat. Un statement, c'est un interrupteur — il fait quelque chose, mais il ne te rend rien."
Insister : un `if` ne retourne rien en JavaScript. C'est différent d'autres langages comme Rust ou Kotlin où `if` est une expression.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# JSX n'accepte que des expressions

La règle qui explique tout le rendu conditionnel

::left::

```tsx {none|1-7|9-15|all}
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
    {/* Ici, on utilise l'opérateur ternaire d'un IF */}
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

**`{ ok ? <p>✓</p> : <p>✗</p> }` = une expression**

Elle **produit une valeur** : soit `<p>✓</p>`, soit `<p>✗</p>`.

→ JSX peut l'afficher.

</div>

::bottom::

<div v-click="3">

**La règle d'or**

> Entre `{ }` dans JSX, tout ce qui s'y trouve doit être une **expression** qui retourne quelque chose.

</div>

<!--
C'est le concept clé de la séance — prendre le temps de le faire comprendre.
Exemple oral : "Une expression, c'est comme une question avec une réponse. `if` n'a pas de réponse, il prend une décision."
Montrer que `null` et `undefined` ne rendent rien — React les ignore silencieusement.
 
-->
