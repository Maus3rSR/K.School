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
> 
> echo “Hello World!”
> 
> ls <span class="text-red">-lah</span>
> 
> exit

<!--
-t --tty : permet de lier les flux I/O du conteneur à un pseudo terminal
-i -> --interactive : Laisse le flux d'entrée STDIN ouvert et permet d'envoyer des saisies au conteneur à travers la saisie standard
-->
---

# Images & Conteneurs
Docker CLI - Pratique guidée

Démarrer un conteneur en arrière-plan avec un processus détaché
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-d</span> alpine sh -c `while true; do echo "Hello World!"; sleep 1; done`

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
> apk add --update nodejs
>
> exit

Créer une nouvelle image depuis un container actif
> docker <span class="text-orange">image</span> <span class="text-blue">commit</span> nodejs-container <span class="text-green">my-nodejs</span>

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

* Les conteneurs sont éphémères
* Les données sont perdues à l'arrêt du conteneur
* Les volumes permettent de persister les données
* Les ports permettent d'exposer les services

---

# Types de Volumes

* **Volumes nommés** : gérés par Docker
* **Volumes de liaison** : liés à un répertoire de l'hôte
* **Volumes tmpfs** : stockés en mémoire

---

# Utiliser les Volumes

```bash {monaco}
# Créer un volume nommé
docker volume create my-volume

# Exécuter un conteneur avec un volume
docker container run -v my-volume:/data alpine

# Exécuter un conteneur avec un volume de liaison
docker container run -v /host/path:/container/path alpine

# Inspecter un conteneur pour trouver le volume
docker container inspect <container_name/id>
```

---

# Lab 2 - Volumes

* Créez deux conteneurs avec un volume partagé
* Un conteneur avec accès en lecture-écriture
* Un conteneur avec accès en lecture seule
* Écrivez un fichier depuis le premier conteneur
* Vérifiez que vous pouvez le lire depuis le second

---

# Port Mapping

* Docker n'expose pas automatiquement les ports
* Vous devez mapper les ports de l'hôte vers le conteneur
* Syntaxe : `-p [host_ip:]host_port:container_port`
* Par défaut, Docker utilise l'interface globale (0.0.0.0)

---

# Sécurité des Ports

* Utiliser `0.0.0.0` rend l'application accessible depuis Internet
* Pour plus de sécurité, utilisez l'interface locale `127.0.0.1`
* Exemple : `-p 127.0.0.1:8080:8080`

---

# Exposer un Service

```bash {monaco}
# Démarrer un conteneur nginx et exposer le port 80
docker container run -d -p 8080:80 nginx

# Ouvrir un navigateur à http://localhost:8080
# Vous devriez voir la page par défaut de nginx
```

---

# Lab 3 - Ports

* Démarrez un conteneur nginx
* Exposez son port 80 vers votre port 8080
* Ouvrez un navigateur à http://localhost:8080
* (Optionnel) Montrez que le service est accessible depuis le réseau

---
layout: center
class: text-center
---

# Chapitre 05 - Dockerfiles

---

# Dockerfiles

* Jusqu'à présent, nous avons créé des images en commitant les modifications
* Ce n'est pas très efficace
* Les Dockerfiles permettent de décrire chaque étape
* Chaque instruction crée une nouvelle couche

---

# Avantages des Dockerfiles

* Reproductibilité : même image à chaque fois
* Versioning : tracer les modifications
* Automatisation : build automatisé
* Optimisation : garder les images petites

---

# Exemple d'Application Python

```python {monaco}
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
```

---

# Dockerfile pour l'Application

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

---

# Construire et Exécuter l'Image

```bash {monaco}
# Construire l'image
docker image build -t app:latest .

# Exécuter le conteneur
docker container run -p 127.0.0.1:8000:8000 app:latest
```

<v-click>

**Note** : Le `.` représente le contexte de build (les fichiers accessibles pendant la construction)

</v-click>

---

# Lab 5 - Containeriser une Application

* Choisissez une application que vous avez développée
* Créez un Dockerfile pour la containeriser
* Construisez l'image
* Exécutez le conteneur et testez-le

---

# Ressources pour le Lab

```bash {monaco}
# Cloner le dépôt d'exemple
git clone https://github.com/MadJlzz/containers-with-docker.git

# Le dossier sample-app contient l'application à containeriser
# Pour compiler l'application Go :
CGO_ENABLED=0 go build -o <binaire> *.go
```

---
layout: center
class: text-center
---

# Chapitre 06 - Docker Compose

---

# Docker Compose

* Outil pour définir et exécuter des applications multi-conteneurs
* Clé pour un développement et un déploiement efficaces
* Simplifie la gestion de votre pile applicative
* Utilise un fichier de configuration YAML

---

# Avantages de Docker Compose

* **Un seul fichier** : définissez tous vos services
* **Un seul commande** : démarrez tous les services
* **Gestion facile** : services, réseaux, volumes
* **Développement efficace** : environnement cohérent

---
layout: center
---

# Chapitre 07 - Et Ensuite
Prochaines Étapes

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
