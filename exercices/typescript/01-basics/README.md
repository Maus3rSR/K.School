# Séance 1 — Exercices TypeScript : RPG

## Exercice 1 — Créer le héros

**Objectif :** déclarer des variables avec des types simples.  
**Contexte :** un aventurier entre dans la guilde.

**Consigne :**
- Crée une variable pour le nom du héros.
- Crée une variable pour son niveau.
- Crée une variable pour savoir s’il est vivant.
- Ajoute les types explicites.

**Exemple de données :**
- Nom : `Aria`
- Niveau : `1`
- Vivant : `true`

**Critères de réussite :**
- Chaque variable a le bon type.
- Une mauvaise valeur déclenche une erreur TypeScript.

**Indice :**
- Utilise `string`, `number` et `boolean`.

---

## Exercice 2 — Décrire la fiche du héros

**Objectif :** typer un objet simple.  
**Contexte :** la guilde veut enregistrer les personnages.

**Consigne :**
- Crée un objet `hero`.
- Ajoute les propriétés `nom`, `niveau`, `pointsDeVie`.
- Définis un type pour cet objet.
- Affiche une phrase du style : `Aria est niveau 1`.

**Critères de réussite :**
- L’objet suit une structure claire.
- Les propriétés sont correctement typées.

**Indice :**
- Tu peux utiliser un type objet ou une interface.

---

## Exercice 3 — L’inventaire du héros

**Objectif :** créer un tableau typé.  
**Contexte :** le héros trouve ses premiers objets.

**Consigne :**
- Crée un tableau contenant 3 objets de type chaîne.
- Mets-y par exemple : arme, potion, bouclier.
- Essaie d’ajouter un nombre pour vérifier le contrôle de TypeScript.

**Critères de réussite :**
- Le tableau contient uniquement des chaînes.
- TypeScript refuse les types incorrects.

**Indice :**
- Pense à un inventaire de départ.

---

## Exercice 4 — Utiliser une fonction

**Objectif :** écrire une fonction typée avec paramètres et retour.  
**Contexte :** le héros attaque un monstre.

**Consigne :**
- Crée une fonction `attaquer`.
- Elle prend deux paramètres : nom du héros et points d’attaque.
- Elle renvoie un message.
- Typage attendu : les paramètres et le retour doivent être définis.

**Exemple de résultat :**
- `Aria attaque avec 10 points.`

**Critères de réussite :**
- La fonction est typée.
- Le message retourné est correct.

**Indice :**
- Le retour sera une chaîne de caractères.

---

## Exercice 5 — Créer une interface de personnage

**Objectif :** définir une structure réutilisable.  
**Contexte :** plusieurs personnages vont apparaître dans le jeu.

**Consigne :**
- Crée une interface `Personnage`.
- Ajoute `nom`, `classe`, `niveau`, `vivant`.
- Crée deux personnages différents qui respectent cette interface.

**Exemple :**
- Aria la mage.
- Borin le guerrier.

**Critères de réussite :**
- Les deux personnages ont la même structure.
- La définition est claire et réutilisable.

**Indice :**
- Une interface sert à décrire la forme d’un objet.

---

## Exercice 6 — Corriger des erreurs

**Objectif :** lire et corriger les erreurs de typage.  
**Contexte :** un apprenti magicien a mal codé la fiche d’un personnage.

**Consigne :**
Le code contient volontairement :
- une chaîne à la place d’un nombre,
- une propriété manquante,
- un mauvais type de retour dans une fonction.

**Travail demandé :**
- Repérer les erreurs.
- Corriger le code.
- Expliquer pourquoi TypeScript les signale.

**Critères de réussite :**
- Le code compile.
- Les erreurs sont comprises.
- L’explication est simple.

---

## Exercice 7 — Mini mission finale

**Objectif :** réinvestir toutes les notions de la séance.  
**Contexte :** le héros part dans une forêt.

**Consigne :**
Crée un petit programme avec :
- un héros typé,
- un inventaire,
- une fonction pour attaquer,
- une phrase finale qui résume la mission.

**Exemple de fin :**
- `Aria part en mission avec une épée et 3 potions.`