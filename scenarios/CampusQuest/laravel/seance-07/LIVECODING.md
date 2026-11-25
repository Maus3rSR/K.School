# Fil à suivre — Séance 7 : Interactivité front et optimisation

Guide du formateur. Ordre calé sur les slides de `courses/Framework/sections/07-interactivite/` (4 chapitres + atelier, un cycle « théorie → démo flash → micro-pratique WishFlix » chacun).

**Démo flash** : les slides expliquent le code ligne par ligne, la démo ne retape rien. Elle dure 4-10 min par chapitre et ne montre que les moments où l'exécution parle : onglet Réseau des DevTools, réponses JSON, Debugbar avant/après, erreurs provoquées. Le code du chapitre est **déjà en place** : on avance de tag en tag dans le dépôt `CampusQuest` (`git checkout s7-chN-…` avant chaque chapitre). Le projet Laravel est dans `../base/` ; `solution/` reste la référence des fichiers finaux (voir « Avant la séance »).

## Moment ↔ chapitre ↔ tag

| Moment | Chapitre | Tag Campus Quest |
|---|---|---|
| 1.1 Onglet Réseau filtré « Doc » + « Conserver le journal » → clic « Accepter » : POST 302 puis GET 200, page HTML complète ; Debugbar : toutes les requêtes SQL de la fiche rejouées | 01 — Le cycle requête / réponse | `s7-ch1-cycle` (aucun code : état fin S6) |
| 2.1 `app.js` chargé par `@vite` → DevTools > Réseau, filtre Fetch/XHR : une seule requête fetch, page non rechargée, mais réponse = page HTML complète (`response.redirected`, taille d'une page) ; 2.2 erreur provoquée : `@csrf` retiré → 419 → le repli `form.submit()` affiche la page 419 ; remise | 02 — La requête en arrière-plan : fetch | `s7-ch2-fetch` |
| 3.1 Onglet Réseau → la réponse est un JSON de quelques octets (Aperçu/Preview) ; le compteur « Mes quêtes » de la barre passe à N+1 sans rechargement ; 3.2 déconnexion dans un autre onglet puis clic → 419 JSON → repli → page 419 | 03 — La réponse JSON | `s7-ch3-json` |
| 4.1 `/classement` deux fois → Debugbar : 1er chargement = agrégats + écriture cache, 2e = une lecture `cache` ; 4.2 quête 1000 XP créée avec le `forget` commenté → classement périmé ; décommenté → à jour ; `sail artisan cache:clear` | 04 — Le cache applicatif | `s7-ch4-cache` |

## Avant la séance

- [ ] **Prérequis : la S6 est jouée** — l'état de départ est la fin de la S6 (connexion Breeze, Gate `admin`, `quest_user`, XSS et injection SQL vues).
- [ ] `sail up -d`, `sail npm run dev` (second terminal), `sail artisan migrate:fresh --seed` : 30 quêtes, les deux comptes (`joueur@campus-quest.test` / `joueur1234`, `mj@campus-quest.test` / `mj1234`)
- [ ] `.env` : passer `CACHE_STORE=file` à `CACHE_STORE=database` — le store file fonctionne aussi, mais la lecture du cache n'apparaît alors pas dans l'onglet Queries de la Debugbar (c'est la preuve visuelle du gain). La table `cache` existe déjà (migration d'origine).
- [ ] Dépôt `CampusQuest` propre, tags `s7-ch1-cycle` … `s7-ch4-cache` créés ; la séance démarre sur l'état de fin S6 (`s6-ch8-injection-sql`)
- [ ] **DevTools prêts** : onglet Réseau ouvert sur `/quests/3`, « Preserve log » / « Conserver le journal » coché, filtre **Doc** — sans « Conserver », la trace du POST s'efface à la redirection 302
- [ ] **Deux onglets du même navigateur** (pas une fenêtre privée : elle aurait sa propre session) pour le moment 3.2 : se déconnecter dans l'un, puis cliquer « Accepter » dans l'autre
- [ ] La ligne `Quest::factory(470)->recycle(Category::all())->create()` (S4) sous la main pour le moment 4.1 — le gain de cache est invisible sur 30 quêtes
- [ ] **Le JS est dans `solution/`** : `resources/js/app.js` (avec fetch + JSON + compteur), `layouts/app.blade.php` (`@vite` avec `app.js`), `quests/show.blade.php` (`data-accept-quest`), `partials/nav.blade.php` (`data-my-quests-count`), `MyQuestController.php`, `LeaderboardController.php`, `QuestController.php`. `routes/web.php` et `vite.config.js` n'ont **pas** changé (`app.js` est déjà dans l'`input` Vite depuis la S2).
- [ ] Pour le moment 2.2 : savoir retirer `@csrf` de `quests/show.blade.php` et le remettre (5 secondes, ne pas oublier de remettre).

---

## Chapitre 1 — Le cycle requête / réponse — tag `s7-ch1-cycle` (≈ 4 min)

Le tag `s7-ch1-cycle` pointe sur **le même code** que `s6-ch8-injection-sql` : ce chapitre mesure, il n'écrit rien.

### 1.1 Le prix du clic (≈ 4 min)

Connecté en joueur (`joueur@campus-quest.test` / `joueur1234`), sur `/quests/3` :

