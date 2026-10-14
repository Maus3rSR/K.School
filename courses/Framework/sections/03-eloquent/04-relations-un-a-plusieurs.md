---
layout: chapter
transition: slide-left | slide-right
number: 04
duration: 15 min
---

# Relations un-à-plusieurs

- Déclarer `belongsTo` et `hasMany` dans les modèles
- Naviguer entre objets reliés, par propriété ou par méthode
- Interroger les liens en direct avec Tinker

<!--
Transition : quests.category_id existe en base, mais PHP ne le sait pas encore — il faut déclarer le lien.
-->

---
transition: slide-up | slide-down
---

# Relations un-à-plusieurs
Et vous, où la mettriez-vous ?

<Quiz
  question="Une catégorie contient plusieurs quêtes ; chaque quête a une seule catégorie. Dans quelle table place-t-on la clé étrangère ?"
  :options="[
    'Dans categories : une colonne quest_id',
    'Dans quests : une colonne category_id',
    'Dans une troisième table category_quest',
    'Dans les deux tables, pour être sûr'
  ]"
  :answer="1"
/>

<!--
Pré-test : faites voter la salle à main levée avant de révéler.
L'intuition fausse classique : « la catégorie contient les quêtes, donc elle devrait les lister » —
mais une colonne ne stocke qu'UNE valeur : la FK vit toujours du côté « plusieurs ».
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Relations un-à-plusieurs
Déclarer la relation dans les modèles

::left::

```php {none|4-7|13-16|all}
// app/Models/Quest.php
class Quest extends Model
{
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}

// app/Models/Category.php
class Category extends Model
{
    public function quests(): HasMany
    {
        return $this->hasMany(Quest::class);
    }
}
```

::right::

<div v-click="1">

`Quest::category()` → `belongsTo` — une quête **appartient à** une catégorie : c'est `quests` qui porte la colonne `category_id` (vous aviez deviné ?).

</div>

<div v-click="2">

`Category::quests()` → `hasMany` — une catégorie **possède** plusieurs quêtes : elle les retrouve par leur `category_id`.

</div>

<div v-click="3">

La relation se déclare **des deux côtés**, comme les deux bouts d'une corde. Eloquent devine la clé étrangère `category_id` d'après le nom du modèle.

</div>

<!--
En tête de chaque fichier : use Illuminate\Database\Eloquent\Relations\BelongsTo; / HasMany;
Logique du nommage : category() au singulier (un objet), quests() au pluriel (une collection) — Eloquent s'en sert pour deviner la FK.
-->

---
transition: slide-up | slide-down
---

# Relations un-à-plusieurs
Propriété magique ou méthode ?

| Écriture | Ce que ça renvoie | Requête exécutée ? | À utiliser pour |
|---|---|---|---|
| `$quest->category` | Le **modèle** `Category` | Oui, au premier accès | Lire l'objet lié : `->name`… |
| `$category->quests` | Une **Collection** de `Quest` | Oui, au premier accès | Boucler sur les données |
| `$category->quests()` | La **relation** (constructeur de requête) | Non — rien n'est lancé | Chaîner : `->count()`, `->create([...])` |

<v-click>

« Magique » = `$quest` n'a **pas** de propriété `category` : Laravel intercepte l'accès (`__get`) et appelle la méthode de relation pour vous — puis mémorise le résultat.

</v-click>

<v-click>

<KeyPoint variant="tip" title="Règle de pouce" icon="🪄">

**Propriété** pour lire les données, **méthode** pour affiner ou compter.

</KeyPoint>

</v-click>

<!--
`->count()` sur la méthode = COUNT(*) en SQL ; `->count()` sur la Collection = comptage en PHP.
Même résultat, pas la même requête — le distinguo prépare le chapitre suivant sur le N+1.
-->

---
transition: slide-up | slide-down
---

# Relations un-à-plusieurs
Tinker : suivre les liens en direct

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan tinker' },
    { cmd: '$quest = Quest::first()', out: '   = App\\Models\\Quest {#1234\n       title: &quot;Salle 404&quot;,\n       category_id: 2,\n       …\n     }' },
    { cmd: '$quest->category->name', out: '   = &quot;Mission&quot;' },
    { cmd: 'Category::find(2)->quests->count()', out: '   = 8' }
  ]"
/>

Une fois la relation déclarée, naviguer entre les objets coûte **une ligne de PHP** — la jointure SQL est invisible.

<!--
Si la base est vide : créer une catégorie et une quête en direct dans Tinker, ou anticiper les seeders du chapitre 8.
Montrer aussi $quest->category (sans ->name) : Eloquent renvoie l'objet Category complet.
Question probable : "combien de requêtes pour une liste de quêtes ?" → excellente accroche, c'est le chapitre 5.
-->
