---
layout: two-cols-header
---

# Édition

Supprimer une ligne

::left::

<div v-click>

## 🗑️ Supprimer la ligne entière

<Shortcut>Ctrl + Shift + K</Shortcut>

- Supprime toute la ligne d'un coup
- Pas besoin de sélectionner
- Fonctionne aussi sur plusieurs lignes sélectionnées

</div>

::right::

<div v-click>

## 🔄 Alternative : Couper sans sélection

<Shortcut>Ctrl + X</Shortcut> (sans sélection)

- Coupe la ligne entière
- Utile si vous voulez la coller ailleurs
- Comportement par défaut de VS Code

</div>

::bottom::

<Alert v-click type="warning">

&nbsp; <Shortcut size="sm">Ctrl + Shift + K</Shortcut> = supprimer | <Shortcut size="sm">Ctrl + X</Shortcut> = couper (récupérable) mais écrase le press-papier

</Alert>

<!--
Démonstration live :
- Écrire quelques lignes de code
- Ctrl+Shift+K pour supprimer une ligne
- Ctrl+X sans sélection pour couper une ligne
- Montrer la différence : K = supprime, X = coupe (dans le presse-papier)

Points pédagogiques :
- K = "Kill" (supprimer définitivement)
- X = couper classique, mais sur toute la ligne si pas de sélection
- Très utile pour nettoyer du code rapidement
-->
