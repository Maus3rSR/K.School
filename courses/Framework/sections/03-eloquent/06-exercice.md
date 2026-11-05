# Atelier WishFlix
Le catalogue lit la base de données

<Exercise title="WishFlix — modèles, relations et catalogue branché" duration="≈ 1 h (réparti dans les chapitres)" level="guidé"
  :criteria="[
    'Category, Game et Platform existent avec leurs migrations jouées (migrate:status : tout à Ran)',
    'Game belongsTo Category et belongsToMany Platform, relations inverses déclarées',
    'sail artisan migrate:fresh --seed reconstruit la base peuplée',
    'Accueil et /game/{id} lisent la base — 404 via findOrFail'
  ]">

Consignes dans le **README** de l'exercice `03-eloquent` : la Partie A est découpée en **5 groupes d'étapes**, un par chapitre, chacun avec son point de contrôle.

À la maison : 2 user stories (seeders complets avec factory, plateformes sur la fiche) + la Partie C « Sous le capot ». Bonus : compteur par catégorie et slug dans l'URL.

</Exercise>

<!--
La Partie A est répartie dans la séance : après chaque chapitre, les étudiants transposent sur WishFlix et valident le point de contrôle avant de passer au suivant. Un étudiant en retard relit le diff du tag Campus Quest du chapitre (s3-chN-…) et refait sa partie sur WishFlix.
Charge : socle ≈ 1 h au rythme du formateur (comptez 2 à 3 fois plus pour un étudiant lent), attendu ≈ 2 h à la maison (B + C), bonus facultatifs.
Partie C (~45 min, chez vous) : lecture guidée du code Eloquent (getTable, table pivot devinée, __get/getAttribute), réponses notées dans REPONSES.md.
Moment léger : annoncer que le tableau PHP de la S2 est officiellement à la retraite — fin de carrière honorable, pas de pot de départ.
-->
