---
titleTemplate: "%s - Kevin UNFRICHT"
title: "Développement Efficace"
layout: cover
background: https://cover.sli.dev?1
highlighter: shiki
lineNumbers: true
monaco: true
---

# Raccourcis clavier VS Code

Codez à la Vitesse de la Pensée

<!--
Points clés pour le présentateur :
- Accueillir chaleureusement les apprenants
- Rappeler que l'efficacité s'apprend progressivement
- Objectif : transformer leur façon de coder en quelques heures
- Insister : ce n'est pas de la magie, c'est de la pratique
- Annoncer que chacun repartira avec au moins 10 raccourcis mémorisés
-->

---
layout: cover
background: https://cover.sli.dev?2
---

# Chapitre 01 - VS Code et Productivité

<!--
Transition importante :
- Poser la question rhétorique : "Pourquoi se former aux raccourcis ?"
- Anticiper la réticence : "J'ai toujours fait comme ça..."
- Annoncer des chiffres concrets qui vont surprendre
-->

---
layout: two-cols-header
---

# VS Code et Productivité

Le coût de l'inefficacité

::left::

<div v-click>

## 🔨 Le Bricoleur Sans Outils

- Chercher le bon fichier à la souris
- Copier-coller avec clic droit
- Renommer manuellement variable par variable
- Perdre le fil de sa pensée

</div>

::right::

<div v-click>

## ⚡ Le Bricoleur Équipé

- Navigation instantanée au clavier
- Raccourcis pour chaque action
- Refactoring intelligent en 1 seconde
- Concentration sur la logique

</div>

::bottom::

<!--
Analogie pédagogique :
- Utiliser la métaphore du bricoleur pour rendre concret
- Insister : ce n'est pas de la fainéantise, c'est de l'intelligence
- Proposer un défi mesurable : chronométrer le temps pour renommer une variable dans 5 fichiers
- Créer l'engagement : ils vont mesurer leur propre progrès
- Piège courant : "Je n'ai pas le temps d'apprendre" → justement, c'est un investissement

Exercice mental proposé :
- Demander aux apprenants : "Combien de fois par jour cherchez-vous un fichier ?"
- Faire estimer le temps perdu sur une semaine
-->

---
layout: two-cols-header
---

# VS Code et Productivité

Démonstration : Même tâche, deux approches

::left::

<div v-click>

## 🖱️ Avec la Souris

**Tâche** : Renommer `user` en `customer` dans 10 fichiers

1. Chercher le fichier à la souris dans la barre latérale
2. Cliquer sur le fichier
3. Chercher le mot `user`
4. Sélectionner avec la souris
5. Copier, modifier, coller
6. Répéter 10 fois...

<div class="mt-4 text-xl font-bold text-red-500">

⏱️ **~5 minutes**

</div>

</div>

::right::

<div v-click>

## ⌨️ Avec le Clavier

**Même tâche** : Renommer `user` en `customer`

1. `Ctrl/Cmd + Shift + H` (Find & Replace)
2. Taper `user`
3. Taper `customer`
4. `Ctrl/Cmd + Alt + Enter` (Replace all)

<div class="mt-4 text-xl font-bold text-green-500">

⏱️ **~15 secondes**

</div>

</div>

<!--
Démonstration en live recommandée :
- Préparer un projet simple avec 10 fichiers contenant le mot "user"
- Chronomètre visible pour montrer la différence de temps
- Faire la démo souris d'abord (lente, fastidieuse) pour créer la frustration
- Puis faire la démo clavier (rapide, magique) pour l'effet "wow"
- Insister : ce n'est qu'UN raccourci parmi des dizaines

Points pédagogiques :
- Ne pas humilier ceux qui utilisent la souris, tout le monde a commencé comme ça
- Souligner que c'est un investissement : 2h de formation pour des années de gains
- Mentionner que les pros ne touchent presque jamais la souris
- Anticiper : "Mais j'ai mes habitudes..." → Oui, et c'est le moment de les améliorer !
-->

---

# VS Code et Productivité

Les 3 piliers du développement efficace

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">

<div v-click class="p-4 border rounded-lg">

## 🛡️ Moins d'Erreurs

Les outils automatisés détectent les problèmes **avant** l'exécution

- Linting en temps réel
- Auto-complétion intelligente
- Refactoring sécurisé

</div>

<div v-click class="p-4 border rounded-lg">

## 🧠 Plus de Réflexion

Moins de gestes répétitifs = plus de temps pour **penser**

- Concentration sur la logique
- Moins de fatigue cognitive
- Meilleure qualité de code

</div>

<div v-click class="p-4 border rounded-lg">

## 💪 Plus de Confiance

Maîtriser ses outils = se sentir **compétent**

