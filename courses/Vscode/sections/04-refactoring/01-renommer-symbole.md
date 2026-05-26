---
layout: default
---

# Refactoring Intelligent

Renommer un symbole partout

<div v-click class="mt-8">

<Shortcut size="xl">F2</Shortcut>

</div>

<div v-click class="mt-8">

## Pourquoi F2 et pas Find & Replace ?

| Find & Replace | Rename Symbol (F2) |
|----------------|-------------------|
| Remplace du texte aveuglément | Comprend le contexte |
| Peut casser le code | Sécurisé, respecte le scope |
| `user` dans `username` = problème | Seule la variable `user` change |

</div>

<Alert v-click class="mt-4">

**F2 est intelligent** : renomme la variable, pas le texte

</Alert>

<!--
Démonstration live :
- Créer une variable "user" et l'utiliser plusieurs fois
- Créer aussi "username" qui contient "user"
- Montrer que Find & Replace casserait "username"
- Montrer que F2 ne renomme que la variable "user"
- Effet "wow" garanti !

Points pédagogiques :
- F2 = le raccourci le plus important pour le refactoring
- Fonctionne dans tout le projet, pas seulement le fichier
- Montre un aperçu des changements avant de valider
-->
