# Fil à suivre — Séance 5 : Formulaires, validation et services

Guide du formateur. Ordre calé sur les slides de `courses/Framework/sections/05-formulaires/` (6 chapitres + 1 annexe, un cycle « théorie → démo flash → micro-pratique WishFlix » chacun).

**À partir de la S3, plus de livecoding** : les slides expliquent le code ligne par ligne, la démo ne retape rien — elle dure 2-4 min par chapitre et ne montre que les moments où l'exécution parle : erreurs provoquées, résultats visibles (navigateur, DevTools), gestes d'outil (artisan). Le code du chapitre est **déjà en place** : on avance de tag en tag dans le dépôt `CampusQuest` (`git checkout s5-chN-…` avant chaque chapitre). Le projet Laravel est dans `../base/` ; `solution/` reste la référence des fichiers finaux — **mais voir l'avertissement S4/S5 ci-dessous avant toute copie**.

## Moment ↔ chapitre ↔ tag

Les tags existent dans le dépôt `CampusQuest` (**un tag par chapitre**) ; la démo les parcourt dans l'ordre. Le diff entre deux tags reste le code du chapitre pour le rattrapage WishFlix.

| Moment | Chapitre | Tag Campus Quest |
|---|---|---|
| 1.1 `/quests/create` affiche le formulaire, envoi → **419** (pas de `@csrf` au tag ch1) | 01 — Le formulaire de création | `s5-ch1-formulaire` |
| 2.1 `@csrf` : le 419 disparaît — 302 → fiche (PRG), bannière flash, `_token` dans les DevTools | 02 — Le jeton CSRF | `s5-ch2-csrf` |
| 3.1 Données pourries acceptées à `s5-ch2` (SQLite permissif), refusées à `s5-ch3` ; envoi vide → erreurs + saisie conservée ; `category_id` trafiqué → `exists:` refuse | 03 — La validation | `s5-ch3-validation` |
| 4.1 `_method=PUT` visible dans le source HTML ; `destroy()` sans `detach()` → 500 (clé étrangère pivot), puis avec | 04 — Éditer et supprimer | `s5-ch4-edition` |
| 5.1 `route:list` avant/après `Route::resource` ; `/quests/999` → 404 par binding | 05 — Route::resource et binding | `s5-ch5-resource` |
| 6.1 Même comportement (erreurs, `old()`) après extraction en Form Request | 06 — Les Form Requests | `s5-ch6-form-request` |
| — | Annexe services (`09-annexe-services.md`, lecture / bonus `GameService` — hors séance) | `s5-ch7-services` |

## Avant la séance

- [ ] **Prérequis : la S4 est jouée** — l'état de départ de la S5 est la fin de la S4 (filtres et pagination de la liste, route `/classement`, lien « Classement » dans la nav, `with('category')` dans `show()`).
- [ ] `seance-05/solution/` **repart de l'état S4** : `QuestController::index()` conserve filtres `search`/`category`, `with('category')`, `orderByDesc('xp')`, `paginate(10)->withQueryString()` ; `show()` garde son eager loading ; `quests/index.blade.php` garde le formulaire de filtres et `links()` ; `partials/nav.blade.php` affiche « Classement » **et** « Nouvelle quête » ; `routes/web.php` garde `/classement` et contraint `{quest}` aux nombres (`->where(['quest' => '[0-9]+'])`). Une copie en bloc sur un projet S4 ne régresse donc rien — les tags `s5-chN-…` restent la référence des états intermédiaires.
- [ ] `sail up -d`, `sail npm install && sail npm run dev` (second terminal), `sail artisan migrate:fresh --seed` : 30 quêtes
- [ ] `http://localhost/quests` affiche la liste (avec ses filtres et sa pagination si la S4 est appliquée)
- [ ] Le projet démo tourne en **SQLite** : `DB_CONNECTION=sqlite`, fichier `database/database.sqlite` présent — SQLite est plus permissif que MariaDB (voir moment 3.1)
- [ ] Dépôt `CampusQuest` propre : les tags `s5-ch1-formulaire` … `s5-ch6-form-request` sont créés et la séance démarre sur l'état de fin S4 (avant `s5-ch1-formulaire`)
- [ ] Filet de sécurité : `solution/` contient chaque fichier final (état S4 + apports S5 — voir ci-dessus)
- [ ] Pas de commit en séance : le code est déjà versionné, la démo ne fait qu'exécuter (les rares modifications — `detach()` commenté — sont annulées en direct)

