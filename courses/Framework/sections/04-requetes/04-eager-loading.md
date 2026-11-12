---
layout: chapter
transition: slide-left | slide-right
number: 04
duration: 32 min
---

# Eager loading — corriger le N+1

- Reconnaître le N+1 dans le catalogue Campus Quest
- Corriger avec `with()`, `load()` et `withCount`
- Faire échouer le N+1 en dev avec `preventLazyLoading()`

<!--
Transition : le symptôme a été diagnostiqué en S3 — aujourd'hui on le corrige,
et on installe l'alarme qui le dénonce tout seul.
Tag Campus Quest de fin de chapitre : s4-ch4-eager-loading.
Moment léger : « le N+1 n'est pas un bug que vous voyez — c'est un bug que vous mesurez » (la Debugbar du ch3 le rend visible).
Découpage : ≈ 10 min de slides (≈ 6 slides), démo flash ≈ 4 min — moments : retirer/remettre
`with('category')` sous la Debugbar (chiffres avant/après), `LazyLoadingViolationException` ;
micro-pratique ≈ 18 min (slide « À vous », étape A4 — with() + chiffres dans REPONSES.md).
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="Quest::with('category')->get() sur 30 quêtes exécute combien de requêtes SQL ?"
  :options="[
    '1 : with() fait une jointure, tout arrive en une requête',
    '2 : une pour les quêtes, une pour toutes les catégories',
    '31 : with() ne change rien au nombre de requêtes',
    '0 : with() met les catégories en cache PHP'
  ]"
  :answer="1"
/>

<!--
Pré-test : la bonne réponse n'est PAS une jointure — with() lance une 2e requête
(IN + tous les category_id d'un coup), puis Eloquent recouds les objets en PHP.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le symptôme, dans **votre** page

::left::

```blade
@foreach ($quests as $quest)
    {{ $quest->title }}
    — {{ $quest->category->name }}
@endforeach
```

La carte de chaque quête lit `category->name` : le <KeyTerm>lazy loading</KeyTerm> lance une requête **par ligne**, en silence.

::right::

<Terminal
  title="tinker" prompt=">"
  :lines="[
    { cmd: 'DB::enableQueryLog()' },
    { cmd: '$quests = Quest::all()' },
    { cmd: '$quests->each(fn ($q) => $q->category->name)' },
    { cmd: 'count(DB::getQueryLog())', out: '   = 31   // 1 + 30 quêtes' }
  ]"
/>

<!--
Rappel du teaser S3 — on ne redémontre pas le mécanisme, on le constate sur les 30 quêtes seedées.
Question à la salle : « vous le voyez, ce N+1, en naviguant sur /quests ? » — non : c'est un bug invisible sans instrumentation.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# `with()` : une requête de plus, pas trente

::left::

```php
$quests = Quest::query()
    ->with('category')
    ->orderByDesc('xp')
    ->get();
```

::right::

<Definition term="Eager loading" translation="(Chargement anticipé)">

Charger les relations **à l'avance**, en une requête supplémentaire par relation — avant même que la vue n'y touche.

</Definition>

<v-click>

```text
select * from quests order by xp desc
select * from categories where id in (1, 2, 3)
```

**2 requêtes**, quel que soit le nombre de quêtes — le `IN` prend tous les `category_id` d'un coup.

</v-click>

<!--
Le chariot des archives de la S3 : une tournée pour tous les dossiers au lieu d'un aller-retour par dossier.
Important : with() n'ajoute PAS de jointure — ce sont deux requêtes séparées, Eloquent recouds les objets en PHP.
-->

---
transition: slide-up | slide-down
---

# Les trois formes de chargement

| Écrire | Quand |
|---|---|
| `Quest::with('category')->get()` | Charger une relation **avec** la liste — le cas courant |
| `Quest::with(['category', 'locations'])->get()` | Plusieurs relations d'un coup → 3 requêtes au total |
| `$quest->load('locations')` | Charger **après coup**, sur un modèle déjà récupéré |
| `Location::withCount('quests')->get()` | Le **nombre** sans les objets → attribut `quests_count` |

<v-click>

`withCount` ajoute une sous-requête `count(*)` au SELECT — parfait pour un badge « 3 quêtes ici » sans charger une seule quête.

</v-click>

<!--
load() sert quand on reçoit un modèle sans savoir si sa relation est chargée — ex : recharger une relation après un attach().
withCount produit {relation}_count — la colonne lue $location->quests_count : on s'en resservira au chapitre 5 pour le classement.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# L'alarme anti-N+1 en dev

