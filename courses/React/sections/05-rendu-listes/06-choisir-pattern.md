---
layout: center
---

# Quel pattern choisir ?

&nbsp;

| Situation | Pattern recommandé |
|---|---|
| Condition complexe, beaucoup de JSX différent | `if` avant le `return` |
| Deux branches de JSX différentes | Opérateur ternaire `? :` |
| Une seule branche à afficher / cacher | `&&` — forcer un booléen |
| Ne rien rendre du tout | `return null` |

&nbsp;

> 💬 La lisibilité prime. Si vous hésitez, choisissez le pattern le plus **explicite**.

<!--
Cette slide est une référence rapide — les apprenants peuvent la retrouver comme aide-mémoire.
Pas besoin d'animer : le tableau est court et lisible d'un coup.
Transition : "On sait afficher ou cacher. Et si on a 50 tâches à afficher ? On ne va pas écrire 50 lignes de JSX."
-->
