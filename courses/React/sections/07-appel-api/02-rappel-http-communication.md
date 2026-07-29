---
layout: image-right
image: /http-communication-process.png
backgroundSize: contain
---

# Rappel — le cycle d'une requête HTTP

<v-clicks>

1. L'**URL** identifie la ressource demandée
2. Le navigateur traduit l'URL en **requête HTTP** et l'envoie au serveur
3. Le serveur répond avec un **statut** _(200, 404, etc.)_ + les données _(html, xml, json, texte, etc.)_
4. Le navigateur affiche le résultat à l'écran

</v-clicks>

<!--
Ce cycle est exactement ce que fetch() va faire pour nous en JavaScript : 2. Requête HTTP = ce que fetch(url) envoie, 3. HTTP Response = ce que fetch() nous renvoie sous forme de Promise.
L'objectif de ce rappel : donner un nom aux étapes avant de les manipuler en code dans la slide suivante.
Ne pas s'attarder sur le vocabulaire réseau bas niveau (TCP, DNS...) — rester au niveau navigateur/serveur.
-->
