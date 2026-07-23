---
layout: two-cols-header
layoutClass: gap-x-4
---

# Pièges classiques

Erreurs à éviter quand on débute

::left::

<v-click>

**Utiliser `<a href="">` au lieu de `<Link>`**

```tsx
// ❌ Recharge toute l'application
<a href="/about">À propos</a>

// ✅ Navigation interne sans rechargement
<Link to="/about">À propos</Link>
```

</v-click>

<v-click>

**Oublier `BrowserRouter` autour de `Routes`**

```tsx
// ❌ Routes sans contexte : erreur React Router
<Routes>
  <Route path="/" element={<Home />} />
</Routes>
```

</v-click>

::right::

<v-click>

**Placer `Routes` à l'intérieur d'une autre `Routes`**

```tsx
// ❌ Routes imbriquées directement
<Routes>
  <Routes>...</Routes>
</Routes>
```

</v-click>

<v-click>

**Utiliser `exact` ou `component` venant de l'ancienne API v5**

```tsx
// ❌ Syntaxe v5, incompatible avec v6/v7
<Route exact path="/" component={Home} />

// ✅ Syntaxe v6/v7
<Route path="/" element={<Home />} />
```

</v-click>

<!--
Ces 4 pièges sont les plus fréquents observés chez les débutants en entreprise.
Faire un tour de table : "lequel avez-vous rencontré ?" pour dédramatiser.
-->
