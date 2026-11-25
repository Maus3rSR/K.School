---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-left | slide-right
---

# Lexique

::left::

<TermCard term="Asynchronous" translation="(Asynchrone)" definition="Une action lancée sans attendre sa fin : la page reste réactive pendant la requête" />

<TermCard term="Cache" definition="Copie temporaire d'une donnée coûteuse à produire, relue au lieu d'être recalculée" />

<TermCard term="DOM" translation="(Document Object Model)" definition="La représentation de la page en objets que JavaScript peut lire et modifier" />

<TermCard term="Fetch" definition="La fonction JavaScript qui envoie une requête HTTP au serveur, en arrière-plan" />

<TermCard term="FormData" definition="Objet JavaScript qui empaquette tous les champs d'un formulaire, jeton CSRF compris" />

::right::

<TermCard term="Header" translation="(En-tête)" definition="Métadonnée d'une requête ou réponse HTTP : format attendu, authentification…" />

<TermCard term="JSON" definition="Format texte d'échange de données : paires clé/valeur, lisible par tous les langages" />

<TermCard term="Response" translation="(Réponse)" definition="L'objet renvoyé par fetch : statut, en-têtes et corps à lire" />

<TermCard term="TTL" translation="(Time To Live)" definition="Durée de vie d'une entrée en cache avant d'être recalculée" />

<!--
Termes centraux : fetch et Response structurent le chapitre 02 ; JSON et l'en-tête Accept structurent le chapitre 03 ;
cache et TTL structurent le chapitre 04. Tous sont des mots que les étudiants croiseront dans la doc et en entretien.
DOM et FormData sont là parce que le code du chapitre 02 les utilise directement.
-->
