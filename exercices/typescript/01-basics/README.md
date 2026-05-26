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

### Étape 1.1 : Les types unions

Créez deux types union pour représenter :
- `Rarete` : les niveaux de rareté (`"commune"`, `"rare"`, `"epique"`)
- `ModePaiement` : les moyens de paiement acceptés (`"especes"`, `"carte"`, `"echange"`)

**💡 Pourquoi ?** Les unions limitent les valeurs possibles et évitent les erreurs de saisie.

---

### Étape 1.2 : Interface de base pour un produit

Créez une interface `Produit` avec :
- `nom` : le nom du produit
- `prix` : le prix en pièces d'or

**💡 Pourquoi ?** Cette interface servira de base réutilisable pour tous les types de produits de la boutique (objets magiques, ingrédients, etc.).

---

### Étape 1.3 : Étendre l'interface pour les objets magiques

Créez une interface `ObjetMagique` qui **étend** `Produit` et ajoute :
- `effet` : description de l'effet magique
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
- Une potion de soin (15 pièces, commune, effet : "Restaure 20 points de vie")
- Un élixir de mana (20 pièces, rare, effet : "Régénère 50 points de mana")
- Un parchemin de feu (35 pièces, épique, effet : "Inflige 100 dégâts de feu")

Regroupez-les dans un tableau `catalogue: ObjetMagique[]`.

---

## 🏗️ Partie 3 : Les Types Utilitaires

### Étape 3.1 : Pick pour créer un résumé catalogue

Créez un type `ResumeProduit` en utilisant `Pick<ObjetMagique, "nom" | "prix" | "rarete">`.

**💡 Pourquoi ?** Pour afficher un catalogue simplifié sans tous les détails (effet, statut). Ce type est générique et pourrait s'appliquer à d'autres produits.

**Terminologie** : Un **résumé** est une vue partielle pour l'affichage catalogue.

**Défi** : Créez une fonction `creerResume(objet: ObjetMagique): ResumeProduit` qui extrait ces 3 propriétés.

---

### Étape 3.2 : Omit pour exclure une propriété

Créez un type `ProduitSansRarete` en utilisant `Omit<ObjetMagique, "rarete">`.

**💡 Pourquoi ?** Pour créer une vue simplifiée d'un produit sans sa rareté (utile pour un affichage basique ou un export).

**Défi** : Créez une fonction `simplifierProduit(objet: ObjetMagique): ProduitSansRarete` qui retourne l'objet sans la propriété `rarete`.

---

### Étape 3.3 : Partial pour les mises à jour

Créez un type `MiseAJourProduit` en utilisant `Partial<ObjetMagique>`.

**💡 Pourquoi ?** Pour permettre de modifier seulement certaines propriétés d'un produit (par exemple, changer uniquement le prix ou l'effet). Utile pour les ajustements sans recréer tout l'objet.

**Défi** : Créez une fonction `appliquerMiseAJour(objet: ObjetMagique, maj: MiseAJourProduit): ObjetMagique` qui fusionne les modifications.

---

### Étape 3.4 : Readonly pour protéger les données

Créez un type `ProduitImmuable` en utilisant `Readonly<ObjetMagique>`.

**💡 Pourquoi ?** Pour créer une version en lecture seule d'un produit (utile pour l'historique des ventes). Une fois vendu, le produit ne doit plus être modifié.

---

## 🏗️ Partie 4 : La Logique Métier

### Étape 4.1 : Fonctions utilitaires

**A) Fonction de calcul de statut**

Créez une fonction `obtenirStatut(nomProduit: string, stock: Stock): "en_stock" | "rupture"` qui :
- Retourne `"en_stock"` si `stock[nomProduit] > 0`
- Retourne `"rupture"` sinon

**💡 Pourquoi ?** Cette fonction centralise la logique de calcul du statut depuis le stock.

**B) Fonction de calcul de prix avec rareté**

Créez une fonction `calculerPrixAvecRarete(prixBase: number, rarete: Rarete): number` qui applique un multiplicateur :
- `"commune"` : ×1.0
- `"rare"` : ×1.5
- `"epique"` : ×2.0

**💡 Pourquoi ?** Cela donne une utilité concrète au type `Rarete` dans la logique métier.

**C) Fonction d'affichage**

Créez une fonction `afficherObjet(objet: ObjetMagique, stock: Stock): string` qui retourne une description formatée incluant le statut calculé dynamiquement.

**Exemple de retour** : `"Potion de soin (commune) - 15 pièces d'or - EN STOCK. Effet : Restaure 20 points de vie."`

---

### Étape 4.2 : Type pour une vente

Créez un type `Vente` qui enregistre :
- `vendeur` : qui a effectué la vente
- `objet` : quel objet a été vendu (utilisez `ProduitImmuable`)
- `modePaiement` : comment le client a payé
- `montant` : le montant de la transaction
- `timestamp` : la date de la vente (type `Date`)

**💡 Pourquoi ?** L'objet vendu doit être immuable pour éviter de modifier l'historique. C'est ici qu'on utilise `ProduitImmuable` !

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
2. Vérifier que l'objet est en stock avec `obtenirStatut()` (si `"rupture"`, retourner `null`)
3. Calculer le prix final avec le bonus de rareté (utilisez `calculerPrixAvecRarete`)
4. Décrémenter le stock de 1
5. Ajouter le prix final à la caisse
6. Retourner un objet `Vente` avec toutes les informations (objet en `ProduitImmuable`)

