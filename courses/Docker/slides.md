---
layout: cover
background: https://cover.sli.dev?1
highlighter: shiki
monaco: true
titleTemplate: "%s - Kevin UNFRICHT"
---

# Utiliser des conteneurs avec Docker 🐳

Découvrez comment containeriser vos applications

---
layout: cover
background: https://cover.sli.dev?2
---

# Chapitre 01 - Qu'est-ce que Docker

---

# Qu'est-ce que Docker
Bref résumé

* **Logiciel open-source**
* **Version 1.0** : 13 mars 2013
* **Écrit en Go** par Solomon Hykes
* Docker est une plateforme de conteneurisation
* Permet de packager une application avec toutes ses dépendances
* Crée une unité standardisée pour le développement logiciel
* Les conteneurs offrent une isolation légère et efficace par rapport aux VMs

---

# Qu'est-ce que Docker
Analogie

<img class="w-180 m-auto" src="./Docker_1.png" />

---

# Qu'est-ce que Docker
Analogie

<img class="w-180 m-auto" src="./Docker_2.png" />

---

# Qu'est-ce que Docker
Analogie

<img class="w-180 m-auto" src="./Docker_3.png" />

---
layout: center
class: text-center
---

# Qu'est-ce que Docker
&nbsp;

Docker vous permet **d'emballer _(package)_ une application** avec **toutes ses dépendances** dans **une unité standardisé** pour le développement logiciel :

## les CONTENEURS <small>_(containers)_</small>

<!--
« Toutes » comprend : les bibliothèques partagées système et les fichiers de configuration, l’environnement d’exécution de l’application (interpréteur, JRE, CLR, ...), la plateforme de l’application (serveur d’applications, IIS, ...), l’application elle-même, ses configurations...
-->

---

# Qu'est-ce que Docker
Machines Virtuelles vs Conteneurs - Schéma

<img class="w-180 m-auto" src="./docker-vs-vm.png" />

---

# Qu'est-ce que Docker
Machines Virtuelles vs Conteneurs - Tableau comparatif

<style>
  table {
    font-size: 60%;
  }
</style>

