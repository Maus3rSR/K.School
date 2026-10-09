---
layout: chapter
transition: slide-left | slide-right
number: 06
duration: 10 min
---

# Pages d'erreur

- Interrompre une action avec `abort()`
- Personnaliser la page 404 de l'application

<!--
Chapitre court : la 404 personnalisée est une application directe des layouts du chapitre 4.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Pages d'erreur
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

<v-click>

<Browser url="localhost/quests/999" title="Campus Quest">
  <Placeholder :w="800" :h="500" text="Erreur 404" />
</Browser>

</v-click>

<!--
Option : sail artisan vendor:publish --tag=laravel-errors récupère les vues d'erreur par défaut comme point de départ.
Tester en direct : /quests/999 ET /nimportequoi renvoient la même page.
-->
