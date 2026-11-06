---
layout: chapter
transition: slide-left | slide-right
number: 01
duration: 15 min
---

# Query Builder ou Eloquent ?

- Distinguer les deux portes d'accès à la base
- Chaîner les mêmes méthodes des deux côtés
- Choisir la bonne porte selon le besoin

<!--
Transition : en S3 tout passait par les modèles Eloquent. Il existe une autre porte,
plus bas niveau — la façade DB. À quoi sert-elle, et quand la préférer ?
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Query Builder ou Eloquent ?
La même chaîne, deux portes

::left::

```php
// Porte 1 — le Query Builder
DB::table('quests')
    ->where('xp', '>=', 100)
    ->orderByDesc('xp')
    ->get();

// Porte 2 — Eloquent
Quest::where('xp', '>=', 100)
    ->orderByDesc('xp')
    ->get();
```

::right::

<Definition term="Query Builder">

L'API en chaîne de Laravel qui **construit du SQL** sans passer par un modèle : `DB::table('quests')` ouvre la requête, chaque méthode ajoute une clause.

</Definition>

<v-click>

`where`, `orderBy`, `limit`, `get`, `first`, `find`, `pluck`… **même chaîne des deux côtés** — le SQL produit est identique.

</v-click>

<!--
DB::table() parle d'une TABLE, Quest:: d'un MODÈLE — même grammaire, même SQL.
Faire remarquer : les apprenants connaissent déjà cette syntaxe — ils l'ont écrite en S3 sans le savoir.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Query Builder ou Eloquent ?
Ce qui change : ce qui revient

::left::

```php {all|2-4|6-9|all}
$q = DB::table('quests')->find(1);
$q->featured;        // int (0)
$q->category;        // ✗ propriété inexistante
$q->save();          // ✗ méthode inexistante

$q = Quest::find(1);
$q->featured;        // bool — le casts() joue
$q->category->name;  // la relation marche
$q->save();          // le modèle sait écrire
```

::right::

<div v-click="1">

`DB::table()` renvoie des **stdClass** : des boîtes de données brutes — colonnes = propriétés, rien de plus.

</div>

<div v-click="2">

`Quest::` renvoie des **modèles** : casts, relations, `save()`, `$fillable` — tout ce que la classe `Quest` définit.

</div>

<div v-click="3">

<KeyPoint variant="rule" title="Règle d'or" icon="📏">

Eloquent **par défaut**. Le Query Builder quand on veut juste des données brutes, vite, sans modèle.

</KeyPoint>

</div>

<!--
featured est int côté stdClass : le cast 'boolean' vit dans le modèle, pas en base.
$q->category côté stdClass → "Undefined property" — la relation est du code PHP, pas du SQL.
-->

---
transition: slide-up | slide-down
---

# Query Builder ou Eloquent ?
Voir le SQL généré

```php
Quest::where('xp', '>=', 100)->orderByDesc('xp')->toSql();
// "select * from `quests` where `xp` >= ? order by `xp` desc"

Quest::where('xp', '>=', 100)->dd();
// array:2 [ "select * from `quests` where `xp` >= ? ..." , [100] ]
```

<v-click>

- `toSql()` renvoie la requête **avec des `?`** : les valeurs voyagent à part — ce sont les <KeyTerm>bindings</KeyTerm>
- `dd()` affiche SQL + bindings **puis stoppe** la requête — l'espion idéal dans Tinker ou un contrôleur

</v-click>

<v-click>

<Alert type="info">

`toSql()` / `dd()` existent **aussi** sur `DB::table()` — même grammaire, même espion.

</Alert>

</v-click>

<!--
Le « ? » est important pédagogiquement : il annonce le chapitre 2 (bindings et injection).
dd() = dump + die : la page s'arrête net — parfait pour inspecter, à retirer ensuite.
-->

---
transition: slide-up | slide-down
---

# Query Builder ou Eloquent ?
Quand choisir lequel

| Besoin | La bonne porte |
|---|---|
| Catalogue, fiche, tout le quotidien | **Eloquent** — objets, relations, casts |
| Rapport, export, statistiques brutes | **Query Builder** — pas de modèles à hydrater |
| Requête sur une table sans modèle | **Query Builder** — `DB::table('logs')` |
| Grosse mise à jour en masse | **Query Builder** — `DB::table()->update()` en 1 requête |

<v-click>

<KeyPoint variant="tip" title="On peut mélanger" icon="🔀">

Les deux portes cohabitent : Eloquent pour les écrans, Query Builder pour la migration de données ou le rapport du lundi. Ce n'est pas un choix de camp, c'est un choix **par requête**.

</KeyPoint>

</v-click>

<!--
Cas réel : un export CSV ou un rapport n'a pas besoin de 10 000 modèles hydratés — stdClass suffit et coûte moins de mémoire.
Hydrater = transformer la ligne SQL en instance de modèle — c'est ce qu'Eloquent fait et que le Query Builder saute.
-->

---
transition: slide-up | slide-down
---

# Query Builder ou Eloquent ?
Le même résultat, pas la même facture

<Terminal
  title="tinker" prompt=">"
  :lines="[
    { cmd: 'DB::table(\'quests\')->where(\'xp\', \'>=\', 100)->count()', out: '   = 12' },
    { cmd: 'Quest::where(\'xp\', \'>=\', 100)->count()', out: '   = 12' },
    { cmd: 'Quest::with(\'category\')->count()', out: '   = 30   // with ne change pas le nombre de lignes' }
  ]"
/>

<v-click>

Le SQL est le même ; **ce qui change c'est l'enveloppe** : données brutes vs objets métier complets.

</v-click>

<!--
Anticiper la confusion fréquente : with() ne filtre pas, il charge plus — le count reste identique.
Clore le chapitre : les deux portes mènent à la même base, le choix se fait sur ce qu'on veut ramener.
-->
