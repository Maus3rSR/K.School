---
layout: chapter
number: 7
duration: 30 min
---

# Blade et layouts

- Passer des données du contrôleur à une vue Blade
- Afficher en sécurité et boucler avec les directives
- Factoriser les pages avec un layout (`@extends` / `@section`)

<!--
Blade = le dernier maillon du cycle : la route appelle le contrôleur, le contrôleur rend la vue.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
---

# Blade et layouts
Du contrôleur à la vue

::left::

<Definition term="Blade">
Le moteur de templates de Laravel : du HTML enrichi de directives `@...` et d'expressions `{{ }}`, compilé en PHP.
</Definition>

```php
return view('quests.index',
            ['quests' => $this->quests]);
```

::right::

`quests.index` → le **point remplace le slash** :

<FileTree :tree="[
  { name: 'resources', children: [
    { name: 'views', children: [
      { name: 'quests', children: [
        { name: 'index.blade.php', highlight: true }
      ]}
    ]}
  ]}
]" />

Le tableau associatif devient des **variables** dans la vue : `'quests' => ...` crée `$quests`.

<!--
Piège fréquent : écrire view('quests/index') ou oublier le .blade.php implicite — les deux formes avec slash fonctionnent aussi mais le point est la convention.
-->

---

# Blade et layouts
Afficher : échappé ou brut ?

<Compare badLabel="❌ {!! !!} — HTML brut" goodLabel="✅ {{ }} — échappé">
  <template #bad>

```blade
{!! $quest['title'] !!}

{{-- title = "<script>alert('xp volée')</script>" --}}
{{-- → le script s'exécute dans le navigateur --}}
```

  </template>
  <template #good>

```blade
{{ $quest['title'] }}

{{-- → affiché : <script>alert(...)</script> --}}
{{-- → du texte inoffensif, rien ne s'exécute --}}
```

  </template>
</Compare>

<!--
`{{ }}` échappe les caractères spéciaux HTML : c'est la protection XSS par défaut.
`{!! !!}` n'a de sens que pour du HTML de confiance généré par vous, jamais pour une donnée utilisateur.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
---

# Blade et layouts
Les directives : boucles et conditions

::left::

```blade {all|2|3-5|6-8|all}
<h1>Quêtes disponibles</h1>
@forelse ($quests as $id => $quest)
    <a href="{{ route('quests.show', $id) }}">
        {{ $quest['title'] }} — {{ $quest['xp'] }} XP
    </a>
@empty
    <p>Aucune quête pour le moment.</p>
@endforelse
```

::right::

<div v-click="1">

`@forelse ($quests as $id => $quest)` — boucle sur le tableau **avec clé** : `$id` vaut 1, 2, 3.

</div>

<div v-click="2">

Dans la boucle : `route()` génère le lien vers la fiche, `{{ }}` affiche les champs échappés.

</div>

<div v-click="3">

`@empty` — affiché **seulement si** le tableau est vide. `@endforelse` ferme la boucle.

</div>

<div v-click="4">

Même famille : `@if ($quest['difficulty'] === 'hard') ... @endif` pour un affichage conditionnel.

</div>

<!--
Équivalence PHP : foreach + else. Rappeler que Blade compile vers du PHP natif dans storage/framework/views.
-->

---
layout: statement
---

# Chaque page répète le même `<head>`, la même navigation, le même pied de page.

Et quand la navigation change… il faut modifier **chaque fichier**.

<!--
Faire verbaliser : "comment on évite la duplication ?" → un gabarit commun.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
---

# Blade et layouts
Le layout : des trous à remplir

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

`@yield('title')`, `@yield('styles')` — des **trous nommés** que chaque page remplira.

</div>

<div v-click="2">

`@include('partials.nav')` — insère un **fragment partagé** : `resources/views/partials/nav.blade.php`.

</div>

<div v-click="3">

`@yield('content')` — le trou principal : le contenu propre à chaque page.

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
---

# Blade et layouts
La page enfant remplit les trous

::left::

**Le gabarit** (`layouts/app.blade.php`)

```blade
<title>@yield('title') — Campus Quest</title>
@yield('styles')
...
<main>@yield('content')</main>
```

::right::

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

<!--
@vite dans @section('styles') : la CSS de page est injectée dans le <head> du layout — détail au chapitre 8.
Question probable : "le nom après @section est imposé ?" → non, mais il doit égaler le nom du @yield.
-->

---

# Blade et layouts
Retenir le principe du layout

<Analogy title="Comme un formulaire à trous" icon="📝">

Le layout est le **formulaire imprimé** : en-tête, cases vides, pied de page identiques pour tout le monde. Chaque page remplit seulement **ses** cases avec `@section`. Résultat : la navigation et le `<head>` n'existent qu'en **un seul endroit**.

</Analogy>

<!--
Récap oral : @extends choisit le gabarit, @section(nom) remplit @yield(nom), @include insère un fragment.
-->
