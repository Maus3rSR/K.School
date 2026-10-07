---
layout: chapter
number: 8
duration: 10 min
---

# Vite et pages d'erreur

- Servir vos CSS et JS avec Vite
- Charger une CSS propre à chaque page
- Personnaliser la page 404 de l'application

<!--
Dernier chapitre du cours : deux sujets courts mais indispensables pour l'atelier.
-->

---

# Vite et pages d'erreur
Vite compile et sert vos assets

Vite compile le CSS et le JS, les sert en développement et **recharge la page automatiquement** à chaque modification.

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail npm install', out: 'added 42 packages in 3s' },
    { cmd: 'sail npm run dev', out: '  VITE v7  ready in 352 ms\n\n  ➜  APP_URL: http://localhost' }
  ]"
/>

<Alert type="warning">Sans `sail npm run dev` (ou `sail npm run build`), chaque page affiche l'erreur « Vite manifest not found ».</Alert>

<!--
Le terminal npm run dev reste ouvert pendant tout le développement, à côté de sail up.
C'est l'erreur n°1 des premiers jours : l'apprendre à reconnaître fait gagner du temps à toute la promo.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
---

# Vite et pages d'erreur
Une CSS par page

::left::

```js {none|8-12|13|all}
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/css/quests.css',
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
```

::right::

<div v-click="1">

`input` — chaque fichier CSS / JS à charger doit être **déclaré** ici. `quests.css` vient d'y être ajouté.

</div>

<div v-click="2">

`refresh: true` — Vite recharge la page quand un fichier `resources/` change.

</div>

<div v-click="3">

Côté Blade : la page charge sa CSS avec `@vite('resources/css/quests.css')` dans `@section('styles')` (vu au chapitre 7).

</div>

<!--
Après chaque ajout dans input, vérifier que npm run dev tourne — sinon l'entrée n'est pas compilée.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
---

# Vite et pages d'erreur
La page 404 personnalisée

::left::

```php
public function show(int $id)
{
    abort_unless(isset($this->quests[$id]), 404);

    return view('quests.show',
        ['quest' => $this->quests[$id], 'id' => $id]);
}
```

`abort(404)` cherche `resources/views/errors/404.blade.php` — qui peut `@extends('layouts.app')` comme n'importe quelle page :

- Titre : « Cette quête n'existe pas (encore) »
- Lien retour : `route('quests.index')`
- Déclenchée aussi par **toute URL inconnue**

::right::

<Browser url="localhost/quests/999" title="Campus Quest">
  <Placeholder :w="800" :h="500" text="Erreur 404" />
</Browser>

<!--
Option : sail artisan vendor:publish --tag=laravel-errors récupère les vues d'erreur par défaut comme point de départ.
Tester en direct : /quests/999 ET /nimportequoi renvoient la même page.
-->
