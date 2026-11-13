# Atelier WishFlix
Le catalogue filtre, cherche — et se mesure

<Exercise title="WishFlix — requêtes et optimisation" duration="2 h" level="guidé"
  :criteria="[
    'Catalogue filtrable par catégorie (?category=) et paginé (9 par page)',
    'Jeu « à la une » (featured) et section meilleures notes',
    'N+1 diagnostiqué puis corrigé — chiffres avant/après notés dans REPONSES.md',
    'Recherche par titre ?search= combinée au filtre (travail perso)'
  ]">

Le socle (étapes A1 à A6) a été fait en séance : filtre, Debugbar, eager loading, compteur, pagination. Consignes complètes dans le **README** de l'exercice `04-requetes` (`exercices/framework/`).

Au programme hors séance : la Partie B (recherche par titre puis recherche + filtre combinés), la Partie C « Sous le capot » (lecture guidée de `when()` et `paginate()` dans `vendor/laravel/framework`, réponses dans REPONSES.md) et les bonus. La comparaison Query Builder / Eloquent détaillée, `groupBy` / `having` et `whereHas` forment une annexe (lecture, hors parcours).

</Exercise>

<!--
Le socle de la Partie A (A1-A6, ≈ 1h30 en séance) est fait en séance, chapitre par chapitre :
à la une + meilleures notes (ch1), filtre catégorie (ch2), Debugbar installée + N+1 mesuré (ch3),
with('category') + chiffres après (ch4), withCount dans le select (ch5), paginate(9) + links()
+ withQueryString (ch6). Reste à la maison : Partie B (US1 recherche ?search= ~40 min, US2 combiné
~35 min — pagination conserve q via withQueryString), Partie C (~45 min : when(), paginate()
dans vendor/), bonus (top catégories withAvg, inRandomOrder, simplePaginate).
-->
