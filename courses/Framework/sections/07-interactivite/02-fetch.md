---
layout: chapter
transition: slide-left | slide-right
number: 02
duration: 55 min
---

# La requête en arrière-plan : fetch

- Rappeler le JavaScript nécessaire : sélection, écoute, `preventDefault`, `async/await`
- Envoyer le formulaire avec `fetch` et `FormData`, sans recharger la page
- Prévoir un repli vers l'envoi classique si la requête échoue

<!--
Transition : le cycle est mesuré — deux pages pour un badge. Place au JavaScript : le navigateur peut parler au serveur sans quitter la page.
Le public a vu JavaScript en BUT sans qu'il soit prérequis déclaré : une slide de rappel, puis on construit.
Découpage : ≈ 15 min de slides (≈ 8 slides), démo flash ≈ 10 min — moments : app.js chargé par @vite, DevTools > Réseau (filtre Fetch/XHR) : une seule requête fetch, page non rechargée, réponse = page HTML complète (response.redirected, taille d'une page) ; erreur provoquée : @csrf retiré → 419 → repli form.submit() ; remettre. Micro-pratique ≈ 30 min (slide « À vous », étape A2 + point de contrôle 1).
Moment léger : « le serveur répond, le navigateur attend… et personne ne bouge. C'est exactement ce qu'on veut. »
Tag Campus Quest de fin de chapitre : s7-ch2-fetch.
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="Le JavaScript de la page envoie `fetch` en POST, avec le formulaire dans `body`. Que reçoit-on en retour ?"
  :options="[
    'La page est rechargée avec la réponse du serveur',
    'Un objet Response : il faut encore lire son statut et son corps',
    'Le serveur affiche directement la réponse dans la page',
    'Un booléen true/false qui dit si l\'action a réussi'
  ]"
  :answer="1"
/>

<!--
Faites voter : « rechargée » est la réponse de ceux qui confondent fetch avec un submit classique —
fetch n'a aucun effet sur la page affichée : il faut écrire le code qui la modifie (chapitre en cours).
« Affiche directement » : rien ne s'affiche tout seul, la réponse reste dans le navigateur.
« Booléen » : trop pauvre — on a besoin du statut ET du contenu.
Réponse : fetch renvoie une PROMESSE qui se résout en un objet Response — on le lit avec await, slide suivante.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le JavaScript qu'il nous faut

::left::

```js
// resources/js/app.js
document.querySelectorAll('form[data-accept-quest]')
    .forEach((form) => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            // … la suite au prochain slide
        });
    });
```

::right::

<div v-click="1">

`querySelectorAll` sélectionne **tous** les formulaires marqués `data-accept-quest` — un attribut, pas un nom de route.

</div>

<div v-click="2">

`addEventListener('submit', …)` : à chaque envoi, **on prend la main avant le navigateur**.

</div>

<div v-click="3">

`preventDefault()` : le navigateur n'exécute **pas** son envoi de page — c'est nous qui enverrons la requête.

</div>

<div v-click="4">

`async` / `await` : on peut **attendre** la réponse du serveur sans figer la page — la requête reste en arrière-plan.

</div>

