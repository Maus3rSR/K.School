---
layout: chapter
transition: slide-left | slide-right
number: 03
duration: 20 min
---

# Eager loading — corriger le N+1

- Reconnaître le N+1 dans le catalogue Campus Quest
- Corriger avec `with()`, `load()` et `withCount`
- Faire échouer le N+1 en dev avec `preventLazyLoading()`

<!--
Transition : le symptôme a été diagnostiqué en S3 — aujourd'hui on le corrige,
on le mesure, puis on installe l'alarme qui le dénonce tout seul.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Eager loading — corriger le N+1
Le symptôme, dans **votre** page

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

# Eager loading — corriger le N+1
`with()` : une requête de plus, pas trente

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

# Eager loading — corriger le N+1
Les trois formes de chargement

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

# Eager loading — corriger le N+1
L'alarme anti-N+1 en dev

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

# Eager loading — corriger le N+1
Le compte est bon

<div class="grid grid-cols-3 gap-8">
  <Stat value="31" label="requêtes avant (30 quêtes)" color="red" />
  <Stat value="2" label="requêtes après with('category')" color="green" />
  <Stat value="×15" label="moins d'aller-retours base" color="blue" />
</div>

<v-click>

Et ce gain **ne dépend pas du volume** : avec 300 quêtes, ce serait 301 → 2.

</v-click>

<!--
Chiffres à refaire mesurer dans la Debugbar au chapitre 4 — ce comptage Tinker est la preuve de principe.
Une optimisation qui se prétend se mesure : c'est exactement ce que la soutenance S9 demandera.
-->

---
transition: slide-up | slide-down
---

# Eager loading — corriger le N+1
L'eager loading a des limites

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
La bonne boucle : afficher → mesurer → ajouter le with qui manque → re-mesurer. La Debugbar (chapitre suivant) rend cette boucle concrète.
-->
