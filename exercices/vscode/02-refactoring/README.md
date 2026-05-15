# Exercice : Refactoriser un fichier

## 🎯 Objectif

Améliorer le fichier `dirty-code.ts` en utilisant uniquement les raccourcis clavier.

## 📋 Instructions

1. **Renommer les variables** avec <kbd>F2</kbd>
   - `x` → `totalPrice`
   - `y` → `taxAmount`

2. **Extraire une fonction** avec <kbd>Ctrl + Shift + R</kbd>
   - Sélectionner le calcul de taxe (`x * taxRate`)
   - Extraire en fonction `calculateTax`

3. **Corriger l'import manquant** avec <kbd>Ctrl + .</kbd>
   - La fonction `format` de `date-fns` n'est pas importée
   - VS Code proposera d'ajouter l'import

4. **Formater le fichier** avec <kbd>Shift + Alt + F</kbd>
   - L'indentation est incorrecte
   - Le formatage corrigera tout

## ✅ Critères de réussite

- [ ] Variables nommées explicitement (`totalPrice`, `taxAmount`)
- [ ] Fonction `calculateTax` extraite
- [ ] Import `date-fns` ajouté
- [ ] Code bien formaté (indentation correcte)
- [ ] Aucune erreur TypeScript

## ⏱️ Temps estimé

2 minutes maximum
