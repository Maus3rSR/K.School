---
layout: two-cols-header
layoutClass: gap-x-4
---

# Les parties d'une URL

Chemin, paramètre et query string

::left::

Prenons l'URL suivante :

```
https://monshop.fr/products/42?category=shoes
```

<v-click>

**Le paramètre d'URL**

Dans `/products/42`, le `42` est un paramètre. Il identifie une ressource précise.

```
/products/7
/users/john-doe
```

- Fait partie du chemin
- Obligatoire pour accéder à la page
- Lu avec `useParams`

</v-click>

::right::

Elle se décompose en deux parties :

- `/products/42` → le **chemin** de la page
- `?category=shoes` → la **query string**

<v-click>

**La query string (`?`)**

Tout ce qui suit le `?` sert à configurer l'affichage sans changer de page.

```
/products?category=shoes&sort=price
/search?q=react
```

- Options, filtres, recherche
- Optionnel
- Lu avec `useSearchParams`

</v-click>

<!--
Donner des exemples concrets : Amazon utilise /dp/B08N5WRWNW (paramètre) et ?k=ordinateur (recherche). Sur un site d'actualités, /articles/123 est le paramètre et ?page=2 est la query string.
Faire remarquer que les deux peuvent coexister : /products/42?source=newsletter.
-->
