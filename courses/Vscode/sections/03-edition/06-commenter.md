---
layout: two-cols-header
layoutClass: gap-4
---

# Édition

Commenter rapidement

::left::

<div v-click>

## 💬 Commentaire ligne

<Shortcut>Ctrl + :</Shortcut>

- Toggle : commente ou décommente
- Fonctionne sur la ligne ou la sélection
- Adapte le style au langage (// ou # ou --)

</div>

::right::

<div v-click>

## Cas d'usage

```ts
// Ctrl+/ pour commenter une ligne
const debug = true;

/* Shift+Alt+A pour un bloc
   de plusieurs lignes
   de commentaires */
```

</div>

<!--
Démonstration live :
- Écrire quelques lignes de code
- Montrer Ctrl+/ pour commenter/décommenter rapidement
- Montrer Shift+Alt+A pour un bloc de commentaires
- Insister : très utile pour désactiver temporairement du code pendant le debug

Points pédagogiques :
- / = slash, comme dans les commentaires //
- A = "Area" ou bloc (mnémotechnique)
- Ne pas abuser des commentaires : le code doit être auto-explicatif
-->