<!--
Quatre gestes : querySelectorAll (le sélecteur d'attribut [data-…] est le même qu'en CSS),
addEventListener, preventDefault, async/await : rappels de JS, pas des notions Laravel.
Le « … la suite » est volontaire : le squelette est posé, on le remplit dans les trois slides suivantes.
Sur WishFlix, app.js existe déjà (Vite l'a dans son input depuis la S1) : il ne contient que import './bootstrap'.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# `fetch` : la requête sans rechargement

::left::

```js {all|1-4|6-8|all}
const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
});

if (!response.ok) {
    // … repli au prochain slide
}
```

::right::

<div v-click="1">

`fetch(url, options)` envoie la requête **sans toucher à la page affichée** — `method: 'POST'` et `body: FormData` imitent le formulaire.

</div>

<div v-click="2">

`await` : la suite s'exécute **quand la réponse arrive**, sans figer la page. `response.ok` dit si le statut est un succès (200-299) — à tester soi-même.

</div>

<div v-click="3">

`response` est un objet, pas encore du texte : on lira son corps avec `response.json()` au chapitre 03.

</div>

<!--
fetch est NATUREL : aucune installation, disponible dans tous les navigateurs modernes.
form.action contient déjà l'URL complète de la route : rien à reconstruire.
La promesse se résout même sur une erreur HTTP (404, 500) : il faut tester response.ok soi-même — d'où le if.
Une promesse REJETÉE (réseau coupé) n'est pas gérée ici : le repli du slide suivant couvre les cas courants.
-->

---
layout: two-cols-bottom
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# `FormData` : le formulaire, en JavaScript

::left::

```js
const body = new FormData(form);
```

::right::

<div v-click="1">

`FormData` empaquette **tous les champs** du formulaire (`name` → valeur) — exactement ce que le navigateur enverrait.

</div>

<div v-click="2">

Le champ caché `_token` de `@csrf` (S5) est un champ du formulaire : **il voyage tout seul**. Aucune protection à refaire.

</div>

<div v-click="3">

Le **cookie de session** part automatiquement : la requête part du même site (`same-origin`), le serveur sait qui vous êtes (S6).

</div>

::bottom::

<div v-click="4">

Retenez : `fetch` + `FormData` = **le même POST qu'un envoi classique**, juste en arrière-plan. Le CSRF et la session de la S5-S6 passent sans rien changer.

</div>

<!--
C'est LE point qui rend l'approche « amélioration progressive » : on ne touche ni aux routes, ni au contrôleur, ni au CSRF.
Si on envoyait un JSON.stringify({...}) à la place, il faudrait : ajouter Content-Type: application/json, rebâtir le jeton CSRF dans un en-tête, et $request->input() lirait quand même les champs… FormData évite tout ça.
Note pour le présentateur : bootstrap.js importe axios et pose X-Requested-With — on ne s'en sert pas, fetch natif suffit et évite une dépendance pour trois lignes.
Promesse de la S5 tenue (ch. 04 : « un vrai PUT/DELETE en fetch, c'est l'objet de la S7 ») : fetch SAIT envoyer method: 'DELETE' — mais PHP ne remplit le corps de requête ($_POST) que pour POST : sur un vrai DELETE, le _token de FormData devient invisible et il faudrait l'en-tête X-CSRF-TOKEN à la place. En gardant method: 'POST' + FormData + @method('DELETE') (S5), le _method et le jeton voyagent dans un corps que PHP lit : tout fonctionne tel quel — c'est ce que fera la Partie B (retrait de la wishlist).
-->

---
layout: two-cols-bottom
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le schéma complet, en place

::left::

```js {all|1-2|4-7|9-12|14-15|all}
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
    });

    if (!response.ok) {
        form.submit();
        return;
    }

    form.outerHTML = '<p>✅ Vous avez accepté cette quête.</p>';
});
```

::right::

<div v-click="1">

On **intercepte** le `submit` et on annule le comportement par défaut : plus de rechargement.

</div>

<div v-click="2">

On envoie nous-mêmes la requête, en `POST` avec le formulaire en `FormData`.

</div>

<div v-click="3">

**Repli** : statut d'erreur (419, 500…) → `form.submit()` relance l'envoi **classique** — la page recharge comme avant, l'utilisateur ne perd rien. (`submit()` n'émet pas l'événement : pas de boucle.)

</div>

<div v-click="4">

Succès → on remplace le formulaire par un message, **sans toucher au reste de la page**.

</div>

::bottom::

<div v-click="5">

<Alert type="tip">

Retenez : `preventDefault` + `fetch` + **repli** = la page reste utile même si le JS échoue ou que le serveur refuse.

</Alert>

</div>

<!--
Le repli est LA sécurité du pattern : JavaScript désactivé, script en échec, ou serveur en erreur — l'utilisateur retombe sur le formulaire classique.
form.submit() appelle la méthode native : elle NE déclenche PAS l'événement submit (pas de récursion infinie) — mais elle contourne aussi la validation HTML, acceptable ici.
La réponse actuelle est… une page HTML complète (on l'a vu au chapitre 01) : fetch la télécharge sans l'afficher. C'est le problème du chapitre 03.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Brancher le script sur la page

::left::

```blade
{{-- resources/views/quests/show.blade.php --}}
<form method="POST" action="{{ route('my-quests.store', $quest) }}"
      data-accept-quest>
    @csrf
    <button type="submit">Accepter la quête</button>
</form>
```

```blade
{{-- resources/views/layouts/app.blade.php --}}
@vite(['resources/css/app.css', 'resources/js/app.js'])
```

::right::

<div v-click="1">

`data-accept-quest` : un **marqueur** HTML. Le JS cible les formulaires qui le portent — sans connaître la route ni le contrôleur.

</div>

<div v-click="2">

`app.js` rejoint le `@vite` du layout : Vite le compile et chaque page le charge. `vite.config.js` le connaît **déjà** (input de la S2) — rien à ajouter côté build.

</div>

<div v-click="3">

Le script tourne sur **toutes** les pages : `querySelectorAll` ne trouve le formulaire que là où le marqueur existe.

</div>

<!--
Le marqueur data-* est le pont Blade↔JS : c'est la convention « ne pas coupler le JS aux routes ».
app.js est déjà dans input de vite.config.js depuis le début (on l'a vu : resources/js/app.js y figure) — la seule ligne à changer est le @vite du layout.
Démo : ajouter la ligne au layout, `sail npm run dev` recharge, onglet Réseau > filtre Fetch/XHR : une seule ligne fetch au clic, pas de document.
-->

---
transition: slide-up | slide-down
---

# À vous : la wishlist sans rechargement

<Exercise title="WishFlix — ajouter à la wishlist en fetch" duration="30 min" level="guidé"
  :criteria="[
    'Le formulaire « Ajouter à ma wishlist » porte data-wishlist-form et est intercepté par app.js',
    'Le clic envoie un fetch POST : aucune page ne se recharge, le formulaire est remplacé par le badge',
    'Sans @csrf ou si le serveur refuse, le formulaire recharge la page normalement (repli)',
    'layouts/app.blade.php charge resources/js/app.js via @vite'
  ]"
  :hints="[
    'Même squelette que la démo : querySelectorAll + addEventListener + preventDefault + fetch + FormData',
    'Votre sélecteur : form[data-wishlist-form] ; votre message : <span class=&quot;badge badge-success&quot;>Dans votre wishlist</span>',
    'N\'oubliez pas le if (!response.ok) { form.submit(); return; } — testez-le en retirant @csrf une minute'
  ]">

**Exercice** `07-interactivite-optimisation` — étape **A2** du README, puis **point de contrôle 1**.

Faites la même chose sur WishFlix : la fiche jeu, le formulaire wishlist, `app.js`, le layout.

</Exercise>

<!--
Point de contrôle 1 après A2 (palier : tags s7-ch1-cycle et s7-ch2-fetch — relire les diffs, refaire sur WishFlix).
Commit attendu : « feat: ajout à la wishlist sans rechargement ».
Piège probable : oublier d'ajouter app.js au @vite du layout → le JS ne se charge pas, le formulaire se comporte comme avant (repli naturel, aucun message d'erreur — d'où la vérification dans l'onglet Réseau).
Piège 2 : response.ok testée APRÈS response.json() → json() lève une erreur sur du HTML. Ordre : ok d'abord, json ensuite (corrigé au chapitre 03).
-->
