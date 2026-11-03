# Atelier WishFlix
Le back-office des jeux

<Exercise title="WishFlix — back-office CRUD des jeux" duration="2 h" level="guidé"
  :criteria="[
    'Route::resource pour les jeux, 7 actions fonctionnelles',
    'Création et édition validées par StoreGameRequest / UpdateGameRequest, erreurs affichées et saisie conservée',
    'Suppression via un formulaire DELETE protégé par @csrf',
    'Logique métier (plateformes, jeu à la une) dans un GameService injecté'
  ]">

Consignes dans le **README** de l'exercice `05-formulaires-validation` (`exercices/framework/`).

Au programme : ouvrir le back-office WishFlix — créer, éditer et supprimer des **jeux** depuis le navigateur, avec validation côté serveur, erreurs affichées et règles métier regroupées dans un service.

</Exercise>

<!--
Transposition identique au pattern démontré sur Campus Quest, sujet différent : les jeux WishFlix.
Travail perso : le CRUD complet des Category et Platform (routes resource, formulaires, Form Requests).
Bonus : upload de la jaquette — règle 'image' + Storage::put, affichage dans la fiche jeu.
Le README de l'exercice 05-formulaires-validation est à venir — vérifier qu'il est en ligne avant la séance.
-->
