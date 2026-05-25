---
layout: center
---

# Qu'est-ce qu'un Design Pattern ?

<v-clicks>

- 🎯 **Solution éprouvée** à un problème récurrent
- 📚 **Vocabulaire commun** entre développeurs
- 🔧 **Boîte à outils** de conception logicielle
- ✨ **Bonnes pratiques** accumulées depuis des années

</v-clicks>

<div v-click class="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded">
💡 <strong>Analogie</strong> : Comme des recettes de cuisine pour résoudre des problèmes de conception
</div>

<!--
Un design pattern n'est pas du code à copier-coller, mais une approche conceptuelle.
C'est comme avoir un plan d'architecture avant de construire une maison.
-->

---

# Les 3 Catégories

<div class="flex gap-4 mt-8">

<v-click>
<div class="flex-1 p-4">

### 🏗️ Création
Gestion de la création d'objets

</div>
</v-click>

<v-click>
<div class="flex-1 p-4">

### 🔗 Structure
Organisation des classes et objets

</div>
</v-click>

<v-click>
<div class="flex-1 p-4">

### 🎭 Comportement
Communication entre objets

</div>
</v-click>

</div>

<div v-click class="mt-8">

```mermaid
graph TD
    A[Design Patterns] --> B[Création]
    A --> C[Structure]
    A --> D[Comportement]
    
    B --> B1[Singleton]
    B --> B2[Factory]
    B --> B3[Builder]
    
    C --> C1[Adapter]
    C --> C2[Decorator]
    C --> C3[Facade]
    
    D --> D1[Observer]
    D --> D2[Strategy]
    D --> D3[Command]
    
    style A fill:#1a73e8,color:#fff
    style B fill:#d32f2f,color:#fff
    style C fill:#388e3c,color:#fff
    style D fill:#f57c00,color:#fff
```

</div>

<!--
Chaque catégorie répond à un type de problème spécifique.
Nous allons voir des exemples concrets pour chacune.
-->

