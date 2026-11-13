---
layout: chapter
transition: slide-left | slide-right
number: 03
duration: 40 min
---

# La validation

- Valider une requête avec `$request->validate()`
- Afficher les erreurs et conserver la saisie avec `old()`
- Choisir les règles adaptées à chaque champ

<!--
Transition : le formulaire fonctionne… et accepte n'importe quoi. On ferme la porte aux données pourries.
Moment léger : soumettre une quête « Sauver la BU » avec 9 999 999 XP et un titre vide — « le Maître du jeu a mis son chat sur le clavier ».
Découpage : ≈ 14 min de slides (≈ 14 slides), démo flash ≈ 4 min — moments : envoi vide → erreurs sous les champs + saisie conservée, valeur trafiquée dans les DevTools refusée ; micro-pratique ≈ 22 min (slide « À vous », étape A3 + point de contrôle 1).
Tag Campus Quest de fin de chapitre : s5-ch3-validation.
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="Le formulaire de création est envoyé avec un titre vide et `xp` = « beaucoup ». Que se passe-t-il aujourd'hui, sans validation ?"
  :options="[
    'Une erreur 500 : la base refuse « beaucoup » dans une colonne entière',
    'La quête est créée tranquillement avec `xp` = 0, la base corrige en silence',
    'Une erreur 404 : la route détecte les données invalides',
    'Le navigateur bloque l\'envoi tout seul, les types ne correspondent pas'
  ]"
  :answer="0"
/>

<!--
Réponse précise : MariaDB en mode strict lève une erreur → QueryException → page 500 (c'est ce que verront les étudiants sous Sail).
Le projet de démo tourne en SQLite, plus permissif : il avale « beaucoup » sans broncher — encore pire, la donnée pourrie est enregistrée.
Le titre vide aussi : le middleware ConvertEmptyStringsToNull transforme '' en null → violation NOT NULL, autre 500.
Le remède arrive à la slide suivante : filtrer AVANT d'atteindre la base.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# `validate()` dans `store()`

::left::

```php {all|3-9|11|13|all}
public function store(Request $request)
{
    $validated = $request->validate([
        'title' => ['required', 'string', 'max:100'],
        'description' => ['required', 'string'],
        'xp' => ['required', 'integer', 'min:0', 'max:500'],
        'difficulty' => ['required', Rule::in(['easy', 'medium', 'hard'])],
        'category_id' => ['required', 'exists:categories,id'],
    ]);

    $quest = Quest::create($validated);

    return redirect()->route('quests.show', $quest)->with('success', 'Quête créée !');
}
```

::right::

<div v-click="1">

Un tableau de <KeyTerm>règles de validation</KeyTerm> par champ — `Rule::in()` reprend les valeurs de la `QuestFactory`, `exists:` vérifie que la catégorie existe vraiment.

</div>

<div v-click="2">

`$validated` = **uniquement les données validées** : il remplace avantageusement `$request->only(...)`.

</div>

<div v-click="3">

La suite est inchangée : création puis redirection — **rien n'a bougé quand tout va bien**.

</div>

<div v-click="4">

Et quand une règle échoue ? Le code n'atteint **jamais** `Quest::create` — la slide suivante montre le détour.

</div>

<!--
N'oubliez pas l'import : use Illuminate\Validation\Rule; en tête du contrôleur.
validate() est disponible sur l'objet Request — pas besoin d'instancier quoi que ce soit.
Au chapitre 04 les mêmes règles seront copiées dans update() — gardez cette douleur en tête, le chapitre 06 la supprime.
-->

---
transition: slide-up | slide-down
---

# Les règles les plus courantes

| **Règle** | **Effet** |
|---|---|
| `required` | Le champ est présent et non vide |
| `string` / `integer` / `boolean` | Le type de la valeur |
| `min` / `max` | Borne basse / haute — caractères pour du texte, valeur pour un nombre |
| `in:a,b,c` | La valeur appartient à une liste fermée |
| `exists:table,colonne` | La valeur existe dans une autre table (clés étrangères) |
| `unique:table,colonne` | La valeur n'existe pas encore dans la table (email, slug…) |

Les autres règles utiles : **Panorama de la validation**, en fin de chapitre.

<!--
On peut écrire 'required|max:100' en chaîne ou ['required', 'max:100'] en tableau — équivalent,
le tableau est plus lisible dès qu'il y a des règles paramétrées.
min/max sur du texte = nombre de caractères ; sur un nombre = valeur — le type compte, d'où 'integer' avant.
-->

---
transition: slide-up | slide-down
---

# Échec : retour automatique au formulaire

<Steps
  :clicks="true"
  :items="[
    { title: 'Validation échoue', desc: 'validate() lève une ValidationException', icon: '⛔' },
    { title: '302 vers la page précédente', desc: 'Retour automatique au formulaire' },
    { title: 'Erreurs + saisie flashées', desc: 'Tout est écrit en session flash' },
    { title: 'Formulaire réaffiché', desc: 'Messages d\'erreur + champs pré-remplis', icon: '📝' }
  ]"
/>

<v-click>

Si tout passe, aucune exception : **le code continue simplement** — `store()` exécute sa suite.

</v-click>

<!--
Le « retour » va vers la page précédente (le formulaire), pas une route fixe — c'est le Referer qui décide.
Les erreurs et l'ancienne saisie sont en session flash : visibles au prochain affichage, puis effacées.
En requête XHR/API, même échec → réponse JSON 422 au lieu de la redirection.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Afficher les erreurs dans Blade

::left::

```blade
<input id="title" name="title" type="text"
       value="{{ old('title') }}">
@error('title')
    <p class="error">{{ $message }}</p>
@enderror
```

::right::