**💡 Pourquoi ?** Plus besoin de mettre à jour un champ `statut` ! Le statut est toujours calculé depuis le stock, garantissant la cohérence.

**💡 Pourquoi ?** Cette fonction centralise toute la logique métier et garantit la cohérence des données.

---

### Étape 4.4 : Fonction de réapprovisionnement

Créez une fonction `reapprovisionner(nomObjet: string, quantite: number, stock: Stock): void` qui :
1. Ajoute la quantité au stock

---

## ✅ Critères de Réussite

Votre système doit :
- [ ] Compiler sans erreur TypeScript
- [ ] Empêcher les ventes quand la boutique est fermée
- [ ] Empêcher les ventes d'objets en rupture
- [ ] Mettre à jour automatiquement le stock et la caisse
- [ ] Calculer dynamiquement le statut depuis le stock
- [ ] Enregistrer toutes les informations d'une vente
- [ ] Utiliser tous les types utilitaires de façon pertinente dans le code final
- [ ] Exploiter le type `Rarete` dans la logique métier (calcul de prix)
- [ ] Démontrer l'immutabilité avec `ProduitImmuable`

---

## 🧪 Tests à Effectuer

Testez votre système avec ce scénario :

```typescript
// Test 1 : Créer un résumé catalogue
const resumePotion = creerResume(potion);
console.log("Résumé:", resumePotion); // Devrait avoir seulement nom, prix, rarete

// Test 2 : Simplifier un produit (sans rareté)
const potionSimple = simplifierProduit(potion);
console.log("Potion simplifiée:", potionSimple); // Sans la propriété rarete

// Test 3 : Vérifier les statuts dynamiques
console.log("Statut potion:", obtenirStatut("Potion de soin", stock)); // "en_stock"
console.log("Statut parchemin:", obtenirStatut("Parchemin de feu", stock)); // "en_stock"

// Test 4 : Afficher le catalogue avec statuts
catalogue.forEach(objet => console.log(afficherObjet(objet, stock)));

// Test 5 : Vente 1 - Potion (devrait réussir)
const vente1 = vendreObjet(vendeur, potion, stock, caisse, "carte");
console.log("Vente 1:", vente1);
console.log("Stock potion:", stock["Potion de soin"]); // 11
console.log("Statut potion:", obtenirStatut("Potion de soin", stock)); // "en_stock"
console.log("Caisse:", caisse.montant); // 120 + (15 × 1.0) = 135

// Test 6 : Vente 2 - Parchemin épique (devrait réussir avec bonus rareté)
const vente2 = vendreObjet(vendeur, parchemin, stock, caisse, "especes");
console.log("Vente 2:", vente2);
console.log("Stock parchemin:", stock["Parchemin de feu"]); // 0
console.log("Statut parchemin:", obtenirStatut("Parchemin de feu", stock)); // "rupture" (calculé automatiquement !)
console.log("Caisse:", caisse.montant); // 135 + (35 × 2.0) = 205

// Test 7 : Vente 3 - Parchemin à nouveau (devrait échouer, rupture)
const vente3 = vendreObjet(vendeur, parchemin, stock, caisse, "carte");
console.log("Vente 3:", vente3); // null (statut calculé = "rupture")

// Test 8 : Mise à jour de prix
const majPrix: MiseAJourProduit = { prix: 18 };
const potionMaj = appliquerMiseAJour(potion, majPrix);
console.log("Prix potion après MAJ:", potionMaj.prix); // 18

// Test 9 : Fermer la boutique
vendeur.boutiqueOuverte = false;

// Test 10 : Vente 4 - Élixir (devrait échouer, boutique fermée)
const vente4 = vendreObjet(vendeur, mana, stock, caisse, "especes");
console.log("Vente 4:", vente4); // null

// Test 11 : Réapprovisionner
vendeur.boutiqueOuverte = true;
reapprovisionner("Parchemin de feu", 5, stock);
console.log("Stock parchemin après réappro:", stock["Parchemin de feu"]); // 5
console.log("Statut parchemin après réappro:", obtenirStatut("Parchemin de feu", stock)); // "en_stock" (calculé automatiquement !)

// Test 12 : Vérifier l'immutabilité de l'historique
if (vente1) {
  console.log("Objet dans vente1:", vente1.objet);
  // vente1.objet.prix = 999; // ❌ Erreur TypeScript : readonly!
}
```

**Résultats attendus** :
- Test 1 : `resumePotion` contient uniquement `nom`, `prix`, `rarete`
- Test 2 : `potionSimple` sans la propriété `rarete`
- Test 3 : Statuts calculés dynamiquement = `"en_stock"`
- Test 5 : Vente 1 réussie, stock → 11, statut calculé = `"en_stock"`, caisse → 135
- Test 6 : Vente 2 réussie, stock → 0, statut calculé = `"rupture"`, caisse → 205
- Test 7 : Vente 3 échouée (null, rupture détectée)
- Test 8 : Prix potion → 18
- Test 10 : Vente 4 échouée (null, boutique fermée)
- Test 11 : Stock → 5, statut calculé = `"en_stock"`
- Test 12 : Erreur de compilation si on tente de modifier `vente1.objet`

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