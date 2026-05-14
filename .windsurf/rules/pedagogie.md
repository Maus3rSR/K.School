---
trigger: always_on
---

# Ingénierie Pédagogique - Public Débutant en Reconversion

## Principes Fondamentaux

### Public Cible

- **Profil**: Adultes en reconversion professionnelle
- **Niveau**: Débutants sans expérience préalable
- **Contexte**: Apprentissage intensif avec objectif d'employabilité
- **Besoins**: Confiance, progression visible, applicabilité immédiate

## Règles de Conception des Présentations

### 1. Structure Pédagogique Progressive

#### Principe de l'Échafaudage (Scaffolding)

- **Partir du connu vers l'inconnu**: Toujours relier les nouveaux concepts à des expériences quotidiennes
- **Progression par paliers**: Chaque slide doit construire sur la précédente
- **Pas de sauts conceptuels**: Éviter les "évidemment" ou "simplement"
- **Récapitulatifs fréquents**: Synthèse tous les 3-5 concepts

#### Architecture des Slides

```markdown
1. Slide d'accroche: Problème concret du quotidien
2. Slide de contexte: Pourquoi c'est important
3. Slides de contenu: Concept → Exemple → Application
4. Slide de synthèse: Points clés à retenir
5. Slide de transition: Lien avec le concept suivant
```

#### Organisation par Chapitres

**OBLIGATOIRE** : Les présentations doivent être organisées en chapitres thématiques :

- **Slide de couverture de chapitre** : Utiliser le layout `cover` avec le titre du chapitre

  ```markdown
  ---
  layout: cover
  background: https://cover.sli.dev?X
  ---

  # Chapitre XX - Titre du Chapitre
  ```

- **Slides du chapitre** : Chaque slide reprend le titre du chapitre en H1, suivi du concept spécifique en sous-titre

  ```markdown
  ---

  # Titre du Chapitre

  Concept spécifique abordé

  Contenu de la slide...
  ```

**Exemple d'organisation** :

```markdown
---
layout: cover
---

# Chapitre 01 - Les Bases

---

# Les Bases

Définition

Contenu expliquant la définition...

---

# Les Bases

Analogie concrète

Contenu avec une métaphore du quotidien...

---

# Les Bases

Exemple pratique

Contenu avec un cas d'usage...
```

**Avantages de cette structure** :

- **Navigation claire** : L'apprenant sait toujours dans quel chapitre il se trouve
- **Cohérence visuelle** : Renforce la progression pédagogique
- **Repères constants** : Réduit la charge cognitive en maintenant un contexte visible
- **Facilite la révision** : Permet de retrouver facilement les concepts par thème

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

#### Techniques d'Engagement

- **Questions rhétoriques**: Stimuler la réflexion
- **Cas pratiques réels**: Exemples issus du monde professionnel
- **Célébration des acquis**: Rappeler régulièrement le chemin parcouru
- **Objectifs SMART**: Chaque section doit avoir un objectif mesurable

### 4. Multimodalité

#### Diversité des Supports

- **Texte**: Concepts et définitions
- **Images/Icônes**: Renforcement visuel des concepts
- **Diagrammes**: Relations et processus (Mermaid)
- **Code**: Exemples commentés ligne par ligne
- **Vidéos courtes**: Démonstrations (max 2-3 minutes)

#### Notes du Présentateur

- **Anecdotes**: Histoires pour humaniser le contenu
- **Pièges courants**: Erreurs fréquentes à anticiper
- **Questions probables**: Réponses préparées

## Règles de Conception des Exercices

### 1. Taxonomie de Bloom Adaptée

#### Niveau 1: Mémorisation (Se souvenir)

- **QCM simples**: Vérifier la compréhension des définitions
- **Flashcards**: Termes techniques
- **Exercices à trous**: Compléter du code avec des mots-clés

#### Niveau 2: Compréhension (Comprendre)

- **Reformulation**: Expliquer un concept avec ses propres mots
- **Schématisation**: Dessiner un diagramme d'un processus
- **Comparaison**: Identifier similitudes et différences

#### Niveau 3: Application (Appliquer)

