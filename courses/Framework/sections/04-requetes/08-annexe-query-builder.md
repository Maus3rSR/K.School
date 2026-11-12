---
transition: slide-left | slide-right
---

# Query Builder ou Eloquent ?

- Distinguer les deux portes d'accès à la base
- Chaîner les mêmes méthodes des deux côtés
- Choisir la bonne porte selon le besoin
- Filtrer par une relation avec `whereHas`

<!--
Annexe — hors parcours principal : lecture. Le chapitre 01 n'a retenu qu'un aperçu
(« deux portes, même SQL ») ; ce fichier creuse la comparaison et ajoute `whereHas`,
qui n'est pas requis pour la séance ni pour l'exercice WishFlix.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# La même chaîne, deux portes

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

# Ce qui change : ce qui revient

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

# Quand choisir lequel

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

# Le même résultat, pas la même facture

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
Clore : les deux portes mènent à la même base, le choix se fait sur ce qu'on veut ramener.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# `whereHas` : filtrer **par une relation**

::left::

```php
// Quêtes qui se déroulent à la BU
Quest::whereHas('locations',
    fn ($q) => $q->where('name', 'BU')
)->get();
```

Le SQL utilise `EXISTS` : « les quêtes **pour lesquelles il existe** un lieu nommé BU ».

::right::

- `with('locations')` **charge** les lieux pour les afficher — ne filtre rien
- `whereHas('locations', …)` **filtre** les quêtes — ne charge rien

<v-click>

<Alert type="info">

Les deux se combinent : `Quest::with('locations')->whereHas('locations', …)` = quêtes filtrées **et** lieux affichés.

</Alert>

</v-click>

<!--
La confusion with/whereHas est LE point dur : insister sur les deux verbes — charger vs filtrer.
Cas d'usage Campus Quest : quêtes d'un lieu précis, ou quêtes qui ont AU MOINS un lieu (whereHas sans callback).
Hors socle : ni la séance ni la Partie A ne l'exigent — le catalogue filtre sur ses propres colonnes.
-->
