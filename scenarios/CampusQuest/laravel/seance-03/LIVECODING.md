# Fil à suivre — Séance 3 : Eloquent — modèles, relations, migrations

Guide du formateur. Ordre calé sur les slides de `courses/Framework/sections/03-eloquent/` (5 chapitres, un cycle « théorie → démo flash → micro-pratique WishFlix » chacun).

**À partir de la S3, plus de livecoding** : les slides expliquent le code ligne par ligne, la démo ne retape rien — elle dure 3-5 min par chapitre et ne montre que les moments où l'exécution parle : erreurs provoquées, résultats visibles (Tinker, navigateur), gestes d'outil (artisan). Le code du chapitre est **déjà en place** : on avance de tag en tag dans le dépôt `CampusQuest` (`git checkout s3-chN-…` avant chaque chapitre). Le projet Laravel est dans `../base/` ; `solution/` reste la référence des fichiers finaux (à copier avec `cp -r solution/* ../base/` **uniquement** sur un projet où vous n'avez pas déjà généré vos propres migrations : les timestamps générés en direct différeraient de ceux de `solution/`).

## Moment ↔ chapitre ↔ tag

Les tags existent dans le dépôt `CampusQuest` (**un tag par chapitre**) ; la démo les parcourt dans l'ordre. Le diff entre deux tags reste le code du chapitre pour le rattrapage WishFlix.

| Moment | Chapitre | Tag Campus Quest |
|---|---|---|
| 1.1 `make:model Location -m` — montrer les squelettes | 1 — Une table, un objet | `s3-ch1-table-objet` |
| 1.2 `migrate` / `migrate:status` / `migrate:rollback` / `migrate` | 1 | `s3-ch1-table-objet` |
| 1.3 Tinker : `new` / `save` / `find` (+ faute `nmae`) | 1 | `s3-ch1-table-objet` |
| 2.1 `migrate` (categories, quests) puis `MassAssignmentException` (`$fillable` commenté) | 2 — Relation un-à-plusieurs | `s3-ch2-relation-1n` |
| 2.2 FK 999 refusée (`category_id` inexistant) | 2 | `s3-ch2-relation-1n` |
| 2.3 Navigation : `$quest->category->name`, `quests()->create()` | 2 | `s3-ch2-relation-1n` |
| 3.1 `migrate` (pivot) puis `attach` / `detach` / `sync` en Tinker | 3 — Relation plusieurs-à-plusieurs | `s3-ch3-relation-nn` |
| 3.2 Doublon `attach` refusé par la clé composite | 3 | `s3-ch3-relation-nn` |
| 4.1 `migrate:fresh` — les données de Tinker disparaissent, puis factory `create()` | 4 — Seeders et factory | `s3-ch4-seeders-factory` |
| 4.2 `migrate:fresh --seed` — base peuplée en une commande, `make()` / `featured()` | 4 | `s3-ch4-seeders-factory` |
| 5.1 `/quests` lit la base + `/quests/999` → 404 | 5 — Brancher le catalogue sur la base | `s3-ch5-catalogue-n1` |
| 5.2 N+1 constaté : `DB::enableQueryLog()` puis comptage | 5 | `s3-ch5-catalogue-n1` |

## Avant la séance

- [ ] **Prérequis : la solution S2 est appliquée** (`cp -r ../seance-02/solution/* .` depuis `base/`) — routes, contrôleur tableau PHP, layout, vues.
- [ ] `cd ../base && ./vendor/bin/sail up -d` puis `sail npm install && sail npm run dev` (second terminal)
- [ ] `http://localhost/quests` affiche les 3 quêtes du tableau PHP
- [ ] Éditeur ouvert, terminal prêt (`sail artisan ...`), dépôt `CampusQuest` propre : les tags `s3-ch1-table-objet` … `s3-ch5-catalogue-n1` sont créés et la séance démarre sur l'état de fin S2 (avant `s3-ch1-table-objet`)
- [ ] Filet de sécurité : `solution/` contient chaque fichier final
- [ ] Le projet démo tourne en **SQLite** (`DB_CONNECTION=sqlite` dans `.env`) : créer `database/database.sqlite` si absent (`touch database/database.sqlite` — `migrate` propose aussi de le créer). En cours, les slides montrent la config **MariaDB/Sail** : `DB_CONNECTION=mariadb`, `DB_HOST=mariadb`, `DB_DATABASE=laravel`, `DB_USERNAME=sail`, `DB_PASSWORD=password` — les commandes `sail artisan` sont identiques dans les deux cas.
- [ ] Ne pas lancer `migrate` avant la séance : le chapitre 1 démarre sur une base sans nos tables (les tables par défaut Laravel — users, cache, jobs — sont jouées au premier `migrate`, c'est normal).
- [ ] Pas de commit en séance : le code est déjà versionné, la démo ne fait qu'exécuter (les rares modifications — `$fillable` commenté — sont annulées en direct).

---

## Chapitre 1 — Une table, un objet — tag `s3-ch1-table-objet` (≈ 4 min)

**État de départ** : le projet dans l'état laissé par la S2 — aucun modèle Eloquent, aucune table `locations`.

### 1.1 `make:model Location -m` — les squelettes (≈ 1 min)

```bash
sail artisan make:model Location -m
```

Montrer les deux fichiers générés : le modèle est **vide** (`class Location extends Model {}`), la migration ne contient que `id()` et `timestamps()` — les colonnes ne sont pas devinées, on les écrit à la main (c'est le propos des slides).

*Facultatif (20 s)* : avant la commande, `Location::count()` en Tinker levait « Class not found » — la preuve que le modèle compte.

### Basculer sur le code du chapitre

Les fichiers qui viennent d'être générés sont des squelettes datés du jour : les supprimer, puis passer au tag :

```bash
rm app/Models/Location.php
rm database/migrations/*_create_locations_table.php
git checkout s3-ch1-table-objet
```

→ modèle + migration `locations` (avec `name`) en place.

### 1.2 Jouer, vérifier, annuler (≈ 1,5 min)

```bash
sail artisan migrate
sail artisan migrate:status    # locations → [1] Ran (aux côtés des tables par défaut)
sail artisan migrate:rollback   # down() : la table disparaît
sail artisan migrate            # on la rejoue — batch 1 à nouveau
```

Montrer le **batch** à l'écran : `rollback` annule le dernier lot.

### 1.3 Tinker : une ligne = un objet (≈ 1,5 min)

```php
$l = new Location();
$l->name = 'BU';
$l->save();                  // INSERT
Location::find(1)->name;     // "BU"
```

Puis la faute provoquée (aucun fichier à toucher — la variable suffit) :

```php
$l->nmae = 'Amphi';
$l->save();                  // QueryException : Unknown column 'nmae'
```

*Annexe (facultatif, ≈ 2 min, hors tag)* : la variante « modifier une table déjà jouée » est en slides (`07-annexe-modifier-table.md`) — `make:migration add_address_to_locations_table --table=locations`, jouer, rollback, **supprimer le fichier** (la solution ne contient pas cette colonne).

---

## Chapitre 2 — Relation un-à-plusieurs — tag `s3-ch2-relation-1n` (≈ 5 min)

**État de départ** :

```bash
git checkout s3-ch2-relation-1n
sail artisan migrate          # categories + quests rejoignent locations
```

Préparer les catégories en Tinker (utiles pour la FK et la navigation) :

```php
Category::create(['name' => 'Quiz']);
Category::create(['name' => 'Mission']);
```

### 2.1 `MassAssignmentException` — `$fillable` commenté (≈ 1,5 min)

Erreur provoquée : dans `app/Models/Quest.php`, **commenter le bloc `protected $fillable = [...]`**, puis en Tinker :

```php
Quest::create(['title' => 'Salle 404', 'description' => '…', 'xp' => 50, 'difficulty' => 'easy', 'category_id' => 2]);
// Illuminate\Database\Eloquent\MassAssignmentException
```

**Décommenter** `$fillable` → le même `create()` passe. C'est le moment « ah » de la séance : sans liste blanche, Eloquent refuse l'assignation de masse.

*Si le temps le permet* : `$fillable` partiel — `(new Quest(['title' => 'T', 'nope' => 1]))->getAttributes()` → seul `title` reste, `nope` est ignoré **sans erreur**.

### 2.2 La FK refuse le vide (≈ 1 min)

```php
Quest::create([..., 'category_id' => 999]);
// QueryException (SQLSTATE 23000) : FOREIGN KEY constraint failed sur SQLite,
// « foreign key constraint fails » sur MariaDB — la contrainte travaille
```

Aucun fichier touché : `constrained()` fait refuser à la base tout `category_id` inexistant.

### 2.3 Naviguer entre les objets (≈ 1,5 min)

```php
$quest = Quest::first();
$quest->category->name;                     // "Mission" — la jointure est invisible
Category::find(2)->quests->count();
Category::find(2)->quests()->create([...]); // category_id rempli tout seul
```

---

## Chapitre 3 — Relation plusieurs-à-plusieurs — tag `s3-ch3-relation-nn` (≈ 3 min)

**État de départ** :

```bash
git checkout s3-ch3-relation-nn
sail artisan migrate          # location_quest rejoint les autres tables
```

Les données des chapitres 1-2 persistent en base ; sinon recréer en Tinker de quoi jouer : `Location::create(['name' => 'BU'])`, `['Cafét']`, `['Amphi']` (ids 1 à 3 pour le `sync([1, 3])`) et une quête via `Quest::first()` ou un `create()` complet.

### 3.1 Écrire dans la pivot (≈ 2 min)

```php
$quest = Quest::first();
$quest->locations()->attach(2);
$quest->locations()->attach([1, 3]);
$quest->locations()->detach(2);
$quest->locations()->sync([1, 3]);   // la pivot vaut exactement [1, 3]
$quest->locations;                    // la Collection
```

### 3.2 Le doublon refusé (≈ 1 min)

```php
$quest->locations()->attach(1);   // 1 est déjà lié après le sync
// Integrity constraint violation : Duplicate entry — la clé composite refuse le couple en double
```

---

## Chapitre 4 — Seeders et factory — tag `s3-ch4-seeders-factory` (≈ 4 min)

**État de départ** :

```bash
git checkout s3-ch4-seeders-factory
```

(seeders, factory et `DatabaseSeeder` déjà en place — rien à migrer, la base du ch3 suffit.)

### 4.1 `migrate:fresh` : tout disparaît (≈ 1 min)

```bash
sail artisan migrate:fresh
```

```php
Quest::count();   // 0 — tout ce qui a été saisi en Tinker a disparu
```

C'est le problème énoncé par les slides, montré pour de vrai : les données « à la main » ne sont pas partageables.

### 4.2 La factory en action (≈ 1,5 min)

Base vide, on fabrique :

```php
Quest::factory()->count(3)->create();   // 3 quêtes en base
Quest::count();                         // 3
Quest::factory()->make();               // inspecter SANS enregistrer
Quest::factory()->featured()->make();   // l'état : featured = true, non sauvegardée
```

### 4.3 `migrate:fresh --seed` (≈ 1,5 min)

```bash
sail artisan migrate:fresh --seed
```

```php
Quest::count();   // 30 — catégories, lieux, quêtes et leurs liens pivot
```

N'importe quel binôme obtient **la même base** : c'est le contrat des seeders.

---

## Chapitre 5 — Brancher le catalogue sur la base — tag `s3-ch5-catalogue-n1` (≈ 4 min)

**État de départ** :

```bash
git checkout s3-ch5-catalogue-n1
```

La base doit être seedée (30 quêtes — le `migrate:fresh --seed` du chapitre 4) ; sinon la relancer.

### 5.1 La page lit la base (≈ 1,5 min)

Navigateur : `http://localhost/quests` → les 30 quêtes seedées avec le nom de leur catégorie ; `http://localhost/quests/999` → la 404 de la S2, sans qu'on y touche (`findOrFail`).

### 5.2 Le N+1 constaté (≈ 2 min)

Faire d'abord voter la salle (« combien de requêtes pour 30 quêtes ? »), puis en Tinker :

```php
DB::enableQueryLog();
$quests = Quest::all();
$quests->each(fn ($q) => $q->category->name);
count(DB::getQueryLog());   // 31 — 1 pour la liste + 1 par quête
```

Teaser oral, **sans l'expliquer** : `Quest::with('category')->get()` ferait 2 requêtes — déroulé en séance 4.

---

## Rejouer la démo

```bash
sail artisan migrate:fresh --seed    # repartir d'une base peuplée (données perdues)
git checkout s3-chN-…                # sauter au tag d'un chapitre (code seulement — penser à migrate)
```

La base (sqlite) et le code (tags) avancent séparément : un `git checkout` en arrière ne touche pas aux données, un `migrate:fresh` non plus au code.