- Fluidité dans le travail
- Impression de contrôle
- Professionnalisme visible

</div>

</div>

<!--
Points clés pour le présentateur :
- Ces 3 piliers sont interconnectés : moins d'erreurs → plus de confiance → plus de réflexion
- Insister sur le cercle vertueux : plus on maîtrise, plus on est efficace, plus on a confiance
- Anecdote : les développeurs seniors passent 80% du temps à réfléchir, 20% à taper
- Les débutants font l'inverse : 80% à taper, 20% à réfléchir
- Objectif de cette formation : inverser ce ratio progressivement
-->

---
layout: cover
background: https://cover.sli.dev?3
---

# Chapitre 02 - Navigation

<!--
Transition :
- "Maintenant que vous comprenez pourquoi, passons au comment"
- Premier bloc de raccourcis : se déplacer dans le code sans souris
- Objectif : ne plus jamais chercher un fichier à la souris
-->

---

# Navigation

La Palette de Commandes : votre GPS

<div v-click class="mt-8 text-center">

<kbd class="text-3xl px-6 py-3 bg-gray-800 text-white rounded-lg">Ctrl/Cmd + Shift + P</kbd>

</div>

<div v-click class="mt-8">

## Qu'est-ce que c'est ?

Un **accès universel** à toutes les fonctionnalités de VS Code

- Pas besoin de mémoriser où se trouve chaque menu
- Tapez ce que vous voulez faire en langage naturel
- VS Code comprend et propose

</div>

<div v-click class="mt-4 p-2 bg-gray-100 rounded text-sm text-center">

💡 **Règle d'or** : "Si tu ne sais pas comment faire, ouvre la palette !"

</div>

<!--
Démonstration live :
- Ouvrir la palette et taper "format" → montrer les options
- Taper "theme" → changer le thème en live
- Taper "settings" → accéder aux paramètres
- Insister : c'est le raccourci le plus important de tous
- Si vous n'en retenez qu'un seul, c'est celui-ci !

Mnémotechnique :
- P = Palette (facile à retenir)
- Shift = "je veux quelque chose de spécial"
-->

---
layout: two-cols-header
---

# Navigation

Ouvrir des fichiers rapidement

::left::

<div v-click class="text-center">

<kbd class="text-2xl px-4 py-2 bg-gray-800 text-white rounded-lg">Ctrl/Cmd + P</kbd>

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

<div v-click class="mt-3 p-2 bg-gray-100 rounded text-sm text-center">

💡 Les lettres n'ont pas besoin d'être consécutives !

</div>

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

---

# Navigation

Naviguer dans le code

<div class="grid grid-cols-2 gap-8 mt-6">

<div v-click>

## 🎯 Aller à la définition

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Ctrl/Cmd + Clic</kbd>

ou

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">F12</kbd>

Cliquez sur une fonction ou variable → VS Code vous emmène à sa définition

</div>

<div v-click>

## ↩️ Revenir en arrière

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Alt + ←</kbd>

Retour à la position précédente

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Alt + →</kbd>

Avancer dans l'historique

</div>

</div>

<div v-click class="mt-6">

## 🔍 Aller à un symbole

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Ctrl/Cmd + Shift + O</kbd>

Liste toutes les fonctions, classes, variables du fichier actuel

</div>

<!--
Démonstration live :
- Ouvrir un fichier avec plusieurs fonctions
- Ctrl+Clic sur un appel de fonction → aller à la définition
- Alt+← pour revenir → effet "wow" garanti
- Ctrl+Shift+O pour voir la structure du fichier
- Comparer avec la navigation à la souris (scroll, scroll, scroll...)

Points pédagogiques :
- Ces raccourcis fonctionnent ensemble : aller → revenir → aller ailleurs
- C'est comme un GPS avec historique de navigation
- Mnémotechnique : O = Outline (structure du fichier)
-->

---
layout: two-cols-header
---

# Navigation

Peek Definition : voir sans quitter

::left::

<div v-click>

## ❌ Le problème

- `F12` vous emmène dans un autre fichier
- Vous perdez le contexte
- Il faut revenir avec `Alt + ←`

</div>

<div v-click class="mt-4">

## ✅ La solution : Peek

<kbd class="px-2 py-1 bg-gray-800 text-white rounded text-lg">Alt + F12</kbd>

- Aperçu **inline** de la définition
- Vous restez dans votre fichier
- Modifiable dans l'aperçu !

</div>

::right::

<div v-click class="p-3 bg-gray-100 rounded text-sm">

💡 **Cas d'usage** : Vérifier les paramètres d'une fonction avant de l'appeler

</div>