- `old('title')` = la **saisie de la tentative ratée**, flashée en session : le champ garde ce qu'on avait tapé
- `@error('title')` affiche `$message` **uniquement** si ce champ a échoué

<!--
$errors est une variable globale injectée dans toutes les vues : $errors->any() pour un récapitulatif en haut du formulaire.
Réflexe : value="{{ old('champ') }}" sur CHAQUE champ — sans quoi l'utilisateur retape tout à chaque erreur.
Démo : soumettre avec un titre vide, montrer le message rouge et les autres champs conservés.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# `old()` sur un `<select>` et un `<textarea>`

::left::

```blade {all|1-2|4-8|all}
<textarea id="description" name="description">{{ old('description') }}</textarea>
@error('description') <p class="error">{{ $message }}</p> @enderror

<select id="difficulty" name="difficulty">
    <option value="easy" @selected(old('difficulty') === 'easy')>Facile</option>
    <option value="medium" @selected(old('difficulty') === 'medium')>Moyenne</option>
    <option value="hard" @selected(old('difficulty') === 'hard')>Difficile</option>
</select>
```

::right::

<div v-click="1">

Un `<textarea>` n'a pas d'attribut `value` : `old()` se place **entre les balises**.

</div>

<div v-click="2">

Un `<select>` ne se pré-remplit pas non plus : la directive `@selected(condition)` ajoute `selected` sur **l'option** dont la condition est vraie.

</div>

<!--
Même logique pour une catégorie : @selected((int) old('category_id') === $category->id) dans la boucle foreach.
Piège : old() renvoie une chaîne, l'id est un entier — d'où le cast (int) ou la comparaison souple ==.
-->

---
transition: slide-up | slide-down
---

# L'attribut `required` ne suffit pas

<Compare badLabel="❌ Validation navigateur seule" goodLabel="✅ Validation serveur">
  <template #bad>

```blade
<input name="title" type="text" required>
```

Jolie et instantanée… mais **contournée** en deux clics : DevTools, ou une requête forgée à la main.

  </template>
  <template #good>

```php
$request->validate([
    'title' => ['required', 'string', 'max:100'],
]);
```

Exécutée **côté serveur** : impossible à contourner, c'est elle qui protège la base.

  </template>
</Compare>

<v-click>

<KeyPoint variant="rule" title="Règle d'or" icon="📏">

Ne jamais faire confiance à la saisie : la validation HTML est un confort, la validation serveur est **la** sécurité.

</KeyPoint>

</v-click>

<!--
Les deux se combinent : required côté client pour l'ergonomie (feedback immédiat), validate() côté serveur pour la sûreté.
Une requête POST peut partir de curl, d'un script, d'un autre site — le HTML n'est pas une barrière.
-->

---
transition: slide-up | slide-down
---

# Les messages en français

```php
$validated = $request->validate([
    'title' => ['required', 'string', 'max:100'],
    // …
], [
    'title.required' => 'Le titre est obligatoire.',
    'title.max' => 'Le titre ne peut pas dépasser 100 caractères.',
]);
```

Le deuxième argument de `validate()` = vos **messages personnalisés**, par clé `champ.règle`.

<v-click>

Pour **tout** traduire d'un coup : `sail artisan lang:publish` puis un paquet de traductions communautaire comme `laravel-lang` — chaque règle obtient son message français sans le réécrire.

</v-click>

<!--
Sans personnalisation, les messages sont en anglais (« The title field is required. ») — acceptable en démo,
pas en production pour un public francophone.
laravel-lang/lang fournit les traductions maintenues par la communauté — bien plus rapide que tout écrire.
-->

---
transition: slide-up | slide-down
---

# Panorama : la validation

<script setup>
import validation from '/references/validation'
</script>

<Panorama :items="validation" doc="https://laravel.com/docs/12.x/validation" at="s5-ch3" />

<!--
Survol de 30 s, pas d'explication détaillée : montrer ce qui a été vu (badges « vu ») et où trouver le reste.
Pendant le « À vous », les apprenants peuvent revenir sur cette slide comme aide-mémoire.
-->

---
transition: slide-up | slide-down
---

# À vous : un jeu validé

<Exercise title="WishFlix — valider la création d'un jeu" duration="22 min" level="guidé"
  :criteria="[
    'store() appelle validate() avec une règle par champ du formulaire',
    'Un titre vide ramène au formulaire avec un message d\'erreur sous le champ',
    'La saisie est conservée (old()) y compris dans le select des catégories',
    'Un jeu valide est toujours créé puis affiché'
  ]"
  :hints="[
    'Le `<select>` se pré-remplit avec @selected, le <textarea> avec old() entre les balises',
    'Une catégorie inexistante ? La règle exists:categories,id la refuse',
    'Rechargez la page après une erreur : les messages disparaissent, ils étaient flashés'
  ]">

**Exercice** `05-formulaires-validation` — étape **A3** du README, puis **point de contrôle 1**.

Ajoutez la validation à **votre** formulaire de jeu, avec les règles choisies pour chaque champ.

**Spécificités WishFlix** : vos règles couvrent des champs absents de la démo — `platform_ids` / `platform_ids.*` (`array` + `exists:platforms,id`), `featured` (`boolean`), `cover_url` (`url`), `status` (`in:…`), `release_year` et `rating` (`between` / `numeric`) ; le README donne la contrainte de chaque champ. N'oubliez pas le champ caché `featured` `value="0"` (A3.4) et `@checked` pour les cases.

</Exercise>

<!--
Point de contrôle 1 dans le README (après A3). Palier de rattrapage : tag Campus Quest s5-ch3-validation
(relire le diff du chapitre, refaire sur WishFlix — pas de copie).
-->
