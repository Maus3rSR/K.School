---
layout: two-cols-header
---

# Refactoring Intelligent

Extraire une fonction

::left::

<div v-click class="mt-8">

<Shortcut size="xl">Ctrl + Shift + R</Shortcut>

</div>

<div v-click class="mt-6">

## Comment ça marche ?

1. Sélectionnez un bloc de code
2. Appuyez sur <Shortcut size="sm">Ctrl + Shift + R</Shortcut>
3. Choisissez "Extract to function"
4. Donnez un nom explicite
5. VS Code crée la fonction et l'appel automatiquement !

</div>

::right::

<Alert v-click class="mt-4">

**Avant** : `const total = items.reduce(...)` (5 lignes) → **Après** : `calculateFinalPrice(items)`

</Alert>

<!--
Démonstration live :
- Écrire un bloc de code de 5-6 lignes
- Sélectionner le bloc
- Ctrl+Shift+R → Extract to function
- Montrer que VS Code détecte automatiquement les paramètres nécessaires
- Nommer la fonction de manière explicite

Points pédagogiques :
- R = Refactor (menu de refactoring)
- Extraire = rendre le code plus lisible et réutilisable
- Une fonction doit faire UNE seule chose
-->
