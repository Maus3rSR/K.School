---
layout: two-cols-header
---

# Navigation

Peek Definition : voir sans quitter

::left::

<div v-click>

## ❌ Le problème

- `F12` vous emmène dans un autre fichier
- Vous perdez le contexte
- Il faut revenir avec <Shortcut>Alt + ←</Shortcut>

</div>

::right::

<div v-click>

## ✅ La solution : Peek

<Shortcut size="lg">Alt + F12</Shortcut>

- Aperçu **inline** de la définition
- Vous restez dans votre fichier
- Modifiable dans l'aperçu !

</div>

::bottom::

<Alert v-click>

Cas d'usage : Vérifier les paramètres d'une fonction avant de l'appeler

</Alert>

<!--
Démonstration live :
- Montrer F12 qui change de fichier (perte de contexte)
- Puis Alt+F12 qui ouvre l'aperçu inline (contexte préservé)
- Modifier quelque chose dans l'aperçu pour montrer que c'est éditable
- Fermer avec Échap

Points pédagogiques :
- Peek = "jeter un œil" en anglais
- Très utile pour vérifier une signature de fonction
- Évite les allers-retours constants entre fichiers
-->