1. Ouvrir les DevTools (`F12`) → onglet **Réseau** → cocher **« Preserve log » / « Conserver le journal »** → filtre **Doc**
2. Cliquer « Accepter la quête » → **deux** lignes document : `mes-quetes/3` en **302** (taille quasi nulle : c'est une instruction), puis `quests/3` en **200** avec la page HTML complète (~28 ko)
3. Debugbar → onglet **Queries** : la fiche a rejoué toutes ses requêtes SQL — catégorie, lieux, utilisateur

Faire constater : pour changer un badge, deux pages complètes et tout le SQL de la fiche.

---

## Chapitre 2 — La requête en arrière-plan : fetch — tag `s7-ch2-fetch` (≈ 10 min)

### 2.1 Le fetch qui marche… trop bien (≈ 4 min)

```bash
git checkout s7-ch2-fetch
```

`app.js` est chargé par le layout, `data-accept-quest` est sur le formulaire. DevTools → Réseau → filtre **Fetch/XHR** → cliquer « Accepter la quête » :

- **une seule** requête de type `fetch` — la page ne se recharge pas, le formulaire devient « ✅ Vous avez accepté cette quête. »
- mais la réponse téléchargée est **la page HTML complète** : fetch a suivi la 302 (`response.redirected === true`), taille d'une page entière — on a payé le même prix sans voir la page

### 2.2 Le repli en action (≈ 3 min)

Erreur provoquée : dans `resources/views/quests/show.blade.php`, **retirer `@csrf`** du formulaire, sauvegarder, recharger la fiche, cliquer « Accepter » :

- le fetch reçoit un **419**, `response.ok` est faux → le repli `form.submit()` envoie le formulaire **classiquement** → la page 419 s'affiche
- **remettre `@csrf`** immédiatement, recharger : le fetch refonctionne

### 2.3 Le CSRF passe sans rien ajouter (≈ 3 min)

Dans l'onglet Réseau, cliquer la requête `mes-quetes/3` → en-têtes de la requête : `Content-Type: multipart/form-data` et le corps contient `_token` — `FormData` a embarqué le champ caché de `@csrf`. Le cookie de session est parti tout seul (même origine).

---

## Chapitre 3 — La réponse JSON — tag `s7-ch3-json` (≈ 7 min)

### 3.1 Quelques octets au lieu d'une page (≈ 3 min)

```bash
git checkout s7-ch3-json
```

Rejouer le clic « Accepter » (onglet Réseau, filtre Fetch/XHR) : la réponse `mes-quetes/3` fait **quelques dizaines d'octets** — ouvrir l'onglet **Aperçu/Preview** : `{"accepted":true,"count":N}`.

Le compteur « Mes quêtes » de la barre est passé de N à **N+1 sans rechargement** : `data.count` lu par `response.json()`.

### 3.2 L'erreur qui devient du JSON (≈ 4 min)

Ouvrir la même fiche dans un **second onglet** du même navigateur, y cliquer « Déconnexion ». Revenir au premier onglet (sa page contient encore l'ancien `_token`) et cliquer « Accepter » :

- le fetch reçoit un **419** `{"message":"CSRF token mismatch."}` : la déconnexion de Breeze a invalidé la session et renouvelé le jeton ; le CSRF est vérifié avant le middleware `auth`, d'où 419 et non 401
- `response.ok` est faux → le repli `form.submit()` renvoie le POST **classique** (même jeton périmé) → page **419 « Page Expired »** ; recharger : « Se connecter » est revenu
- Citer sans le montrer : sans utilisateur connecté mais avec un jeton valide, `auth` répondrait **401** `{"message":"Unauthenticated."}` au lieu de rediriger vers `/login`

---

## Chapitre 4 — Le cache applicatif — tag `s7-ch4-cache` (≈ 6 min)

### 4.1 Le gain mesuré (≈ 3 min)

```bash
git checkout s7-ch4-cache
```

Sur 30 quêtes le gain est invisible : si le volume le permet, lancer d'abord `Quest::factory(470)->recycle(Category::all())->create()` en Tinker (500 quêtes, comme la S4). Puis `/classement` **deux fois** :

- **1er chargement** : Debugbar → Queries = les agrégats `withSum` / `withCount` **+** une écriture dans `cache`
- **2e chargement** : une seule lecture `select … from cache` à la place des agrégats — la base n'est plus solicitée pour le podium

### 4.2 Le cache périmé (≈ 3 min)

Erreur provoquée : dans `QuestController`, **commenter les trois `Cache::forget('leaderboard');`** (store, update, destroy). Créer une quête à **1000 XP** (`mj@campus-quest.test` / `mj1234` pour le back-office) → `/classement` affiche **l'ancien** podium, sans la quête. Décommenter les trois lignes → `/classement` est à jour. Enfin `sail artisan cache:clear` pour repartir d'un cache vide.

---

## Rejouer la démo

```bash
git checkout s7-chN-…              # sauter au tag d'un chapitre (code seulement)
sail artisan migrate:fresh --seed  # repartir d'une base peuplée (données et comptes recréés)
sail artisan cache:clear           # repartir d'un cache vide (sinon le classement reste figé 10 min)
```

La base, le code et le cache avancent séparément : après un `migrate:fresh --seed`, penser à `cache:clear` — une entrée `leaderboard` en cache survivrait à la recréation de la base et afficherait des données fantômes.

**Comptes de démonstration** (depuis la S6, seeders) :

| Compte | Mot de passe | Rôle |
|---|---|---|
| `joueur@campus-quest.test` | `joueur1234` | joueur |
| `mj@campus-quest.test` | `mj1234` | Maître du jeu (`is_admin`) |

**Solution finale** : `solution/` contient l'état final de la S7 — les fichiers écrits ou modifiés par la séance, sur un projet S6 (`routes/web.php` et `vite.config.js` inchangés : les routes web existantes suffisent, `app.js` est déjà dans l'`input` Vite).
