---
layout: image-right
image: /atomic-design-schema.jpg
backgroundSize: contain
class: text-sm
---

# Atomic Design
Brad Frost · Une méthode pour découper une UI

<v-clicks>

| Niveau | Description |
|--------|-------------|
| ⚛️ **Atomes** | Éléments indivisibles : Button, Input, Label |
| 🧪 **Molécules** | Combinaison d'atomes : SearchBar = Input + Button |
| 🦠 **Organismes** | Groupes de molécules : Header = Logo + Nav + SearchBar |
| 📄 **Templates** | Mise en page générale sans contenu réel |
| 🖥️ **Pages** | Instance finale avec données concrètes |

</v-clicks>

<!--
Cette image montre la progression visuelle de l'Atomic Design.
Source : méthodologie de Brad Frost largement adoptée par les designers.
-->

---
layout: two-cols-header
class: text-sm
---

# Atomic Design en pratique
Exemple concret : un formulaire de login

::left::

<v-clicks>

- **Sous-atomique** : Typography, Colors, Shadows
- **Atomes** : Input labels, Submit button  
- **Molécules** : Email + Password fields groupés

</v-clicks>

::right::

<v-clicks>

- **Organismes** : Formulaire complet avec header
- **Templates** : Layout page login
- **Pages** : Page avec données utilisateur

</v-clicks>

<v-click>

> 💡 **React suit naturellement ce principe** — chaque niveau = un composant

</v-click>

::bottom::

<img src="/atomic-design-dark.jpg" class="w-full object-contain max-h-80" />

<!--
Cette image montre un exemple concret (Atomic Design applied).
Crédit : Rohan Kamath.
Faire le lien : les atomes/molécules sont souvent dans components/, les organismes/pages dans pages/.
-->