<!--
Démonstration live :
- Montrer F12 qui change de fichier (perte de contexte)
- Puis Alt+F12 qui ouvre l'aperçu inline (contexte préservé)
- Modifier quelque chose dans l'aperçu pour montrer que c'est éditable
- Fermer avec Échap

Points pédagogiques :
- Peek = "jeter un œil" en anglais
- Très utile pour vérifier une signature de fonction
- Évite les allers-retours constants entre fichiers
-->

---
layout: two-cols-header
---

# Navigation

💡 Exercice : Naviguer sans souris

::left::

<div v-click>

## 🎯 Objectif

Naviguer dans 5 fichiers **sans souris**

</div>

<div v-click class="mt-2">

## 📋 Instructions

1. Ouvrir `index.ts` → <kbd>Ctrl/Cmd + P</kbd>
2. Fonction `main` → <kbd>Ctrl/Cmd + Shift + O</kbd>
3. Définition `UserService` → <kbd>F12</kbd>
4. Retour → <kbd>Alt + ←</kbd>
5. Peek `createUser` → <kbd>Alt + F12</kbd>

</div>

::right::

<div v-click class="p-3 bg-gray-100 rounded text-sm">

## ✅ Critères de réussite

- [ ] Aucun clic de souris
- [ ] Temps : < 30 secondes

</div>

<!--
Instructions pour le formateur :
- Préparer un mini-projet avec 5 fichiers interconnectés
- Faire l'exercice en live d'abord (démonstration)
- Puis laisser les apprenants pratiquer
- Chronométrer pour créer un petit challenge ludique
- Célébrer les réussites, même les petites victoires

