---
layout: chapter
transition: slide-left | slide-right
number: 02
duration: 25 min
---

# Filtrer et trier

- Filtrer avec `where` et ses variantes
- Chercher dans le texte avec `like` — sans casser la sécurité
- Combiner des filtres optionnels avec `when()`

<!--
Transition : jusqu'ici on lisait tout, tout le temps. Un vrai catalogue filtre —
c'est le fil du jour : recherche par titre + filtre par catégorie, côté SQL.
-->

---
transition: slide-up | slide-down
---

# Filtrer et trier
`where` et ses variantes

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

# Filtrer et trier
Chercher dans le texte : `like`

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
like = recherche "contient" — suffisant pour un catalogue, pas un moteur de recherche (accent, casse selon la collation MariaDB : like est insensible à la casse en utf8mb4_general_ci — le dire si la question vient).
-->

---
transition: slide-up | slide-down
---

# Filtrer et trier
La valeur passe, mais **liée** — jamais collée

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
Le ? de toSql() vu au chapitre 1 prend tout son sens : les bindings sont la protection.
Concaténer une entrée utilisateur dans une chaîne SQL = la porte ouverte à l'injection — la faille n°1 des bases de données.
Même combat que {{ }} vs {!! !!} en Blade : échapper par défaut, concaténer jamais.
-->

---
transition: slide-up | slide-down
---

# Filtrer et trier
Trier et limiter

```php
Quest::orderBy('xp')->get();            // du plus petit au plus grand
Quest::orderByDesc('xp')->limit(5)->get();  // le top 5
Quest::latest()->first();               // la plus récente (created_at)
```

<v-click>

- `orderBy('colonne', 'asc|desc')` — `orderByDesc` = raccourci
- `latest()` = `orderByDesc('created_at')` · `oldest()` = l'inverse
- `limit(n)` = `LIMIT n` — « prends les n premiers » **après** le tri

</v-click>

<!--
orderByDesc('xp') : c'est le tri choisi pour le catalogue Campus Quest — les quêtes les plus généreuses d'abord.
latest() trie sur created_at : les 30 quêtes seedées partagent le même timestamp — d'où le choix d'xp pour un tri stable.
limit n'est PAS de la pagination : il coupe la liste, sans liens ni numéro de page (chapitre 6).
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Filtrer et trier
`when()` : le filtre **optionnel**

::left::

````md magic-move
```php {3-5}
public function index(Request $request)
{
    $quests = Quest::query()
        ->orderByDesc('xp')
        ->get();

    return view('quests.index',
        ['quests' => $quests]);
}
```

```php {4-8}
public function index(Request $request)
{
    $quests = Quest::query()
        ->when(
            $request->query('q'),
            fn ($query, $q) =>
                $query->where('title', 'like', "%{$q}%")
        )
        ->orderByDesc('xp')
        ->get();

    return view('quests.index',
        ['quests' => $quests]);
}
```

```php {9-13}
public function index(Request $request)
{
    $quests = Quest::query()
        ->when(
            $request->query('q'),
            fn ($query, $q) =>
                $query->where('title', 'like', "%{$q}%")
        )
        ->when(
            $request->query('category'),
            fn ($query, $categoryId) =>
                $query->where('category_id', $categoryId)
        )
        ->orderByDesc('xp')
        ->get();

    return view('quests.index',
        ['quests' => $quests]);
}
```
````

::right::

Le catalogue, avant les filtres : toutes les quêtes, triées par XP.

<div v-click="1">

**Recherche** — `when($q, …)` n'exécute le `where` **que si `?q=` est présent** ; sinon la chaîne continue comme si de rien n'était.

</div>

<div v-click="2">

**Filtre catégorie** — un `when()` par filtre optionnel : `?q=quiz&category=2` cumule les deux, `?category=2` filtre sans chercher.

</div>

<!--
when() évite la cascade de if : la requête reste une seule chaîne lisible.
Le callback reçoit (la requête, la valeur) — la signature fn ($query, $q) mérite 10 secondes d'explication.
Dans la vue : request('q') re-remplit le champ, @selected re-sélectionne la catégorie — le formulaire « se souvient ».
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Filtrer et trier
`whereHas` : filtrer **par une relation**

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
La confusion with/whereHas est LE point dur du chapitre : insister sur les deux verbes — charger vs filtrer.
Cas d'usage Campus Quest : quêtes d'un lieu précis, ou quêtes qui ont AU MOINS un lieu (whereHas sans callback).
-->

---
transition: slide-up | slide-down
---

# Filtrer et trier
Ce que le catalogue sait faire maintenant

<Steps
  :items="[
    { title: '?q=…', desc: 'where like — recherche par titre', icon: '🔍' },
    { title: '?category=…', desc: 'where category_id — filtre', icon: '🏷️' },
    { title: 'when()', desc: 'chaque filtre n\'existe que si son paramètre arrive', icon: '🎛️' },
    { title: 'orderByDesc', desc: 'les plus grosses XP d\'abord', icon: '📉' }
  ]"
/>

<!--
Pas un récap verbatim : c'est la cartographie URL → clause SQL, le fil rouge du chapitre.
Reste un problème silencieux : chaque carte affiche category->name — direction le chapitre 3.
-->
