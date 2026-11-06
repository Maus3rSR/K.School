---
layout: chapter
transition: slide-left | slide-right
number: 06
duration: 15 min
---

# Pagination

- Remplacer `get()` par `paginate()` sur le catalogue
- Afficher les liens de pages avec `links()`
- Conserver recherche et filtres avec `withQueryString()`

<!--
Transition : le catalogue filtre, trie, s'allège… mais il affiche toujours TOUTES
les quêtes. Le jour où il y en a 5 000, cette page s'effondre — chapitre final.
-->

---
transition: slide-up | slide-down
---

# Pagination
À votre avis ?

<Quiz
  question="Le catalogue affiche les quêtes avec Quest::get(). Le campus passe à 5 000 quêtes : que devient la page ?"
  :options="[
    'Rien — la page ne lit que 30 lignes quoi qu\'il arrive',
    'Elle charge les 5 000 lignes : lente, lourde, illisible',
    'Laravel pagine automatiquement dès 100 lignes',
    'La base refuse de répondre au-delà de 1 000 lignes'
  ]"
  :answer="1"
/>

<!--
Pré-test : la plupart répondent « Laravel s'en occupe » — non : get() charge TOUT, toujours.
La slide suivante montre ce que paginate() change en une ligne.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Pagination
`paginate()` : deux requêtes, des pages

::left::

```php {all|4|all}
$quests = Quest::query()
    ->with('category')
    ->orderByDesc('xp')
    ->paginate(10);
```

::right::

<div v-click="1">

`paginate(10)` remplace `get()` — la page courante est lue dans `?page=` de l'URL, automatiquement.

**2 requêtes** exécutées : `select count(*)` pour le total, puis `select … limit 10 offset 20` pour la page demandée.

</div>

<div v-click="2">

L'objet retourné boucle comme une Collection (`@foreach`), mais sait aussi `$quests->total()`, `$quests->currentPage()`, `$quests->lastPage()`.

</div>

<!--
Vous aviez deviné ? get() ne protège de rien — paginate() borne la requête : 10 lignes par page, quel que soit le volume total.
offset 20 = « page 3 à 10 par page » — le SQL saute les pages précédentes sans les charger.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Pagination
`links()` : les pages en une ligne

::left::

```blade
@foreach ($quests as $quest)
    {{-- la carte quête --}}
@endforeach

{{ $quests->links() }}
```

::right::

<Browser url="localhost/quests?page=2" title="Campus Quest">
  <Placeholder :w="800" :h="500" text="Liens+1+2+3+Suivant" />
</Browser>

<v-click>

`links()` génère les liens `?page=1, 2, 3…` — le markup prévu pour **Tailwind** ; projet Bootstrap → `Paginator::useBootstrapFive()` dans `AppServiceProvider`.

</v-click>

<!--
Campus Quest n'a pas Tailwind : les liens fonctionnent (URLs correctes) mais s'affichent dépouillés — le dire franchement, le markup Tailwind reste standard.
Paginate ≠ limit : limit coupe la liste sans pages ni liens ; paginate produit la navigation complète.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Pagination
`withQueryString()` : les filtres survivent

::left::

```php {all|6|all}
$quests = Quest::query()
    ->with('category')
    ->when(/* recherche + catégorie */)
    ->orderByDesc('xp')
    ->paginate(10)
    ->withQueryString();
```

::right::

<div v-click="1">

`withQueryString()` recopie **tous** les paramètres de l'URL courante dans chaque lien de page : `?q=quiz&category=2&page=3`.

</div>

<div v-click="2">

Sans lui, `?page=2` **perd** `?q=quiz&category=2` : la page 2 affiche tout le catalogue — le bug préféré des catalogues.

</div>

<!--
La démo qui marque : filtrer « quiz », cliquer page 2 sans withQueryString → la recherche disparaît ; le remettre → elle survit.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Pagination
`simplePaginate()` : encore plus léger

::left::

```php
Quest::simplePaginate(10);
```

- Pas de `count(*)` : la base ne compte jamais le total
- Liens « Précédent / Suivant » seulement — pas de numéros de page
- Idéal pour les très grandes tables ou le défilement infini

::right::

<v-click>

<KeyPoint variant="rule" title="Règle d'or" icon="📏">

`paginate()` quand l'utilisateur veut **naviguer** (pages numérotées, total affiché) ; `simplePaginate()` quand le total ne sert à rien — une requête `count(*)` économisée.

</KeyPoint>

</v-click>

<!--
Sur une table d'un million de lignes, count(*) coûte plus cher que la page elle-même — d'où simplePaginate.
Pagination d'API (hors périmètre aujourd'hui) : les mêmes méthodes renvoient du JSON paginé automatiquement.
-->
