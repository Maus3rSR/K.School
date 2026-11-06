# Atelier WishFlix
Le catalogue filtre, cherche — et se mesure

<Exercise title="WishFlix — requêtes et optimisation" duration="2 h" level="guidé"
  :criteria="[
    'Filtre par catégorie sur le catalogue via ?category=',
    'Jeu « À la une » (featured) et section meilleures notes',
    'N+1 diagnostiqué puis corrigé — chiffres avant/après notés',
    'Recherche par titre ?q= combinée au filtre (travail perso)'
  ]">

Consignes dans le **README** de l'exercice `04-requetes` (`exercices/framework/`).

Au programme : installer la Debugbar, filtrer le catalogue par catégorie, mettre un jeu « à la une » et les meilleures notes — puis traquer le N+1 du catalogue, le mesurer dans la Debugbar et le corriger.

</Exercise>

<!--
La Partie A rend le catalogue WishFlix filtrable et à la une ; le N+1 du catalogue (chaque carte lit
$game->category->name) est diagnostiqué puis corrigé avec with() — chiffres notés dans REPONSES.md.
Travail perso : recherche par titre ?q= avec when(), combinée au filtre ; bonus : paginate() + withQueryString().
Le README ajoute une Partie C « Sous le capot » (~45 min, chez vous) : lecture guidée de when() et paginate()
dans vendor/laravel/framework, réponses notées dans REPONSES.md.
-->
