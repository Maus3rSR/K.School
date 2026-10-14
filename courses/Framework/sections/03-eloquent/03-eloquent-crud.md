---
layout: chapter
transition: slide-left | slide-right
number: 03
duration: 20 min
---

# Lire et écrire avec Eloquent

- Autoriser l'assignation de masse avec `$fillable`
- Lire, créer, modifier et supprimer avec le modèle
- Remplacer le tableau PHP du contrôleur par la base

<!--
Transition : les tables existent, le modèle est créé — maintenant on lit et on écrit vraiment des données.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Lire et écrire avec Eloquent
Le modèle Quest

::left::

```php {all|7-10|12-17|all}
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quest extends Model
{
    protected $fillable = [
        'title', 'description', 'xp',
        'difficulty', 'featured', 'category_id',
    ];

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
        ];
    }
}
```

::right::

<div v-click="1">

`$fillable` — la **liste blanche** des colonnes qu'on peut remplir d'un coup avec `Quest::create([...])` : c'est l'assignation de masse.

</div>

<div v-click="2">

`casts()` — convertit à la volée : `featured` est un `0/1` en base, un **vrai booléen** côté PHP (`$quest->featured === true`).

</div>

<div v-click="3">

<Alert type="warning">

`create()` avec une colonne absente de `$fillable` lève `MassAssignmentException` — une protection contre les formulaires détournés.

</Alert>

</div>

<!--
La faille classique : un formulaire qui envoie is_admin=true à un update() sans filtrage — $fillable bloque ça.
La méthode casts() (syntaxe Laravel 11+) remplace l'ancienne propriété $casts — même idée.
-->

---
transition: slide-up | slide-down
---

# Lire et écrire avec Eloquent
Les opérations de base

| Code | Effet |
|---|---|
| `Quest::all()` | Toutes les lignes → une **Collection** d'objets `Quest` |
| `Quest::find(3)` | La ligne `id = 3` → un `Quest` ou `null` |
| `Quest::findOrFail(3)` | La ligne `id = 3` → un `Quest` ou une **404 automatique** |
| `Quest::create([...])` | `INSERT` → renvoie le `Quest` créé |
| `$quest->update(['xp' => 80])` | `UPDATE` de la ligne |
| `$quest->delete()` | `DELETE` de la ligne |

Chaque méthode **génère et exécute le SQL** correspondant — vous ne voyez jamais la requête.

<!--
Une Collection se boucle comme un tableau (@foreach, ->count(), ->first()) — c'est le type renvoyé par all().
find() renvoie null si absent : à vous de gérer ; findOrFail() renvoie la 404 directement.
On se limite aujourd'hui aux opérations simples : where(), orderBy(), paginate() arrivent en S4.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Lire et écrire avec Eloquent
Du tableau PHP à la base

::left::

````md magic-move
```php
class QuestController extends Controller
{
    private array $quests = [
        1 => ['title' => 'Salle 404', /* … */],
        // …
    ];

    public function index()
    {
        return view('quests.index',
            ['quests' => $this->quests]);
    }

    public function show(int $id)
    {
        abort_unless(isset($this->quests[$id]), 404);
        return view('quests.show',
            ['quest' => $this->quests[$id]]);
    }
}
```

```php
class QuestController extends Controller
{
    public function index()
    {
        return view('quests.index',
            ['quests' => Quest::all()]);
    }

    public function show(int $id)
    {
        return view('quests.show',
            ['quest' => Quest::findOrFail($id)]);
    }
}
```
````

::right::

Le contrôleur de la S2, **branché sur la base**.

<div v-click="1">

- `Quest::all()` remplace le tableau — la vue reçoit une **Collection**, qui se boucle pareil
- `findOrFail($id)` remplace `abort_unless` — une exception code 404 est levée dans le controlleur quand la quête n'existe pas

</div>

::footer::

`findOrFail` 

<!--
Compter les lignes : le contrôleur fond de moitié, et les données deviennent modifiables sans déployer.
N'oubliez pas l'import : use App\Models\Quest; en tête du contrôleur.
-->

---
transition: slide-up | slide-down
---

# Lire et écrire avec Eloquent
Tinker : on joue avec les données

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan tinker' },
    { cmd: 'Quest::create([\'title\' => \'Salle 404\', \'xp\' => 50, \'difficulty\' => \'easy\'])', out: '   = App\\Models\\Quest {#1234\n       title: &quot;Salle 404&quot;,\n       xp: 50,\n       …\n     }' },
    { cmd: 'Quest::find(1)->title', out: '   = &quot;Salle 404&quot;' },
    { cmd: 'Quest::count()', out: '   = 1' }
  ]"
/>

La base est **réellement modifiée** : rechargez `/quests`, la quête créée dans Tinker apparaît.

<!--
Montrer aussi l'échec : Quest::create(['nope' => 1]) → MassAssignmentException, la liste blanche protège.
Faire le lien : Tinker est le terrain de jeu, mais les données qui doivent exister pour tous iront dans les seeders (chapitre 8).
-->
