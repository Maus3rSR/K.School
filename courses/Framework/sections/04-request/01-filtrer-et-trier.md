---
layout: chapter
transition: slide-left | slide-right
number: 01
duration: 28 min
---

# Filtrer et trier

- Filtrer avec `where` et ses variantes
- Chercher dans le texte avec `like` — valeur liée, jamais concaténée
- Trier et limiter : `orderBy`, `limit`, `first`

<!--
Transition : en S3 on lisait tout, tout le temps. Un vrai catalogue filtre —
aujourd'hui on apprend la grammaire des requêtes, puis on la branche sur l'URL.
Tag Campus Quest de fin de chapitre : s4-ch1-filtrer-trier.
Moment léger : le `dd()` oublié — la page s'arrête net, écran noir de dump : « dump and die, et c'est la page qui meurt ».
Découpage : ≈ 8 min de slides (≈ 6 slides), démo flash ≈ 3 min — moments : Tinker
`where` / `whereIn` / `like`, `orderByDesc` + `limit` + `first`, `->dd()` ;
micro-pratique ≈ 17 min (slide « À vous », étape A1 du README — jeu à la une + 6 meilleures notes).
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="Aucune quête n'est à la une. Que renvoie cette requête ?"
  :options="[
    '`null` : aucune ligne, aucun objet',
    'Une collection vide',
    'Une exception `ModelNotFoundException`',
    'La première quête de la table, featured ou non'
  ]"
  :answer="0"
>

```php
Quest::where('featured', true)->first();
```

</Quiz>

<!--
Pré-test : first() renvoie null quand rien ne matche — ça prépare l'étape A1,
où la vue doit tester null avant d'afficher le jeu « à la une ».
Piège classique : first() ≠ firstOrFail() — aucune exception n'est levée.
-->

---
transition: slide-up | slide-down
---

# `where` et ses variantes

| Écrire | Clause SQL produite |
|---|---|
| `where('xp', 50)` | `xp = 50` — le `=` est implicite |
| `where('xp', '>=', 100)` | `xp >= 100` — l'opérateur au milieu |
| `whereIn('difficulty', ['easy', 'medium'])` | `difficulty IN ('easy', 'medium')` |

`orWhere`, `whereNull`, `whereBetween`… : même mécanique — voir le Panorama en fin de chapitre.

<v-click>

Chaque `where` s'**empile** : deux `where` d'affilée = un `AND` — c'est ce qui rendra les filtres combinables au catalogue.

</v-click>

<!--
Piège orWhere à connaître pour qui demande : enchaîné après un where, il crée un OR global —
montrer où les parenthèses tombent, sans y insister.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Chercher dans le texte : `like`

::left::

```php
$search = 'quiz';   // d'où vient-il ? de l'URL — chapitre 02

Quest::where('title', 'like', "%{$search}%")
    ->get();
```

- `%` = **joker** : « n'importe quoi, 0 caractère ou plus »
- `"%{$search}%"` = contient le mot, où qu'il soit dans le titre
- `%{$search}` = commence par · `{$search}%` = finit par

::right::

<v-click>

```php
// → select * from quests where title like ?
//   bindings : ['%quiz%']
```

</v-click>

<!--
like = recherche "contient" — suffisant pour un catalogue, pas un moteur de recherche.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Voir la requête : `dd()`

::left::

<Terminal
  title="tinker" prompt=">"
  :lines="[
    { lang: 'php', cmd: 'Quest::where(\'xp\', \'>=\', 100)->orderByDesc(\'xp\')->dd()', out: '   &quot;select * from quests where xp >= ? order by xp desc&quot;\n   [100]' }
  ]"
/>

::right::

<v-click>

- `dd()` = **dump and die** : affiche puis arrête tout — à retirer ensuite
- Les `?` sont les <KeyTerm>bindings</KeyTerm> : la valeur voyage **à part** du SQL — c'est ce qui protège de l'injection SQL (démontrée en S6)
- `dd()` marche sur n'importe quelle variable : `dd($request->query())` vous servira dès le chapitre 02

</v-click>

<!--
dd() = dump + die : la page s'arrête net — parfait pour inspecter, à retirer ensuite.
toSql() existe aussi, mais il donne le SQL sans les valeurs — dd() suffit pour tout voir.
C'est l'outil de la démo flash du chapitre : on regarde le SQL réellement produit.
-->

---
transition: slide-up | slide-down
---

# Trier et limiter

```php
Quest::orderBy('xp')->get();               // du plus petit au plus grand
Quest::orderByDesc('xp')->limit(5)->get(); // le top 5
Quest::orderByDesc('xp')->first();         // la quête la plus généreuse
```

<v-click>

- `orderBy('colonne', 'asc|desc')` — `orderByDesc` = raccourci
- `limit(n)` = `LIMIT n` — « prends les n premiers » **après** le tri
- `first()` = le premier résultat, `null` si aucun

</v-click>

<!--
orderByDesc('xp') : tri choisi pour le catalogue Campus Quest — les quêtes les plus généreuses d'abord.
limit n'est PAS de la pagination : il coupe la liste, sans liens ni numéro de page (chapitre 06).
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Une chaîne, une requête

::left::

```php {all|2|3|4|5|6|all}
Quest::query()
    ->where('xp', '>=', 100)                    // WHERE xp >= ?
    ->whereIn('difficulty', ['easy', 'medium']) // AND difficulty IN (?, ?)
    ->where('title', 'like', '%quiz%')          // AND title LIKE ?
    ->orderByDesc('xp')                         // ORDER BY xp DESC
    ->limit(5)                                  // LIMIT 5
    ->get();
```

::right::

<div v-click="1">

Chaque `where` ajoute un `AND` — le filtre se lit tel quel.

</div>

<div v-click="2">

Un second filtre s'**empile** : `IN` prend la liste d'un coup.

</div>

<div v-click="3">

`like` = contient — la valeur reste **liée**, jamais collée au SQL.

</div>

<div v-click="4">

Le tri : `ORDER BY` sur la colonne choisie.

</div>

<div v-click="5">

`limit` coupe **après** le tri — les n premiers seulement.

</div>

<div v-click="6">

`get()` **exécute** : rien ne part en base avant cette ligne.

</div>

<!--
Synthèse du chapitre : la chaîne se lit comme la requête SQL qu'elle produit — chaque méthode = une clause.
Juste après : on branche tout ça sur l'URL — Request::query et les filtres optionnels (chapitre 02).
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
orderBy, limit, dd. Le reste (select, exists…) est là pour la suite, pas à détailler.
-->

---
transition: slide-up | slide-down
---

# À vous : la une et le podium

<Exercise title="WishFlix — requêtes du catalogue" duration="17 min" level="guidé"
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