---

## Chapitre 1 — Le formulaire de création — tag `s5-ch1-formulaire` (≈ 3 min)

**État de départ** :

```bash
git checkout s5-ch1-formulaire
```

Routes `quests.create` / `quests.store`, `create()` et `store()`, vue `quests/create`, message flash dans le layout — tout est en place (les slides ont déroulé le code ligne par ligne).

### 1.1 Le 419 (≈ 3 min)

Navigateur : `http://localhost/quests/create` → remplir le formulaire → **envoyer → 419 « Page Expired »**.

Montrer que tout est correct par ailleurs : `sail artisan route:list --name=quests` affiche bien les deux routes, le contrôleur existe. Laisser la salle deviner — la réponse est le chapitre 02. **Ne pas expliquer.**

*Le PRG et le message flash seront visibles au chapitre 02, une fois le formulaire fonctionnel.*

---

## Chapitre 2 — Le jeton CSRF — tag `s5-ch2-csrf` (≈ 2 min)

**État de départ** :

```bash
git checkout s5-ch2-csrf     # @csrf est dans la vue create
```

### 2.1 Le 419 disparaît (≈ 2 min)

Pour le contraste, repasser un instant au tag précédent :

```bash
git checkout s5-ch1-formulaire   # renvoyer → 419 (5 s de rappel)
git checkout s5-ch2-csrf         # le @csrf est de retour
```

Renvoyer le formulaire : **302 → `/quests/{id}`** (visible dans l'onglet Réseau des DevTools — c'est le PRG), la fiche s'affiche, la bannière **« Quête créée ! »** apparaît. Recharger : elle a disparu (donnée flash).

Puis DevTools → Éléments : montrer le champ caché `<input type="hidden" name="_token" value="…">` compilé par `@csrf`.

---

## Chapitre 3 — La validation — tag `s5-ch3-validation` (≈ 4 min)

**État de départ** :

```bash
git checkout s5-ch3-validation
```

`store()` appelle `validate()`, la vue affiche `@error` / `old()` / `@selected` — tout est en place.

### 3.1 La donnée pourrie, avant et après (≈ 1,5 min)

D'abord le rappel de la douleur : revenir au tag ch2 (pas de `validate()`), soumettre `xp = beaucoup` et un titre vide :

```bash
git checkout s5-ch2-csrf
```

**SQLite accepte `beaucoup`** dans la colonne entière — la quête est créée avec une donnée pourrie, sans erreur (sous MariaDB ce serait un 500). Puis :

```bash
git checkout s5-ch3-validation
```

Les mêmes saisies → retour au formulaire, message d'erreur sous chaque champ fautif, **les autres champs conservés** (`old()`).

### 3.2 Le select trafiqué (≈ 1 min)

Dans le formulaire, via les DevTools, changer le `value` de l'`<option>` catégorie en `999` → renvoyer : `exists:categories,id` refuse — la validation serveur n'a pas besoin de croire le HTML.

### 3.3 Le `required` HTML contourné (≈ 1,5 min)

Retirer l'attribut `required` du champ titre dans les DevTools (ou la page source) : le navigateur n'empêche plus l'envoi… et c'est **quand même** refusé côté serveur. La validation HTML est un confort, pas une protection.

*Facultatif (30 s)* : montrer les messages personnalisés (`'title.required' => '…'`) si le temps le permet.

---

## Chapitre 4 — Éditer et supprimer — tag `s5-ch4-edition` (≈ 4 min)

**État de départ** :

```bash
git checkout s5-ch4-edition
```

Routes `edit`/`update`/`destroy` écrites à la main, `@method`, `detach()` dans `destroy()` — tout est en place.

### 4.1 Le PUT dans un POST (≈ 1 min)

