---
layout: chapter
transition: slide-left | slide-right
number: 03
duration: 15 min
---

# Blade : la vue

- Passer des données du contrôleur à une vue Blade
- Afficher une donnée en sécurité avec <code v-pre>{{ }}</code>
- Boucler et conditionner l'affichage avec les directives

<!--
Blade = le dernier maillon du cycle : la route appelle le contrôleur, le contrôleur rend la vue.
Ce chapitre couvre la vue seule ; le layout partagé arrive au chapitre 4.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Blade : la vue
Du contrôleur à la vue

Renvoyer `'Liste des quêtes'` ne suffit pas : il faut une vraie page HTML.

::left::

<Definition term="Blade">

Le moteur de templates de Laravel : du HTML enrichi de directives `@...` et d'expressions <code v-pre>{{ }}</code>, compilé en PHP.

</Definition>

```php
return view('quests.index',
            ['quests' => $this->quests]);
```

::right::

<v-click>

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

</v-click>

<!--
Piège fréquent : écrire view('quests/index') ou oublier le .blade.php implicite — les deux formes avec slash fonctionnent aussi mais le point est la convention.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Blade : la vue
Blade en un coup d'œil

::left::

**Expressions**

- <code v-pre>{{ $quest['title'] }}</code> — affiche une donnée **échappée** : la protection XSS est automatique
- <code v-pre>{{-- commentaire --}}</code> — note invisible dans le HTML envoyé

<v-click>

<Alert type="info">

L'affichage de HTML brut (`{!! !!}`) existe, mais n'est pas nécessaire ici : gardez l'échappement par défaut.

</Alert>

</v-click>

::right::

**Directives** — utilisées aujourd'hui :

- `@if` `@elseif` `@else` `@endif` — conditions
- `@forelse` `@empty` `@endforelse` — boucle avec cas « vide »
- `@extends` `@section` `@yield` `@include` — layout et fragments (chapitre 4)

<v-click>

À connaître, pas d'urgence :

- `@unless` `@isset` `@switch` — autres conditions
- `@foreach` `@for` `@while` — autres boucles

</v-click>

<!--
Toutes les directives listées existent en Laravel 12 (laravel.com/docs/12.x/blade).
Le message : retenir celles d'aujourd'hui, savoir reconnaître les autres dans la doc.
La démo {!! !!} vs {{ }} (injection XSS) est prévue en séance 6.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Blade : la vue
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

Dans la boucle : `route()` génère le lien vers la fiche, <code v-pre>{{ }}</code> affiche les champs échappés.

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
