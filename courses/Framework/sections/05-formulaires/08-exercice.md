# Atelier WishFlix
Le back-office des jeux

<Exercise title="WishFlix — back-office CRUD des jeux" duration="1 h" level="guidé"
  :criteria="[
    'Création validée : routes GET/POST, @csrf, validate(), erreurs affichées et saisie conservée',
    'Édition et suppression : @method PUT et DELETE, Route::resource, binding Game $game',
    'Validation centralisée dans StoreGameRequest et UpdateGameRequest',
    'Les trois points de contrôle du README sont cochés'
  ]">

Consignes dans le **README** de l'exercice `05-formulaires-validation`.

**Socle** : les micro-pratiques des chapitres 02 à 06, déjà faites en séance. **Chez vous** : le CRUD des catégories et des plateformes (≈ 1h15), la Partie C (≈ 45 min). **Bonus** : une 3e user story, `GameService`, upload de la jaquette.

</Exercise>

<!--
Les services forment une annexe (hors parcours) : le GameService de WishFlix est un bonus, pas un attendu.
Travail perso : CRUD complet Category et Platform (Route::resource, formulaires, Form Requests) — les deux US attendues.
Bonus : GameService, upload de la jaquette (règle 'image' + Storage), 3e US.
Le README de l'exercice 05-formulaires-validation décrit les étapes, les paliers de rattrapage (tags Campus Quest) et la Partie C.
-->
