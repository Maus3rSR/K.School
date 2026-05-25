---

# Édition

Commenter rapidement

<div class="grid grid-cols-2 gap-8 mt-6">

<div v-click>

## 💬 Commentaire ligne

<Shortcut>Ctrl + /</Shortcut>

- Toggle : commente ou décommente
- Fonctionne sur la ligne ou la sélection
- Adapte le style au langage (// ou # ou --)

</div>

<div v-click>

## 📦 Commentaire bloc

<Shortcut>Shift + Alt + A</Shortcut>

- Crée un bloc `/* ... */`
- Idéal pour commenter plusieurs lignes
- Utile pour la documentation

</div>

</div>

<div v-click class="mt-8">

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

