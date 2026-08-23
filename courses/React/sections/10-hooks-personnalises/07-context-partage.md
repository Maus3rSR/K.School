---
layout: two-cols-header
layoutClass: gap-x-4
---

# Partager un état - Deux problèmes liés

Partager un état sans propager les props à travers toute l'arborescence

::left::

```tsx
function App() {
  const [theme, setTheme] = useState('light')
  return <Layout theme={theme} setTheme={setTheme} />
}

function Layout({ theme, setTheme }) {
  return <Page theme={theme} setTheme={setTheme} />
}

function Page({ theme, setTheme }) {
  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Footer theme={theme} />
    </>
  )
}
```

::right::

- Le thème appartient à `App`
- `Layout` et `Page` ne l'utilisent pas, mais doivent le transmettre
- C'est le **prop drilling** : des props qui traversent des composants intermédiaires

::bottom::

<v-click>

**En plus**, si `Header` et `Footer` géraient chacun leur propre `useState`, ils n'auraient pas la même valeur. On a besoin d'un **seul state**, accessible directement où on en a besoin.

</v-click>

<!--
Objectif de cette slide : montrer que le besoin de partager un état et le prop drilling sont deux facettes du même problème.
Context + custom hook résout les deux à la fois : un seul state en haut de l'arbre, consommé directement dans les composants qui en ont besoin.
Le cas du thème dark/light est concret et visuel pour les apprenants.
-->

---
layout: image
image: /prop-drilling-vs-context.png
---

<!--
Image comparant le prop drilling et le pattern Context API.
Pas de texte visible sur la slide pour laisser l'infographie occuper toute la surface.
À utiliser comme transition visuelle entre le problème et la solution en code.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Context + hook personnalisé

Stocker le state en haut, le consommer partout

::left::

```tsx {all|1-4|6-16|18-24|26-36}{maxHeight:'420px'}
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

const ThemeContext = createContext<string | null>(null)

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme doit être utilisé dans ThemeProvider')
  }
  return context
}

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Footer />
    </ThemeProvider>
  )
}
```

::right::

<div v-click="1">

`createContext` déclare le "tuyau" de données partagé.

</div>

<div v-click="2">

`ThemeProvider` possède le state et le rend disponible à tous ses enfants via `.Provider`.

</div>

<div v-click="3">

`useTheme` est un **hook personnalisé** qui consomme le Context. L'erreur si oubli du Provider aide au débogage en équipe.

</div>

<div v-click="4">

N'importe quel descendant peut appeler `useTheme()` et lire la **même valeur** gérée par `ThemeProvider`.

</div>

<!--
Cette slide détaille concrètement le pattern Context + custom hook : createContext → Provider → useContext encapsulé dans un hook nommé.
Le typage createContext<string | null> est volontairement simple pour ne pas surcharger visuellement. En entreprise, on typerait la valeur du Provider avec une interface { theme, setTheme }.
Le throw dans useTheme est une bonne pratique : il signale immédiatement si un développeur appelle le hook hors Provider.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# useContext : points de vigilance

Bien utilisé, c'est puissant ; mal utilisé, ça re-render tout

::left::

<v-click>

**Re-rendus en cascade**

Tout composant qui consomme le Context se re-render quand la valeur change — même s'il n'utilise qu'une petite partie de celle-ci.

**Ne pas tout y mettre**

- Privilégiez le **state local** et les **props** quand c'est possible
- Réservez Context aux données vraiment globales : thème, langue, utilisateur connecté, panier...

</v-click>

::right::


<v-click>

**Quand Context ne suffit plus**

Si vous avez :
- beaucoup d'états interconnectés
- des mises à jour fréquentes dans des Contexts larges
- des règles métier complexes

Pensez à une librairie dédiée de gestion d'état partagé :

- **Redux Toolkit** — robuste, historique, excellent outillage
- **Zustand** — simple, minimaliste, très populaire
- **Jotai / Recoil** — state atomique, plus avancé

</v-click>

<!--
Cette slide clôt le triptyque Context + custom hook. Elle répond à la question implicite : "si Context partage l'état, pourquoi ne pas tout y mettre ?"
Les librairies de state management sont présentées comme des outils d'entreprise à explorer après la formation, pas comme des prérequis.
-->
