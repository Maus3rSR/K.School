---
layout: chapter
transition: slide-left | slide-right
number: 04
duration: 15 min
---

# Blade : les layouts

- Factoriser le squelette commun des pages dans un layout
- Remplir les emplacements du layout avec `@section`
- Suivre l'assemblage : layout + page → HTML final

<!--
Deuxième partie de Blade : on passe de la vue isolée au gabarit partagé.
-->

---
layout: statement
transition: slide-up | slide-down
---

# Chaque page répète le même `<head>`, la même navigation, le même pied de page.

Et quand la navigation change… il faut modifier **chaque fichier**.

<!--
Faire verbaliser : "comment on évite la duplication ?" → un gabarit commun.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Blade : les layouts
Le layout : des emplacements à remplir

::left::

```blade {all|5,7|10|12|all}
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>@yield('title') — Campus Quest</title>
    @vite(['resources/css/app.css'])
    @yield('styles')
</head>
<body>
    @include('partials.nav')
    <main>
        @yield('content')
    </main>
</body>
</html>
```

::right::

<div v-click="1">

`@yield('title')`, `@yield('styles')` — des **emplacements nommés** que chaque page remplira.

</div>

<div v-click="2">

`@include('partials.nav')` — insère un **fragment partagé** : `resources/views/partials/nav.blade.php`.

</div>

<div v-click="3">

`@yield('content')` — l'emplacement principal : le contenu propre à chaque page.

</div>

<div v-click="4">

Le layout = la **coquille commune** à toutes les pages : écrite une seule fois.

</div>

<!--
Fichier : resources/views/layouts/app.blade.php. Insister : les noms des yield sont libres mais doivent correspondre aux @section.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Blade : les layouts
La page enfant remplit les emplacements

::left::

**Le gabarit** (`layouts/app.blade.php`)

```blade
<title>@yield('title') — Campus Quest</title>
@yield('styles')
...
<main>@yield('content')</main>
```

::right::

<v-click>

**La page** (`quests/index.blade.php`)

```blade
@extends('layouts.app')

@section('title', 'Quêtes')

@section('styles')
    @vite('resources/css/quests.css')
@endsection

@section('content')
    <h1>Quêtes disponibles</h1>
@endsection
```

</v-click>

<!--
@vite dans @section('styles') : la CSS de page est injectée dans le <head> du layout — détail au chapitre 5.
Question probable : "le nom après @section est imposé ?" → non, mais il doit égaler le nom du @yield.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Blade : les layouts
Du layout au HTML final

::left::

````md magic-move
```blade
{{-- layouts/app.blade.php --}}
<title>@yield('title') — Campus Quest</title>

<main>
    @yield('content')
</main>
```

```html {2}
{{-- layouts/app.blade.php --}}
<title>Quêtes — Campus Quest</title>

<main>
    @yield('content')
</main>
```

```html {5}
{{-- layouts/app.blade.php --}}
<title>Quêtes — Campus Quest</title>

<main>
    <h1>Quêtes disponibles</h1>
</main>
```
````

<div class="mt-4">
```blade
{{-- quests/index.blade.php --}}
@extends('layouts.app')

@section('title', 'Quêtes')

@section('content')
    <h1>Quêtes disponibles</h1>
@endsection
```
</div>

::right::

Le layout expose deux **emplacements** : `title` et `content`.

La page enfant fournit ses **sections** : chaque `@section` porte le nom de l'emplacement qu'elle remplit.

<div v-click="1">

**`title` rempli** — `@section('title', 'Quêtes')` remplace `@yield('title')`.

</div>

<div v-click="2">

**`content` rempli** — le `<main>` reçoit le contenu de la page. Le navigateur ne reçoit que du **HTML final**, sans trace de Blade.

</div>

<!--
Montrer le morphing : le @yield devient le contenu — c'est un assemblage, pas une copie.
@yield('styles') suit exactement le même mécanisme (non montré pour rester lisible).
-->

---
transition: slide-up | slide-down
---

# Blade : les layouts
Retenir le principe du layout

<Analogy title="Comme un formulaire à trous" icon="📝">

Le layout est le **formulaire imprimé** : en-tête, cases vides, pied de page identiques pour tout le monde. Chaque page remplit seulement **ses** cases avec `@section`. Résultat : la navigation et le `<head>` n'existent qu'en **un seul endroit**.

</Analogy>

<!--
Récap oral : @extends choisit le gabarit, @section(nom) remplit @yield(nom), @include insère un fragment.
-->

---
transition: slide-up | slide-down
---

# Blade : les layouts
À vous de jouer

<Quiz
  question="Votre page affiche bien la navbar du layout, mais son contenu reste vide. Quelle est la cause la plus probable ?"
  :options="[
    'Le contrôleur ne passe pas $quests à la vue',
    'La page remplit @section(\'contenu\') alors que le layout attend @yield(\'content\')',
    'Le fichier s\'appelle index.php au lieu de index.blade.php',
    'sail npm run dev n\'est pas lancé'
  ]"
  :answer="1"
/>

<!--
Bonne réponse : les noms de section et de yield ne correspondent pas. Blade n'affiche aucune erreur, l'emplacement reste simplement vide.
Les autres options produisent des symptômes différents : variable non définie → erreur ; .php → les directives @ s'affichent en texte brut ; Vite → erreur "manifest not found".
C'est le bug n°1 de l'atelier : le faire repérer maintenant fait gagner du temps.
-->
