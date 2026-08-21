---
layout: two-cols-header
layoutClass: gap-x-4
---

# Paramètres d'URL vs query string

Quand utiliser quoi ?

::left::

**Paramètres d'URL (`:id`)**

```
/products/7
/users/john-doe
```

- Identifient une **ressource précise**
- Sont **obligatoires** pour accéder à la page
- Font partie du **chemin** de l'URL

::right::

**Query string (`?`)**

```
/products?category=shoes&sort=price
/search?q=react
```

- Servent à **filtrer, trier ou configurer** l'affichage
- Sont **optionnels**
- N'ont pas besoin de route dédiée

<v-click>

**Résumé**

- Ressource unique → **paramètre d'URL**
- Filtre ou option → **query string**

</v-click>

<!--
Donner des exemples concrets : Amazon utilise /dp/B08N5WRWNW (paramètre) et ?k=ordinateur (recherche). Sur un site d'actualités, /articles/123 est le paramètre et ?page=2 est la query string.
-->
