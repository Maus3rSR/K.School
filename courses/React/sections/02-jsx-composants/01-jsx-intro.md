---
layout: cover
background: https://cover.sli.dev?3
---

# Chapitre 02
JSX et premiers composants

---
layout: center
class: text-center
---

# Le paradigme fondateur de React

&nbsp;

<div class="text-6xl font-mono font-bold text-teal-500 my-8">
  UI = f(data)
</div>

Donne des données à React → il calcule l'interface à afficher

<v-click>

> Ton rôle : **décrire** à quoi ressemble l'UI pour chaque état des données.<br/>
> React se charge du **quand** et du **comment** mettre à jour le DOM.

</v-click>

<!--
Formule issue de la conception fonctionnelle de React.
Insister : ce n'est pas "modifier le DOM", c'est "décrire ce que je veux".
Analogie : une feuille de calcul Excel — tu changes une valeur, toutes les cellules dépendantes se recalculent automatiquement.
-->

---

# React — ce que vous allez apprendre

*Describing the UI* · react.dev/learn/describing-the-ui

- Les **composants** sont des fonctions JavaScript qui retournent du markup
- **JSX** est la syntaxe pour écrire ce markup dans du JavaScript
- Les composants peuvent être **imbriqués** et **réutilisés**
- Les données circulent **du parent vers l'enfant**

<v-click>

## Ce chapitre couvre

- Écrire du JSX valide
- Créer et exporter ses premiers composants
- Importer et composer des composants

</v-click>

<!--
Référence officielle : https://react.dev/learn/describing-the-ui
Rassurer les apprenants : tout ce chapitre est du "React statique" — pas encore de state ni d'événements.
-->

---
layout: two-cols-header
---

# JSX — c'est quoi ?

JavaScript XML : écrire du markup **directement dans JavaScript**

::left::

## Ce que vous écrivez

```tsx
function Greeting() {
  return (
    <h1>Bonjour le monde !</h1>
  )
}
```

::right::

## Ce que React compile

```js
function Greeting() {
  return React.createElement(
    'h1',
    null,
    'Bonjour le monde !'
  )
}
```

<!--
JSX n'est pas du HTML. C'est du sucre syntaxique compilé par Babel/Vite en appels React.createElement().
Ne pas s'attarder sur createElement — juste montrer que JSX est une abstraction lisible.
-->

---
layout: center
class: text-center
---

# Thinking in React

&nbsp;

> *"When you build a user interface with React, you will first **break it apart into pieces** called components. Then, you will describe the different **visual states** for each component. Finally, you will **connect your components** so that the data flows through them."*

<div class="text-sm opacity-60 mt-4">— react.dev/learn/thinking-in-react</div>

<!--
Citation officielle React. La garder courte et impactante.
C'est le fil conducteur de tout le cours : décomposer → décrire → connecter.
-->