| **Critère** | **Machine virtuelle (VM)** | **Conteneur Docker** |
|---------|------------------------|------------------|
| **Niveau de virtualisation** | Virtualise une machine complète (matériel + OS invité) | Virtualise uniquement l'espace applicatif |
| **Système d'exploitation** | Chaque VM a son propre OS complet | Partage le noyau de l'OS hôte |
| **Isolation** | Très forte (OS séparés) | Moins forte, isolation au niveau processus/namespaces |
| **Consommation ressources** | Lourde (RAM, CPU, disque élevés) | Légère, utilisation optimisée des ressources |
| **Temps de démarrage** | Lents (secondes à minutes, boot d'un OS) | Très rapides (souvent en quelques secondes) |
| **Portabilité** | Image plus lourde, moins pratique à déplacer | Image légère, très facile à distribuer |
| **Cas d'usage typiques** | Exécuter plusieurs OS différents, services très isolés | Microservices, CI/CD, scaling rapide d'applications |
| **Sécurité** | Très bonne grâce à l'isolement complet de l'OS | Bonne mais dépend davantage de la sécurité du noyau |
| **Gestion de l'infra** | Souvent pour infra "classique" ou serveurs complets | Orienté déploiement d'applications et services |

<!--
Un hyperviseur (Hyper-V, VirtualBox, VMWare, QEMU/KVM, Proxmox), également connu sous le nom de moniteur de machine virtuelle ou VMM, est un logiciel qui crée et exécute des machines virtuelles (VM).

Une VM va contenir un système d’exploitation dans son intégralité c’est-à-dire les pilotes, les fichiers binaires, les bibliothèques alors que les conteneurs Docker ne possèdent que le strict nécessaire pour l’exécution de l’application. Il fait appel à l’OS de sa machine hôte pour réaliser ses appels système et exécuter ses applications, d’où son extrême légèreté.
-->

---
layout: default
---

# Qu'est-ce que Docker
Pourquoi Docker vaut le coup ?


* Fini les : "ça marche sur ma machine"
* Standardisation des environnements de développement
* Partage de ressources entre containers
* "Facilite" le déploiement des applications dans différents environnements

<br/>

Consultez le paysage des technologies Cloud : https://landscape.cncf.io/

---
layout: cover
background: https://cover.sli.dev?3
---

# Chapitre 02 - Installation de Docker

---

# Installation de Docker

**Deux façons différentes de l'installer :**
  * [Docker Engine](https://docs.docker.com/engine/install/) ⚙
  * [Docker Desktop](https://www.docker.com/products/docker-desktop/) 💡

_Docker Desktop crée une machine virtuelle (VM) dans laquelle Docker Engine s'exécute. De ce fait, il est souvent nécéssaire de l'installer sur des machines Windows. Ce qui n'est pas le cas pour les machines sous le noyeau Linux car Docker s'exécute directement sur le noyeau de l'OS._

<!-- 
Docker Desktop créé une VM où le moteur Docker tourne à l'intérieur
 -->

---
layout: cover
background: https://cover.sli.dev?4
---

# Chapitre 03 - Images & Conteneurs

---

# Images & Conteneurs
Analogie

Similaire à la programmation orientée objet, un `container` est une instance d'une `image`

<div class="grid grid-cols-2 gap-x-4">
```ts
class Point2D {
  x: number;
  y: number;
  constructor(coordinates: { x: number, y: number }) {
    this.x = coordinates.x;
    this.y = coordinates.y;
  }
}
```

```ts
// point est une instance de la classe Point2D
const point = new Point2D({ x: 1, y: 2 });
```
</div>

---

# Images & Conteneurs
Structure des Images

<div class="grid grid-cols-2 gap-x-4">

<img src="./container-filesystem.png" />

* Composées de couches <small>_(layers)_</small>
* Chaque couche est immuable <small>_(lecture seule)_</small>
* Modifier une couche crée une nouvelle couche au-dessus <small>_(stratégie COW - Copy On Write)_</small>
* Quand on lance un conteneur, une nouvelle couche se créé par dessus, celle-ci en écriture
</div>

<!--
Imaginez préparer un gâteau où chaque couche représente une nouvelle fonctionnalité.

Couche de base = Pain burger → votre image de base (comme Ubuntu ou Alpine).
Couche suivante = Salade → l'installation de Python, par exemple.
Couche supérieure = Steak haché → le code de votre application.

Docker construit cette image gourmande instruction par instruction, et chaque instruction de votre Dockerfile crée une nouvelle couche.
-->

---

# Images & Conteneurs
L'utilité des couches

* 📦 Mise en cache, uniquement les couches modifiées sont re-construits
* ♻️ Partage des layers entre différentes images, on sauvegarde de l'espace disque !
* ⚡ Coût réduit lors de la construction des images dans votre pipeline CI

## Les images Docker sont comme des oignons

---

# Images & Conteneurs
Stockage en ligne

* Similaire à [npmjs.com](https://npmjs.com/), on peut stocker nos images dans un registre
* [Docker Hub](https://hub.docker.com/) est un service dans le cloud qui permet de stocker les images

<img class="w-100" src="./docker_hub.webp" />

<small>Bien sûr, nous pouvons avoir des registres privés si besoin</small>

---

# Images & Conteneurs
Architecture

<img src="./docker_daemon.jpg" />

<!--
Architecture client-serveur.

Le client Docker communique avec le démon Docker pour exécuter des conteneurs, créer des images, [...]
-->
---

# Images & Conteneurs
Docker CLI

docker <span class="text-orange">`<OBJECT>`</span> <span class="text-blue">`<COMMAND>`</span>

<div class="grid grid-cols-3">

  <span class="text-orange">image</span>
  
  <span class="text-blue">ls, pull, rm, prune</span>
  
  Gestion des images ([documentation](https://docs.docker.com/reference/cli/docker/image/))
</div>

<div class="grid grid-cols-3">

  <span class="text-orange">container</span>
  
  <span class="text-blue">ls, run, stop, rm, prune</span>
  
  Gestion des conteneurs ([documentation](https://docs.docker.com/reference/cli/docker/container/))
</div>

---

# Images & Conteneurs
Docker CLI - Pratique guidée

Liste des images sur votre machine
> docker <span class="text-orange">image</span> <span class="text-blue">ls</span>

Tirer l'image `alpine` depuis le Docker Hub
> docker <span class="text-orange">image</span> <span class="text-blue">pull</span> alpine

Démarrer un conteneur depuis l'image `alpine` et afficher `Hello World!`
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> alpine echo "Hello World!"

Démarrer un conteneur depuis l'image `alpine` et y attacher un shell interactif
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-i -t</span> alpine sh

```bash
echo "Hello World!"
ls -lah
exit
```

<!--
-t --tty : permet de lier les flux I/O du conteneur à un pseudo terminal
-i -> --interactive : Laisse le flux d'entrée STDIN ouvert et permet d'envoyer des saisies au conteneur à travers la saisie standard
-->
---

# Images & Conteneurs
Docker CLI - Pratique guidée

Démarrer un conteneur en arrière-plan avec un processus détaché
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-d</span> alpine sh -c 'while true; do echo "Hello World!"; sleep 1; done'

Regardons la liste des conteneurs actifs
> docker <span class="text-orange">container</span> <span class="text-blue">ls</span>

Regardons les logs du conteneur
> docker <span class="text-orange">container</span> <span class="text-blue">logs</span> <span class="text-red">-f</span> `<container_name>`

---

# Images & Conteneurs
Docker CLI - Pratique guidée

Arrêter un conteneur actif
> docker <span class="text-orange">container</span> <span class="text-blue">stop</span> `<container_name>`

Lister les conteneurs inactifs et supprimons un conteneur
> docker <span class="text-orange">container</span> <span class="text-blue">ls</span> <span class="text-red">-a</span>
>
> docker <span class="text-orange">container</span> <span class="text-blue">rm</span> `<container_name>`

Supprimons tous les conteneurs inactifs 🛑
> docker <span class="text-orange">container</span> <span class="text-blue">prune</span>

---

# Images & Conteneurs
Docker CLI - Pratique guidée

Lister les images et supprimer l'image `alpine`
> docker <span class="text-orange">image</span> <span class="text-blue">ls</span>
>
> docker <span class="text-orange">image</span> <span class="text-blue">rm</span> alpine

Supprimons toutes les images non utilisées par aucun conteneurs
> docker <span class="text-orange">image</span> <span class="text-blue">prune</span> <span class="text-red">-a</span>

---

# Images & Conteneurs
Docker CLI - Pratique guidée

Démarrer un conteneur nommé, avec un shell interactif
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-it</span> <span class="text-red">--name</span> nodejs-container alpine

Installons NodeJS
```bash
apk add --update nodejs
exit
```

Créer une nouvelle image depuis un container actif
> docker <span class="text-orange">container</span> <span class="text-blue">commit</span> nodejs-container <span class="text-green">my-nodejs</span>

Executer une commande sur un container actif
> docker <span class="text-orange">exec</span> <span class="text-red">-it</span> nodejs-container sh

---

# Images & Conteneurs
Docker CLI - Pratique guidée

* <span class="text-green">my-nodejs</span> est le nom de la nouvelle image. C'est généralement appelé un <span class="text-green">tag</span>
* Créer des tags permet de fournir des images avec **un nom mémorisable**
* Cependant, **il y a une structure pour le nom d'une image** :

`[HOST[:PORT]/]NAMESPACE/REPOSITORY[:TAG]`

> HOST (défaut: `docker.io`)
> 
> PORT (défaut: `5000`)
> 
> NAMESPACE/REPOSITORY (défaut: `library`)
> 
> TAG (défaut: `latest`)

<!--
HOST
Indique l'emplacement du registre où se trouve l'image. Si ce paramètre est omis, Docker utilise par défaut Docker Hub (docker.io).

PORT
Numéro de port facultatif pour le registre, si nécessaire (par exemple :5000).

NAMESPACE/REPOSITORY
L'espace de noms (facultatif) représente généralement un utilisateur ou une organisation. Le dépôt est obligatoire et identifie l'image. Si l'espace de noms est omis, Docker utilise par défaut « library », l'espace de noms réservé aux images officielles Docker.

TAG
Identifiant facultatif permettant de spécifier une version ou une variante particulière de l'image. Si aucune étiquette n'est fournie, Docker utilise par défaut la version la plus récente.
-->

---
layout: cover
background: https://cover.sli.dev?5
---

# Chapitre 04 - Volumes & Ports

---

# Volumes & Ports
&nbsp;

Par défaut, tous les fichiers créés dans le conteneur sont stockés sur une couche en écriture. Ce que cela veut dire :

* Les créations/modifications/suppressions de données d'un conteneur **n'affectent pas les autres conteneurs**
* Les données **ne persistent pas** sur une conteneur quand il est supprimé
* Comment persister les données dans ce cas ? Les **Volumes** !

---

# Volumes & Ports
Types de Volumes

<div class="grid grid-cols-2 gap-x-4"> 

<div>
Il existe deux options pour un conteneur afin de stocker les fichiers sur la machine hôte :

* **docker volumes** : gérés par Docker
* **bind mounts** : liés à un répertoire de l'hôte

Une troisième option existe et consiste à écrire directement les fichiers dans la RAM et non sur le disque. Cela se nomme **tmpfs** <small>_(temporary filesystem)_</small>
</div>

<img src="./docker_volume.png" />

</div>

---

# Volumes & Ports
Types de Volumes

<div class="grid grid-cols-2 gap-x-4"> 

* Les volumes docker **fonctionnent de la même manière** que les `bind mounts`
* Ils sont également écrits sur le système de fichier de la machine hôte
* Les données sont persistées, mais nous ne savons pas exactement où car c'est Docker qui s'en occupe pour nous

<img src="./docker_volume.png" />

</div>

---

# Volumes & Ports
Types de Volumes

<div class="grid grid-cols-2 gap-x-4"> 

* Les volumes sont pratiques pour **le partage de données** entre différents conteneurs

<img src="./docker_volume_shared.png" />

</div>

---

# Volumes & Ports
Pratique guidée

Démarrer un conteneur `alpine` et faire un montage du dossier hôte `/tmp` dans le dossier du conteneur `/opt/data`
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-it --volume</span> /tmp<span class="text-yellow font-black">:</span>/opt/data alpine

Regardez les permissions des fichiers dans `/opt/data`, que penses-vous des permissions ? 💣
```bash
ls -alrt /opt/data
```

<!--
Les permissions affichées dans /opt/data sont exactement celles du répertoire /tmp de l’hôte, pas celles « par défaut » du conteneur
Un bind mount casse partiellement l’isolation : le conteneur voit et peut modifier des fichiers de l’hôte avec les mêmes droits que l’UID/GID qui tourne dans le conteneur.
Si on lance un conteneur en root (comme dans l’exemple), root dans le conteneur = root sur l’hôte pour ce répertoire monté : il peut supprimer/modifier tout ce qu’il veut dans /tmp de l’hôte.
-->

---

# Volumes & Ports
Pratique guidée

Créez un volume nommé `outerspace`
> docker <span class="text-orange">volume</span> <span class="text-blue">create</span> outerspace

Montez ce volume dans le conteneur `alpine`. Notez ici que nous ne précisons pas où est situé ce volume sur le système de fichier hôte. Docker s'en occupe pour nous.
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-it --volume</span> outerspace<span class="text-yellow font-black">:</span>/opt/data alpine

On peut néanmoins, si besoin, localiser le volume
> docker <span class="text-orange">container</span> <span class="text-blue">inspect</span> `<container_name>`
> 
---

# Volumes & Ports
Port mapping

* Que vous vouliez **exposer** une **base de données**, un **serveur web** ou même une **API Rest**, vous devez toujours le faire démarrer sur **un port de votre machine**
* Docker **ne publie pas** les ports de votre application **automatiquement**. Vous devez lui dire depuis quel port de votre machine locale rediriger le traffic vers quel port du conteneur. C'est ce qu'on appelle le **port-mapping**
* Par défaut, Docker utilise l'interface globale `0.0.0.0` pour exposer les ports. ⚠️ Ce qui est dangereux et **rend accessible votre application depuis tout le réseau**. On peut éviter cela en spécifiant **l'interface locale** `127.0.0.1` quand on publie des ports.

---

# Volumes & Ports
Port mapping

<img src="./docker_port_mapping.webp" />

---

# Volumes & Ports
Exposer un Service

Démarrez un nouveau conteneur qui fera tourner `nginx` et exposez son port 80 sur votre machine
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-d -p</span> 8080:80 nginx

Ouvrez votre navigateur à l'adresse http://127.0.0.1:8080

---
layout: cover
background: https://cover.sli.dev?6
---

# Chapitre 05 - Dockerfile

---

# Dockerfile
C'est quoi

* Jusqu'à présent, nous n'avions qu'une seule méthode pour créer de nouvelles images : **valider (`commit`)** les modifications effectuées **depuis un conteneur**
* Cette méthode **n'est pas optimale**. C'est pourquoi, **pour simplifier la création d'images d'applications**, l'équipe Docker nous permet de décrire chaque étape dans un fichier : le **Dockerfile**
* **Chaque instruction** exécutée dans un Dockerfile **ajoute une nouvelle couche à l'image finale**. Notez que la quasi-totalité des instructions créent de nouvelles couches
* Il est important de souligner que la taille de notre image **doit rester réduite**. Plus elle est petite, plus nos conteneurs **démarreront rapidement**

[Documentation Dockerfile](https://docs.docker.com/reference/dockerfile/)

---

# Dockerfile
Analogie

<img class="w-200" src="./docker-analogie-gateau.jpg" />

---

# Dockerfile
Dockerizons votre première application

<div class="grid grid-cols-2 gap-x-4">

<div>
Script python `hello.py`
```python {monaco}
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
```
</div>

<div>

Dockerfile décrivant l'image de cette application

```dockerfile {monaco}
# syntax=docker/dockerfile:1
FROM ubuntu:22.04

# Installer les dépendances
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip install flask==3.0.*

# Installer l'application
COPY hello.py /

# Configuration finale
ENV FLASK_APP=hello
EXPOSE 8000
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8000"]
```
</div>
</div>

---

# Dockerfile
Dockerizons votre première application

Faisons un build de l'image
> docker <span class="text-orange">image</span> <span class="text-blue">build</span> <span class="text-red">--tag</span> app:latest <span class="text-yellow font-black">.</span>

Et lançons le !
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-p</span> 127.0.0.1:8000:8000 app:latest

ℹ️ Petite précision concernant le point `.` dans la commande ci-dessus : il représente le contexte de **build**, c’est-à-dire l’ensemble des fichiers auxquels nous pouvons accéder pendant la compilation.
Si on essaye de copier des fichiers en dehors du contexte fera échouer le build.

---

# Dockerfile pour l'Application
Exemples plus avancés


<div class="grid grid-cols-2 gap-x-4">

<div>

## Wordpress

[Docker Hub](https://hub.docker.com/_/wordpress)

[Dockerfile](https://github.com/docker-library/wordpress/tree/c82afd7240879748c5e4a64e5fb04e2d34172686/latest/php8.5/apache)
</div>

<div>

## Nextcloud

[Docker Hub](https://hub.docker.com/_/nextcloud/)

[Dockerfile](https://github.com/nextcloud/all-in-one/tree/main/Containers/nextcloud)
</div>

</div>

---
layout: cover
background: https://cover.sli.dev?7
---

# Chapitre 06 - Docker Compose

---

# Docker Compose
C'est quoi

* Docker Compose est **un outil** permettant de définir et **d'exécuter des applications multi-conteneurs**. Il est essentiel pour une expérience de développement et de déploiement simplifiée et efficace.
* Compose simplifie la gestion de l'ensemble de votre pile applicative, facilitant ainsi la **gestion des services, des réseaux et des volumes** dans un seul **fichier de configuration YAML** clair et concis.
* Ensuite, **une simple commande** suffit pour **créer et démarrer tous les services** à partir de ce fichier :

> docker <span class="text-orange">compose</span> <span class="text-blue">up</span> <span class="text-red">-d</span>
> 
> docker <span class="text-orange">compose</span> <span class="text-blue">ps</span>
> 
> docker <span class="text-orange">compose</span> <span class="text-blue">down</span>

---

# Docker Compose
Pourquoi ?

Si nous devions par exemple, lancer une application Wordpress avec Docker, nous devrions faire ceci en ligne de commande :

```bash
# Démarrer le conteneur MySQL
docker run -d --name db --restart always -e MYSQL_DATABASE=exampledb -e MYSQL_USER=exampleuser \
  -e MYSQL_PASSWORD=examplepass -e MYSQL_RANDOM_ROOT_PASSWORD=1 -v db:/var/lib/mysql mysql:8.0

# Démarrer le conteneur WordPress
docker run -d --name wordpress --restart always -p 8080:80 -e WORDPRESS_DB_HOST=db -e WORDPRESS_DB_USER=exampleuser \
  -e WORDPRESS_DB_PASSWORD=examplepass -e WORDPRESS_DB_NAME=exampledb \
  -v wordpress:/var/www/html --link db:db wordpress
```

Plutôt verbeux n'est-ce pas ?

---

# Docker Compose
Pourquoi ?

Grâce à docker-compose, nous pouvons orchestrer nos conteneurs dans un fichier YAML descriptif

<div class="grid grid-cols-2 gap-x-4">

```yaml
services:

  wordpress:
    image: wordpress
    restart: always
    ports:
      - 8080:80
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: exampleuser
      WORDPRESS_DB_PASSWORD: examplepass
      WORDPRESS_DB_NAME: exampledb
    volumes:
      - wordpress:/var/www/html
```

```yaml
  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_DATABASE: exampledb
      MYSQL_USER: exampleuser
      MYSQL_PASSWORD: examplepass
      MYSQL_RANDOM_ROOT_PASSWORD: '1'
    volumes:
      - db:/var/lib/mysql

volumes:
  wordpress:
  db:
```

</div>

[Tutoriel pour votre premier docker-compose](https://docs.docker.com/compose/gettingstarted/)

---
layout: center
---

# Chapitre 07 - Et Ensuite
Prochaines Étapes

* Maîtrisez Dockerfile pour vous permettre de "Dockeriser" n'importe laquelle de vos applications
* Maîtrisez Docker Compose pour les applications multi-conteneurs
* Explorez [Docker Swarm](https://docs.docker.com/engine/swarm/) ou [Kubernetes](https://kubernetes.io/fr/) pour l'orchestration d'applications de production avec mise à l'échelle
* Apprenez les bonnes pratiques de sécurité lors de l'utilisation de Docker
* Optimisez vos images pour la taille et les performances

---
layout: center
---

# Ressources Utiles
<br/>

[Documentation officielle](https://docs.docker.com/)

[Docker Hub](https://hub.docker.com/)

[Communauté Docker](https://www.docker.com/community/)

---
layout: center
---

# Merci ! 🐳

Vous êtes maintenant prêt à containeriser vos applications avec Docker !

Questions ?
