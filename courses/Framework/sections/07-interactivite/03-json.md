---
layout: chapter
transition: slide-left | slide-right
number: 03
duration: 45 min
---

# La réponse JSON

- Négocier le format : l'en-tête `Accept` et `$request->expectsJson()`
- Répondre `response()->json()` depuis la même action que le formulaire
- Lire la réponse en JavaScript et mettre à jour le compteur

<!--
Transition : fetch fonctionne… mais télécharge la page entière pour afficher un badge (vu au chapitre 02).
Le JSON est déjà croisé : response()->json() en S2 (ch. 03), Content-Type: application/json en S5 (ch. 01).
Découpage : ≈ 13 min de slides (≈ 7 slides), démo flash ≈ 7 min — moments : onglet Réseau : la réponse JSON de quelques octets (Aperçu) ; le compteur de la barre qui passe à N+1 ; déconnecté dans un autre onglet puis clic → 419 JSON (jeton renouvelé à la déconnexion) → repli → page 419 ; micro-pratique ≈ 25 min (slide « À vous », étape A3 + point de contrôle 2).
Moment léger : « le serveur a écrit un poème de 30 ko, le navigateur n'avait besoin que de deux nombres. »
Tag Campus Quest de fin de chapitre : s7-ch3-json.
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="L'action `store()` enregistre la quête puis répond. Aujourd'hui elle renvoie toujours `back()` — une redirection HTML. Comment peut-elle répondre du JSON **seulement quand le navigateur le demande** ?"
  :options="[
    'En comparant l\'URL : les routes /api/ renvoient du JSON, les autres du HTML',
    'En lisant un en-tête de la requête : le client annonce ce qu\'il sait lire',
    'En testant si la requête vient de JavaScript (fetch) plutôt que d\'un formulaire',
    'Impossible : une action ne peut produire qu\'un seul type de réponse'
  ]"
  :answer="1"
/>

<!--
Faites voter : « tester si c'est du JavaScript » est l'intuition la plus forte — et elle ne marche pas :
fetch et un formulaire envoient la même requête HTTP ; ce qui les distingue, c'est ce qu'ils DISENT vouloir.
« routes /api » : c'est la solution lourde (Sanctum, routes sans session) — examinée à la fin du chapitre.
« Impossible » : faux — le format de réponse se négocie, c'est le sujet du chapitre.
Réponse : le client annonce sa préférence dans l'en-tête Accept — le serveur la lit avec expectsJson().
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le client dit ce qu'il attend

::left::

<HttpRequest
  method="POST"
  url="/mes-quetes/3"
  :headers="[
    ['Host', 'localhost'],
    ['Accept', 'application/json'],
    ['Content-Type', 'multipart/form-data; boundary=…'],
    ['Cookie', 'campus-quest-session=…']
  ]"
  body="_token=aBc9X…"
/>

::right::

Le JSON, on l'a déjà croisé : `response()->json()` en S2, l'en-tête `Content-Type: application/json` en S5. C'est du texte clé/valeur :

```json
{ "accepted": true, "count": 3 }
```

<div v-click="1">

Pour l'obtenir, le client le **demande** : l'en-tête `Accept` liste les formats qu'il sait lire.

</div>

<div v-click="2">

Côté JavaScript, on l'ajoute aux options du `fetch` : `headers: { Accept: 'application/json' }`.

</div>

<div v-click="3">

Le serveur lit la même demande avec `$request->expectsJson()` — la réponse dépend de la **négociation de contenu**, pas de l'URL.

</div>

