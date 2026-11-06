---
layout: chapter
transition: slide-left | slide-right
number: 03
duration: 45 min
---

# Installer Laravel avec Docker

- Comprendre l'intérêt de Docker pour le développement Laravel
- Expliquer ce que la commande `laravel.build` vient de faire
- Démarrer l'environnement et piloter le projet avec Sail

<!--
Déroulé : slides (≈ 10 min) → démo guidée sur Campus Quest (≈ 5 min, LIVECODING.md étape a) → « À vous » : étapes A2 à A6 du README (≈ 25 min). Tag de rattrapage : `s1-ch3-installation`.
Le pas-à-pas complet vit UNIQUEMENT dans le README de l'exercice 01 : ne pas le dérouler slide par slide.
-->

---
transition: slide-up | slide-down
---

# Pourquoi Docker ?

Docker permet d'avoir le **même environnement** sur toutes les machines :

- Même version de PHP et des extensions PHP
- Même base de données (MariaDB)
- Même serveur web

<v-click>

<Analogy title="Une cuisine équipée identique pour tous" icon="🍳">

Chacun suit la même recette dans la même cuisine : tout le monde obtient le même plat. Fini le « chez moi ça marche ».

</Analogy>

</v-click>

<!--
Moment léger : le mème « Ça marche sur ma machine. — Alors on livrera ta machine. » C'est exactement l'idée de Docker.
Un conteneur = un processus isolé lancé à partir d'une image (PHP, MariaDB…). Ce sont ces images qui se téléchargent depuis le début de la séance.
-->

---
transition: slide-up | slide-down
---

# Ce que la commande a fait pendant ce temps

<Steps direction="vertical" :clicks="true" :items="[
  { icon: '🌐', title: 'curl laravel.build/wishflix', desc: 'Télécharge un script d\'installation et l\'exécute avec bash' },
  { icon: '📦', title: 'Conteneur temporaire', desc: 'Composer installe Laravel 12 et ses dépendances dans wishflix/vendor/' },
  { icon: '🐳', title: 'Sail installé', desc: 'with=mariadb : compose.yaml décrit deux services, PHP et MariaDB' },
  { icon: '⬇️', title: 'Images téléchargées', desc: 'PHP 8.x et MariaDB : l\'étape longue, faite une seule fois' }
]" />

