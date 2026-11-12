---
layout: chapter
transition: slide-left | slide-right
number: 01
duration: 33 min
---

# Filtrer et trier

- Filtrer avec `where` et ses variantes
- Chercher dans le texte avec `like` — valeur liée, jamais concaténée
- Trier et limiter : `orderBy`, `limit`, `first`, `latest`

<!--
Transition : en S3 on lisait tout, tout le temps. Un vrai catalogue filtre —
aujourd'hui on apprend la grammaire des requêtes, puis on la branche sur l'URL.
Tag Campus Quest de fin de chapitre : s4-ch1-filtrer-trier.
Moment léger : « la base est un serveur, pas un свидom » — non, gardons sobre.
Découpage : ≈ 12 min de slides (≈ 8 slides), démo flash ≈ 3 min — moments : Tinker
`where` / `whereIn` / `whereBetween` / `like`, `orderByDesc` + `limit`, `toSql()` ;
micro-pratique ≈ 18 min (slide « À vous », étape A1 du README — jeu à la une + 6 meilleures notes).
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="DB::table('quests')->find(1) et Quest::find(1) renvoient…"
  :options="[
    'Exactement la même chose : deux syntaxes pour une seule porte',
    'Un stdClass d\'un côté, un modèle Quest de l\'autre',
    'Une erreur dans les deux cas : find() n\'existe pas',
    'Une collection dans les deux cas, jamais un objet seul'
  ]"
  :answer="1"
/>

<!--
Pré-test : la majorité répond « la même chose » — les deux chaînes produisent le même SQL,
mais ce qui revient diffère (données brutes vs modèle). La slide suivante tranche.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Deux portes, même SQL
Ce qui change : **ce qui revient**

::left::

```php
// Porte 1 — le Query Builder
DB::table('quests')->where('xp', '>=', 100)->get();
// → Collection de stdClass :
//   boîtes de données brutes, rien de plus

// Porte 2 — Eloquent
Quest::where('xp', '>=', 100)->get();
// → Collection de modèles Quest :
//   casts, relations, save(), $fillable
```

::right::

- `where`, `orderBy`, `limit`, `get`, `first`, `find`, `pluck`… **même chaîne des deux côtés** — le SQL produit est identique
- `DB::table()` parle d'une **table**, `Quest::` d'un **modèle** : la différence est dans l'objet qui revient, pas dans la requête

<v-click>

<KeyPoint variant="rule" title="Règle d'or" icon="📏">

Eloquent **par défaut**. Le Query Builder quand on veut juste des données brutes, vite, sans modèle.

</KeyPoint>

</v-click>

<!--
Le détail des deux portes (comparaisons, quand choisir, facture) est en annexe — 08-annexe-query-builder.md.
Ici, une seule idée à retenir : même SQL, enveloppe différente — stdClass vs modèle.
-->

---
transition: slide-up | slide-down
---

# `where` et ses variantes

| Écrire | Clause SQL produite |
|---|---|
| `where('xp', 50)` | `xp = 50` — le `=` est implicite |
| `where('xp', '>=', 100)` | `xp >= 100` — l'opérateur au milieu |
| `orWhere('difficulty', 'easy')` | `OR difficulty = 'easy'` |
| `whereIn('difficulty', ['easy', 'medium'])` | `difficulty IN ('easy', 'medium')` |
| `whereBetween('xp', [50, 100])` | `xp BETWEEN 50 AND 100` |
| `whereNull('description')` | `description IS NULL` |

<v-click>

Chaque `where` s'**empile** : deux `where` d'affilée = un `AND` — c'est ce qui rendra les filtres combinables au catalogue.

</v-click>

<!--
Piège orWhere : enchaîné après un where, il crée un OR global — montrer où les parenthèses tombent si on en discute, sans y insister.
whereNull/whereNotNull : pour les colonnes optionnelles — la description d'une quête peut être vide.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Chercher dans le texte : `like`

::left::

```php
$q = $request->query('q');   // "quiz"

Quest::where('title', 'like', "%{$q}%")
    ->get();
```

- `%` = **joker** : « n'importe quoi, 0 caractère ou plus »
- `"%{$q}%"` = contient le mot, où qu'il soit dans le titre
- `%{$q}` = commence par · `{$q}%` = finit par

::right::

<v-click>

La <KeyTerm>query string</KeyTerm> `?q=quiz` arrive dans `$request->query('q')` — `null` si le paramètre est absent.

</v-click>

<div v-click="2">

```php
// /quests?q=quiz
// → where `title` like '%quiz%'
```

</div>

<!--
like = recherche "contient" — suffisant pour un catalogue, pas un moteur de recherche.
$request->query() est détaillé au chapitre 02 (filtres optionnels) — ici on l'utilise déjà pour le like.
-->

---
transition: slide-up | slide-down
---

# La valeur passe, mais **liée** — jamais collée

