---
layout: center
class: text-center
---

# Partie 2 - Recette de rédaction d'une User Story

---
layout: section
---

# ✍️ Format et Structure

---
layout: image-left
image: idea.jpg
---

# Qui, quoi, pourquoi

- Différentes écritures existent, la plus fondamentale est l'écriture qui adopte la structure "qui, quoi, pourquoi" pour exprimer clairement la valeur ajoutée au produit :
  - En tant que (Persona) :
  - Je souhaite que (Action) :
  - Afin de (Objectif à atteindre) :
- Dans sa version anglo-saxonne :
  - As a :
  - I want to :
  - So that :

<!--
Si différents modèles de formulation des User Stories existent, il est fondamental que la personne qui écrivent les USen adopte un qui inclut les dimensions "qui", "quoi" et "pourquoi".

Indispensables, ces trois éléments permettent de structurer le contenu de telle sorte qu'il exprime clairement la valeur ajoutée de la fonctionnalité, mais aussi le bénéficiaire.

À savoir que le "en tant que" ne désigne pas forcément un type d'utilisateur final du système, mais tout rôle concerné par le produit : utilisateur final d'un certain segment, testeur, développeur, administrateur, etc.

« En tant que [persona] » : pour qui développons-nous cette fonctionnalité ? Nous ne cherchons pas seulement l'intitulé d'une fonction, mais aussi le persona de cette personne. Max. Notre équipe devrait avoir une compréhension commune de l'identité de Max. Il faut espérer que nous nous sommes entretenus avec beaucoup de « Max ». Nous comprenons comment cette personne travaille, comment elle pense et ce qu'elle ressent. Nous avons de l'empathie pour elle.

« Souhaite que » : c'est ici que nous décrivons l'intention de Max, et non les fonctionnalités qu'il utilise. Qu'essaie-t-il de faire réellement ? Cet énoncé ne devrait pas impliquer d'implémentation. Si vous décrivez une composante de l'interface utilisateur et non l'objectif de l'utilisateur, vous êtes hors sujet.

« Afin de » : comment son désir immédiat de faire quelque chose s'intègre-t-il à la vue d'ensemble ? Quel avantage global cette personne essaie-t-elle d'obtenir ? Quel est le principal problème à résoudre ?
-->

---

# Quelques exemples

- En tant que client, je veux pouvoir filtrer les produits par prix sur le site pour trouver plus rapidement ce qui correspond à mon budget.
- En tant que utilisateur, je veux pouvoir sauvegarder mes préférences de langue pour n'avoir pas à les sélectionner à chaque visite.
- En tant que client, je veux pouvoir ajouter des produits à mon panier et les visualiser avant de passer à la caisse afin de gérer facilement mes achats.
- En tant que utilisateur, je veux pouvoir réinitialiser mon mot de passe via un lien envoyé par e-mail afin de récupérer l'accès à mon compte si je l'ai oublié.
- En tant que responsable produit, je veux que la recherche sur le site propose des suggestions automatiques pendant la saisie afin de réduire le taux d'abandon et améliorer l'expérience utilisateur.

---

# Exercice Pratique - Rédiger une User Story

**Contexte** : Application de réservation de restaurant

**Consigne** : Rédigez une User Story pour la fonctionnalité suivante :
> "Les clients doivent pouvoir annuler leur réservation"

<div v-click>

**Format attendu** :
- En tant que...
- Je souhaite que...
- Afin de...

</div>

<div v-click>

**Critères de validation** :
- [ ] Respecte le format "qui, quoi, pourquoi"
- [ ] Répond aux critères INVEST
- [ ] Inclut 2-3 critères d'acceptation

</div>

<div v-click>

**Durée estimée** : 10 minutes

</div>

---

# Est-ce que j'ai bien rédigé ? INVEST

- On peut chercher à vérifier qu'une User Story est bien rédigé en cherchant à vérifier qu'elle respecte bien les 6 adjectifs de l'acronyme INVEST
    - **Independent** : chaque User Story doit être la plus indépendante possible afin que son développement soit facilité
    - **Negotiable** : une User Story doit pouvoir être challengée
    - **Valuable** : comme son nom l'indique, la User Story doit apporter de la valeur à l'utilisateur final
    - **Estimable** : une User Story doit pouvoir être estimable, qui représente un niveau de complexité et d'effort pour l'équipe de développement
    - **Small** : la User Story doit être assez "petite" pour être simple à développer, tester et déployer
    - **Testable** : pour chaque User Story, des critères objectifs de tests doivent être mis en place afin de permettre à l'équipe d'évaluer si le développement est conforme

---

# Anti-Patterns - Ce qu'il ne faut PAS faire

<div v-click>

❌ **Trop technique**
> En tant que développeur, je veux créer une API REST avec authentification JWT

✅ **Centré utilisateur**
> En tant qu'utilisateur, je veux me connecter de manière sécurisée pour accéder à mes données

</div>

<div v-click>

❌ **Trop vague**
> En tant qu'utilisateur, je veux que l'application soit rapide

✅ **Spécifique et mesurable**
> En tant qu'utilisateur, je veux que la page d'accueil se charge en moins de 2 secondes pour ne pas perdre patience

</div>
