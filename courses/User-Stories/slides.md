---
layout: cover
background: whats_your_story.jpg
highlighter: shiki
monaco: true
titleTemplate: "%s - Kevin UNFRICHT"
---
<style>
.cover div {
  margin-top: 10%;
}
</style>

# Les User Stories
L'expression du besoin utilisateur au sein d'un produit logiciel

---
layout: center
class: text-center
---

# Partie 1 - C'est quoi une User Story
Ou "Récit Utilisateur" in French

---
layout: image-right
image: pere_castor.jpg
---
# Père Castor raconte moi une user story

- Nous provient de la méthologie Agile
- Phrase simple, rédigée dans un langage courant pour décrire le résultat souhaité d'une intention de l'utilisateur
- Permet de décrire avec suffisamment de précision le contenu d'une fonctionnalité ou d'une caractéristique à développer
- Doit permettre d'aider à comprendre la valeur ajoutée de ce que l'on va développer dans le produit
- Se concentre sur le "Quoi" et le "Pourquoi" plutôt  que sur le "Comment"

<!--
Dans les méthodes agiles, une User Story (de son petit nom US) est une phrase simple, rédigée dans un langage courant, qui permet de décrire avec suffisamment de précision le contenu d'une fonctionnalité à développer.

Dans la méthode agile Scrum dont elle est issue, la User Story est censée illustrer un besoin fonctionnel exprimé par les types d’utilisateurs. Elle vise ainsi à assurer que l’on délivre bien de la valeur pour nos usagers.

Une user story est une explication non formelle, générale d'une fonctionnalité logicielle écrite du point de vue de l'utilisateur final. 

L'objectif d'une user story est de définir comment un travail apportera une certaine valeur ajoutée au client. Remarque : les « clients » ne doivent pas forcément être des utilisateurs externes au sens traditionnel. Il peut s'agir de clients en interne ou de collègues qui, au sein de votre organisation, dépendent de votre équipe.
-->

---

# Des intérêts multiples

- Permettre de coller au maximum au besoin et à la vision des différents utilisateurs du produit
- Aligner la vision et confirmer la compréhension du métier par tous les acteurs du projet
  - Chefs de projet Produit
  - Développeurs
  - Testeurs
  - Clients
  - Etc.
- Gain de temps pour les équipes de développement sur la compréhension des fonctionnalités à développer
- Permettre de s'assurer que le développement reste centré sur les besoins métiers / utilisateurs

<!--
Pour le Product Owner, l’intérêt de rédiger des User Stories est triple :

- Elles permettent de coller au maximum au besoin et à la vision de l’utilisateur (car elles sont exprimées de manière simple, en langage courant) ;

- Elles engendrent un gain de temps considérable pour les équipes de développement dans leur compréhension de la fonctionnalité à développer (toujours grâce à sa forme synthétique) ;

- Elles permettent d’aligner la vision, et de confirmer la compréhension du métier, du Product Owner, des développeurs, du Scrum Master, des testeurs et de toute autre partie prenante pertinente en les rassemblant autour d’un langage commun.

- Les user stories doivent permettre de se concentrer sur le problème à résoudre, et non sur la réfléxion de la solution
-->

---
layout: image-left
image: nope.jpg
---

# Ce que ne sont pas les users stories

- Des spécifications techniques
- Uniquement une description de fonctionnalités (features)
- Un backlog / une toto list du cahier des charges fonctionnels

_(Spoiler: la majorité des fonctionnalités d'un cahier des charges peuvent partir à la poubelle lors d'une conception produit)_

---
layout: image-right
image: think.jpg
---
# L'importance des user stories dans l'analyse architecturale

- Une bonne vision produit permet de s'assurer que l'architecture technique réponde aux réels besoins
- Vision claire des inter-dépendances entre les besoins, qui influencera la conception d'une architecture modulaire
- La conception d'un langage commun permet de développer le code métier du produit (DDD) et d'appliquer des choix techniques d'infrastructure de manière itérative

---
layout: center
class: text-center
---

# Partie 2 - Recette de rédaction d'une User Story

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
Si différents modèles de formulation des User Stories existent, il est fondamental que la personne qui écrivent les USen adopte un qui inclut les dimensions “qui”, “quoi” et “pourquoi”.

