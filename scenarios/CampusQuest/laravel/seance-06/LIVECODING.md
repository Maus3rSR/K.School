# Fil à suivre — Séance 6 : Authentification et sécurité

Guide du formateur. Ordre calé sur les slides de `courses/Framework/sections/06-authentification/` (8 chapitres, un cycle « théorie → démo flash → micro-pratique WishFlix » chacun).

**Démo flash** : les slides expliquent le code ligne par ligne, la démo ne retape rien. Elle dure 2-5 min par chapitre et ne montre que les moments où l'exécution parle : erreurs provoquées, résultats visibles (navigateur, Tinker, DevTools), gestes d'outil (`breeze:install`, `git restore`, artisan). Le code du chapitre est **déjà en place** : on avance de tag en tag dans le dépôt `CampusQuest` (`git checkout s6-chN-…` avant chaque chapitre). Le projet Laravel est dans `../base/` ; `solution/` reste la référence des fichiers finaux (voir « Avant la séance »).

## Moment ↔ chapitre ↔ tag

| Moment | Chapitre | Tag Campus Quest |
|---|---|---|
| 1.1 `breeze:install` en direct sur l'état S5 → `git status` (6 fichiers `M`, nouveaux fichiers `??`) ; 1.2 `git restore .`, suppression des deux configs, `npm install`, `require auth.php` → `/quests` revient ; `route:list --path=login` | 01 — Le starter kit Breeze | `s6-ch1-breeze` |
| 2.1 Connexion réussie au tag ch1 → `Route [dashboard] not defined` ; 2.2 au tag ch2 : compte Alice créé dans Tinker, connexion → nom dans la barre, mauvais mot de passe → erreur + email conservé, déconnexion | 02 — La connexion | `s6-ch2-connexion` |
| 3.1 Tinker : `User::first()->password`, `Hash::check()` vrai puis faux ; 3.2 `migrate:fresh --seed` → connexion avec le joueur démo | 03 — Le mot de passe haché | `s6-ch3-mot-de-passe` |
| 4.1 Déconnecté : `/quests/create` s'ouvre au tag ch3, redirige vers `/login` au tag ch4 ; connexion → retour sur `/quests/create` (intended) | 04 — Le middleware d'authentification | `s6-ch4-middleware` |
| 5.1 Joueur → 403 sur `/quests/create` ; 5.2 fiche quête côte à côte joueur / Maître du jeu (boutons masqués) | 05 — L'autorisation | `s6-ch5-autorisation` |
| 6.1 `attach()` deux fois dans Tinker → erreur de clé primaire ; 6.2 « Accepter » sur la fiche, « Mes quêtes », Debugbar (2 requêtes) | 06 — Les données de l'utilisateur connecté | `s6-ch6-mes-quetes` |
| 7.1 Recherche `<script>` affichée en texte ; une ligne passée en `{!! !!}` → alerte ; retour à `{{ }}` | 07 — La faille XSS | `s6-ch7-xss` |
| 8.1 Route temporaire collée → `' OR 1=1 -- x`, puis `UNION` sur `users` ; 8.2 version `?` → `[]` ; route supprimée | 08 — L'injection SQL | `s6-ch8-injection-sql` |

## Avant la séance

- [ ] **Prérequis : la S5 est jouée** — l'état de départ est la fin de la S5 (back-office complet, Form Requests, `QuestService` de l'annexe).
- [ ] `sail up -d`, `sail npm run dev` (second terminal), `sail artisan migrate:fresh --seed` : 30 quêtes
- [ ] Le cache Composer contient `laravel/breeze` (un `sail composer require laravel/breeze --dev` joué la veille sur une branche jetable) : l'installation en direct prend alors quelques secondes
- [ ] Dépôt `CampusQuest` propre, tags `s6-ch1-breeze` … `s6-ch8-injection-sql` créés ; la séance démarre sur l'état de fin S5 (`s5-ch7-services`)
- [ ] Deux navigateurs (ou une fenêtre privée) pour comparer joueur et Maître du jeu au chapitre 05
- [ ] Le snippet de la route `/debug/recherche` (moment 8.1) ouvert dans un éditeur, prêt à coller
- [ ] **Breeze n'est pas dans `solution/`** : ses fichiers générés (contrôleurs `Auth/`, `LoginRequest`, vues `auth/`, `routes/auth.php`…) viennent de `breeze:install`. `solution/` ne contient que les fichiers écrits ou modifiés par la séance — dont `AuthenticatedSessionController.php` (redirection) et `auth/login.blade.php` (réécrite). Pour repartir de `solution/` : installer Breeze et faire le tri du chapitre 01 **avant** de copier.
- [ ] La Policy du chapitre 05 est un **aperçu** : elle n'existe que sur la slide (Campus Quest n'a pas de colonne `author_id`), elle n'est ni dans un tag ni dans `solution/`.

