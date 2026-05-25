---
layout: two-cols-header
---

# Snippets

Utiliser les snippets intégrés

::left::

<div v-click class="mt-6">

## Comment ça marche ?

1. Tapez le préfixe du snippet (ex: `log`)
2. VS Code propose le snippet dans l'autocomplétion
3. Appuyez sur <Shortcut size="sm">Tab</Shortcut> ou <Shortcut size="sm">Entrée</Shortcut>
4. Le code s'insère avec le curseur bien placé !

</div>

::right::

<div v-click class="mt-6">

## Snippets JavaScript/TypeScript courants

<div class="text-xs">

| Préfixe | Résultat |
|---------|----------|
| `log` | `console.log()` |
| `if` | Structure if complète |
| `for` | Boucle for |
| `fn` | Déclaration de fonction |
| `afn` | Arrow function |

</div>

</div>

::bottom::

<Alert v-click class="mt-3">

&nbsp; <Shortcut size="sm">Ctrl + Espace</Shortcut> pour forcer les suggestions

</Alert>

<!--
Démonstration live :
- Ouvrir un fichier .ts ou .js
- Taper "log" et montrer l'autocomplétion
- Tab pour insérer, montrer que le curseur est dans les parenthèses
- Montrer d'autres snippets : if, for, foreach
- Insister : les snippets varient selon le langage du fichier

Points pédagogiques :
- Les snippets sont contextuels (dépendent du langage)
- Tab pour naviguer entre les "trous" à remplir
- Échap pour sortir du mode snippet
-->
