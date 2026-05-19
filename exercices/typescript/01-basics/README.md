# Mini-Projet TypeScript : Boutique Magique

## 🎯 Objectif Général

Construire un système de gestion de boutique magique en TypeScript où chaque concept avancé (unions, interfaces, types utilitaires) résout un problème concret du métier.

**Durée estimée** : 2-3 heures

---

## 📖 Contexte

Mira tient une boutique d'objets magiques. Elle doit gérer son inventaire, suivre ses ventes, et s'assurer que tout est cohérent : pas de vente sans stock, mise à jour automatique de la caisse, traçabilité des transactions.

Votre mission : modéliser ce système en TypeScript de façon robuste et maintenable.

---

## 🎓 Prérequis

Avant de commencer, vous devez maîtriser :
- Les types de base (`string`, `number`, `boolean`)
- Les interfaces et types objets
- Les tableaux typés
- Les fonctions typées

---

## 📋 Règles Métier

Votre système doit respecter ces contraintes :

1. **Stock** : Un objet ne peut être vendu que s'il est disponible en quantité suffisante
2. **Statut** : Quand un objet atteint 0 en stock, son statut passe automatiquement à `"rupture"`
3. **Caisse** : Chaque vente incrémente le montant de la caisse
4. **Traçabilité** : Chaque vente doit enregistrer qui a vendu, quoi, et comment le client a payé
5. **Boutique fermée** : Aucune vente ne peut avoir lieu si la boutique est fermée

---

## 🏗️ Partie 1 : Modéliser les Données de Base

### Étape 1.1 : Les types unions pour les états

Créez trois types union pour représenter :
- `StatutStock` : les états possibles d'un produit (`"en_stock"`, `"rupture"`, `"commande"`)
- `Rarete` : les niveaux de rareté (`"commune"`, `"rare"`, `"epique"`)
- `ModePaiement` : les moyens de paiement acceptés (`"especes"`, `"carte"`, `"echange"`)

**💡 Pourquoi ?** Les unions limitent les valeurs possibles et évitent les erreurs de saisie.

---

### Étape 1.2 : Interface de base pour un produit

Créez une interface `Produit` avec :
- `nom` : le nom du produit
- `prix` : le prix en pièces d'or

**💡 Pourquoi ?** Cette interface servira de base réutilisable.

---

### Étape 1.3 : Étendre l'interface pour les objets magiques

Créez une interface `ObjetMagique` qui **étend** `Produit` et ajoute :
- `effet` : description de l'effet magique
- `statut` : le statut actuel (utilisez le type `StatutStock`)
- `rarete` : le niveau de rareté (utilisez le type `Rarete`)

**💡 Pourquoi ?** L'extension d'interface permet de composer des types complexes à partir de bases simples.

---

### Étape 1.4 : Le vendeur et la boutique

Créez un type `Vendeur` avec :
- `nom` : nom du vendeur
- `niveauExperience` : nombre d'années d'expérience
- `boutiqueOuverte` : booléen indiquant si la boutique est ouverte

Créez un type `Caisse` avec :
- `montant` : le montant actuel en pièces d'or

**💡 Pourquoi ?** Ces types représentent l'état global de la boutique.

---

## 🏗️ Partie 2 : Gérer le Stock avec Record

### Étape 2.1 : Type Record pour le stock

Créez un type `Stock` en utilisant `Record<string, number>` pour associer chaque nom de produit à sa quantité disponible.

**💡 Pourquoi ?** `Record` est parfait pour créer des dictionnaires typés (clé → valeur).

---

### Étape 2.2 : Initialiser les données

Créez les constantes suivantes :

```typescript
const vendeur: Vendeur = {
  nom: "Mira",
  niveauExperience: 3,
  boutiqueOuverte: true
};

const caisse: Caisse = {
  montant: 120
};

const stock: Stock = {
  "Potion de soin": 12,
  "Élixir de mana": 8,
  "Parchemin de feu": 1
};
```

Créez ensuite 3 objets magiques :
- Une potion de soin (15 pièces, commune)
- Un élixir de mana (20 pièces, rare)
- Un parchemin de feu (35 pièces, épique)

Regroupez-les dans un tableau `catalogue`.

---

## 🏗️ Partie 3 : Les Types Utilitaires

### Étape 3.1 : Pick pour créer un résumé

Créez un type `ResumeObjet` en utilisant `Pick<ObjetMagique, "nom" | "prix" | "rarete">`.

**💡 Pourquoi ?** Pour afficher un catalogue simplifié sans tous les détails.

**Défi** : Créez une fonction `creerResume(objet: ObjetMagique): ResumeObjet` qui extrait ces 3 propriétés.

---

### Étape 3.2 : Omit pour une vue simplifiée

Créez un type `ObjetSansStatut` en utilisant `Omit<ObjetMagique, "statut">`.

**💡 Pourquoi ?** Pour créer une fiche produit avant qu'il ne soit mis en stock (le statut sera ajouté après).

---

### Étape 3.3 : Partial pour les mises à jour

Créez un type `MiseAJourObjet` en utilisant `Partial<ObjetMagique>`.

**💡 Pourquoi ?** Pour permettre de modifier seulement certaines propriétés d'un objet (par exemple, changer uniquement le prix).

**Défi** : Créez une fonction `appliquerMiseAJour(objet: ObjetMagique, maj: MiseAJourObjet): ObjetMagique` qui fusionne les modifications.

---

### Étape 3.4 : Readonly pour protéger les données

Créez un type `ObjetImmuable` en utilisant `Readonly<ObjetMagique>`.

**💡 Pourquoi ?** Pour créer une version en lecture seule d'un objet (utile pour l'historique des ventes).

