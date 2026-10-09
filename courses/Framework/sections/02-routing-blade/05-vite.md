---
layout: chapter
transition: slide-left | slide-right
number: 05
duration: 10 min
---

# Vite

- Servir vos CSS et JS avec Vite
- Charger une CSS propre à chaque page

<!--
Vite est le choix par défaut de Laravel — nécessaire pour Breeze (S6) et le JS fetch (S7).
Chapitre volontairement réduit : l'essentiel pour l'atelier, pas un cours Vite.
-->

---
transition: slide-up | slide-down
---

# Vite
Vite compile et sert vos assets (CSS, JS)

Vous ouvrez la page et Laravel affiche **« Vite manifest not found »** : la page réclame ses CSS, mais personne ne les a compilées.

<v-click>

Vite **compile** le CSS et le JS, les **sert** pendant le développement et **recharge la page** à chaque modification :

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail npm install', out: 'added 42 packages in 3s' },
    { cmd: 'sail npm run dev', out: '  VITE v7  ready in 352 ms\n\n  ➜  APP_URL: http://localhost' }
  ]"
/>

</v-click>

<v-click>

<Alert type="info">

Gardez `sail npm run dev` ouvert dans un second terminal, à côté de `sail up`. Pour un rendu sans serveur Vite : `sail npm run build`.

</Alert>

</v-click>

<!--
C'est l'erreur n°1 des premiers jours : apprendre à la reconnaître fait gagner du temps à toute la promo.
Le premier npm install sous Sail peut être long : c'est normal.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Vite
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

Côté Blade : la page charge sa CSS avec `@vite('resources/css/quests.css')` dans `@section('styles')` (vu au chapitre 4).

</div>

<!--
Après chaque ajout dans input, vérifier que npm run dev tourne — sinon l'entrée n'est pas compilée.
-->