<!--
Le corps multipart est simplifié pour la lisibilité : FormData envoie _token en champ de formulaire (pas d'en-tête X-CSRF-TOKEN — celui-ci n'apparaît que pour un vrai DELETE/PUT, note du chapitre 02).
Cookie de session : présent parce que same-origin — c'est ce qui authentifie la requête (S6).
Accepter */* par défaut : un navigateur qui affiche une page envoie Accept: text/html,… — c'est pour ça que le formulaire classique continue de recevoir du HTML.
-->

---
layout: two-cols-bottom
layoutClass: gap-x-6 !grid-cols-[minmax(0,13fr)_minmax(0,7fr)]
transition: slide-up | slide-down
---

# Une action, deux réponses

`app/Http/Controllers/MyQuestController.php`

::left::

```php {all|3-4|6-11|13|all}
public function store(Request $request, Quest $quest)
{
    $user = $request->user();
    $user->acceptedQuests()->syncWithoutDetaching([$quest->id]);

    if ($request->expectsJson()) {
        return response()->json([
            'accepted' => true,
            'count' => $user->acceptedQuests()->count(),
        ]);
    }

    return back()->with('success', 'Quête acceptée !');
}
```

::right::

<div v-click="1">

L'enregistrement **ne change pas** : `$user` est lu une fois, réutilisé pour la suite.

</div>

<div v-click="2">

`expectsJson()` → le client a demandé du JSON : on répond `response()->json([...])`, statut **200** par défaut. `count` = le nouveau nombre de quêtes acceptées.

</div>

<div v-click="3">

Sinon → `back()` comme avant : le **formulaire classique continue de marcher à l'identique**, redirection et message flash compris.

</div>

::bottom::

<div v-click="4">

<Alert type="tip">

Retenez : une action, deux réponses — le client choisit avec `Accept`, le serveur avec `expectsJson()`.

</Alert>

</div>

<!--
Le count est un count() sur la relation : UNE petite requête COUNT, pas de collection chargée.
Piège à nommer : response()->json() n'est PAS une exception au pattern — c'est une réponse normale que Laravel convertit (on le verra en Partie C).
La route, le middleware auth, le @csrf : rien n'a bougé. C'est tout l'intérêt de l'approche.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Lire la réponse, mettre à jour la page

::left::

````md magic-move
```js
const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
});

if (!response.ok) {
    form.submit();
    return;
}
```

```js
const response = await fetch(form.action, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: new FormData(form),
});

if (!response.ok) {
    form.submit();
    return;
}
```

```js
const response = await fetch(form.action, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: new FormData(form),
});

if (!response.ok) {
    form.submit();
    return;
}

const data = await response.json();
```

```js
const response = await fetch(form.action, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: new FormData(form),
});

if (!response.ok) {
    form.submit();
    return;
}

const data = await response.json();

form.outerHTML = '<p>✅ Vous avez accepté cette quête.</p>';
document.querySelector('[data-my-quests-count]')
    .textContent = data.count;
```
````

::right::

<div v-click="1">

`headers: { Accept: 'application/json' }` : on **dit** au serveur qu'on attend du JSON — c'est ce qui allume `expectsJson()`.

</div>

<div v-click="2">

`response.json()` lit le corps et le transforme en **objet** : `data.count` porte le nouveau nombre de quêtes.

</div>

<div v-click="3">

Puis on écrit dans la page : le badge (`outerHTML`) et le compteur de la barre, qui prend `data.count`.

```blade
{{-- resources/views/partials/nav.blade.php --}}
Mes quêtes
<span data-my-quests-count>{{ Auth::user()->acceptedQuests()->count() }}</span>
```

</div>

<!--
Le span data-my-quests-count est dans le bloc @auth de la navbar : il affiche le bon chiffre au chargement, puis le JS le met à jour après chaque ajout.
querySelector('[data-my-quests-count]').textContent = data.count — on ne touche QUE ce chiffre, le reste de la page ne bouge pas.
Si le compteur est absent (invité), le querySelector renvoie null — mais le formulaire n'existe que pour les connectés (@auth), donc les deux vont ensemble.
-->

---
transition: slide-up | slide-down
---

# Les erreurs deviennent du JSON aussi

| Situation | Réponse du serveur | Ce que fait le JS |
|---|---|---|
| Jeton `_token` absent ou périmé (déconnexion dans un autre onglet) | **419** `{"message":"CSRF token mismatch."}` | `!response.ok` → `form.submit()` → la page 419 s'affiche |
| Requête sans utilisateur connecté | **401** `{"message":"Unauthenticated."}` | `form.submit()` → redirection `/login` |
| Données invalides (validation, S5) | **422** + les erreurs | `form.submit()` → la page avec les erreurs |

<v-click>

<Alert type="tip">

Le repli `form.submit()` couvre **tous** les cas d'erreur : plutôt qu'un message d'erreur en JSON que personne ne lit, l'utilisateur retombe sur le parcours classique — qui sait afficher l'erreur.

</Alert>

</v-click>

<!--
Le 401 JSON remplace la redirection /login du middleware auth : Laravel choisit la réponse selon l'en-tête Accept (Handler::unauthenticated — lu en Partie C de la S6, question C1).
La démo montre le 419 : déconnexion dans un autre onglet du MÊME navigateur (la déconnexion de Breeze invalide la session et renouvelle le jeton), puis clic → le _token de la page est périmé → 419 JSON → le repli renvoie le POST classique, avec le même jeton périmé → page 419. Le CSRF passe avant auth : c'est pour ça qu'on voit 419 et pas 401.
Le 401 suppose un jeton valide sans utilisateur connecté : rare depuis nos pages (le formulaire n'existe que dans @auth) — on le cite, on ne le démontre pas.
Un JSON d'erreur n'est jamais « lu » par notre JS : on préfère le parcours HTML qui sait l'afficher — c'est un choix, pas une limite.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Pourquoi pas `routes/api.php` ?

::left::

Ce que propose `php artisan install:api` :

- Installe **Sanctum** et crée `routes/api.php`
- Des routes **sans session, sans CSRF**, authentifiées par **jeton**
- Pensées pour des **clients externes** : application mobile, SPA, autre site

::right::

Notre besoin :

- Nos pages sont déjà authentifiées par la **session** (S6)
- Un `fetch` **same-origin** garde le cookie : le serveur sait qui vous êtes
- La **route web existante** répond HTML au formulaire, JSON au fetch — les deux clients sont couverts

<v-click>

<Alert type="tip">

Règle : API séparée = clients **externes sans session**. Nos propres pages = routes web + `expectsJson()`.

</Alert>

</v-click>

<!--
Beaucoup de tutoriels installent Sanctum « pour faire du JSON » : c'est la solution pour une SPA ou une app mobile, pas pour enrichir un site Blade.
install:api ajoute aussi une config CORS, des jetons personnels… : du poids pour un besoin déjà couvert.
Si un jour le front devient une vraie SPA (React, Vue), Sanctum + routes/api.php redeviendra pertinent — pas aujourd'hui.
-->

---
transition: slide-up | slide-down
---

# Panorama : le contrôleur

<script setup>
import controllers from '/references/controllers'
</script>

<Panorama :items="controllers" doc="https://laravel.com/docs/12.x/controllers" at="s7-ch3" />

<!--
Survol de 30 s, pas d'explication détaillée : montrer ce qui a été vu (badges « vu ») et où trouver le reste.
Le badge « vu » de expectsJson() s'allume à ce chapitre ; response()->json() était déjà vu en S2.
Pendant le « À vous », les apprenants peuvent revenir sur cette slide comme aide-mémoire.
-->

---
transition: slide-up | slide-down
---

# À vous : la wishlist en JSON

<Exercise title="WishFlix — réponse JSON et compteur" duration="25 min" level="guidé"
  :criteria="[
    'WishlistController@store renvoie du JSON { in_wishlist, count } quand expectsJson()',
    'Le JS envoie Accept: application/json et lit response.json()',
    'La taille de la réponse est notée dans REPONSES.md : avant (A1-A2) / après',
    'Le formulaire classique (sans fetch) fonctionne toujours : message flash + badge'
  ]"
  :hints="[
    'La branche if ($request->expectsJson()) return response()->json([...]) ; — sinon back()->with() inchangé',
    'count : $request->user()->wishlist()->count() — une requête COUNT, pas de collection',
    'Le compteur de la navbar WishFlix est Partie B (US1) : contentez-vous de parser data.count pour l\'instant'
  ]">

**Exercice** `07-interactivite-optimisation` — étape **A3** du README, puis **point de contrôle 2**.

Même schéma que la démo : une action, deux réponses. Vous mesurerez le gain en octets dans l'onglet Réseau.

</Exercise>

<!--
Point de contrôle 2 après A3 (palier : tag s7-ch3-json). Commit attendu : « feat: réponse JSON de la wishlist ».
Le JS WishFlix n'a pas encore de compteur à mettre à jour : data.count est lu mais inutilisé en socle — c'est voulu, il servira en Partie B (US1).
Vérification utile : rejouer A1 (onglet Réseau, Doc) → la réponse est maintenant un JSON de quelques octets, plus de document HTML.
-->
