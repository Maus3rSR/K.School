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
layout: two-cols-header
---

# Ressources pour ce cours

::left::

<div v-click>

## Liens utiles

📚 [VSCode](https://code.visualstudio.com/docs/configure/keybindings) - Documentation raccourcis clavier

📖 [Shortcut Masters](https://shortcutmasters.com) - Apprentissage & Pratique

🎮 [Shortcut Foo](https://shortcutfoo.com) - Jeux interactifs

</div>

::right::

<div v-click>

## Références de raccourcis

🪟 [Windows](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

🍎 [Mac](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)

🐧 [Linux](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf)

</div>

<!--
Points pédagogiques :
- La documentation officielle est la source la plus fiable
- Elle est mise à jour à chaque version de VS Code
- Les vidéos sont courtes et pratiques
- La cheat sheet PDF est un must-have

Préconiser d'ouvrir la feuille de références dans un onglet séparé
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

<div v-click class="text-center">

## ⏱️ Combien de temps pensez-vous perdre dans vos manipulation ?

</div>

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

1. <Shortcut size="sm">Ctrl + Shift + H</Shortcut> (Find & Replace)
2. Taper `user`
3. Taper `customer`
4. <Shortcut size="sm">Ctrl + Alt + Enter</Shortcut> (Replace all)

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

---

# Navigation

La Palette de Commandes : votre GPS

<div v-click>

<Shortcut size="xl">Ctrl + Shift + P</Shortcut>

</div>

<div v-click class="mt-8">

## Qu'est-ce que c'est ?

Un **accès universel** à toutes les fonctionnalités de VS Code

- Pas besoin de mémoriser où se trouve chaque menu
- Tapez ce que vous voulez faire en langage naturel
- VS Code comprend et propose

</div>

<Alert v-click class="mt-4">

**Règle d'or** : "Si tu ne sais pas comment faire, ouvre la palette !"

</Alert>

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

# Navigation

Naviguer dans le code

<div class="grid grid-cols-2 gap-8 mt-6">

<div v-click>

## 🎯 Aller à la définition

<Shortcut>Ctrl + Clic</Shortcut> ou <Shortcut>F12</Shortcut>

Cliquez sur une fonction ou variable → VS Code vous emmène à sa définition

</div>

<div v-click>

## ↩️ Revenir en arrière

<Shortcut>Alt + ←</Shortcut> Retour à la position précédente

<br/>

<Shortcut>Alt + →</Shortcut> Avancer dans l'historique

</div>

</div>

<div v-click class="mt-6">

## 🔍 Aller à un symbole

<Shortcut>Ctrl + Shift + O</Shortcut>

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
- Il faut revenir avec <Shortcut>Alt + ←</Shortcut>

</div>

::right::

<div v-click>

## ✅ La solution : Peek

<Shortcut size="lg">Alt + F12</Shortcut>

- Aperçu **inline** de la définition
- Vous restez dans votre fichier
- Modifiable dans l'aperçu !

</div>

::bottom::

<Alert v-click>

Cas d'usage : Vérifier les paramètres d'une fonction avant de l'appeler

</Alert>

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

1. Ouvrir `index.ts` → <Shortcut size="sm">Ctrl + P</Shortcut>
2. Fonction `main` → <Shortcut size="sm">Ctrl + Shift + O</Shortcut>
3. Définition `UserService` → <Shortcut size="sm">F12</Shortcut>
4. Retour → <Shortcut size="sm">Alt + ←</Shortcut>
5. Peek `createUser` → <Shortcut size="sm">Alt + F12</Shortcut>

</div>

::right::

<Alert v-click type="success">

### Critères de réussite

- [ ] &nbsp; Aucun clic de souris
- [ ] &nbsp; Temps : < 30 secondes

</Alert>

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

<Shortcut>Ctrl + D</Shortcut>

- Sélectionne le mot sous le curseur
- Appuyez à nouveau → sélectionne la prochaine occurrence
- Idéal pour renommer quelques occurrences

</div>

<div v-click>

## 🌍 Sélectionner toutes les occurrences

<Shortcut>Ctrl + Shift + L</Shortcut>

- Sélectionne **toutes** les occurrences d'un coup
- Modifiez une fois → toutes changent
- Puissant mais attention aux effets de bord !

</div>

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

<Shortcut>Alt + ↑</Shortcut> Monter

<Shortcut>Alt + ↓</Shortcut> Descendre

- Pas besoin de couper-coller
- Fonctionne aussi avec une sélection de plusieurs lignes
- L'indentation s'ajuste automatiquement !

</div>

<div v-click>

## 📋 Dupliquer une ligne

<Shortcut>Shift + Alt + ↑</Shortcut> Copier au-dessus

<Shortcut>Shift + Alt + ↓</Shortcut> Copier en-dessous

- Crée une copie instantanée
- Idéal pour créer des variations
- Fonctionne aussi sur plusieurs lignes

</div>

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

Insérer une ligne

<div class="grid grid-cols-2 gap-8 mt-6">

<div v-click>

## ⬇️ Insérer une ligne en-dessous

<Shortcut>Ctrl + Enter</Shortcut>

- Insère une nouvelle ligne **sous** le curseur
- Peu importe où vous êtes sur la ligne
- Pas besoin d'aller à la fin de la ligne !

</div>

<div v-click>

## ⬆️ Insérer une ligne au-dessus

<Shortcut>Ctrl + Shift + Enter</Shortcut>

- Insère une nouvelle ligne **au-dessus** du curseur
- Idéal pour ajouter un import oublié
- Le curseur se place sur la nouvelle ligne

</div>

</div>

<Alert v-click class="mt-4">

Fini le <Shortcut size="sm">End</Shortcut> → <Shortcut size="sm">Enter</Shortcut> pour aller à la ligne !

</Alert>

<!--
Démonstration live :
- Se placer au milieu d'une ligne
- Ctrl+Enter pour insérer en-dessous
- Ctrl+Shift+Enter pour insérer au-dessus
- Comparer avec la méthode classique (End → Enter)

Points pédagogiques :
- Shift = "au-dessus" (comme pour dupliquer)
- Gain de temps énorme sur le long terme
- Fonctionne dans tous les éditeurs modernes
-->

---
layout: two-cols-header
---

# Édition

Supprimer une ligne

::left::

<div v-click>

## 🗑️ Supprimer la ligne entière

<Shortcut>Ctrl + Shift + K</Shortcut>

- Supprime toute la ligne d'un coup
- Pas besoin de sélectionner
- Fonctionne aussi sur plusieurs lignes sélectionnées

</div>

::right::

<div v-click>

## 🔄 Alternative : Couper sans sélection

<Shortcut>Ctrl + X</Shortcut> (sans sélection)

- Coupe la ligne entière
- Utile si vous voulez la coller ailleurs
- Comportement par défaut de VS Code

</div>

::bottom::

<Alert v-click type="warning">

&nbsp; <Shortcut size="sm">Ctrl + Shift + K</Shortcut> = supprimer | <Shortcut size="sm">Ctrl + X</Shortcut> = couper (récupérable) mais écrase le press-papier

</Alert>

<!--
Démonstration live :
- Écrire quelques lignes de code
- Ctrl+Shift+K pour supprimer une ligne
- Ctrl+X sans sélection pour couper une ligne
- Montrer la différence : K = supprime, X = coupe (dans le presse-papier)

Points pédagogiques :
- K = "Kill" (supprimer définitivement)
- X = couper classique, mais sur toute la ligne si pas de sélection
- Très utile pour nettoyer du code rapidement
-->

---

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

---
layout: two-cols-header
---

# Refactoring Intelligent

Quick Fix : les actions rapides

::left::

<div v-click class="mt-8">

<Shortcut size="xl">Ctrl + .</Shortcut>

</div>

<div v-click class="mt-6">

## L'ampoule magique 💡

Quand VS Code détecte une amélioration possible, une ampoule apparaît.

<Shortcut size="sm">Ctrl + .</Shortcut> ouvre le menu des actions disponibles :

- Importer automatiquement un module manquant
- Corriger une erreur de syntaxe
- Convertir en arrow function
- Ajouter les types manquants
- Et bien plus...

</div>

::right::

<Alert v-click class="mt-4">

Erreur rouge + <Shortcut size="sm">Ctrl + .</Shortcut> = VS Code propose la solution !

</Alert>

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
layout: two-cols-header
---

# Refactoring Intelligent

💡 Exercice : Refactoriser un fichier

::left::

<div v-click>

## 🎯 Objectif

Améliorer un fichier "sale" en utilisant uniquement les raccourcis

</div>

<div v-click class="mt-4">

## 📋 Instructions

1. Renommer `x` en `totalPrice` avec <Shortcut size="sm">F2</Shortcut>
2. Renommer `y` en `taxAmount` avec <Shortcut size="sm">F2</Shortcut>
3. Extraire le calcul de taxe en fonction avec <Shortcut size="sm">Ctrl + Shift + R</Shortcut>
4. Corriger l'import manquant avec <Shortcut size="sm">Ctrl + .</Shortcut>
5. Formater le fichier avec <Shortcut size="sm">Shift + Alt + F</Shortcut>

</div>

::right::

<Alert v-click type="success">

### Critères de réussite

- [ ] &nbsp; Variables nommées explicitement
- [ ] &nbsp; Fonction `calculateTax` extraite
- [ ] &nbsp; Aucune erreur

</Alert>

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

<Alert v-click class="mt-4">

**Exemple** : `apple|` `banana|` `cherry|` → tapez `, ` → `apple, |` `banana, |` `cherry, |`

</Alert>

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

<Shortcut>Alt + Clic</Shortcut>

- Cliquez où vous voulez un curseur
- Répétez pour ajouter d'autres curseurs
- Idéal pour des positions non alignées

</div>

<div v-click>

## ⌨️ Avec le clavier

<Shortcut>Ctrl + Alt + ↑</Shortcut>

<Shortcut>Ctrl + Alt + ↓</Shortcut>

- Ajoute un curseur sur la ligne au-dessus/dessous
- Parfait pour des lignes consécutives
- Très rapide !

</div>

</div>

<Alert v-click type="warning" class="mt-4">

Annuler : <Shortcut size="sm">Ctrl + U</Shortcut> | Tout annuler : <Shortcut size="sm">Échap</Shortcut>

</Alert>

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

---
layout: two-cols-header
layoutClass: gap-x-4
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

::bottom::

<Alert v-click class="mt-3">

&nbsp; <Shortcut size="sm">Ctrl + Alt + ↓</Shortcut> (5×) → <Shortcut size="sm">Home</Shortcut> → `"` → <Shortcut size="sm">End</Shortcut> → `",`

</Alert>

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

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Snippets

Snippets d'équipe

::left::

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

::right::

<div v-click class="mt-6">

## Avantages

- 📦 Versionné avec le code (Git)
- 👥 Même snippets pour toute l'équipe
- 📏 Standardisation du code
- 🚀 Onboarding rapide des nouveaux

</div>

::bottom::

<Alert v-click class="mt-3">

Créez des snippets pour vos patterns récurrents !

</Alert>

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

<Shortcut>Ctrl + K</Shortcut> puis <Shortcut>Ctrl + S</Shortcut>

Ouvre l'éditeur de raccourcis clavier

</div>

<div v-click class="mt-6">

## Personnaliser un raccourci

1. Recherchez la commande (ex: "format document")
2. Double-cliquez sur le raccourci actuel
3. Tapez votre nouveau raccourci
4. Entrée pour valider

</div>

<Alert v-click type="warning" class="mt-3">

Évitez de modifier les raccourcis standards | Restez cohérent | Documentez

</Alert>

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

<Alert v-click class="mt-3">

**En 2 mois** : ~25 raccourcis = **2x plus rapide** !

</Alert>

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

<Alert v-click class="mt-3">

🧠 21 jours = habitude | 66 jours = ancrée

</Alert>

<!--
Points pédagogiques :
- L'apprentissage est un investissement, pas une dépense
- Chaque raccourci appris = du temps gagné pour toujours
- Ne pas se décourager si on oublie, c'est normal
- Célébrer les petites victoires
-->

---
layout: cover
background: https://cover.sli.dev?12
---

# Merci ! 💻

Vous êtes maintenant prêt à coder efficacement avec VS Code !

Questions ?

<!--
Message final :
- Encourager à commencer immédiatement
- La palette de commandes est le point de départ idéal
- Rappeler que la progression est un marathon, pas un sprint
- Féliciter les apprenants pour leur engagement
-->