Fichiers suggérés pour l'exercice :
- index.ts (point d'entrée)
- UserService.ts (service)
- User.ts (modèle)
- UserController.ts (contrôleur)
- config.ts (configuration)
-->

---
layout: cover
background: https://cover.sli.dev?4
---

# Chapitre 03 - Édition

<!--
Transition :
- "Vous savez naviguer, maintenant apprenons à éditer efficacement"
- Les raccourcis d'édition sont ceux qu'on utilise le plus souvent
- Objectif : ne plus jamais faire de copier-coller à la souris
-->

---

# Édition

Sélection intelligente

<div class="grid grid-cols-2 gap-8 mt-6">

<div v-click>

## 🎯 Sélectionner l'occurrence suivante

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Ctrl/Cmd + D</kbd>

- Sélectionne le mot sous le curseur
- Appuyez à nouveau → sélectionne la prochaine occurrence
- Idéal pour renommer quelques occurrences

</div>

<div v-click>

## 🌍 Sélectionner toutes les occurrences

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Ctrl/Cmd + Shift + L</kbd>

- Sélectionne **toutes** les occurrences d'un coup
- Modifiez une fois → toutes changent
- Puissant mais attention aux effets de bord !

</div>

</div>

<div v-click class="mt-4 p-2 bg-gray-100 rounded text-sm">

⚠️ `Ctrl/Cmd + D` = **progressive** | `Ctrl/Cmd + Shift + L` = **toutes**

</div>

<!--
Démonstration live :
- Écrire un code avec plusieurs occurrences du mot "user"
- Montrer Ctrl+D pour sélectionner progressivement
- Montrer Ctrl+Shift+L pour tout sélectionner
- Attention : Ctrl+Shift+L peut sélectionner des choses non voulues (ex: "user" dans "username")

Points pédagogiques :
- D = "Duplicate selection" (mnémotechnique)
- L = "aLL" (toutes les occurrences)
- Préférer Ctrl+D pour plus de contrôle
-->

---

# Édition

Déplacer et dupliquer des lignes

<div class="grid grid-cols-2 gap-8 mt-6">

<div v-click>

## ↕️ Déplacer une ligne

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Alt + ↑</kbd> Monter

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Alt + ↓</kbd> Descendre

- Pas besoin de couper-coller
- Fonctionne aussi avec une sélection de plusieurs lignes
- L'indentation s'ajuste automatiquement !

</div>

<div v-click>

## 📋 Dupliquer une ligne

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Shift + Alt + ↑</kbd> Copier au-dessus

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Shift + Alt + ↓</kbd> Copier en-dessous

- Crée une copie instantanée
- Idéal pour créer des variations
- Fonctionne aussi sur plusieurs lignes

</div>

</div>

<div v-click class="mt-4 p-2 bg-gray-100 rounded text-sm text-center">

💡 Alt = déplacer | Shift+Alt = dupliquer

</div>

<!--
Démonstration live :
- Écrire une liste de 5 éléments
- Déplacer un élément avec Alt+↑/↓
- Dupliquer un élément avec Shift+Alt+↓
- Montrer que ça fonctionne avec plusieurs lignes sélectionnées

Cas d'usage courants :
- Réorganiser des imports
- Dupliquer une ligne de test pour créer une variante
- Déplacer une fonction dans le fichier
-->

---

# Édition

Indentation et formatage

<div class="grid grid-cols-2 gap-8 mt-6">

<div v-click>

## ➡️ Indentation manuelle

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Ctrl/Cmd + ]</kbd> Indenter

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Ctrl/Cmd + [</kbd> Désindenter

- Fonctionne sur la ligne ou la sélection
- Utile pour ajuster rapidement le niveau

</div>

<div v-click>

## ✨ Formatage automatique

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Shift + Alt + F</kbd>

- Reformate **tout le document**
- Respecte les règles du projet (Prettier, ESLint...)
- Corrige indentation, espaces, sauts de ligne

</div>

</div>

<div v-click class="mt-4 p-2 bg-gray-100 rounded text-sm">

💡 **Format on Save** : `"editor.formatOnSave": true`

</div>

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

---

# Édition

Commenter rapidement

<div class="grid grid-cols-2 gap-8 mt-6">

<div v-click>

## 💬 Commentaire ligne

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Ctrl/Cmd + /</kbd>

- Toggle : commente ou décommente
- Fonctionne sur la ligne ou la sélection
- Adapte le style au langage (// ou # ou --)

</div>

<div v-click>

## 📦 Commentaire bloc

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Shift + Alt + A</kbd>

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

---
layout: cover
background: https://cover.sli.dev?5
---

# Chapitre 04 - Refactoring Intelligent

<!--
Transition :
- "Éditer c'est bien, mais refactorer c'est mieux"
- Le refactoring = améliorer le code sans changer son comportement
- VS Code comprend votre code et peut le modifier intelligemment
-->

---

# Refactoring Intelligent

Renommer un symbole partout

<div v-click class="mt-8 text-center">

<kbd class="text-3xl px-6 py-3 bg-gray-800 text-white rounded-lg">F2</kbd>

</div>

<div v-click class="mt-8">

## Pourquoi F2 et pas Find & Replace ?

| Find & Replace | Rename Symbol (F2) |
|----------------|-------------------|
| Remplace du texte aveuglément | Comprend le contexte |
| Peut casser le code | Sécurisé, respecte le scope |
| `user` dans `username` = problème | Seule la variable `user` change |

</div>

<div v-click class="mt-4 p-2 bg-gray-100 rounded text-sm text-center">

💡 **F2 est intelligent** : renomme la variable, pas le texte

</div>

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

---

# Refactoring Intelligent

Extraire une fonction

<div v-click class="mt-8 text-center">

<kbd class="text-3xl px-6 py-3 bg-gray-800 text-white rounded-lg">Ctrl/Cmd + Shift + R</kbd>

</div>

<div v-click class="mt-6">

## Comment ça marche ?

1. Sélectionnez un bloc de code
2. Appuyez sur `Ctrl/Cmd + Shift + R`
3. Choisissez "Extract to function"
4. Donnez un nom explicite
5. VS Code crée la fonction et l'appel automatiquement !

</div>

<div v-click class="mt-4 p-2 bg-gray-100 rounded text-sm">

**Avant** : `const total = items.reduce(...)` (5 lignes) → **Après** : `calculateFinalPrice(items)`

</div>

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

---

# Refactoring Intelligent

Quick Fix : les actions rapides

<div v-click class="mt-8 text-center">

<kbd class="text-3xl px-6 py-3 bg-gray-800 text-white rounded-lg">Ctrl/Cmd + .</kbd>

</div>

<div v-click class="mt-6">

## L'ampoule magique 💡

Quand VS Code détecte une amélioration possible, une ampoule apparaît.

`Ctrl/Cmd + .` ouvre le menu des actions disponibles :

- Importer automatiquement un module manquant
- Corriger une erreur de syntaxe
- Convertir en arrow function
- Ajouter les types manquants
- Et bien plus...

</div>

<div v-click class="mt-4 p-2 bg-gray-100 rounded text-sm text-center">

💡 Erreur rouge + `Ctrl/Cmd + .` = VS Code propose la solution !

</div>

<!--
Démonstration live :
- Écrire du code avec une erreur (import manquant)
- Montrer l'ampoule qui apparaît
- Ctrl+. pour voir les suggestions
- Choisir "Add import" → l'import s'ajoute automatiquement
- Montrer d'autres exemples : convertir function en arrow function

Points pédagogiques :
- Le point (.) = "quick" action, rapide
- Toujours regarder si l'ampoule apparaît
- VS Code apprend de vos choix et propose les meilleures options en premier
-->

---

# Refactoring Intelligent

💡 Exercice : Refactoriser un fichier

<div v-click class="mt-6">

## 🎯 Objectif

Améliorer un fichier "sale" en utilisant uniquement les raccourcis

</div>

<div v-click class="mt-4">

## 📋 Instructions

1. Renommer `x` en `totalPrice` avec <kbd>F2</kbd>
2. Renommer `y` en `taxAmount` avec <kbd>F2</kbd>
3. Extraire le calcul de taxe en fonction avec <kbd>Ctrl/Cmd + Shift + R</kbd>
4. Corriger l'import manquant avec <kbd>Ctrl/Cmd + .</kbd>
5. Formater le fichier avec <kbd>Shift + Alt + F</kbd>

</div>

<div v-click class="mt-4 p-2 bg-gray-100 rounded text-sm">

## ✅ Critères de réussite

- [ ] Variables nommées explicitement
- [ ] Fonction `calculateTax` extraite
- [ ] Aucune erreur

</div>

<!--
Instructions pour le formateur :
- Préparer un fichier avec des variables mal nommées (x, y, temp, data)
- Ajouter un import manquant volontairement
- Laisser le code mal formaté
- Chronométrer l'exercice (objectif : moins de 2 minutes)
- Faire une correction collective en montrant chaque étape
-->

---
layout: cover
background: https://cover.sli.dev?6
---

# Chapitre 05 - Multi-Curseur

<!--
Transition :
- "Prêts pour le super-pouvoir ultime ?"
- Le multi-curseur = éditer plusieurs endroits en même temps
- C'est comme avoir plusieurs mains pour taper
-->

---

# Multi-Curseur

Qu'est-ce que le multi-curseur ?

<div v-click class="mt-8 text-center text-2xl">

🖐️ Imaginez pouvoir **cloner vos mains** pour écrire à plusieurs endroits en même temps

</div>

<div v-click class="mt-8">

## Cas d'usage typiques

- Ajouter le même préfixe à 10 lignes
- Modifier plusieurs valeurs identiques
- Transformer une liste en tableau
- Ajouter des guillemets autour de plusieurs mots

</div>

<div v-click class="mt-4 p-2 bg-gray-100 rounded text-sm">

💡 Exemple : `apple|` `banana|` `cherry|` → tapez `, ` → `apple, |` `banana, |` `cherry, |`

</div>

<!--
Points pédagogiques :
- Le multi-curseur est un concept qui peut sembler magique au début
- Rassurer : ça devient naturel avec la pratique
- Montrer un exemple simple avant d'aller dans les raccourcis
- Analogie : c'est comme avoir un assistant qui copie vos gestes
-->

---

# Multi-Curseur

Ajouter des curseurs

<div class="grid grid-cols-2 gap-8 mt-6">

<div v-click>

## 🖱️ Avec la souris

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Alt + Clic</kbd>

- Cliquez où vous voulez un curseur
- Répétez pour ajouter d'autres curseurs
- Idéal pour des positions non alignées

</div>

<div v-click>

## ⌨️ Avec le clavier

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Ctrl/Cmd + Alt + ↑</kbd>

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Ctrl/Cmd + Alt + ↓</kbd>

- Ajoute un curseur sur la ligne au-dessus/dessous
- Parfait pour des lignes consécutives
- Très rapide !

</div>

</div>

<div v-click class="mt-4 p-2 bg-gray-100 rounded text-sm text-center">

⚠️ Annuler : <kbd>Ctrl/Cmd + U</kbd> | Tout annuler : <kbd>Échap</kbd>

</div>

<!--
Démonstration live :
- Créer une liste de 5 éléments
- Alt+Clic pour placer des curseurs manuellement
- Ctrl+Alt+↓ pour ajouter des curseurs sur lignes consécutives
- Taper du texte → il apparaît partout en même temps
- Montrer Échap pour revenir à un seul curseur

Points pédagogiques :
- Alt+Clic = placement libre
- Ctrl+Alt+flèches = lignes consécutives
- Toujours possible d'annuler avec Échap
-->

---

# Multi-Curseur

Sélection par motif

<div v-click class="mt-6">

## Rappel : les raccourcis de sélection

| Raccourci | Action |
|-----------|--------|
| <kbd>Ctrl/Cmd + D</kbd> | Sélectionne l'occurrence suivante |
| <kbd>Ctrl/Cmd + Shift + L</kbd> | Sélectionne toutes les occurrences |

</div>

<div v-click class="mt-6">

## La magie : chaque sélection = un curseur !

Après avoir sélectionné plusieurs occurrences, vous avez automatiquement un curseur sur chacune.

Tapez → toutes les sélections changent en même temps !

</div>

<div v-click class="mt-4 p-2 bg-gray-100 rounded text-sm">

💡 Sélectionnez `item` avec Ctrl+D (3×) → tapez `product` → tout change !

</div>

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

---
layout: two-cols-header
---

# Multi-Curseur

💡 Exercice : Transformer une liste

::left::

<div v-click>

## 📋 Départ

```
pomme
banane
cerise
orange
kiwi
```

</div>

::right::

<div v-click>

## 🎯 Résultat

```ts
const fruits = ["pomme", "banane", "cerise", "orange", "kiwi"];
```

</div>

<div v-click class="mt-3 p-2 bg-gray-100 rounded text-sm">

💡 <kbd>Ctrl/Cmd + Alt + ↓</kbd> (5×) → <kbd>Home</kbd> → `"` → <kbd>End</kbd> → `",`

</div>

<!--
Instructions pour le formateur :
- Laisser les apprenants chercher par eux-mêmes d'abord
- Montrer la solution étape par étape si besoin
- Variante : faire l'inverse (tableau → liste)
- Chronométrer : objectif moins de 20 secondes
-->

---
layout: cover
background: https://cover.sli.dev?7
---

# Chapitre 06 - Snippets

<!--
Transition :
- "Maintenant, automatisons les tâches répétitives"
- Les snippets = templates de code réutilisables
- Comme des macros Word, mais pour le code
-->

---
layout: two-cols-header
---

# Snippets

Qu'est-ce qu'un snippet ?

::left::

<div v-click class="text-center text-xl">

📝 Un **template de code** réutilisable

</div>

<div v-click class="mt-4">

## Analogie

| Word | VS Code |
|------|---------|
| "cdlt" → "Cordialement," | "log" → `console.log()` |

</div>

::right::

<div v-click>

## Pourquoi ?

- ⏱️ Gain de temps
- ✅ Moins d'erreurs
- 📏 Code cohérent
- 🧠 Focus sur la logique

</div>

<!--
Points pédagogiques :
- Les snippets existent dans tous les éditeurs modernes
- VS Code en propose des centaines par défaut
- On peut créer les siens (on verra comment)
- Analogie avec les raccourcis clavier : investissement initial, gains durables
-->

---

# Snippets

Utiliser les snippets intégrés

<div v-click class="mt-6">

## Comment ça marche ?

1. Tapez le préfixe du snippet (ex: `log`)
2. VS Code propose le snippet dans l'autocomplétion
3. Appuyez sur <kbd>Tab</kbd> ou <kbd>Entrée</kbd>
4. Le code s'insère avec le curseur bien placé !

</div>

<div v-click class="mt-6">

## Snippets JavaScript/TypeScript courants

| Préfixe | Résultat |
|---------|----------|
| `log` | `console.log()` |
| `if` | Structure if complète |
| `for` | Boucle for |
| `foreach` | `array.forEach()` |
| `fn` | Déclaration de fonction |
| `afn` | Arrow function |

</div>

<div v-click class="mt-3 p-2 bg-gray-100 rounded text-sm text-center">

💡 <kbd>Ctrl/Cmd + Espace</kbd> pour forcer les suggestions

</div>

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

---
layout: two-cols-header
---

# Snippets

Créer son premier snippet

::left::

<div v-click>

## Accéder

`Ctrl/Cmd + Shift + P` → "Configure User Snippets"

</div>

<div v-click class="mt-2 p-2 bg-gray-100 rounded text-sm">

`$1`, `$2`... = positions curseur (Tab)

</div>

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

---

# Snippets

Snippets d'équipe

<div v-click class="mt-6">

## Partager avec l'équipe

Créez un dossier `.vscode/` à la racine du projet :

```
mon-projet/
├── .vscode/
│   └── snippets.code-snippets
├── src/
└── package.json
```

</div>

<div v-click class="mt-6">

## Avantages

- 📦 Versionné avec le code (Git)
- 👥 Même snippets pour toute l'équipe
- 📏 Standardisation du code
- 🚀 Onboarding rapide des nouveaux

</div>

<div v-click class="mt-3 p-2 bg-gray-100 rounded text-sm text-center">

💡 Créez des snippets pour vos patterns récurrents !

</div>

<!--
Points pédagogiques :
- Les snippets projet sont dans .vscode/
- Ils sont automatiquement disponibles pour tous ceux qui ouvrent le projet
- Bonne pratique : documenter les snippets dans le README
- Exemples : snippet pour créer un composant React, un test, un hook...
-->

---
layout: cover
background: https://cover.sli.dev?9
---

# Chapitre 08 - Configuration Avancée

<!--
Transition :
- "Maintenant, personnalisons VS Code pour votre workflow"
- Configuration = adapter l'outil à vos besoins
- On va voir tasks, launch et keybindings
-->

---

# Configuration Avancée

Keybindings personnalisés

<div v-click class="mt-6">

## Accéder aux raccourcis

<kbd class="px-3 py-1 bg-gray-800 text-white rounded">Ctrl/Cmd + K</kbd> puis <kbd class="px-3 py-1 bg-gray-800 text-white rounded">Ctrl/Cmd + S</kbd>

Ouvre l'éditeur de raccourcis clavier

</div>

<div v-click class="mt-6">

## Personnaliser un raccourci

1. Recherchez la commande (ex: "format document")
2. Double-cliquez sur le raccourci actuel
3. Tapez votre nouveau raccourci
4. Entrée pour valider

</div>

<div v-click class="mt-3 p-2 bg-gray-100 rounded text-sm">

⚠️ Évitez de modifier les raccourcis standards | Restez cohérent | Documentez

</div>

<!--
Points pédagogiques :
- Les raccourcis sont stockés dans keybindings.json
- On peut exporter/importer ses raccourcis
- Attention aux conflits avec les raccourcis système (OS)
- Conseil : ne personnaliser que si vraiment nécessaire
-->

---
layout: two-cols-header
---

# Configuration Avancée

Settings Sync : synchroniser vos paramètres

::left::

<div v-click>

## Le problème

- Nouveau PC = tout reconfigurer
- Perte de temps

</div>

<div v-click class="mt-4">

## La solution

1. Connectez-vous (GitHub/Microsoft)
2. Activez la synchronisation
3. Paramètres synchronisés !

</div>

::right::

<div v-click>

## Ce qui est synchronisé

- ⚙️ Paramètres
- ⌨️ Raccourcis
- 📦 Extensions
- 📝 Snippets
- 🎨 Thème

</div>

<!--
Points pédagogiques :
- Settings Sync est intégré nativement à VS Code
- Pas besoin d'extension tierce
- On peut choisir ce qu'on synchronise ou non
- Très utile pour les développeurs qui changent souvent de machine
-->

---
layout: cover
background: https://cover.sli.dev?10
---

# Chapitre 09 - Bonnes Pratiques

<!--
Transition :
- "Vous avez les outils, maintenant voyons comment bien les utiliser"
- Les bonnes pratiques = ce qui fait la différence entre un débutant et un pro
- Conseils issus de l'expérience
-->

---

# Bonnes Pratiques

Apprendre progressivement

<div v-click class="mt-6">

## ❌ Ce qu'il ne faut PAS faire

- Essayer d'apprendre 50 raccourcis en une journée
- Abandonner après 2 jours parce que "c'est trop dur"
- Revenir à la souris dès que ça bloque

</div>

<div v-click class="mt-6">

## ✅ La bonne approche

1. **Choisir 3 raccourcis** par semaine
2. **Les utiliser systématiquement** pendant 7 jours
3. **Ajouter 3 nouveaux** la semaine suivante
4. **Répéter** jusqu'à ce que ce soit naturel

</div>

<div v-click class="mt-3 p-2 bg-gray-100 rounded text-sm text-center">

💡 **En 2 mois** : ~25 raccourcis = **2x plus rapide** !

</div>

<!--
Points pédagogiques :
- L'apprentissage des raccourcis est comme l'apprentissage d'un instrument
- La répétition crée la mémoire musculaire
- Patience et persévérance sont les clés
- Célébrer chaque petit progrès
-->

---
layout: two-cols-header
---

# Bonnes Pratiques

Créer des habitudes durables

::left::

<div v-click>

## 🎯 La règle des 3 secondes

> "Existe-t-il un raccourci pour ça ?"

Si oui → apprenez-le **maintenant**

</div>

::right::

<div v-click>

## 📝 Techniques

- **Post-it** : 3 raccourcis/semaine
- **Sans souris** : 30 min/jour
- **Pair programming** : observer
- **Cheat sheet** : à portée

</div>

<div v-click class="mt-3 p-2 bg-gray-100 rounded text-sm text-center">

🧠 21 jours = habitude | 66 jours = ancrée

</div>

<!--
Points pédagogiques :
- L'apprentissage est un investissement, pas une dépense
- Chaque raccourci appris = du temps gagné pour toujours
- Ne pas se décourager si on oublie, c'est normal
- Célébrer les petites victoires
-->

---
layout: cover
background: https://cover.sli.dev?11
---

# Chapitre 10 - Ressources & Pratique

<!--
Transition :
- "Pour continuer à progresser après cette formation"
- Ressources pour aller plus loin
- La pratique régulière est la clé
-->

---

# Ressources & Pratique

Documentation officielle

<div v-click class="mt-6">

## 📚 Site officiel VS Code

**code.visualstudio.com/docs**

- Documentation complète et à jour
- Tutoriels interactifs
- Vidéos de démonstration
- Changelog des nouvelles fonctionnalités

</div>

<div v-click class="mt-6">

## ⌨️ Keyboard Shortcuts Reference

`Ctrl/Cmd + K` puis `Ctrl/Cmd + R`

Ouvre la **cheat sheet PDF** officielle dans le navigateur

</div>

<div v-click class="mt-3 p-2 bg-gray-100 rounded text-sm text-center">

💡 Imprimez la cheat sheet et affichez-la près de votre écran !

</div>

<!--
Points pédagogiques :
- La documentation officielle est la source la plus fiable
- Elle est mise à jour à chaque version de VS Code
- Les vidéos sont courtes et pratiques
- La cheat sheet PDF est un must-have
-->

---

# Ressources & Pratique

Outils de pratique

<div class="grid grid-cols-2 gap-4 mt-4 text-xs">

<div v-click>

## 🎮 Shortcut Foo

**shortcutfoo.com** - Jeux interactifs

</div>

<div v-click>

## 🧩 VS Code Can Do That

**vscodecandothat.com** - Astuces cachées

</div>

<div v-click>

## 📺 YouTube

Fireship, Traversy Media

</div>

<div v-click>

## 🏋️ Kata quotidien

5 min/jour sans souris

</div>

</div>

<!--
Points pédagogiques :
- La pratique régulière est plus efficace que les sessions intensives
- Gamifier l'apprentissage aide à rester motivé
- Les vidéos courtes sont idéales pour découvrir de nouvelles astuces
- Le kata quotidien ancre les habitudes
-->

---

# Ressources & Pratique

Votre plan d'action

<div v-click class="mt-6">

## 📋 Cette semaine

- [ ] Imprimer la cheat sheet VS Code
- [ ] Choisir 3 raccourcis à maîtriser
- [ ] Désactiver la souris 15 min/jour
- [ ] Configurer Format on Save

</div>

<div v-click class="mt-6">

## 📅 Ce mois-ci

- [ ] Maîtriser les 10 raccourcis prioritaires
- [ ] Créer 2 snippets personnalisés
- [ ] Installer et configurer ESLint + Prettier
- [ ] Explorer une nouvelle extension

</div>

<div v-click class="mt-3 p-2 bg-gray-100 rounded text-sm text-center">

🎯 **Objectif** : Dans 30 jours, vous serez **2x plus efficace**

</div>

<!--
Points pédagogiques :
- Un plan concret aide à passer à l'action
- Les objectifs sont réalistes et mesurables
- Encourager les apprenants à personnaliser leur plan
- Proposer un suivi en groupe si possible
-->

---
layout: cover
background: https://cover.sli.dev?12
---

# Conclusion

<!--
Transition :
- "Récapitulons ce que nous avons appris"
- Moment de synthèse et de célébration
-->

---

# Conclusion

Ce que vous avez appris

<div class="grid grid-cols-3 gap-4 mt-4 text-xs">

<div v-click>

## 🧭 Navigation
- Palette de commandes
- Quick Open
- Go to Definition
- Peek Definition

</div>

<div v-click>

## ✏️ Édition
- Sélection intelligente
- Déplacer/Dupliquer
- Formatage automatique
- Commentaires rapides

</div>

<div v-click>

## 🔧 Refactoring
- Rename Symbol (F2)
- Extract Function
- Quick Fix

</div>

<div v-click>

## 👆 Multi-curseur
- Alt + Clic
- Ctrl + Alt + ↑/↓
- Ctrl + D

</div>

<div v-click>

## 📝 Snippets
- Utiliser les snippets intégrés
- Créer ses propres snippets

</div>

<div v-click>

## ⚙️ Configuration
- Extensions essentielles
- Settings Sync
- Tasks & Launch

</div>

</div>

<!--
Points pédagogiques :
- Récapitulatif visuel de tout ce qui a été couvert
- Rassurer : pas besoin de tout retenir d'un coup
- Les slides restent disponibles comme référence
-->

---
layout: center
class: text-center
---

# 🚀 Codez à la Vitesse de la Pensée

<div v-click class="mt-8 text-2xl">

> "La maîtrise des outils libère l'esprit pour la créativité"

</div>

<div v-click class="mt-8">

## Votre premier pas dès maintenant

<kbd class="text-2xl px-6 py-3 bg-gray-800 text-white rounded-lg">Ctrl/Cmd + Shift + P</kbd>

Ouvrez la palette et explorez !

</div>

<div v-click class="mt-8 text-xl">

**Merci et bonne pratique !** 🎉

</div>

<!--
Message final :
- Encourager à commencer immédiatement
- La palette de commandes est le point de départ idéal
- Rappeler que la progression est un marathon, pas un sprint
- Féliciter les apprenants pour leur engagement
-->
