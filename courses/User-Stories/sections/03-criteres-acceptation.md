---
layout: center
class: text-center
---

# Partie 3 - Critères d'Acceptation
Une aide pour un bon cadre à la User Story

---
layout: section
---

# ✅ Définir les Critères

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
Nous sommes bien dans l'esprit de l'agile : délivrer de la valeur rapidement, quitte à améliorer par la suite. Les clients préfèreront certainement pouvoir saisir leur adresse secondaire de livraison dès la prochaine mise à jour de notre application plutôt qu'attendre de longues semaines pour avoir une fonctionnalité beaucoup plus aboutie.
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

# Exercice Pratique - Critères d'Acceptation

**User Story** :
> En tant que client, je souhaite pouvoir filtrer les restaurants par type de cuisine afin de trouver rapidement ce qui me plaît.

<div v-click>

**Consigne** : Rédigez 3-4 critères d'acceptation au format BDD (Given/When/Then)

</div>

<div v-click>

**Exemple de départ** :
- **Scénario** : Filtrer par cuisine italienne
- **Étant donné** que je suis sur la page de recherche
- **Quand** je sélectionne "Italien" dans les filtres
- **Alors** je vois uniquement les restaurants italiens

</div>

<div v-click>

**À vous** : Créez 2 autres scénarios (ex: plusieurs filtres, aucun résultat)

**Durée estimée** : 15 minutes

</div>
