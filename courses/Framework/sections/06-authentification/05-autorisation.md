---
layout: chapter
transition: slide-left | slide-right
number: 05
duration: 32 min
---

# L'autorisation

- Ajouter un rôle « Maître du jeu » aux utilisateurs
- Déclarer une Gate et la vérifier dans les routes, les vues et les Form Requests
- Découvrir les policies (aperçu)

<!--
Transition : connecté, le joueur démo arrive sur le formulaire de création. L'authentification dit QUI il est ; il manque la règle « qui a le DROIT ».
Découpage : ≈ 14 min de slides (≈ 10 slides), démo flash ≈ 3 min — moments : joueur → 403 sur /quests/create ; boutons Modifier/Supprimer absents pour le joueur, présents pour le Maître du jeu ; micro-pratique ≈ 15 min (slide « À vous », étape A5 + point de contrôle 2).
Moment léger : « 403, c'est le videur poli : il sait très bien qui vous êtes, il ne vous laisse juste pas monter à l'étage. »
Tag Campus Quest de fin de chapitre : s6-ch5-autorisation.
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="Campus Quest doit savoir que mj@campus-quest.test est Maître du jeu et que joueur@campus-quest.test ne l'est pas. Où ranger cette information ?"
  :options="[
    'Dans la session, au moment de la connexion',
    'Dans une colonne de la table users',
    'Dans le fichier .env, avec la liste des emails autorisés',
    'Dans un champ caché du formulaire de connexion'
  ]"
  :answer="1"
/>

<!--
Faites voter, puis démontez chaque réponse :
- Session : il faut bien la remplir à partir de quelque chose… et elle disparaît à la déconnexion.
- .env : ça marche pour un admin unique, mais changer un rôle demande de redéployer le site.
- Champ caché : l'utilisateur le modifie dans les DevTools (vous l'avez fait en S5 avec category_id).
- La colonne : une donnée de l'utilisateur, en base, modifiable sans toucher au code. Slide suivante.
-->

---
layout: two-cols-bottom
class: '!grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-6'
transition: slide-up | slide-down
---

# Une colonne `is_admin`

::left::

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan make:migration add_is_admin_to_users_table' }
  ]"
/>

```php {all|1,3|2|all}
Schema::table('users', function (Blueprint $table) {
    $table->boolean('is_admin')->default(false);
});
```

::right::

<div v-click="1">

`Schema::table()` **modifie** une table existante (annexe de la S3) : on ne touche jamais à la migration `create_users_table` déjà jouée.

</div>

<div v-click="2">

Un booléen, **faux par défaut** : tout nouveau compte est un simple joueur.

</div>

::bottom::

<div v-click="3">

Retenez : nouvelle colonne = **nouvelle migration**. Le `down()` fait l'inverse : `$table->dropColumn('is_admin')`.

</div>

<!--
Le nom add_is_admin_to_users_table permet à Artisan de pré-remplir Schema::table('users', …) dans le fichier généré.
Démo : sail artisan migrate → la colonne existe, tous les comptes à 0.
-->

---
layout: two-cols-bottom
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le Maître du jeu

::left::

```php {4}
// app/Models/User.php — casts()
'email_verified_at' => 'datetime',
'password' => 'hashed',
'is_admin' => 'boolean',
```

```php {6}
// database/seeders/UserSeeder.php
User::factory()->create([
    'name' => 'Maître du jeu',
    'email' => 'mj@campus-quest.test',
    'password' => 'mj1234',
    'is_admin' => true,
]);
```

::right::

Le cast `boolean` : `$user->is_admin` vaut `true` ou `false`, pas `1` ou `0`.

<v-click>

Le seeder crée le Maître du jeu **en plus** du joueur démo.

</v-click>

::bottom::

<v-click>

`is_admin` n'est **pas** dans `$fillable` : un formulaire d'inscription qui enverrait `is_admin=1` serait ignoré par `create()`. Seul votre code décide qui est Maître du jeu.

</v-click>