---

## Chapitre 1 — Le starter kit Breeze — tag `s6-ch1-breeze` (≈ 5 min)

### 1.1 L'installation qui écrase (≈ 2 min)

Sur l'état de fin S5, sur une branche jetable :

```bash
git switch -c demo-breeze s5-ch7-services
git status                                   # propre
sail composer require laravel/breeze --dev
sail artisan breeze:install blade
git status --short
```

Faire lire les `M` : `package.json`, `resources/css/app.css`, `resources/js/app.js`, `resources/views/layouts/app.blade.php`, `routes/web.php`, `vite.config.js`. Ouvrir `http://localhost/quests` : **500 « Route [quests.index] not defined »** (le `web.php` de Breeze n'a plus nos routes, et même la page 404 de la S2 plante en appelant `route('quests.index')`). `git diff routes/web.php` en 5 secondes : `/dashboard` et `/profile` ont remplacé nos routes.

### 1.2 Le tri (≈ 3 min)

```bash
git restore .
rm tailwind.config.js postcss.config.js
sail npm install
```

Ajouter `require __DIR__.'/auth.php';` à la fin de `routes/web.php`. Relancer `sail npm run dev`, recharger `/quests` : tout est revenu. Puis :

```bash
sail artisan route:list --path=login
```

Ouvrir `/login` : la page de Breeze s'affiche, dans **son** style. Fin de la branche jetable :

```bash
git switch --discard-changes s6-ch1-breeze   # ou : git stash -u && git checkout s6-ch1-breeze
git branch -D demo-breeze
```

---

## Chapitre 2 — La connexion — tag `s6-ch2-connexion` (≈ 3 min)

### 2.1 Le code généré à adapter (≈ 1 min)

Toujours au tag `s6-ch1-breeze`, créer un compte dans Tinker puis se connecter :

```php
User::create(['name' => 'Alice', 'email' => 'alice@campus-quest.test', 'password' => 'secret123'])
```

Connexion → **`Route [dashboard] not defined`** : la redirection de Breeze vise une route qu'on a retirée.

### 2.2 La connexion qui marche (≈ 2 min)

```bash
git checkout s6-ch2-connexion
```

`/login` est maintenant dans le layout Campus Quest. Mauvais mot de passe → « These credentials do not match our records. » sous l'email, **email conservé**. Bon mot de passe → `/quests`, « Alice » dans la barre. « Déconnexion » → accueil, « Se connecter » réapparaît.

*Facultatif (30 s)* : 6 mauvais mots de passe de suite → « Too many login attempts » (limitation des essais de `LoginRequest`).

---

## Chapitre 3 — Le mot de passe haché — tag `s6-ch3-mot-de-passe` (≈ 2 min)

### 3.1 L'empreinte (≈ 1 min)

Dans Tinker (le compte Alice existe encore) :

```php
User::first()->password
Hash::check('secret123', User::first()->password)   // true
Hash::check('Secret123', User::first()->password)   // false
Hash::make('secret123')                             // deux fois : deux empreintes différentes (le sel)
```

### 3.2 Le compte démo (≈ 1 min)

```bash
git checkout s6-ch3-mot-de-passe
sail artisan migrate:fresh --seed
```

Connexion avec `joueur@campus-quest.test` / `joueur1234`. Alice a disparu : la base a été recréée.

---

## Chapitre 4 — Le middleware d'authentification — tag `s6-ch4-middleware` (≈ 2 min)

### 4.1 Avant / après (≈ 2 min)

Déconnecté, au tag ch3 : `/quests/create` s'ouvre. Puis :

```bash
git checkout s6-ch4-middleware
```

Déconnecté : `/quests/create` → **302 vers `/login`** (onglet Réseau). Se connecter avec le joueur démo → on arrive **directement** sur `/quests/create` (`intended()`). Faire remarquer le problème : le **joueur** a accès au formulaire de création — transition vers le chapitre 05.

---

## Chapitre 5 — L'autorisation — tag `s6-ch5-autorisation` (≈ 3 min)

**État de départ** :

```bash
git checkout s6-ch5-autorisation
sail artisan migrate:fresh --seed    # colonne is_admin + compte du Maître du jeu
```

### 5.1 Le 403 (≈ 1,5 min)

Connecté en joueur (`joueur@campus-quest.test` / `joueur1234`) : `/quests/create` → **403 « This action is unauthorized. »**. Comparer avec le 302 du chapitre 04 (invité). Connecté en Maître du jeu (`mj@campus-quest.test` / `mj1234`) : le formulaire s'affiche.

### 5.2 Les boutons (≈ 1,5 min)

Même fiche `/quests/3` ouverte dans deux fenêtres : joueur (fenêtre privée) sans « Modifier » / « Supprimer » ni « Nouvelle quête » dans la barre ; Maître du jeu avec.

---

## Chapitre 6 — Les données de l'utilisateur connecté — tag `s6-ch6-mes-quetes` (≈ 3 min)

**État de départ** :

```bash
git checkout s6-ch6-mes-quetes
sail artisan migrate                 # table quest_user
```

### 6.1 Le doublon (≈ 1 min)

Dans Tinker :

```php
$user = User::first();
$user->acceptedQuests()->attach(3);
$user->acceptedQuests()->attach(3);   // QueryException : UNIQUE constraint failed (quest_user)
$user->acceptedQuests()->detach(3);
```

### 6.2 Accepter et « Mes quêtes » (≈ 2 min)

Connecté en joueur : fiche d'une quête → « Accepter la quête » → message flash, la fiche affiche « Vous avez accepté cette quête ». Recliquer est impossible (le bouton a disparu) ; un second POST à la main ne crée pas de doublon (`syncWithoutDetaching`). Accepter une seconde quête, ouvrir « Mes quêtes » : la liste, le total d'XP, « Abandonner ». Debugbar → 2 requêtes pour la liste (quêtes + catégories).

---

## Chapitre 7 — La faille XSS — tag `s6-ch7-xss` (≈ 2 min)

```bash
git checkout s6-ch7-xss
```

Le tag ajoute « Résultats pour « … » » à la liste et les retours à la ligne de la description (`{!! nl2br(e(...)) !!}`).

### 7.1 L'alerte (≈ 2 min)

1. `http://localhost/quests?search=<script>alert('XSS')</script>` → la phrase s'affiche **avec** les balises. Ctrl+U : `&lt;script&gt;`.
2. Erreur provoquée : dans `quests/index.blade.php`, remplacer `{{ request('search') }}` par `{!! request('search') !!}`, sauvegarder, recharger → **l'alerte s'ouvre**.
3. **Remettre `{{ }}`** immédiatement, recharger : plus d'alerte.

---

## Chapitre 8 — L'injection SQL — tag `s6-ch8-injection-sql` (≈ 3 min)

Le tag `s6-ch8-injection-sql` pointe sur **le même code** que `s6-ch7-xss` : la route de démonstration est collée puis supprimée en direct.

### 8.1 L'attaque (≈ 2 min)

Coller à la fin de `routes/web.php` (imports `use Illuminate\Http\Request;` et `use Illuminate\Support\Facades\DB;` en tête) :

```php
Route::get('/debug/recherche', function (Request $request) {
    $q = $request->query('q', '');

    return DB::select("SELECT id, title, xp FROM quests WHERE title LIKE '%$q%'");
});
```

Puis dans le navigateur :

1. `/debug/recherche?q=Salle` → une quête
2. `/debug/recherche?q=' OR 1=1 -- x` → **les 30 quêtes**
3. `/debug/recherche?q=zzz' UNION SELECT id, email, password FROM users -- x` → **les emails et les empreintes** des deux comptes, dans les colonnes `title` et `xp`

### 8.2 La parade (≈ 1 min)

Remplacer la ligne du `return` par :

```php
return DB::select('SELECT id, title, xp FROM quests WHERE title LIKE ?', ["%{$q}%"]);
```

Rejouer l'URL `UNION` → `[]`. Puis **supprimer la route** (et les deux imports) : elle n'a pas sa place dans le projet.

---

## Rejouer la démo

```bash
git checkout s6-chN-…              # sauter au tag d'un chapitre (code seulement)
sail artisan migrate:fresh --seed  # repartir d'une base peuplée (données et comptes recréés)
```

La base et le code avancent séparément : à partir du tag `s6-ch5-autorisation`, un `migrate:fresh --seed` est nécessaire pour avoir la colonne `is_admin` et le compte du Maître du jeu ; à partir de `s6-ch6-mes-quetes`, la table `quest_user`.

**Comptes de démonstration** (seeders, à partir du tag indiqué) :

| Compte | Mot de passe | Rôle | Depuis |
|---|---|---|---|
| `joueur@campus-quest.test` | `joueur1234` | joueur | `s6-ch3-mot-de-passe` |
| `mj@campus-quest.test` | `mj1234` | Maître du jeu (`is_admin`) | `s6-ch5-autorisation` |

**Solution finale** : `solution/` contient l'état final de la S6 — fichiers écrits ou modifiés par la séance, sur un projet S5 où Breeze a été installé et trié (chapitre 01).
