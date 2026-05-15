# Exercice : Naviguer sans souris

## 🎯 Objectif

Naviguer dans ce mini-projet TypeScript **sans utiliser la souris**.

## 📋 Instructions

1. **Ouvrir un fichier** avec <kbd>Ctrl + P</kbd>
   - Tapez `index` pour ouvrir `index.ts`

2. **Aller à un symbole** avec <kbd>Ctrl + Shift + O</kbd>
   - Trouvez la fonction `main`

3. **Aller à la définition** avec <kbd>F12</kbd>
   - Cliquez sur `UserService` et appuyez sur F12
   - Vous arrivez dans `UserService.ts`

4. **Revenir en arrière** avec <kbd>Alt + ←</kbd>
   - Retournez à `index.ts`

5. **Peek Definition** avec <kbd>Alt + F12</kbd>
   - Sur `createUser`, utilisez Peek pour voir la définition sans quitter le fichier

## 🗂️ Structure du projet

```
01-navigation/
├── index.ts          # Point d'entrée
├── User.ts           # Modèle utilisateur
├── UserService.ts    # Service de gestion
├── UserController.ts # Contrôleur HTTP
└── config.ts         # Configuration
```

## ✅ Critères de réussite

- [ ] Aucun clic de souris
- [ ] Temps : < 30 secondes

## ⏱️ Temps estimé

30 secondes maximum