`/quests/{id}/edit` → formulaire pré-rempli. Source de la page (Ctrl+U) : les champs cachés `_token` **et `_method=PUT`** — c'est `@method('PUT')` compilé. Modifier une quête → 302 → fiche, « Quête mise à jour ! ».

### 4.2 La suppression qui casse (≈ 2 min)

Erreur provoquée : dans `QuestController::destroy()`, **commenter la ligne `$quest->locations()->detach();`**, sauvegarder, puis supprimer une quête seedée qui a des lieux :

```
Illuminate\Database\QueryException — FOREIGN KEY constraint failed (location_quest référence encore la quête)
```

**Décommenter** → même suppression → 302 → liste, « Quête supprimée ! ».

### 4.3 Le formulaire DELETE (≈ 1 min)

Sur la fiche : le bouton « Supprimer » est un `<form method="POST">` avec `@csrf` + `@method('DELETE')` — pas un lien GET (un GET destructeur serait à la fois dangereux et sans jeton).

---

## Chapitre 5 — Route::resource et binding — tag `s5-ch5-resource` (≈ 2 min)

**État de départ** : le refactor est fait au tag — mais on montre **d'abord l'avant**.

### 5.1 Avant / après (≈ 1,5 min)

```bash
git checkout s5-ch4-edition
sail artisan route:list --name=quests    # 7 routes, paramètre {id}, routes écrites à la main
git checkout s5-ch5-resource
sail artisan route:list --name=quests    # 7 routes, paramètre {quest} — mêmes noms, rien à changer dans les vues
```

Les signatures `edit(Quest $quest)`, `update(Request $request, Quest $quest)`, `destroy(Quest $quest)` ont remplacé les `findOrFail` — le code est au tag, pas à retaper.

### 5.2 La 404 automatique (≈ 30 s)

Navigateur : `http://localhost/quests/999` → **404**, sans `findOrFail` écrit nulle part : le binding a chargé (ou refusé) le modèle.

*Facultatif (30 s)* : le piège `{quest}` ↔ `$quete` — nom différent = pas de binding, conteneur injecte un `Quest` vide.

---

## Chapitre 6 — Les Form Requests — tag `s5-ch6-form-request` (≈ 2 min)

**État de départ** :

```bash
git checkout s5-ch6-form-request
```

`StoreQuestRequest` / `UpdateQuestRequest` en place, `store()` et `update()` allégées.

### 6.1 Le comportement ne change pas (≈ 2 min)

Depuis le tag ch5, envoyer le formulaire vide : erreurs + saisie conservée. Puis :

```bash
git checkout s5-ch6-form-request   # si pas déjà fait — les deux classes sont là
```

Rejouer exactement la même soumission invalide : **mêmes erreurs, même `old()`** — la validation a juste déménagé dans `app/Http/Requests/`. Montrer les deux fichiers (`authorize()`, `rules()`, `messages()`) et le contrôleur : plus de `validate()`, juste `$request->validated()`.

---

## Annexe — Les services (hors séance)

`09-annexe-services.md` — lecture / bonus `GameService`, tag `s5-ch7-services` si montrée en toute fin de séance : `QuestService` (règle « une seule quête à la une », `sync()` des lieux), injection par le constructeur. **Pas de micro-pratique** : le `GameService` WishFlix est un bonus de l'exercice.

---

## Rejouer la démo

```bash
git checkout s5-chN-…              # sauter au tag d'un chapitre (code seulement)
sail artisan migrate:fresh --seed  # repartir d'une base peuplée (données perdues)
```

La base (sqlite) et le code (tags) avancent séparément : un `git checkout` en arrière ne touche pas aux données, un `migrate:fresh` non plus au code.

**Solution finale** : `solution/` contient l'état final du back-office **intégrant la S4** — `index()` filtré/paginé avec `with('category')`, `show()` en eager loading, formulaire de filtres + `links()` dans la vue, « Classement » et « Nouvelle quête » dans la nav, `/classement` routée et `{quest}` contraint aux nombres. Elle peut être copiée en bloc sur un projet S4 sans rien perdre.
