---
layout: chapter
transition: slide-left | slide-right
number: 04
duration: 30 min
---

# Blade : les layouts

- Factoriser le squelette commun des pages dans un layout
- Remplir les emplacements du layout avec `@section`
- Suivre l'assemblage : layout + page → HTML final

<!--
Deuxième partie de Blade : on passe de la vue isolée au gabarit partagé.
Durée (30 min) = slides (≈ 8 min) + livecoding étape 10 (≈ 7 min) + « À vous » A4 (≈ 15 min).
-->

---
layout: statement
transition: slide-up | slide-down
---

# Chaque page répète le même `<head>`, la même navigation, le même pied de page.

Et quand la navigation change… il faut modifier **chaque fichier**.

<!--
Montrer l'état de la démo : quests/index et quests/show n'ont ni <title> ni navigation. Ajouter une nav… dans les deux fichiers ? Faire verbaliser : "comment on évite la duplication ?" → un gabarit commun.
Côté WishFlix, les apprenants le vivent déjà : home.blade.php et game-detail.blade.php recopient toute la coquille des maquettes.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le layout : des emplacements à remplir

::left::

```blade {all|5|8|10|all}
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>@yield('title') — Campus Quest</title>
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

`@yield('title')` — un **emplacement nommé** que chaque page remplira avec son titre d'onglet.

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
Livecoding étape 10. Fichier : resources/views/layouts/app.blade.php. Insister : les noms des yield sont libres mais doivent correspondre aux @section.
Pas encore de CSS dans ce layout : elle arrive au chapitre 5, avec Vite.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# La page enfant remplit les emplacements

::left::

**Le gabarit** (`layouts/app.blade.php`)

```blade
<title>@yield('title') — Campus Quest</title>
...
<main>@yield('content')</main>
```

::right::

<v-click>

**La page** (`quests/index.blade.php`)

```blade
@extends('layouts.app')

@section('title', 'Quêtes')

@section('content')
    <h1>Quêtes disponibles</h1>
    {{-- la boucle du chapitre 2 --}}
@endsection
```

</v-click>

<!--
@extends choisit le gabarit (layouts.app → layouts/app.blade.php, même convention du point qu'au chapitre 2).
Forme courte @section('title', '...') pour un texte, forme longue @section ... @endsection pour un bloc.
-->

---
transition: slide-up | slide-down
---

# Et si les noms ne correspondent pas ?

<Quiz
  question="Le layout attend un emplacement, votre page en remplit un autre nom. Que se passe-t-il ?"
  :options="[
    'Blade lève une erreur « section contenu introuvable »',
    'La page s\'affiche avec la navigation, mais le contenu reste vide, sans erreur',
    'Blade devine et place le contenu dans l\'emplacement `content`',
    'La page s\'affiche sans le layout'
  ]"
  :answer="1"
>

```blade
{{-- layout : attend 'content' --}}
@yield('content')

{{-- page : remplit 'contenu' --}}
@section('contenu')
```

</Quiz>

<!--
Pré-test avant la slide d'assemblage : faire voter, puis provoquer le bug en direct dans la démo (@section('contenu')).
Bonne réponse : l'emplacement reste simplement vide, Blade n'affiche aucune erreur — un nom de section ne « remplit » que le @yield du même nom.
C'est le bug n°1 de l'atelier : le faire repérer maintenant fait gagner du temps.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Du layout au HTML final

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

Vous aviez deviné ? Chaque `@section` remplit **le `@yield` du même nom**, et lui seul.

<div v-click="1">

**`title` rempli** — `@section('title', 'Quêtes')` remplace `@yield('title')`.

</div>

<div v-click="2">

**`content` rempli** — le `<main>` reçoit le contenu de la page. Le navigateur ne reçoit que du **HTML final**, sans trace de Blade.

</div>

<!--
Montrer le morphing : le @yield devient le contenu — c'est un assemblage, pas une copie.
Avec @section('contenu'), le second morphing n'a pas lieu : le @yield('content') est remplacé par… rien.
-->

---
transition: slide-up | slide-down
---

# Retenir le principe du layout

<Analogy title="Comme un formulaire à trous" icon="📝">

Le layout est le **formulaire imprimé** : en-tête, cases vides, pied de page identiques pour tout le monde. Chaque page remplit seulement **ses** cases avec `@section`. Résultat : la navigation et le `<head>` n'existent qu'en **un seul endroit**.

</Analogy>

<!--
Récap oral : @extends choisit le gabarit, @section(nom) remplit @yield(nom), @include insère un fragment.
Moment léger : dans partials/nav, renommer « Quêtes » en « Quêtes (dont une introuvable) » → les deux pages changent d'un coup. « Une ligne modifiée, deux pages à jour : voilà l'XP du layout. »
-->

---
transition: slide-up | slide-down
---

# Panorama : Blade

<script setup>
import blade from '/references/blade'
</script>

<Panorama :items="blade" doc="https://laravel.com/docs/12.x/blade" at="s2-ch4" />

<!--
Survol de 30 s, pas d'explication détaillée : montrer ce qui a été vu (badges « vu ») et où trouver le reste.
Pendant le « À vous », les apprenants peuvent revenir sur cette slide comme aide-mémoire.
-->

---
transition: slide-up | slide-down
---

# À vous : le layout WishFlix

<Exercise title="WishFlix — étapes A4.1 à A4.4" duration="15 min" level="guidé"
  :criteria="[
    'resources/views/layouts/app.blade.php contient la navbar et le footer, une seule fois',
    'L\'accueil et la fiche jeu étendent le layout',
    'Modifier un lien de la navbar change les deux pages'
  ]">

Consignes : README de l'exercice `02-routing-blade`, **Partie A, étapes A4**.

Extrayez la coquille commune de vos deux vues dans un layout, puis faites-les hériter de celui-ci.

</Exercise>

<!--
Point de contrôle 4. Palier de rattrapage : tag Campus Quest s2-ch4-layouts.
Les styles WishFlix (couleurs, navbar) manquent encore : c'est le problème que règle le chapitre 5.
-->