<!--
La factory, elle, passe outre $fillable : elle sert aux seeders et aux tests, pas aux formulaires.
Démo : sail artisan migrate:fresh --seed → deux comptes.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# La Gate `admin`
`app/Providers/AppServiceProvider.php`

::left::

```php {all|5|6|all}
public function boot(): void
{
    Model::preventLazyLoading(! app()->isProduction());

    Gate::define('admin', function (User $user) {
        return $user->is_admin;
    });
}
```

::right::

<div v-click="1">

`Gate::define()` donne un **nom** à une règle : `admin`. Laravel passe l'utilisateur connecté à la fonction.

</div>

<div v-click="2">

La fonction répond `true` (autorisé) ou `false` (refusé).

</div>

<div v-click="3">

<Definition term="Gate">

Une règle d'autorisation **nommée**, déclarée une fois, vérifiée partout par son nom.

</Definition>

</div>

<!--
boot() s'exécute au démarrage de chaque requête : la Gate est connue avant le premier contrôleur.
Imports en tête du fichier : use App\Models\User; use Illuminate\Support\Facades\Gate;
Un invité n'est jamais passé à la fonction : une Gate refuse d'office quand personne n'est connecté.
-->

---
transition: slide-up | slide-down
---

# Une règle, trois vérifications

| **Où** | **Code** | **Si refusé** |
|---|---|---|
| **Route** | `Route::middleware(['auth', 'can:admin'])` | Erreur **403** |
| **Vue Blade** | `@can('admin')` … `@endcan` | Le bouton n'est pas affiché |
| **Form Request** | `return $this->user()->can('admin');` | Erreur **403** |

<v-click>

<KeyPoint variant="warning" title="Masquer n'est pas protéger" icon="⚠️">

`@can` rend la page **lisible** ; seuls la route et la Form Request **bloquent** la requête. Les trois utilisent le **même nom** de Gate.

</KeyPoint>

</v-click>

<!--
can:admin est un middleware fourni par Laravel (Authorize) : il appelle la Gate admin.
403 Forbidden = « je sais qui vous êtes, c'est non ». À comparer avec le 302 vers /login du chapitre 04 (« je ne sais pas qui vous êtes »).
-->

---
layout: two-cols-bottom
class: '!grid-cols-[minmax(0,13fr)_minmax(0,7fr)] gap-x-6'
transition: slide-up | slide-down
---

# Réserver le back-office

::left::

```php {all|1|2-4}
Route::middleware(['auth', 'can:admin'])->group(function () {
    Route::resource('quests', QuestController::class)
        ->except(['index', 'show'])
        ->where(['quest' => '[0-9]+']);
});
```

<div v-click="3">

```php {4}
// StoreQuestRequest et UpdateQuestRequest (S5)
public function authorize(): bool
{
    return $this->user()->can('admin');
}
```

</div>

::right::

<div v-click="1">

Le groupe du chapitre 04 reçoit un **second** middleware : `auth` d'abord, puis `can:admin`.

</div>

<div v-click="2">

Les cinq routes d'écriture sont maintenant réservées au Maître du jeu.

</div>

::bottom::

<div v-click="3">

En S5, `authorize()` renvoyait `true` en attendant cette séance : la Form Request vérifie à son tour la Gate — une **seconde serrure** si la route est un jour mal protégée.

</div>

<!--
Démo : connecté en joueur, /quests/create → 403 « This action is unauthorized ». Connecté en Maître du jeu → le formulaire.
L'ordre compte : auth avant can:admin — un invité est envoyé vers /login (302) au lieu de recevoir un 403.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Masquer les boutons
`resources/views/quests/show.blade.php`

::left::

```blade {all|3,11|4|6-10}
<a href="{{ route('quests.index') }}">← Retour aux quêtes</a>

@can('admin')
    <a href="{{ route('quests.edit', $quest) }}">✏️ Modifier</a>

    <form method="POST" action="{{ route('quests.destroy', $quest) }}">
        @csrf
        @method('DELETE')
        <button type="submit" class="danger">Supprimer</button>
    </form>
@endcan
```

