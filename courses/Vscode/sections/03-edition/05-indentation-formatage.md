# Édition

Indentation et formatage

<div class="grid grid-cols-2 gap-8 mt-6">

<div v-click>

## ➡️ Indentation manuelle

<Shortcut>Ctrl + ]</Shortcut> Indenter
<br/>
<Shortcut>Ctrl + [</Shortcut> Désindenter

- Fonctionne sur la ligne ou la sélection
- Utile pour ajuster rapidement le niveau

</div>

<div v-click>

## ✨ Formatage automatique

<Shortcut>Shift + Alt + F</Shortcut>

- Reformate **tout le document**
- Respecte les règles du projet (Prettier, ESLint...)
- Corrige indentation, espaces, sauts de ligne

</div>

</div>

<Alert v-click class="mt-4">

**Configuration dans vos préférences utilisateur**

Format on Save : `"editor.formatOnSave": true`

</Alert>

<!--
Démonstration live :
- Écrire du code mal indenté volontairement
- Montrer Shift+Alt+F pour tout reformater d'un coup
- Montrer les paramètres Format on Save
- Insister : fini les débats tabs vs spaces, le formateur décide !

Points pédagogiques :
- F = Format (facile à retenir)
- Le formatage automatique évite les conflits dans les équipes
- Tout le monde a le même style de code
-->
