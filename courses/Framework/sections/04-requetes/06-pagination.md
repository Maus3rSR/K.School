---
layout: chapter
transition: slide-left | slide-right
number: 06
duration: 22 min
---

# Pagination

- Remplacer `get()` par `paginate()` sur le catalogue
- Afficher les liens de pages avec `links()`
- Conserver recherche et filtres avec `withQueryString()`

<!--
Transition : le catalogue filtre, trie, s'allège… mais il affiche toujours TOUTES
les quêtes. Le jour où il y en a 5 000, cette page s'effondre — chapitre final.
Tag Campus Quest de fin de chapitre : s4-ch6-pagination.
Moment léger : « paginate() remplace get(), pas s'ajoute » — une seule ligne change, tout le reste suit.
Découpage : ≈ 8 min de slides (≈ 5 slides), démo flash ≈ 2 min — moments : ?page=2,
retirer/remettre withQueryString(), 2 requêtes dans la Debugbar ; micro-pratique ≈ 12 min
(slide « À vous », étape A6 — paginate(9) + links() + withQueryString()).
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

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

# `paginate()` : deux requêtes, des pages

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

# `links()` : les pages en une ligne

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

# `withQueryString()` : les filtres survivent

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

# `simplePaginate()` : encore plus léger

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

---
transition: slide-up | slide-down
---

# À vous : paginer le catalogue

<Exercise title="WishFlix — 9 jeux par page" duration="12 min" level="guidé"
  :criteria="[
    'La page d\'accueil n\'affiche que 9 jeux',
    'Les liens de pages apparaissent sous la grille',
    'Rechercher ou filtrer puis changer de page conserve les paramètres'
  ]"
  :hints="[
    'Remplacez ->get() par ->paginate(9) sur la requête des jeux (US1 de l\'étape A1 l\'a peut-être déjà préparée)',
    '{{ $games->links() }} sous la grille dans la vue',
    'Ajoutez ->withQueryString() après paginate() pour que les filtres survivent aux pages'
  ]">

**Exercice** `04-requetes` — étape **A6** du README (fin du socle — point de contrôle 3 avec A5).

Une méthode remplace `get()`, une ligne de Blade affiche la navigation : le catalogue tient la charge.

**Spécificités WishFlix** : votre accueil a **plusieurs** requêtes (`$games`, `$featured`, `$topRated`) — ne paginez que le catalogue principal ; la une et le podium restent entiers. `paginate(9)` et pas 10 : votre grille s'arrange mieux par 3.

</Exercise>

<!--
Point de contrôle 3 du README : socle terminé. Palier de rattrapage : tag Campus Quest s4-ch6-pagination.
Partie B (recherche, filtre combiné) et bonus (top catégories, inRandomOrder, simplePaginate) au README.
-->