::right::

<div v-click="1">

`@can('admin')` … `@endcan` : le bloc n'est rendu que si la Gate répond `true`.

</div>

<div v-click="2">

Le joueur ne voit plus « Modifier »…

</div>

<div v-click="3">

… ni « Supprimer ». Même traitement pour « Nouvelle quête » dans la barre et dans la liste.

</div>

<!--
Démo : la même fiche ouverte côte à côte, joueur (fenêtre privée) et Maître du jeu.
Rappel de la slide précédente : sans le middleware, un joueur pourrait encore envoyer le DELETE à la main — @can n'est que du confort.
-->

---
layout: two-cols-bottom
class: '!grid-cols-[minmax(0,13fr)_minmax(0,7fr)] gap-x-6'
transition: slide-up | slide-down
---

# Aperçu : les policies

::left::

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan make:policy QuestPolicy --model=Quest' }
  ]"
/>

```php
// app/Policies/QuestPolicy.php
public function update(User $user, Quest $quest): bool
{
    return $user->is_admin
        || $quest->author_id === $user->id;
}
```

::right::

<Definition term="Policy">

Une classe qui regroupe les règles d'un **modèle** : `viewAny`, `create`, `update`, `delete`…

</Definition>

<v-click>

Utile quand la règle dépend **de la ressource** : ici, une quête aurait un auteur (`author_id`, une colonne qu'on n'a pas). On vérifie alors `@can('update', $quest)`.

</v-click>

::bottom::

<v-click>

Une seule règle sans ressource (« est Maître du jeu ») → une **Gate** suffit. Des règles par modèle → une **Policy**. Pas de pratique aujourd'hui : c'est un bonus de l'exercice.

</v-click>

<!--
Aperçu (la seule notion de la séance montrée sans pratique) : ne pas coder en démo, la Policy reste sur la slide.
Laravel 12 découvre la Policy tout seul : App\Policies\QuestPolicy ↔ App\Models\Quest, aucune déclaration.
Côté route : ->can('update', 'quest') ; côté contrôleur : Gate::authorize('update', $quest).
-->

---
transition: slide-up | slide-down
---

# Panorama : l'autorisation

<script setup>
import authorization from '/references/authorization'
</script>

<Panorama :items="authorization" doc="https://laravel.com/docs/12.x/authorization" at="s6-ch5" />

<!--
Survol de 30 s, pas d'explication détaillée : montrer ce qui a été vu (badges « vu ») et où trouver le reste.
Pendant le « À vous », les apprenants peuvent revenir sur cette slide comme aide-mémoire.
-->

---
transition: slide-up | slide-down
---

# À vous : le rôle administrateur

<Exercise title="WishFlix — back-office réservé aux admins" duration="15 min" level="guidé"
  :criteria="[
    'admin@wishflix.com crée, modifie et supprime des jeux',
    'demo@wishflix.com reçoit une 403 sur /games/create',
    'Les boutons « Nouveau jeu », « Modifier » et « Supprimer » n\'apparaissent qu\'à l\'admin'
  ]"
  :hints="[
    'make:migration add_is_admin_to_users_table, puis migrate:fresh --seed',
    'Gate::define(\'admin\', …) dans AppServiceProvider::boot()',
    'Groupe [\'auth\', \'can:admin\'], @can dans les vues, authorize() dans les Form Requests'
  ]">

**Exercice** `06-authentification-securite` — étape **A5** du README, puis **point de contrôle 2**.

Ajoutez un compte admin au seeder et réservez-lui le back-office des jeux.

</Exercise>

<!--
Point de contrôle 2 dans le README (après A5). Palier de rattrapage : tags Campus Quest s6-ch4-middleware et s6-ch5-autorisation.
Les CRUD Category et Platform de la S5 (Partie B) ne sont pas protégés en séance : c'est un bonus de l'exercice.
-->
