# Atelier WishFlix
Le catalogue lit la base de données

<Exercise title="WishFlix — modèles, migrations et seeders" duration="2 h" level="guidé"
  :criteria="[
    'Trois modèles (Game, Category, Platform) et leurs migrations jouées',
    'Relations belongsTo / hasMany / belongsToMany fonctionnelles',
    'sail artisan migrate:fresh --seed reconstruit la base peuplée',
    'Accueil et /game/{id} lisent la base — 404 via findOrFail'
  ]">

Consignes dans le **README** de l'exercice `03-eloquent` (`exercices/framework/`).

Au programme : vérifier la connexion MariaDB, créer les modèles `Game` / `Category` / `Platform` avec leurs migrations et relations, remplir la base avec des seeders — puis brancher le catalogue WishFlix dessus, à la place du tableau PHP de la S2.

</Exercise>

<!--
La Partie A remplace les données en dur par Eloquent : le tableau PHP de la S2 disparaît du contrôleur.
Travail perso : seeders complets (~20 jeux) avec GameFactory et états ; bonus : slug unique dans l'URL de la fiche.
Le README ajoute une Partie C « Sous le capot » (~45 min, chez vous) : lecture guidée du code Eloquent (getTable, table pivot devinée, __get/getAttribute), réponses notées dans REPONSES.md.
-->
