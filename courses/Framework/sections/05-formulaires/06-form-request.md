---
layout: chapter
transition: slide-left | slide-right
number: 06
duration: 25 min
---

# Les Form Requests

- Centraliser les règles dans une classe dédiée
- Injecter la Form Request dans le contrôleur
- Réutiliser les règles entre `store()` et `update()`

<!--
Transition : la validation marche, mais elle est collée au contrôleur — et elle est recopiée entre store() et update(). On la sort.
Durée : ≈ 15 min de slides + livecoding, ≈ 10 min de micro-pratique WishFlix.
Moment léger : « le contrôleur a perdu 12 lignes — il a repris la course à pied ».
Tag Campus Quest de fin de chapitre : s5-ch6-form-request.
-->

---
transition: slide-up | slide-down
---

# Le problème : la duplication

<Compare badLabel="❌ validate() dans le contrôleur" goodLabel="✅ Une Form Request">
  <template #bad>

```php
public function store(Request $request)
{
    $validated = $request->validate([
        'title' => ['required', 'string', 'max:100'],
        'xp' => ['required', 'integer', 'min:0', 'max:500'],
        // … 5 règles, déjà recopiées dans update()
    ]);
}
```

  </template>
  <template #good>

```php
public function store(StoreQuestRequest $request)
{
    Quest::create($request->validated());
}
```

Les règles vivent dans une **classe dédiée**, réutilisée par les deux actions.

  </template>
</Compare>

<!--
store() et update() valident les mêmes champs : deux copies = deux endroits à maintenir, divergences garanties.
La Form Request est une classe de requête spécialisée : elle remplace Request dans la signature.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Générer la classe

::left::

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan make:request StoreQuestRequest', out: '   INFO  Request [app/Http/Requests/StoreQuestRequest.php] created successfully.' }
  ]"
/>

::right::

<v-click>

<FileTree :tree="[
  { name: 'app', children: [
    { name: 'Http', children: [
      { name: 'Controllers' },
      { name: 'Requests', children: [
        { name: 'StoreQuestRequest.php', highlight: true, comment: 'règles + autorisation' }
      ]}
    ]}
  ]}
]" />

Convention : `Store`/`Update` + le nom du modèle — une classe par formulaire.

</v-click>

<!--
Le dossier app/Http/Requests/ est créé par la première commande make:request.
Laravel fournit souvent deux classes : StoreQuestRequest et UpdateQuestRequest — les règles peuvent diverger
(ex. un champ requis à la création mais pas à l'édition).
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# La classe `StoreQuestRequest`

::left::

```php {all|3-6|8-17|19-22|all}
class StoreQuestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // l'autorisation arrive en S6
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'xp' => ['required', 'integer', 'min:0', 'max:500'],
            'difficulty' => ['required', Rule::in(['easy', 'medium', 'hard'])],
            'category_id' => ['required', 'exists:categories,id'],
        ];
    }

    public function messages(): array
    {
        return ['title.required' => 'Le titre est obligatoire.'];
    }
}
```

::right::

<div v-click="1">

`authorize()` — *qui* peut soumettre ce formulaire ? `true` pour l'instant : la vraie autorisation (rôles, propriétaire) arrive **en S6**.

</div>

<div v-click="2">

`rules()` — les **mêmes règles** qu'au chapitre 4, simplement déplacées ici.

</div>

<div v-click="3">

`messages()` — les traductions, regroupées avec les règles.

</div>

<div v-click="4">

Une classe = **tout ce qui concerne la validation** du formulaire : droit d'accès, règles, messages.

</div>

<!--
authorize() à false → 403 Forbidden avant même la validation. Utile plus tard (propriétaire de la quête, admin).
D'autres hooks existent : prepareForValidation() pour nettoyer la saisie avant les règles — mention orale seulement.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le contrôleur s'allège

::left::

```php
public function store(StoreQuestRequest $request)
{
    Quest::create($request->validated());

    return redirect()->route('quests.index')->with('success', 'Quête créée !');
}
```

::right::

- Le type `StoreQuestRequest` dans la signature suffit : Laravel **valide avant** d'appeler la méthode — en échec, `store()` n'est jamais exécutée
- `$request->validated()` renvoie **uniquement** les données validées

<v-click>

<Definition term="Form Request">

Une classe qui encapsule la validation d'un formulaire : **autorisation + règles + messages**, injectée à la place de `Request`.

</Definition>

</v-click>

<v-click>

`update()` reçoit sa jumelle `UpdateQuestRequest` — même mécanisme, règles ajustables séparément.

</v-click>

<!--
C'est le même mécanisme d'injection que Request ou Quest : déclarer le type, Laravel fournit l'objet validé.
Si la validation échoue : même comportement qu'au chapitre 4 — redirection, erreurs et old() flashés.
-->

---
transition: slide-up | slide-down
---

# `UpdateQuestRequest` : la jumelle

```php {all|1|3-6|all}
class UpdateQuestRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array { /* mêmes règles que StoreQuestRequest */ }
}

public function update(UpdateQuestRequest $request, Quest $quest)
{
    $quest->update($request->validated());
    return redirect()->route('quests.show', $quest)->with('success', 'Quête mise à jour !');
}
```

<v-click>

Deux classes, une par formulaire : le jour où l'édition diffère (champ facultatif, règle `unique`), vous ne touchez que **celle-là**.

</v-click>

<!--
Pour une règle unique à l'édition : Rule::unique('quests', 'title')->ignore($this->quest) — mention orale seulement.
Pas d'héritage entre les deux classes dans le cours : deux fichiers explicites, plus simples à lire.
-->

---
transition: slide-up | slide-down
---

# Panorama : les Form Requests

<script setup>
import formRequest from '/references/form-request'
</script>

<Panorama :items="formRequest" doc="https://laravel.com/docs/12.x/validation#form-request-validation" at="s5-ch6" />

<!--
Survol de 30 s, pas d'explication détaillée : montrer ce qui a été vu (badges « vu ») et où trouver le reste.
Pendant le « À vous », les apprenants peuvent revenir sur cette slide comme aide-mémoire.
-->

---
transition: slide-up | slide-down
---

# Panorama : Artisan

<script setup>
import artisan from '/references/artisan'
</script>

<Panorama :items="artisan" doc="https://laravel.com/docs/12.x/artisan" at="s5-ch6" />

<!--
Survol de 30 s, pas d'explication détaillée : montrer ce qui a été vu (badges « vu ») et où trouver le reste.
Pendant le « À vous », les apprenants peuvent revenir sur cette slide comme aide-mémoire.
-->

---
transition: slide-up | slide-down
---

# À vous : une Form Request

<Exercise title="WishFlix — Form Request des jeux" duration="10 min" level="guidé"
  :criteria="[
    'StoreGameRequest et UpdateGameRequest existent dans app/Http/Requests',
    'store() et update() ne contiennent plus de validate()',
    'Les messages d\'erreur et old() fonctionnent comme avant'
  ]"
  :hints="[
    'sail artisan make:request StoreGameRequest',
    'authorize() renvoie true pour l\'instant',
    'Déplacez vos règles telles quelles dans rules() : c\'est du copier-coller'
  ]">

**Exercice** `05-formulaires-validation` — étape **A6** du README, puis **point de contrôle 3**.

Déplacez vos règles dans deux classes : le comportement ne change pas.

</Exercise>

<!--
Point de contrôle 3 dans le README (après A6). Palier de rattrapage : tag Campus Quest s5-ch6-form-request.
Les services (chapitre suivant) sont une démo : pas de micro-pratique.
-->
