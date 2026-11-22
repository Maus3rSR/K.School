---
transition: slide-up | slide-down
---

# Atelier WishFlix
Comptes, rôles et wishlist

<Exercise title="WishFlix — authentification et sécurité" duration="≈ 1h25 au fil des chapitres" level="guidé"
  :criteria="[
    'Connexion avec le compte démo de la maquette, déconnexion depuis la barre',
    'Back-office des jeux réservé à l\'admin : 302 pour un invité, 403 pour un joueur',
    'Un joueur connecté ajoute un jeu à sa wishlist, sans doublon',
    'XSS et injection SQL provoquées puis bloquées, les quatre points de contrôle cochés'
  ]">

Consignes dans le **README** de l'exercice `06-authentification-securite`.

**Socle** : les micro-pratiques des chapitres 01 à 08, déjà faites en séance. **Chez vous** : la page wishlist dynamique et les jeux de la wishlist signalés sur l'accueil (≈ 1h15), la Partie C (≈ 45 min). **Bonus** : inscription d'un nouvel utilisateur, back-office complet protégé, `GamePolicy`.

</Exercise>

<!--
Les deux US attendues : US1 page /wishlist dynamique (protégée, liste + Retirer, compteur dans la barre) ; US2 accueil qui signale les jeux déjà en wishlist, sans N+1.
Bonus : inscription (vue register de Breeze dans le layout WishFlix), protection des CRUD Category/Platform de la S5, GamePolicy à la place de la Gate (l'aperçu du chapitre 05), page 403 personnalisée.
La S7 rendra l'ajout/retrait de la wishlist instantané (fetch) : le POST /wishlist/{game} d'aujourd'hui sera repris.
-->