Indispensables, ces trois éléments permettent de structurer le contenu de telle sorte qu’il exprime clairement la valeur ajoutée de la fonctionnalité, mais aussi le bénéficiaire.

À savoir que le “en tant que” ne désigne pas forcément un type d’utilisateur final du système, mais tout rôle concerné par le produit : utilisateur final d’un certain segment, testeur, développeur, administrateur, etc.

« En tant que [persona] » : pour qui développons-nous cette fonctionnalité ? Nous ne cherchons pas seulement l'intitulé d'une fonction, mais aussi le persona de cette personne. Max. Notre équipe devrait avoir une compréhension commune de l'identité de Max. Il faut espérer que nous nous sommes entretenus avec beaucoup de « Max ». Nous comprenons comment cette personne travaille, comment elle pense et ce qu'elle ressent. Nous avons de l'empathie pour elle.

« Souhaite que » : c'est ici que nous décrivons l'intention de Max, et non les fonctionnalités qu'il utilise. Qu'essaie-t-il de faire réellement ? Cet énoncé ne devrait pas impliquer d'implémentation. Si vous décrivez une composante de l'interface utilisateur et non l'objectif de l'utilisateur, vous êtes hors sujet.

« Afin de » : comment son désir immédiat de faire quelque chose s'intègre-t-il à la vue d'ensemble ? Quel avantage global cette personne essaie-t-elle d'obtenir ? Quel est le principal problème à résoudre ?
-->

---

# Quelques exemples

- En tant que client, je veux pouvoir filtrer les produits par prix sur le site pour trouver plus rapidement ce qui correspond à mon budget.
- En tant que utilisateur, je veux pouvoir sauvegarder mes préférences de langue pour n’avoir pas à les sélectionner à chaque visite.
- En tant que client, je veux pouvoir ajouter des produits à mon panier et les visualiser avant de passer à la caisse afin de gérer facilement mes achats.
- En tant que utilisateur, je veux pouvoir réinitialiser mon mot de passe via un lien envoyé par e-mail afin de récupérer l’accès à mon compte si je l’ai oublié.
- En tant que responsable produit, je veux que la recherche sur le site propose des suggestions automatiques pendant la saisie afin de réduire le taux d’abandon et améliorer l’expérience utilisateur.

---

# Est-ce que j'ai bien rédigé ? INVEST

- On peut chercher à vérifier qu'une User Story est bien rédigé en cherchant à vérifier qu'elle respecte bien les 6 adjectifs de l'acronyme INVEST
    - **Independent** : chaque User Story doit être la plus indépendante possible afin que son développement soit facilité
    - **Negotiable** : une User Story doit pouvoir être challengée
    - **Valuable** : comme son nom l’indique, la User Story doit apporter de la valeur à l’utilisateur final
    - **Estimable** : une User Story doit pouvoir être estimable, qui représente un niveau de complexité et d'effort pour l’équipe de développement
    - **Small** : la User Story doit être assez “petite” pour être simple à développer, tester et déployer
    - **Testable** : pour chaque User Story, des critères objectifs de tests doivent être mis en place afin de permettre à l’équipe d’évaluer si le développement est conforme

---
layout: center
class: text-center
---

# Partie 3 - Critères d'Acceptation
Une aide pour un bon cadre à la User Story

---

# Composante essentielle à la bonne rédaction d'une User Story

- Ensemble de conditions que le récit doit satisfaire pour être considérée comme complète et terminée
- Permet de clarifier les attentes et les exigences tout en dissipant les malentendus entre les parties prenantes du produit
- Elles facilitent l'écriture de tests automatisés, permettant de vérifier continuellement que l'intention de l'utilisateur continue de fonctionner comme prévu au fil des évolutions
- Elles peuvent établir une limite qui aide les membres de l'équipe à comprendre ce qui est inclus et ce qui est exclu de la User Story
  - Cela n'informe donc pas que le comportement du produit dnas les scénarios de "parcours heureux" (happy path)
  - Mais ils guident également l'expérience utilisateur lorsque les choses ne fonctionnent pas comme prévu en décrivant ce qui serait vérifier par les tests d'acceptation
- S'il y a trop de critères d'acceptation, c'est possiblement un signe que la User Story doit être encore découpée

