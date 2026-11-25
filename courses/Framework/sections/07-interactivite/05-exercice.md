---
transition: slide-up | slide-down
---

# Atelier WishFlix
Interactivité et cache

<Exercise title="WishFlix — fetch, JSON et cache" duration="≈ 1h30 au fil des chapitres" level="guidé"
  :criteria="[
    'Ajout à la wishlist en fetch : pas de rechargement, repli classique si erreur',
    'Réponse JSON { in_wishlist, count } quand le client envoie Accept: application/json',
    'Section « Mieux notés » en cache 10 min, invalidée à chaque écriture de jeu',
    'Les trois points de contrôle du README sont cochés'
  ]">

Consignes dans le **README** de l'exercice `07-interactivite-optimisation`.

**Socle** : les micro-pratiques des chapitres 01 à 04, déjà faites en séance. **Chez vous** : le compteur de la barre en direct et le retrait sans rechargement (≈ 1h15), la Partie C « Sous le capot » (≈ 45 min). **Bonus** : filtre du catalogue en direct, cache du compteur par catégorie, `Cache::flexible`.

</Exercise>

<!--
Les deux US attendues : US1 le badge « Wishlist » de la navbar qui prend data.count après chaque ajout (y compris depuis les cartes de l'accueil) ;
US2 le « Retirer » de /wishlist en fetch (FormData + _method=DELETE, destroy() en JSON, carte qui disparaît, message « wishlist vide »).
Bonus : filtre en direct (fetch GET + query string), bouton désactivé pendant la requête, cache du compteur de jeux par catégorie (S4 A5), Cache::flexible (Panorama).
Le README de l'exercice 07-interactivite-optimisation décrit les étapes, les paliers de rattrapage (tags Campus Quest) et la Partie C.
La S8 est un atelier pratique : c'est le moment de rattraper la Partie A si elle n'est pas finie.
-->