<!--
Rien n'a été installé sur la machine hôte : ni PHP, ni Composer. Tout est dans des conteneurs.
`with=mariadb` évite Redis, Meilisearch, Mailpit… inutiles pour ce cours (et autant d'images en moins à télécharger).
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Trois outils à connaître

::left::

<Definition term="Composer">

Le gestionnaire de dépendances de PHP. Il télécharge Laravel et les bibliothèques tierces dans `vendor/`, comme `npm` le fait pour JavaScript.

</Definition>

<Definition term="Artisan">

La console en ligne de commande fournie par Laravel. Elle lance des tâches (migrations, cache) et génère du code.

</Definition>

::right::

<Definition term="Sail">

L'environnement Docker officiel de Laravel : un fichier `compose.yaml` + un script `sail` qui pilote les conteneurs (PHP, base de données) pour vous.

</Definition>

<Alert>

Ces trois noms reviendront dans toutes les commandes du cours.

</Alert>

<!--
Composer = npm pour PHP. Artisan = le couteau suisse de Laravel (chapitre 06). Sail = Docker Compose emballé pour Laravel.
-->

---
transition: slide-up | slide-down
---

# Deux méthodes d'installation

<Compare badLabel="🖥️ Plan B : Herd (PHP sur votre machine)" goodLabel="🐳 Méthode du cours : Laravel Sail (Docker)">
  <template #bad>

```bash
laravel new wishflix
cd wishflix
php artisan migrate
```

PHP, <KeyTerm>Composer</KeyTerm> et Node installés **sur votre machine** (Herd s'en charge). Chacun a sa version de PHP.

</template>
  <template #good>

```bash
curl -s "https://laravel.build/wishflix?with=mariadb" | bash
cd wishflix
./vendor/bin/sail up -d
```

PHP, Composer et Node **dans des conteneurs Docker** : même environnement pour tous. Site sur `http://localhost`.

</template>
</Compare>

<!--
Le Laravel installer est la méthode par défaut de la doc : elle suppose PHP installé localement (php.new ou Herd).
Les deux produisent exactement le même projet Laravel ; seule la façon de l'exécuter change.
Nous restons sur Sail : une seule configuration à dépanner pour toute la promotion.
-->

---
transition: slide-up | slide-down
---

# La carte des commandes

| Je veux… | Avec Sail | Plan B (Herd) |
|---|---|---|
| **Démarrer / arrêter** | `./vendor/bin/sail up -d` / `sail down` | *(Herd tourne en permanence)* |
| **Lancer Artisan** | `./vendor/bin/sail artisan about` | `php artisan about` |
| **Lancer Composer** | `./vendor/bin/sail composer …` | `composer …` |
| **Lancer npm** | `./vendor/bin/sail npm …` | `npm …` |
| **Lire les logs** | `./vendor/bin/sail logs` | `storage/logs/laravel.log` |

Les autres commandes Sail : **Panorama Sail**, en fin de chapitre.

<!--
Toutes les consignes du cours utilisent la colonne Sail. Les étudiants en plan B traduisent avec la colonne de droite.
Sur les postes IUT avec Podman, la colonne Sail reste valable (le script a configuré SAIL_DOCKER_BINARY=podman).
-->

---
transition: slide-up | slide-down
---

# Un alias pour aller plus vite (étape A5)

<Compare badLabel="❌ Sans alias" goodLabel="✅ Avec alias">
  <template #bad>

```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
```

</template>
  <template #good>

```bash
sail up -d
sail artisan migrate
```

</template>
</Compare>

<v-click>

Ajoutez cette ligne dans votre `~/.bashrc` ou `~/.zshrc`, puis rouvrez votre terminal :

```bash
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
```

> 📖 [Documentation officielle : configurer un alias shell](https://laravel.com/framework/docs/12.x/sail#configuring-a-shell-alias)

</v-click>

<!--
La doc officielle suppose l'alias configuré : quand elle écrit "sail artisan", c'est "./vendor/bin/sail artisan".
Sous Windows, l'alias se configure dans le shell WSL2 (bash), pas dans PowerShell.
-->

---
layout: two-cols
layoutClass: gap-x-6
transition: slide-up | slide-down
---

---
transition: slide-up | slide-down
---

# Panorama : Sail

<script setup>
import sail from '/references/sail'
</script>

<Panorama :items="sail" doc="https://laravel.com/docs/12.x/sail" at="s1-ch3" />

<!--
Survol de 30 s, pas d'explication détaillée : montrer ce qui a été vu (badges « vu ») et où trouver le reste.
Pendant le « À vous », les apprenants peuvent revenir sur cette slide comme aide-mémoire.
-->

---
layout: two-cols
layoutClass: gap-x-6
transition: slide-up | slide-down
---

<Exercise title="À vous : démarrer WishFlix" duration="25 min" level="guidé"
  :criteria="[
    'http://localhost affiche la page d\'accueil Laravel',
    'sail artisan about affiche Laravel 12.x et PHP 8.3+',
    'Le dépôt GitHub privé contient votre commit, sans .env'
  ]">

README de l'exercice `01-installation-architecture`, **étapes A2 à A6** : démarrer Sail, migrer, vérifier, configurer l'alias, versionner. **Point de contrôle 1.**

Téléchargement encore en cours ? Faites l'étape A5 (alias) en attendant.

</Exercise>

::right::

<Browser url="http://localhost">
  <img src="/laravel-welcome.png" alt="Page d'accueil Laravel" />
</Browser>

<!--
Point de contrôle 1 du README. Palier de rattrapage : tag Campus Quest s1-ch3-installation (projet Laravel neuf) + plan B.
Passer dans les rangs : erreur fréquente = page d'erreur « no such table: sessions » si `migrate` est oublié.
Sur les postes Podman : http://localhost:8080.
-->
