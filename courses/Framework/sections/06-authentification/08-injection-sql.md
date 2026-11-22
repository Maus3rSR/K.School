---
layout: chapter
transition: slide-left | slide-right
number: 08
duration: 15 min
---

# L'injection SQL

- Détourner une requête SQL construite par concaténation
- Lier les valeurs avec `?` ou avec Eloquent
- Repérer les méthodes qui exposent au risque

<!--
Transition : la XSS injecte du code dans le HTML. Même idée, autre langage : injecter du SQL dans une requête.
Déplacé de la S4 : en S4 on a utilisé `like` avec une valeur liée sans montrer l'attaque ; la voici.
Découpage : ≈ 6 min de slides (≈ 6 slides), démo flash ≈ 3 min — moments : route temporaire `/debug/recherche` collée depuis LIVECODING.md, `' OR 1=1 -- x` → toutes les quêtes, `UNION` → emails et empreintes, puis `?` → plus rien ; micro-pratique ≈ 6 min (slide « À vous », étape A8 + point de contrôle 4).
Moment léger : citer « Little Bobby Tables » (xkcd 327) — l'élève qui s'appelle Robert'); DROP TABLE Students;--
Tag Campus Quest de fin de chapitre : s6-ch8-injection-sql (même code que s6-ch7 : la route de démonstration est supprimée à la fin).
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="La route lit q dans l'URL et l'insère dans la requête SQL ci-dessous. Vous visitez /debug/recherche?q=' OR 1=1 -- x. Que renvoie la requête ?"
  :options="[
    'Aucune quête : aucun titre ne contient ce texte',
    'Toutes les quêtes : la condition devient toujours vraie',
    'Une erreur SQL : la requête est cassée par l\'apostrophe',
    'Aucune quête : Laravel échappe automatiquement $q'
  ]"
  :answer="1"
>

```php
DB::select("SELECT id, title, xp FROM quests WHERE title LIKE '%$q%'");
```

</Quiz>

<!--
Faites voter, puis écrivez au tableau la requête obtenue en remplaçant $q à la main — c'est la slide suivante.
« Laravel échappe » : vrai pour Eloquent et les ? — faux pour une chaîne PHP que VOUS avez assemblée.
« Erreur SQL » : c'est ce qui arrive avec une apostrophe seule (O'Neil) ; le -- neutralise la fin.
-->

---
layout: two-cols-bottom
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# La requête détournée

```php
// routes/web.php — route temporaire de démonstration
Route::get('/debug/recherche', function (Request $request) {
    $q = $request->query('q', '');

    return DB::select("SELECT id, title, xp FROM quests WHERE title LIKE '%$q%'");
});
```

::left::

<v-click>

```sql
SELECT id, title, xp FROM quests
WHERE title LIKE '%' OR 1=1 -- x%'
```

</v-click>

::right::

<v-click>

L'apostrophe de la saisie **ferme** la chaîne SQL ; `OR 1=1` est toujours vrai ; `--` transforme la fin en **commentaire**.

</v-click>

::bottom::

<v-click>

<Definition term="Injection SQL" translation="(SQL injection)">

Une saisie qui change le **sens** d'une requête SQL, parce qu'elle a été **collée** dans le texte de la requête.

</Definition>

</v-click>

<!--
Imports en tête de web.php : use Illuminate\Http\Request; use Illuminate\Support\Facades\DB;
DB::select exécute du SQL écrit à la main et renvoie un tableau d'objets : Laravel le transforme en JSON dans le navigateur.
Démo : /debug/recherche?q=Salle → 1 résultat ; ?q=' OR 1=1 -- x → les 30 quêtes.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Lire une autre table

::left::

<Terminal
  title="navigateur" prompt="GET"
  :lines="[
    { cmd: '/debug/recherche?q=zzz\' UNION SELECT id, email, password FROM users -- x', out: '[\n  { &quot;id&quot;: 1, &quot;title&quot;: &quot;joueur@campus-quest.test&quot;, &quot;xp&quot;: &quot;$2y$12$Mo…&quot; },\n  { &quot;id&quot;: 2, &quot;title&quot;: &quot;mj@campus-quest.test&quot;, &quot;xp&quot;: &quot;$2y$12$T8…&quot; }\n]' }
  ]"
/>

::right::

<v-click>

`UNION` colle à la suite les lignes d'**une autre requête** : ici les emails et les mots de passe de `users`.

</v-click>

<v-click>

