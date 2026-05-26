---
layout: default
---

# Multi-Curseur

Sélection par motif

<div v-click class="mt-6">

## Rappel : les raccourcis de sélection

| Raccourci | Action |
|-----------|--------|
| <Shortcut size="sm">Ctrl + D</Shortcut> | Sélectionne l'occurrence suivante |
| <Shortcut size="sm">Ctrl + Shift + L</Shortcut> | Sélectionne toutes les occurrences |

</div>

<div v-click class="mt-6">

## La magie : chaque sélection = un curseur !

Après avoir sélectionné plusieurs occurrences, vous avez automatiquement un curseur sur chacune.

Tapez → toutes les sélections changent en même temps !

</div>

<Alert v-click class="mt-4">

Sélectionnez `item` avec Ctrl+D (3×) → tapez `product` → tout change !

</Alert>

<!--
Démonstration live :
- Écrire du code avec plusieurs occurrences de "item"
- Ctrl+D pour sélectionner progressivement
- Montrer que chaque sélection a son propre curseur
- Taper "product" → toutes les occurrences changent
- Comparer avec F2 : Ctrl+D est plus manuel mais plus flexible

Points pédagogiques :
- Ctrl+D = sélection progressive avec contrôle
- Ctrl+Shift+L = tout d'un coup (plus risqué)
- Combinaison puissante avec le multi-curseur
-->
