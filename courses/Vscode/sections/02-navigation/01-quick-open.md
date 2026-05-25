---
layout: two-cols-header
---

# Navigation

Ouvrir des fichiers rapidement

::left::

<div v-click>

<Shortcut size="lg">Ctrl + P</Shortcut>

</div>

<div v-click class="mt-4">

## Quick Open

- Tapez quelques lettres du nom
- VS Code trouve instantanément
- Pas besoin du chemin complet

</div>

::right::

<div v-click>

## Exemples

| Vous tapez | VS Code trouve |
|------------|-----------------|
| `app` | `Application.ts` |
| `usrctrl` | `UserController.ts` |
| `idx` | `index.html` |

</div>

::bottom::

<Alert v-click class="mt-3">

Les lettres n'ont pas besoin d'être consécutives !

</Alert>

<!--
Démonstration live :
- Ouvrir un projet avec plusieurs fichiers
- Montrer qu'on peut taper "usrctrl" pour trouver "UserController"
- Comparer avec la recherche à la souris dans l'explorateur
- Insister : c'est le 2ème raccourci le plus utilisé

Différence avec Ctrl+Shift+P :
- Ctrl+P = fichiers (sans Shift)
- Ctrl+Shift+P = commandes (avec Shift)
- Mnémotechnique : Shift = "je veux faire quelque chose de spécial"
-->