<Compare badLabel="❌ SQL brut concaténé" goodLabel="✅ Binding automatique">
  <template #bad>

```php
$q = $request->query('q');
DB::select(
    "SELECT * FROM quests
     WHERE title LIKE '%$q%'"
);
// q = ' OR '1'='1 → la requête
// est détournée : injection SQL
```

  </template>
  <template #good>

```php
Quest::where('title', 'like', "%{$q}%")
    ->get();
// → WHERE title LIKE ? 
// avec [ "%{$q}%" ] lié à part :
// la valeur ne devient JAMAIS
// du SQL exécutable
```

  </template>
</Compare>

<!--
Le ? du SQL est la protection : les bindings sont la parade à l'injection — la faille n°1 des bases.
Même combat que {{ }} vs {!! !!} en Blade : échapper par défaut, concaténer jamais.
-->

---
transition: slide-up | slide-down
---

# Lire le SQL : `toSql()` et `dd()`

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

<!--
Le « ? » prend tout son sens avec la slide précédente : les bindings sont la protection.
dd() = dump + die : la page s'arrête net — parfait pour inspecter, à retirer ensuite.
C'est l'outil de la démo flash du chapitre : on regarde le SQL réellement produit.
-->

---
transition: slide-up | slide-down
---

# Trier et limiter

```php
Quest::orderBy('xp')->get();               // du plus petit au plus grand
Quest::orderByDesc('xp')->limit(5)->get(); // le top 5
Quest::latest()->first();                  // la plus récente (created_at)
Quest::oldest()->first();                  // la plus ancienne
```

<v-click>

- `orderBy('colonne', 'asc|desc')` — `orderByDesc` = raccourci
- `latest()` = `orderByDesc('created_at')` · `oldest()` = l'inverse
- `limit(n)` = `LIMIT n` — « prends les n premiers » **après** le tri
- `first()` = le premier résultat, `null` si la table est vide

</v-click>

<!--
orderByDesc('xp') : tri choisi pour le catalogue Campus Quest — les quêtes les plus généreuses d'abord.
latest() trie sur created_at : les 30 quêtes seedées partagent le même timestamp — d'où xp pour un tri stable.
limit n'est PAS de la pagination : il coupe la liste, sans liens ni numéro de page (chapitre 06).
-->

---
layout: center
transition: slide-up | slide-down
---

# Ce que le catalogue saura faire

<Steps
  :items="[
    { title: 'where / like', desc: 'filtrer et chercher dans le titre', icon: '🎯' },
    { title: 'bindings', desc: 'la valeur liée, jamais du SQL collé', icon: '🔒' },
    { title: 'orderBy / limit', desc: 'trier puis prendre les n premiers', icon: '📉' },
    { title: 'toSql / dd', desc: 'lire le SQL réellement produit', icon: '🔍' }
  ]"
/>

<!--
Cartographie rapide avant la micro-pratique : le SQL se lit, se filtre, se trie, se mesure.
Demain : on branche tout ça sur l'URL — Request::query et les filtres optionnels (chapitre 02).
-->

---
transition: slide-up | slide-down
---

# Panorama : les requêtes Eloquent

<script setup>
import queries from '/references/queries'
</script>

<Panorama :items="queries" doc="https://laravel.com/docs/12.x/queries" at="s4-ch1" />

<!--
Survol de 30 s : les badges « vu » montrent ce que la séance a déjà employé — where, like,
orderBy, limit, toSql. Le reste (select, exists…) est là pour la suite, pas à détailler.
-->

---
transition: slide-up | slide-down
---

# À vous : la une et le podium

<Exercise title="WishFlix — requêtes du catalogue" duration="18 min" level="guidé"
  :criteria="[
    'Un jeu « à la une » s\'affiche en haut de l\'accueil quand un jeu est featured',
    'Une section « Mieux notés » liste les 6 jeux au plus haut rating',
    'Aucun encart vide ni erreur quand aucun jeu n\'est featured'
  ]"
  :hints="[
    'Game::where(\'featured\', true)->first() renvoie null si personne n\'est à la une — protégez l\'affichage par @if',
    'Les 6 meilleures notes : orderByDesc(\'rating\') puis limit(6)',
    'rating est un decimal(3,1) : le tri décroissant suffit, pas de conversion'
  ]">

**Exercice** `04-requetes` — étape **A1** du README.

Deux requêtes de plus dans `GameController::index`, deux sections de plus dans la vue d'accueil.

**Spécificités WishFlix** : votre catalogue a déjà `featured` et `rating` en base (modèle de la S3) — aucune migration à jouer. `first()` peut renvoyer `null` : la vue doit tester avant d'afficher.

</Exercise>

<!--
Point de contrôle 1 dans le README après A2 (filtre catégorie) — les deux chapitres 1-2 forment le premier bloc.
Palier de rattrapage : tags Campus Quest s4-ch1-filtrer-trier et s4-ch2-filtres-optionnels.
-->
