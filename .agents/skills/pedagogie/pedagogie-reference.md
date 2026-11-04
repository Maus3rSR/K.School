# Référence Complète - Ingénierie Pédagogique

## Public Cible

- **Profil**: Débutants sur le sujet du cours (adultes en reconversion, étudiants de BUT…)
- **Niveau et prérequis**: déclarés dans le `programme.md` de chaque cours (ex. bases de programmation acquises en BUT)
- **Contexte**: Apprentissage intensif, application immédiate sur un projet
- **Besoins**: Confiance, progression visible, applicabilité immédiate

## Séquencement et Rythme

### Le cycle « notion complète »

1. **Accroche** : un problème concret, souvent provoqué en direct (erreur, code qui grossit, page lente)
2. **Démo** : livecoding sur le sujet de démonstration du cours
3. **Micro-pratique « à vous »** : la même notion transposée sur le projet des apprenants, terminée par un point de contrôle vérifiable

Une séance enchaîne ces cycles sans coupure fixe entre théorie et pratique.

### Un seul ordre pour tout

L'ordre des slides, l'ordre des étapes du livecoding et l'ordre des étapes du TP sont **identiques**. Diagnostic : pour chaque étape du TP, retrouver le chapitre qui l'enseigne ; il doit précéder l'étape. Un « ping-pong » (le livecoding revient sur un chapitre déjà clos, le TP demande une notion pas encore vue) est un défaut à corriger.

### La douleur avant la solution

Une abstraction (helper, raccourci, couche, package) s'introduit **après** que les apprenants ont ressenti le problème qu'elle résout. Ex. : écrire les routes une par une avant le raccourci qui les génère ; provoquer l'erreur de sécurité avant d'ajouter la protection ; laisser un contrôleur grossir avant d'extraire un service.

### Budget de densité

- 3-4 notions nouvelles par séance
- Un seul « aperçu » au maximum (notion montrée, non pratiquée)
- Ce qui dépasse passe en démo, en bonus, ou dans une autre séance

### Visuel et humour

- Tout flux ou relation a un schéma **animé** (révélation progressive, `magic-move`, Mermaid)
- Chaque chapitre prévoit dans les notes un moment léger : erreur volontaire, running gag, anecdote

### Marge et lenteur

- Somme des durées planifiées ≤ durée de la séance − 10 %
- Hypothèse : les apprenants pratiquent 2 à 3 fois moins vite que la démo
- Les retards se rattrapent par des paliers (état de référence récupérable), jamais en rallongeant la séance
- Aucune durée fixe dans les skills : elles sont déclarées dans le cours

## Principes Fondamentaux

### 1. Échafaudage (Scaffolding)

- **Partir du connu vers l'inconnu**: Toujours relier les nouveaux concepts à des expériences quotidiennes
- **Progression par paliers**: Chaque slide doit construire sur la précédente
- **Pas de sauts conceptuels**: Éviter les "évidemment" ou "simplement"
- **Récapitulatifs fréquents**: Synthèse tous les 3-5 concepts

### 2. Clarté et Simplicité

#### Langage

- **Vocabulaire accessible**: Éviter le jargon technique sans explication
- **Définitions systématiques**: Chaque terme technique doit être défini lors de sa première apparition
- **Analogies concrètes**: Utiliser des métaphores du quotidien
- **Phrases courtes**: Maximum 15-20 mots par phrase

#### Visuel

- **Une idée par slide**: Principe du "single concept"
- **Maximum 3-5 points par slide**: Éviter la surcharge cognitive
- **Hiérarchie visuelle claire**: Titres, sous-titres, points clés
- **Espaces blancs**: Respiration visuelle pour faciliter la lecture
- **Taille de police**: Minimum 24pt pour le corps de texte

### 3. Engagement et Motivation

- **Questions rhétoriques**: Stimuler la réflexion
- **Cas pratiques réels**: Exemples issus du monde professionnel
- **Célébration des acquis**: Rappeler régulièrement le chemin parcouru
- **Objectifs SMART**: Chaque section doit avoir un objectif mesurable

### 4. Multimodalité

- **Texte**: Concepts et définitions
- **Images/Icônes**: Renforcement visuel des concepts
- **Diagrammes**: Relations et processus (Mermaid)
- **Code**: Exemples commentés ligne par ligne
- **Vidéos courtes**: Démonstrations (max 2-3 minutes)

