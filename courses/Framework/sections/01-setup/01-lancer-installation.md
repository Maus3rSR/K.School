---
layout: chapter
transition: slide-left | slide-right
number: 01
duration: 10 min
---

# Lancer l'installation

- Vérifier que Docker est prêt sur votre poste
- Lancer la création du projet WishFlix dès maintenant
- Choisir un plan B si Docker n'est pas disponible

<!--
Accueil fait avant ce chapitre (hors deck, ≈ 15 min) : présentation, tour de table, déroulé du module, modalités d'évaluation, démo de WishFlix statique.
Objectif du chapitre : que TOUTES les machines téléchargent les images Docker avant qu'on parle de théorie.
Le téléchargement tourne pendant le chapitre 02 ; on explique ce qui s'est passé au chapitre 03.
-->

---
transition: slide-up | slide-down
---

# Étape 0 : Docker est-il prêt ?

Ouvrez un terminal (**WSL2** sous Windows, pas PowerShell) et vérifiez :

<Terminal title="bash" prompt="$" :legend="true" :lines="[
  { cmd: 'docker compose version', out: 'Docker Compose version v2.x.x' },
  { cmd: 'docker ps', out: 'CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES' }
]" />

<v-click>

- Une erreur `Cannot connect to the Docker daemon` ? Démarrez **Docker Desktop** puis relancez
- Arrêtez XAMPP, Apache ou MySQL s'ils tournent : les ports **80** et **3306** doivent être libres

</v-click>

<!--
`docker ps` qui répond avec une ligne d'en-têtes vide = le démon tourne.
Passer dans les rangs : repérer tout de suite les postes sans Docker pour les orienter vers le plan B (slide suivante + 1).
-->

---
layout: center
transition: slide-up | slide-down
---

# Lancez la commande maintenant

<Terminal title="bash" prompt="$" :lines="[
  { cmd: 'curl -s &quot;https://laravel.build/wishflix?with=mariadb&quot; | bash', out: 'Pulling mariadb ... done\nBuilding laravel.test ...' }
]" />

<KeyPoint variant="tip" title="Laissez tourner" icon="☕" class="mt-6">

Le premier lancement télécharge PHP, MariaDB et les dépendances : **10 à 30 minutes** selon le réseau. Pendant ce temps, vous découvrez ce qu'est un framework ; vous verrez au chapitre 03 ce que cette commande a fait.

</KeyPoint>

<!--
Faire taper la commande à tout le monde AVANT de continuer, vérifier visuellement que ça défile.
Le nom `wishflix` est imposé : les exercices suivants l'attendent.
Moment léger : « C'est le seul moment du module où vous aurez le droit de dire "je peux pas, ça compile" » (référence xkcd 303 « Compiling »).
Si quelqu'un a déjà lancé la commande à la maison (préparation demandée), il a gagné 20 minutes : il peut aider ses voisins.
-->

---
transition: slide-up | slide-down
---

# Ça bloque ? Choisissez un plan B

| Situation | Plan B | Adresse du site |
|---|---|---|
| **Poste IUT avec Podman** | Script `laravel-podman-iut-metz.sh wishflix mariadb` | `http://localhost:8080` |
| **Docker absent ou en panne** | Votre PC personnel avec Docker Desktop | `http://localhost` |
| **Pas de Docker du tout** | [Laravel Herd](https://herd.laravel.com/) puis `laravel new wishflix` | `http://wishflix.test` |

<Alert>

Une erreur que vous ne comprenez pas ? Signalez-la tout de suite : ne restez pas bloqué seul.

</Alert>

<!--
Le script `courses/Framework/laravel-podman-iut-metz.sh` est un portage de laravel.build pour Podman (rootless) : il réécrit compose.yaml et met APP_PORT=8080. Le distribuer sur clé / Moodle si les postes IUT n'ont que Podman.
Herd : Windows et macOS uniquement. Il installe PHP + Composer + l'installeur Laravel en local ; les commandes deviennent `php artisan ...` au lieu de `sail artisan ...` (carte des commandes au chapitre 03).
Dans tous les cas le projet doit s'appeler `wishflix`.
-->
