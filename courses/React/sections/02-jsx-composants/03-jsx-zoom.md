---
layout: two-cols-header
layoutClass: gap-x-4
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

::bottom::

<v-click>

> 💡 JSX est du **sucre syntaxique** : une syntaxe plus agréable qui se compile en JavaScript standard.

</v-click>

<!--
JSX n'est pas du HTML. C'est du sucre syntaxique compilé par Babel/Vite en appels React.createElement().
Ne pas s'attarder sur createElement — juste montrer que JSX est une abstraction lisible.
-->

---
layout: image-right
image: https://cover.sli.dev?2
---

# Pourquoi JSX ?

- **Syntaxe déclarative** : décrire ce que l'on veut, pas comment le construire

- **Cohabitation** : JavaScript et markup dans le même fichier

- **Expression** : du JSX peut être stocké dans une variable, retourné par une fonction, passé en argument

<v-click>

> 💡 Ce que vous voyez dans le `return` d'un composant React, **c'est du JSX**

</v-click>

<!--
Réassurer les apprenants qui viennent du HTML : c'est presque du HTML, avec quelques règles en plus.
-->
