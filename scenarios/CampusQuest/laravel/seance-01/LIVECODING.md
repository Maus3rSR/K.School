# Fil à suivre — Séance 1 : Installation et architecture

Guide du formateur. Ordre calé sur les slides de `courses/Framework/sections/01-setup/`.
Séance de **lecture** : on ne code pas de fonctionnalité, on installe puis on **suit une requête** de fichier en fichier. Aucun fichier PHP n'est ajouté à `../base/` : il n'y a donc **pas de `solution/`** pour cette séance (les seules modifications, un mot dans la vue et `APP_NAME`, sont jetables).

Les chapitres 01 (lancer l'installation) et 02 (pourquoi un framework) n'ont **pas de livecoding** : pas de tag.

## Étape ↔ chapitre ↔ tag

| Étape | Contenu | Chapitre | Tag Campus Quest |
|---|---|---|---|
| a | Installation neuve : `sail up -d`, `migrate`, `localhost`, `about` | 03 — Installer Laravel avec Docker | `s1-ch3-installation` |
| b | `public/index.php` (front controller) | 04 — Suivre une requête | `s1-ch4-requete` |
| c | `bootstrap/app.php` (`withRouting`, `/up`) | 04 | `s1-ch4-requete` |
| d | `routes/web.php` | 04 | `s1-ch4-requete` |
| e | Vue `welcome` + erreur volontaire | 04 | `s1-ch4-requete` |
| f | `.env` et `config/app.php` | 04 | `s1-ch4-requete` |
| g | Artisan : `list`, `about`, `route:list` | 04 | `s1-ch4-requete` |

Tags déclarés pour le futur dépôt `CampusQuest` (non créés ici). `s1-ch3-installation` = projet Laravel 12 neuf, Sail installé ; `s1-ch4-requete` = même projet, `APP_NAME="Campus Quest"` (seul diff).

## Avant la séance

- [ ] Docker démarré ; **ne pas** utiliser `../base/` pour l'étape a : créer un projet neuf `campus-quest` avec la commande de la slide (même parcours que les étudiants), images déjà téléchargées la veille
- [ ] Éditeur ouvert sur le projet, terminal avec l'alias `sail`
- [ ] Alternative : `../base/` (projet Campus Quest déjà prêt, voir son README) si le réseau est mauvais — les fichiers lus aux étapes b à g y sont identiques

## a. Installation neuve — `03-installation.md`

```bash
curl -s "https://laravel.build/campus-quest?with=mariadb" | bash
cd campus-quest
sail up -d
sail artisan migrate
sail artisan about
```
Montrer `http://localhost`, puis `compose.yaml` (services `laravel.test` et `mariadb`, clé `ports`). Sans `migrate`, la page d'accueil plante sur la table `sessions` : le montrer **avant** de migrer.

## b. Front controller — `04-requete.md` (« Étape 1 »)

Ouvrir `public/index.php` : `vendor/autoload.php` (Composer), `bootstrap/app.php`, `$app->handleRequest(Request::capture())`.
Poser la question : « et où est le `main` ? » → il n'y en a pas, c'est le framework qui démarre.

## c. Bootstrap — `04-requete.md` (« Étape 2 »)

Ouvrir `bootstrap/app.php`, lire `withRouting(web:, commands:, health:)`. Visiter `http://localhost/up`.

## d. Routes — `04-requete.md` (« Étape 3 »)

Ouvrir `routes/web.php` :
```php
Route::get('/', function () {
    return view('welcome');
});
```

## e. Vue et erreur volontaire — `04-requete.md` (« Étape 3 », « Quand ça casse »)

Changer un mot dans `resources/views/welcome.blade.php`, rafraîchir.
Puis casser : `return view('welcom');` → page d'erreur `View [welcom] not found` ; lire la pile d'appels de haut en bas (`index.php` apparaît en bas). Remettre `welcome`.

## f. `.env` et configuration — `04-requete.md` (« Étape 4 »)

Ouvrir `.env` (`APP_ENV`, `APP_DEBUG`, `DB_*`), puis `config/app.php` (`'name' => env('APP_NAME', 'Laravel')`).
Changer `APP_NAME="Campus Quest"` puis `sail artisan about`. Montrer que `.env` est dans `.gitignore` et `.env.example` non.

## g. Artisan — `04-requete.md` (« Étape 5 »)

```bash
sail artisan list
sail artisan about
sail artisan route:list
```
Les deux routes affichées (`/` et `up`) sont exactement celles lues aux étapes c et d.

## Après la séance

- [ ] `sail down` ; supprimer le projet neuf s'il n'est pas conservé pour le tag `s1-ch3-installation`