---

## 🏗️ Partie 4 : La Logique Métier

### Étape 4.1 : Fonction d'affichage

Créez une fonction `afficherObjet(objet: ObjetMagique): string` qui retourne une description formatée.

**Exemple de retour** : `"Potion de soin coûte 15 pièces d'or. Effet : Restaure 20 points de vie."`

---

### Étape 4.2 : Type pour une vente

Créez un type `Vente` qui enregistre :
- `vendeur` : qui a effectué la vente
- `objet` : quel objet a été vendu (en lecture seule avec `Readonly<ObjetMagique>`)
- `modePaiement` : comment le client a payé
- `montant` : le montant de la transaction
- `timestamp` : la date de la vente (type `Date`)

**💡 Pourquoi ?** L'objet vendu doit être en lecture seule pour éviter de modifier l'historique.

---

### Étape 4.3 : Fonction de vente (le cœur du système)

Créez une fonction `vendreObjet` avec cette signature :

```typescript
function vendreObjet(
  vendeur: Vendeur,
  objet: ObjetMagique,
  stock: Stock,
  caisse: Caisse,
  modePaiement: ModePaiement
): Vente | null
```

**Logique à implémenter** :
1. Vérifier que la boutique est ouverte (sinon retourner `null`)
2. Vérifier que l'objet est en stock (quantité > 0, sinon retourner `null`)
3. Vérifier que le statut n'est pas `"rupture"` (sinon retourner `null`)
4. Décrémenter le stock de 1
5. Ajouter le prix à la caisse
6. Si le stock atteint 0, mettre le statut de l'objet à `"rupture"`
7. Retourner un objet `Vente` avec toutes les informations

**💡 Pourquoi ?** Cette fonction centralise toute la logique métier et garantit la cohérence des données.

---

### Étape 4.4 : Fonction de réapprovisionnement

Créez une fonction `reapprovisionner(nomObjet: string, quantite: number, stock: Stock, objet: ObjetMagique): void` qui :
1. Ajoute la quantité au stock
2. Si le statut était `"rupture"`, le repasse à `"en_stock"`

---

## ✅ Critères de Réussite

Votre système doit :
- [ ] Compiler sans erreur TypeScript
- [ ] Empêcher les ventes quand la boutique est fermée
- [ ] Empêcher les ventes d'objets en rupture
- [ ] Mettre à jour automatiquement le stock et la caisse
- [ ] Changer le statut en `"rupture"` quand le stock atteint 0
- [ ] Enregistrer toutes les informations d'une vente
- [ ] Utiliser tous les types utilitaires de façon pertinente

---

## 🧪 Tests à Effectuer

Testez votre système avec ce scénario :

```typescript
// Afficher le catalogue
catalogue.forEach(objet => console.log(afficherObjet(objet)));

// Vente 1 : Potion (devrait réussir)
const vente1 = vendreObjet(vendeur, potion, stock, caisse, "carte");
console.log("Vente 1:", vente1);
console.log("Stock potion:", stock["Potion de soin"]);
console.log("Caisse:", caisse.montant);

// Vente 2 : Parchemin (devrait réussir)
const vente2 = vendreObjet(vendeur, parchemin, stock, caisse, "especes");
console.log("Vente 2:", vente2);
console.log("Stock parchemin:", stock["Parchemin de feu"]);
console.log("Statut parchemin:", parchemin.statut); // Devrait être "rupture"

// Vente 3 : Parchemin à nouveau (devrait échouer)
const vente3 = vendreObjet(vendeur, parchemin, stock, caisse, "carte");
console.log("Vente 3:", vente3); // Devrait être null

// Fermer la boutique
vendeur.boutiqueOuverte = false;

// Vente 4 : Élixir (devrait échouer, boutique fermée)
const vente4 = vendreObjet(vendeur, mana, stock, caisse, "especes");
console.log("Vente 4:", vente4); // Devrait être null

// Réapprovisionner
vendeur.boutiqueOuverte = true;
reapprovisionner("Parchemin de feu", 5, stock, parchemin);
console.log("Stock parchemin après réappro:", stock["Parchemin de feu"]);
console.log("Statut parchemin après réappro:", parchemin.statut); // Devrait être "en_stock"
```

**Résultats attendus** :
- Vente 1 : succès, stock passe à 11, caisse à 135
- Vente 2 : succès, stock passe à 0, statut à "rupture", caisse à 170
- Vente 3 : échec (null)
- Vente 4 : échec (null)
- Réapprovisionnement : stock à 5, statut à "en_stock"

---

## 💡 Conseils

- **Commencez par les types** : définissez toutes les structures avant d'écrire les fonctions
- **Testez au fur et à mesure** : ne passez pas à l'étape suivante tant que la précédente ne fonctionne pas
- **Lisez les erreurs TypeScript** : elles vous guident vers les problèmes de typage
- **Utilisez l'autocomplétion** : TypeScript vous suggère les propriétés disponibles
- **Pensez immutabilité** : utilisez `Readonly` pour les données qui ne doivent pas changer

---

## 🚀 Pour Aller Plus Loin (Optionnel)

Si vous terminez en avance, ajoutez ces fonctionnalités :

1. **Historique des ventes** : tableau de toutes les ventes effectuées
2. **Statistiques** : fonction qui calcule le chiffre d'affaires total, l'objet le plus vendu, etc.
3. **Remises** : ajouter un système de réduction selon la rareté ou la quantité
4. **Niveaux de vendeur** : le vendeur gagne de l'expérience à chaque vente
5. **Type Guard** : fonction `estEnStock(objet: ObjetMagique): boolean` qui vérifie le statut