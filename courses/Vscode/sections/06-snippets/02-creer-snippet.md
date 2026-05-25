---
layout: two-cols-header
layoutClass: gap-x-4
---

# Snippets

Créer son premier snippet

::left::

<div v-click>

## Accéder

<Shortcut size="sm">Ctrl + Shift + P</Shortcut> → "Configure User Snippets"

</div>

<Alert v-click class="mt-2">

`$1`, `$2`... = positions curseur (Tab)

</Alert>

::right::

<div v-click>

## Structure

```json
"Test": {
  "prefix": "vtest",
  "body": ["test('$1', () => {", "  $2", "});"]
}
```

</div>

<!--
Démonstration live :
- Ouvrir les snippets utilisateur pour TypeScript
- Créer le snippet "vtest" ensemble
- Tester le snippet dans un fichier .test.ts
- Montrer la navigation avec Tab entre les positions

Points pédagogiques :
- Les snippets personnalisés sont stockés en JSON
- On peut partager ses snippets avec l'équipe
- Commencer simple, complexifier ensuite
-->