::left::

```php {none|4-6|all}
// app/Providers/AppServiceProvider.php
public function boot(): void
{
    Model::preventLazyLoading(
        ! $this->app->isProduction()
    );
}
```

::right::

<div v-click="1">

`preventLazyLoading` lève une `LazyLoadingViolationException` dès qu'une relation se charge **paresseusement**.

</div>

<div v-click="2">

- Actif **uniquement hors production** : en prod, on préfère la requête en trop au crash — en dev, on préfère le crash qui oblige à corriger
- Le N+1 n'est plus invisible : **la page refuse de s'afficher**

</div>

<!--
Démo live : retirer with('category') → la page explose avec LazyLoadingViolationException. Remettre with() → tout roule.
C'est le filet de sécurité à laisser en place sur le projet : il transforme un bug silencieux en erreur bruyante en dev.
-->

---
layout: fact
transition: slide-up | slide-down
---

# Le compte est bon

<div class="grid grid-cols-3 gap-8">
  <Stat value="31" label="requêtes avant (30 quêtes)" color="red" />
  <Stat value="2" label="requêtes après with('category')" color="green" />
  <Stat value="×15" label="moins d'aller-retours base" color="blue" />
</div>

<v-click>

Et ce gain **ne dépend pas du volume** : avec 300 quêtes, ce serait 301 → 2.

</v-click>

<!--
Chiffres à refaire mesurer dans la Debugbar au chapitre 3 — ce comptage Tinker est la preuve de principe.
Une optimisation qui se prétend se mesure : c'est exactement ce que la soutenance S9 demandera.
-->

---
transition: slide-up | slide-down
---

# L'eager loading a des limites

<ProsCons
  :pros="[
    'Nombre de requêtes constant, quel que soit le volume',
    'Une ligne de code : ->with(\'category\')',
    'L\'alarme preventLazyLoading veille en dev'
  ]"
  :cons="[
    'Charger une relation inutile coûte une requête de trop',
    'Une liste énorme à charger d\'un coup consomme de la mémoire',
    'Ne dispense pas de mesurer : toujours vérifier le compte'
  ]"
  prosTitle="Ce que ça change" consTitle="Ce que ça ne fait pas"
/>

<!--
Piège symétrique : mettre with() partout « au cas où » charge des relations que la vue n'utilise pas — une requête gaspillée.
La bonne boucle : afficher → mesurer → ajouter le with qui manque → re-mesurer. La Debugbar (chapitre 03) rend cette boucle concrète.
-->

---
transition: slide-up | slide-down
---

# Panorama : les relations

<script setup>
import relations from '/references/relations'
</script>

<Panorama :items="relations" doc="https://laravel.com/docs/12.x/eloquent-relationships" at="s4-ch4" />

<!--
Survol de 30 s : with() est le badge du jour ; withCount arrive au chapitre 05, whereHas en annexe —
les montrer sans les détailler, ils sont dans la liste pour qui voudra aller plus loin.
-->

---
transition: slide-up | slide-down
---

# À vous : corriger le N+1

<Exercise title="WishFlix — eager loading du catalogue" duration="18 min" level="guidé"
  :criteria="[
    'La requête du catalogue charge la catégorie avec with(\'category\')',
    'Le nombre de requêtes APRÈS correction est noté dans REPONSES.md, avec le gain constaté',
    'La page affiche toujours les jeux avec le nom de leur catégorie'
  ]"
  :hints="[
    'Ajoutez ->with(\'category\') avant ->get() sur la requête des jeux',
    'Rechargez / et relisez l\'onglet Queries de la Debugbar : les deux chiffres se comparent',
    'Si vos cartes « Mieux notés » lisent aussi la catégorie, with() sur cette requête aussi'
  ]">

**Exercice** `04-requetes` — étape **A4** du README (point de contrôle 2 avec A3).

Une ligne dans le contrôleur, deux chiffres dans REPONSES.md : le N+1 passe de « invisible » à « mesuré et corrigé ».

**Spécificités WishFlix** : le N+1 vient de `$game->category->name` dans les cartes — la requête à corriger est celle du catalogue (`$games`). Si votre section « Mieux notés » affiche aussi la catégorie, sa requête a le même problème : la Debugbar le montrera.

</Exercise>

<!--
Point de contrôle 2 du README (après A4). Palier de rattrapage : tags Campus Quest
s4-ch3-debugbar et s4-ch4-eager-loading.
-->
