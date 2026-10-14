---
layout: chapter
transition: slide-left | slide-right
number: 05
duration: 10 min
---

# Le piège N+1

- Repérer un accès à une relation en boucle
- Mesurer le nombre de requêtes réellement exécutées
- Savoir qu'une solution existe — sans l'ouvrir aujourd'hui

<!--
Chapitre court, un seul concept : le symptôme N+1.
La solution (eager loading, with()) est le cœur de la séance 4 — ne pas la dérouiller ici.
-->

---
transition: slide-up | slide-down
---

# Le piège N+1
À votre avis ?

<Quiz
  question="Une page affiche 50 quêtes, chacune avec le nom de sa catégorie. Combien de requêtes SQL pensez-vous qu'elle exécute ?"
  :options="[
    '1',
    '2',
    '51',
    '100'
  ]"
  :answer="2"
/>

<!--
Faites voter la salle : la plupart répondent 1 ou 2. La slide suivante dévoile le vrai chiffre.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le piège N+1
Compter les requêtes

::left::

```blade
@foreach ($quests as $quest)
    {{ $quest->title }} — {{ $quest->category->name }}
@endforeach
```

Chaque `$quest->category` dans la boucle exécute **sa propre requête** — la propriété magique interroge la base à chaque ligne.

::right::

<Terminal
  title="tinker" prompt=">"
  :lines="[
    { cmd: 'DB::enableQueryLog()' },
    { cmd: '$quests = Quest::all()' },
    { cmd: '$quests->each(fn ($q) => $q->category->name)' },
    { cmd: 'count(DB::getQueryLog())', out: '   = 11   // 1 + 10' }
  ]"
/>

10 quêtes → **11 requêtes** : 1 pour la liste, plus 1 par quête.

<!--
DB::enableQueryLog() + DB::getQueryLog() enregistrent chaque requête exécutée — en S4, la Debugbar
fera la même chose en mieux, directement dans la page. Faire deviner avant de révéler le chiffre.
-->

---
layout: fact
transition: slide-up | slide-down
---

# Le piège N+1
Ça ne passe pas à l'échelle

<div class="grid grid-cols-3 gap-8">
  <Stat value="11" label="requêtes pour 10 quêtes" color="blue" />
  <Stat value="101" label="requêtes pour 100 quêtes" color="orange" />
  <Stat value="1 001" label="requêtes pour 1 000 quêtes" color="red" />
</div>

<!--
Le coût grandit avec les données, pas avec le code : la page ralentit insensiblement puis s'écroule.
C'est pour ça que ce bug passe souvent inaperçu en dev (3 lignes de test) et explose en production.
-->

---
transition: slide-up | slide-down
---

# Le piège N+1
Un dossier à la fois, ou le chariot ?

<Analogy title="Comme le service des archives" icon="🗄️">

Vous avez 50 dossiers à consulter. Soit vous faites **50 allers-retours** à la salle des archives (le N+1), soit vous demandez **un seul chariot** chargé de tout (l'eager loading). Même résultat au final — pas le même temps.

</Analogy>

<!--
Insister sur le parallèle : la boucle = vos allers-retours, with() = le chariot unique.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le piège N+1
La solution existe — aperçu

::left::

```php
// Au lieu de Quest::all()
Quest::with('category')->get();
```

::right::

- `with('category')` = **eager loading** : les catégories sont chargées en **une** requête supplémentaire, toutes ensemble
- Résultat : **2 requêtes** au lieu de 11 — identique pour 10 ou 1 000 quêtes

<v-click>

<Alert type="info">

On le **mesure et on le corrige en S4** — aujourd'hui, sachez juste repérer le symptôme.

</Alert>

</v-click>

<!--
Ne PAS dérouiller with() : hors périmètre S3, c'est l'objet du chapitre Optimisation de la séance 4.
Le teaser suffit : le nom de la méthode est déjà la moitié de la réponse ("with" = le chariot).
-->