## Taxonomie de Bloom Adaptée

### Niveau 1: Mémorisation
- QCM simples, flashcards, exercices à trous

### Niveau 2: Compréhension
- Reformulation, schématisation, comparaison

### Niveau 3: Application
- Exercices guidés, reproduction, adaptation

### Niveau 4: Analyse
- Débogage, déconstruction, classification

### Niveau 5: Évaluation
- Code review, choix de solutions, optimisation

### Niveau 6: Création
- Projet guidé, mini-projet, portfolio

## Principes de Bienveillance

### Langage Encourageant

- ✅ "Essayons ensemble"
- ✅ "C'est normal de ne pas comprendre du premier coup"
- ✅ "Vous progressez !"
- ❌ "C'est évident"
- ❌ "Tout le monde sait que"
- ❌ "C'est simple"

### Gestion de l'Erreur

- **L'erreur est une opportunité d'apprentissage**
- Expliquer pourquoi c'est incorrect, pas juste dire que c'est faux
- Proposer des pistes de correction
- Valoriser la démarche, pas seulement le résultat

### Rythme et Charge Cognitive

- **Pauses régulières**: prévues dans le format de séance du cours
- **Récapitulatifs**: Fin de chaque section
- **Répétition espacée**: Revoir les concepts clés plusieurs fois
- **Charge cognitive limitée**: 3-4 nouveaux concepts par séance, un seul aperçu

## Architecture des Slides

```markdown
1. Slide de couverture: Titre du cours
2. Slide de ressources: Liens utiles et références (OBLIGATOIRE - immédiatement après la couverture)
3. Slide d'accroche: Problème concret du quotidien
4. Slide de contexte: Pourquoi c'est important
5. Slides de contenu: Concept → Exemple → Application
6. Slide de synthèse: Points clés à retenir
7. Slide de transition: Lien avec le concept suivant
```

### Positionnement des Ressources

**RÈGLE IMPORTANTE** : La slide "Ressources pour ce cours" doit toujours être placée **immédiatement après la slide de couverture**, avant le premier chapitre.

**Justification pédagogique** :
- Les apprenants ont accès aux ressources dès le début
- Ils peuvent consulter la documentation pendant toute la formation
- Évite d'attendre la fin du cours pour découvrir les ressources
- Facilite la prise de notes et l'apprentissage autonome

## Structure d'un Exercice Complet

```markdown
1. **Contexte**: Mise en situation professionnelle
2. **Objectif**: Ce que l'apprenant va accomplir
3. **Prérequis**: Concepts nécessaires (avec liens de révision)
4. **Instructions**: Étapes numérotées et claires
5. **Ressources**: Documentation, exemples, outils
6. **Critères de réussite**: Comment savoir si c'est correct
7. **Solution commentée**: Explication détaillée
8. **Pour aller plus loin**: Défis optionnels
```

## Zone Proximale de Développement (ZPD)

- **Ni trop facile, ni trop difficile**: Juste au-dessus du niveau actuel
- **Aide graduée**: Indices disponibles à la demande
- **Validation progressive**: Checkpoints intermédiaires

## Feedback et Évaluation

### Feedback Immédiat

- **Tests automatisés**: Validation instantanée du code
- **Messages d'erreur pédagogiques**: Expliquer pourquoi c'est incorrect
- **Indices progressifs**: Système de hints (3 niveaux)
- **Célébration des réussites**: Renforcement positif

### Évaluation Formative

- **Auto-évaluation**: Grilles de critères
- **Peer review**: Révision par les pairs (avec guide)
- **Réflexion métacognitive**: "Qu'ai-je appris ? Comment ?"
- **Portfolio de progression**: Trace des apprentissages

## Accessibilité et Inclusion

- **Temps flexible**: Pas de limite de temps stricte
- **Formats variés**: Texte, vidéo, audio pour les consignes
- **Exemples diversifiés**: Représentation de différents contextes
- **Langue claire**: Éviter les expressions idiomatiques
- **Parcours adaptatifs**: Exercices de base, intermédiaires, avancés
- **Ressources complémentaires**: Tutoriels, vidéos, documentation
- **Communauté d'entraide**: Forum, chat, sessions de groupe
- **Mentorat**: Accès à de l'aide personnalisée
