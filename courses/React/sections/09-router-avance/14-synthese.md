---
layout: two-cols-header
layoutClass: gap-x-4
---

# Ce qu'on retient

De la page fixe à la page dynamique

::left::

```mermaid {scale: 0.7}
flowchart TD
    A["BrowserRouter"] --> B["Routes"]
    B --> C["Route path='/products'"]
    B --> D["Route path='/products/:id'"]
    C --> E["&lt;ProductList /&gt;"]
    D --> F["&lt;ProductDetail /&gt;"]
    F --> G["useParams"]
    G --> H["id = '7'"]
```

::right::

**À retenir**

- `:id` dans `path` crée un segment variable
- `useParams` lit le paramètre sous forme de `string`
- `Outlet` affiche le contenu d'une route imbriquée
- Les layouts partagés évitent de dupliquer le menu
- `useNavigate` permet de naviguer depuis le code

<!--
Synthèse rapide. Insister sur le fil narratif : on a passé de la navigation simple (S8) à des URLs riches et des pages de détail.
-->