Heureusement, ce sont des **empreintes** (chapitre 03) : l'attaquant ne lit pas `mj1234`. Avec des mots de passe en clair, tous les comptes tombaient.

</v-click>

<!--
Démo : même route, cette URL. Les colonnes s'appellent title et xp parce que UNION reprend les noms de la première requête.
Une injection peut aussi modifier ou supprimer (selon le SGBD et les droits) : ici on se limite à lire, c'est déjà une fuite complète.
-->

---
transition: slide-up | slide-down
---

# Lier la valeur

````md magic-move
```php
DB::select("SELECT id, title, xp FROM quests WHERE title LIKE '%$q%'");
```

```php
DB::select('SELECT id, title, xp FROM quests WHERE title LIKE ?', ["%{$q}%"]);
```

```php
Quest::where('title', 'like', "%{$q}%")->get(['id', 'title', 'xp']);
```
````

<div class="grid grid-cols-3 gap-6 mt-4">

<div>

**Concaténée** : la saisie est **collée** dans le texte SQL, elle peut le réécrire.

</div>

<div v-click="1">

**Liée** : `?` est un **emplacement** ; la valeur voyage **à part**, dans un tableau. La base la traite comme une donnée, jamais comme du SQL.

</div>

<div v-click="2">

**Eloquent** fait la même chose pour vous : c'est le `like` de la S4, déjà sûr.

</div>

</div>

<v-click at="3">

<KeyPoint variant="tip" title="À retenir" icon="💡">

Une <KeyTerm>valeur liée</KeyTerm> ne peut pas changer le sens de la requête : la même attaque renvoie `[]`.

</KeyPoint>

</v-click>

<!--
Démo : remplacer la ligne par la version avec ? → la même URL UNION renvoie []. Puis supprimer la route : elle n'a jamais eu sa place dans le projet.
Le dd() de la S4 affichait déjà les ? et le tableau bindings : Eloquent prépare la requête, PDO envoie les valeurs séparément.
-->

---
transition: slide-up | slide-down
---

# Où rester vigilant

<Compare badLabel="❌ Saisie concaténée" goodLabel="✅ Saisie liée">
  <template #bad>

```php
DB::select("… WHERE email = '$email'");
Quest::whereRaw("xp > $min")->get();
Quest::orderByRaw($s)->get();
```

  </template>
  <template #good>

```php
DB::select('… WHERE email = ?', [$email]);
Quest::whereRaw('xp > ?', [$min])->get();
$s = in_array($s, ['xp', 'title']) ? $s : 'xp';
Quest::orderBy($s)->get();
```

  </template>
</Compare>

<v-click>

<KeyPoint variant="rule" title="Règle d'or" icon="📏">

Dans `DB::select`, `whereRaw` ou `orderByRaw`, **jamais** de variable dans la chaîne SQL : un `?` et un tableau de valeurs. Un nom de colonne ne se lie pas : on le choisit dans une **liste autorisée**.

</KeyPoint>

</v-click>

<!--
Les méthodes *Raw existent pour des besoins réels (fonctions SQL, calculs) : elles acceptent toutes un tableau de bindings en second argument.
$s vient de $request->query('sort'). orderBy ne peut pas lier un nom de colonne : d'où la liste blanche (in_array).
Réflexe d'audit pour la soutenance : grep -rn "DB::select\|Raw(" app routes.
-->

---
transition: slide-up | slide-down
---

# À vous : attaquez votre recherche

<Exercise title="WishFlix — injection SQL provoquée puis bloquée" duration="6 min" level="guidé"
  :criteria="[
    'La route temporaire renvoie les emails et empreintes de users avec UNION',
    'Avec ? et un tableau de valeurs, la même URL renvoie []',
    'La route /debug/recherche est supprimée de routes/web.php'
  ]"
  :hints="[
    'La route est fournie dans le README : collez-la telle quelle',
    'Trois colonnes de chaque côté du UNION : id, title, rating puis id, email, password',
    'DB::select(\'… LIKE ?\', [&quot;%{$q}%&quot;])'
  ]">

**Exercice** `06-authentification-securite` — étape **A8** du README, puis **point de contrôle 4** (fin de la Partie A).

Faites fuiter votre table `users`, bloquez la fuite, puis supprimez la route.

</Exercise>

<!--
Point de contrôle 4 dans le README (après A8). Palier de rattrapage : tag Campus Quest s6-ch8-injection-sql (aucun code : la route est supprimée).
WishFlix tourne sur MariaDB : le commentaire -- doit être suivi d'un espace, d'où le « -- x » de l'URL.
-->
