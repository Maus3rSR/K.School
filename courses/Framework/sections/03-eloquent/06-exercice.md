# À la maison
Votre WishFlix tourne sur une vraie base

<Exercise title="WishFlix — seeders, plateformes et sous le capot" duration="≈ 2 h" level="autonome"
  :criteria="[
    'La Partie A de la séance est terminée (point de contrôle 5)',
    'GameFactory + ≈ 20 jeux variés via migrate:fresh --seed',
    'La fiche jeu liste ses plateformes',
    'REPONSES.md contient la section « Séance 3 — Sous le capot »'
  ]">

Consignes dans le **README** de l'exercice `03-eloquent`.

La Partie A a été validée chapitre par chapitre (5 points de contrôle). **Partie B** (≈ 1h15) : deux user stories — seeders complets avec `GameFactory`, puis plateformes sur la fiche jeu. **Partie C** (≈ 45 min) : vous ouvrez le code d'Eloquent pour voir comment vos conventions fonctionnent. Bonus : compteur par catégorie, slug dans l'URL, `status` en enum.

</Exercise>

<!--
La Partie A était répartie dans la séance : chaque chapitre s'est terminé par sa slide d'exercice et son point de contrôle (tags de rattrapage s3-ch1-table-objet … s3-ch5-catalogue-n1). Un élève en retard relit le diff du tag du chapitre où il s'est arrêté et refait sa partie sur WishFlix.
Charge : attendu ≈ 2 h à la maison (B + C), bonus facultatifs. Requis pour la S4 : le point de contrôle 5 — en S4 on interroge cette base avec des requêtes plus fines.
Partie C (~45 min, chez vous) : lecture guidée du code Eloquent (getTable, table pivot devinée, __get/getAttribute), réponses notées dans REPONSES.md.
Moment léger : annoncer que le tableau PHP de la S2 est officiellement à la retraite — fin de carrière honorable, pas de pot de départ.
-->