<!--
Nous sommes bien dans l’esprit de l’agile : délivrer de la valeur rapidement, quitte à améliorer par la suite. Les clients préfèreront certainement pouvoir saisir leur adresse secondaire de livraison dès la prochaine mise à jour de notre application plutôt qu’attendre de longues semaines pour avoir une fonctionnalité beaucoup plus aboutie.
-->

---
layout: image-right
image: post_it.jpg
---

# Comment rédiger les critères d'acceptation ?
Les critères d'acceptation peuvent être orientés "Règles" ou orientés "Scénario"

- Orienté **Règles** : Se décrit sous forme d'une liste simple
- Orienté **Scénario** : S'appuie sur le BDD (Behaviour Driven Development) qui consiste à développer les scénarios axé sur le comportement de l'utilisateur
  - Utilisation du format anglophone **Given** (Étant donné), **When** (Quand / Lorsque), **Then** (Alors)
- Comme pour l'écriture de la User Story, les critères d'acceptation n'est pas technique !

---

# Exemple : Recherche d'un ouvrage par un abonné d'une médiathèque

- L'User Story, dont le titre est "Consulter la fiche d'un ouvrage", se décrit comme :
  - En tant qu'abonné de la médiathèque
  - Je recherche un ouvrage en spécifiant son auteur, son titre ou sa référence ISBN
  - Afin de l'emprunter ou de le réserver

---

# Exemple : Recherche d'un ouvrage par un abonné d'une médiathèque

- Critères d'acceptation sous forme de liste :
  1. Résultat unique, afficher l'ouvrage : auteur/titre/référence
  2. Pas de résultat, inviter l'abonné à une nouvelle recherche
  3. Plusieurs résultats, afficher la liste des ouvrages triés par auteur

- Critère d'acceptation sous forme de scénario, écrit en format BDD
  - **Scénario** : l'abonné lance une recherche pour consulter la fiche d'un ouvrage
  - **Étant donné** que je suis abonné et que je suis sur la page de recherche d'un ouvrage
  - **Quand** je saisis le titre, le titre ou la référence et que je lance la recherche
  - **Alors** je peux consulter la liste des ouvrages correspondants triés par auteur

---
layout: center
class: text-center
---

# Partie 4 - Example Mapping
L'exemple n'est pas une autre façon d'enseigner, c'est la seule façon d'enseigner - Einstein

---
layout: image-left
image: mapping.jpg
---

# Qu'est-ce que l'Example Mapping ?

- Méthode uilisant des exemples concrets pour illustrer et mieux définir les critères d'acceptation d'une US
- L'objectif principal de l'atelier est d'encourager l'échange autour d'un même référentiel
- S’accorder sur des exemples énoncés dans le langage métier participe à construire une compréhension commune des spécifications
- La responsabilité d’établir les spécifications adéquates est ainsi partagée entre les membres de l'équipe, experts techniques et experts métiers

---

# Comment mener un atelier d'Example Mapping ?
L’Example Mapping a recours à quatre catégories d’éléments

- La user story est écrite un post-it (ou une carte) jaune. Il s’agit du point de départ de l’atelier.
- Des post-it bleus sont utilisés pour écrire les règles liées à la user story, généralement les critères d’acceptation et les éventuelles contraintes.
- Les exemples sont écrits sur des post-it verts. Ils servent à illustrer les règles.
- Les éventuelles questions sont indiquées sur des post-it rouges. Tant que ces questions n’ont pas trouvé de réponses, elles ne doivent pas être considérées comme étant prêtes à être implémentées.

Bien sûr, l'atelier peut se faire en version numérique.

Si, à la fin de l’atelier, vous avez trop de règles, cela peut signifier que la user story analysée devrait être scindée en deux parties ou plus. Si vous avez trop d’exemples sous une règle, cela peut signifier que la règle devrait être divisée en plusieurs parties. L’Exemple Mapping est une bonne façon de s’assurer que les user stories sont toujours de la bonne taille.

---
layout: image
image: example_mapping.webp
---

---

# Ressources

- [User Story](https://datascientest.com/user-story-tout-savoir)
- [Critères d'acceptation](https://devway.tech/blog/comment-definir-criteres-acceptation/)
- [Exemple Mapping](https://draft.io/fr/example/example-mapping)