- **Exercices guidés**: Instructions étape par étape
- **Reproduction**: Recréer un exemple vu en cours
- **Adaptation**: Modifier un exemple pour un nouveau contexte

#### Niveau 4: Analyse (Analyser)

- **Débogage**: Trouver et corriger des erreurs
- **Déconstruction**: Expliquer le fonctionnement d'un code
- **Classification**: Organiser des concepts par catégories

#### Niveau 5: Évaluation (Évaluer)

- **Code review**: Critiquer constructivement du code
- **Choix de solutions**: Justifier une approche vs une autre
- **Optimisation**: Améliorer du code existant

#### Niveau 6: Création (Créer)

- **Projet guidé**: Créer quelque chose de nouveau avec un cahier des charges
- **Mini-projet**: Application complète d'un concept
- **Portfolio**: Projet personnel démontrant les compétences

### 2. Progression et Difficulté

#### Principe de la Zone Proximale de Développement (ZPD)

- **Ni trop facile, ni trop difficile**: Juste au-dessus du niveau actuel
- **Aide graduée**: Indices disponibles à la demande
- **Validation progressive**: Checkpoints intermédiaires

#### Structure d'un Exercice

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

### 3. Feedback et Évaluation

#### Feedback Immédiat

- **Tests automatisés**: Validation instantanée du code
- **Messages d'erreur pédagogiques**: Expliquer pourquoi c'est incorrect
- **Indices progressifs**: Système de hints (3 niveaux)
- **Célébration des réussites**: Renforcement positif

#### Évaluation Formative

- **Auto-évaluation**: Grilles de critères
- **Peer review**: Révision par les pairs (avec guide)
- **Réflexion métacognitive**: "Qu'ai-je appris ? Comment ?"
- **Portfolio de progression**: Trace des apprentissages

### 4. Accessibilité et Inclusion

#### Adaptations Nécessaires

- **Temps flexible**: Pas de limite de temps stricte
- **Formats variés**: Texte, vidéo, audio pour les consignes
- **Exemples diversifiés**: Représentation de différents contextes
- **Langue claire**: Éviter les expressions idiomatiques

#### Support Différencié

- **Parcours adaptatifs**: Exercices de base, intermédiaires, avancés
- **Ressources complémentaires**: Tutoriels, vidéos, documentation
- **Communauté d'entraide**: Forum, chat, sessions de groupe
- **Mentorat**: Accès à de l'aide personnalisée

## Checklist de Validation

TOUJOURS faire cette checklist de validation après avoir fait une slide ou une présentation ou un exercice.

### Avant de Publier une Présentation / un Slide

- [ ] Chaque terme technique est défini
- [ ] Progression logique et sans saut conceptuel
- [ ] Exemples concrets et variés
- [ ] Animations pédagogiques (pas décoratives)
- [ ] Notes du présentateur complètes
- [ ] Timing réaliste (max 45 min avant pause)
- [ ] Synthèses régulières
- [ ] Liens vers exercices pratiques

### Avant de Publier un Exercice

- [ ] Objectif d'apprentissage clair
- [ ] Contexte professionnel réaliste
- [ ] Instructions étape par étape
- [ ] Indices à plusieurs niveaux
- [ ] Solution commentée
- [ ] Critères de réussite mesurables
- [ ] Temps estimé indiqué
- [ ] Lien avec les concepts du cours

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

- **Pauses régulières**: Toutes les 45-60 minutes
- **Récapitulatifs**: Fin de chaque section
- **Répétition espacée**: Revoir les concepts clés plusieurs fois
- **Charge cognitive limitée**: 3-5 nouveaux concepts par session

---

## Application Obligatoire

**TOUTES** les présentations et exercices créés doivent respecter ces principes.
En cas de doute, privilégier TOUJOURS la simplicité et la clarté sur la sophistication technique.

**TOUS LES EXERCICES** sont dans un dossier `exercises` et doivent être nommés de manière descriptive. Ne pas mettre d'exercices dans les slides, mais on peut avoir une slide qui indique que nous passons sur un exercice.

**Objectif ultime**: Donner confiance et compétence à des personnes qui changent de vie professionnelle.
