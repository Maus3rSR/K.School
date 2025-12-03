---
layout: cover
highlighter: shiki
monaco: true
titleTemplate: "%s - Kevin UNFRICHT"
---

# Utiliser des conteneurs avec Docker 🐳

Découvrez comment containeriser vos applications

---
layout: center
class: text-center
---

# Chapitre 01 - Qu'est-ce que Docker ?

---

# Qu'est-ce que Docker ?
Bref résumé

* **Logiciel open-source**
* **Version 1.0** : 13 mars 2013
* **Écrit en Go** par Solomon Hykes
* Docker est une plateforme de conteneurisation
* Permet de packager une application avec toutes ses dépendances
* Crée une unité standardisée pour le développement logiciel
* Les conteneurs offrent une isolation légère et efficace par rapport aux VMs

---

# Qu'est-ce que Docker ?
Analogie

<img class="w-180 m-auto" src="./Docker_1.png" />

---

# Qu'est-ce que Docker ?
Analogie

<img class="w-180 m-auto" src="./Docker_2.png" />

---

# Qu'est-ce que Docker ?
Analogie

<img class="w-180 m-auto" src="./Docker_3.png" />

---
layout: center
class: text-center
---

# Qu'est-ce que Docker ?
&nbsp;

Docker vous permet **d'emballer _(package)_ une application** avec **toutes ses dépendances** dans **une unité standardisé** pour le développement logiciel :

## les CONTAINERS

<!--
« Toutes » comprend : les bibliothèques partagées système et les fichiers de configuration, l’environnement d’exécution de l’application (interpréteur, JRE, CLR, ...), la plateforme de l’application (serveur d’applications, IIS, ...), l’application elle-même, ses configurations...
-->

---

# Qu'est-ce que Docker
Machines Virtuelles vs Conteneurs - Schéma

<img class="w-190 m-auto" src="./docker-vs-vm.png" />

---

# Qu'est-ce que Docker
Machines Virtuelles vs Conteneurs - Tableau comparatif

<style>
  table {
    font-size: .8rem;
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

# Pourquoi Docker vaut le coup ?


* Fini les : "ça marche sur ma machine"
* Standardisation des environnements de développement
* Partage de ressources entre containers
* "Facilite" le déploiement des applications dans différents environnements

<br/>

Consultez le paysage des technologies Cloud : https://landscape.cncf.io/

---
layout: center
class: text-center
---

# Chapitre 02 - Installation de Docker

---

# Chapitre 02 - Installation de Docker

**Deux façons différentes de l'installer :**
  * [Docker Engine](https://docs.docker.com/engine/install/) ⚙
  * [Docker Desktop](https://www.docker.com/products/docker-desktop/)

_Docker Desktop crée une machine virtuelle (VM) dans laquelle Docker Engine s'exécute. De ce fait, il est souvent nécéssaire de l'installer sur des machines Windows. Ce qui n'est pas le cas pour les machines sous le noyeau Linux car Docker s'exécute directement sur le noyeau de l'OS._

---

# Guide d'installation

<v-clicks class="pt-8">

* **Sur Windows/MacOS** : installez Docker Desktop !
  * https://docs.docker.com/engine/install/

* **Sur Linux** : optez pour Docker Engine
  * https://docs.docker.com/engine/install/ubuntu/
  * https://docs.docker.com/engine/install/linux-postinstall/

</v-clicks>

**Lab 1** : Installez Docker sur votre machine

---
layout: center
---

# Chapitre 02 - Images & Conteneurs !

---

# Images & Conteneurs !

<v-clicks class="pt-8">

* Similaire à la programmation orientée objet
* Une **image** est un template
* Un **conteneur** est une instance d'une image
* Les images sont immuables, les conteneurs sont mutables

</v-clicks>

---

# Structure des Images

<v-clicks class="pt-8">

* **Composées de couches immuables**
* Modifier une couche crée une nouvelle couche au-dessus (stratégie CoW)
* Chaque couche représente une modification
* Les couches sont réutilisables entre images

</v-clicks>

---

# Commandes Docker de base

```bash {monaco-run}
# Lister les images
docker image ls

# Lister les conteneurs en cours d'exécution
docker container ls

# Lister tous les conteneurs
docker container ls -a

# Exécuter un conteneur
docker container run -it ubuntu bash
```

---

# Créer un conteneur

<v-clicks class="pt-8">

* Deux façons de créer une image :
  1. Committer les modifications d'un conteneur
  2. Utiliser un Dockerfile

</v-clicks>

---

# Committer les modifications

```bash {monaco-run}
# Exécuter un conteneur interactif
docker container run -it ubuntu bash

# Dans le conteneur, installer quelque chose
apt-get update && apt-get install -y curl

# Dans un autre terminal, committer les modifications
docker container commit <container_id> my-image:latest
```

---
layout: center
class: text-center
---

# Chapitre 03 - Volumes & Ports !

---

# Volumes & Ports !

<v-clicks class="pt-8">

* Les conteneurs sont éphémères
* Les données sont perdues à l'arrêt du conteneur
* Les volumes permettent de persister les données
* Les ports permettent d'exposer les services

</v-clicks>

---

# Types de Volumes

<v-clicks class="pt-8">

* **Volumes nommés** : gérés par Docker
* **Volumes de liaison** : liés à un répertoire de l'hôte
* **Volumes tmpfs** : stockés en mémoire

</v-clicks>

---

# Utiliser les Volumes

```bash {monaco-run}
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

<v-clicks class="pt-8">

* Créez deux conteneurs avec un volume partagé
* Un conteneur avec accès en lecture-écriture
* Un conteneur avec accès en lecture seule
* Écrivez un fichier depuis le premier conteneur
* Vérifiez que vous pouvez le lire depuis le second

</v-clicks>

---

# Port Mapping

<v-clicks class="pt-8">

* Docker n'expose pas automatiquement les ports
* Vous devez mapper les ports de l'hôte vers le conteneur
* Syntaxe : `-p [host_ip:]host_port:container_port`
* Par défaut, Docker utilise l'interface globale (0.0.0.0)

</v-clicks>

---

# Sécurité des Ports

<v-clicks class="pt-8">

* Utiliser `0.0.0.0` rend l'application accessible depuis Internet
* Pour plus de sécurité, utilisez l'interface locale `127.0.0.1`
* Exemple : `-p 127.0.0.1:8080:8080`

</v-clicks>

---

# Exposer un Service

```bash {monaco-run}
# Démarrer un conteneur nginx et exposer le port 80
docker container run -d -p 8080:80 nginx

# Ouvrir un navigateur à http://localhost:8080
# Vous devriez voir la page par défaut de nginx
```

---

# Lab 3 - Ports

<v-clicks class="pt-8">

* Démarrez un conteneur nginx
* Exposez son port 80 vers votre port 8080
* Ouvrez un navigateur à http://localhost:8080
* (Optionnel) Montrez que le service est accessible depuis le réseau

</v-clicks>

---
layout: center
class: text-center
---

# Chapitre 04 - Réseaux !

---

# Réseaux Docker

<v-clicks class="pt-8">

* Les conteneurs ont la mise en réseau activée par défaut
* Chaque conteneur voit une interface réseau avec une adresse IP
* Les pilotes réseau contrôlent l'isolation entre conteneurs
* Permet une communication sécurisée entre services

</v-clicks>

---

# Types de Pilotes Réseau

<v-clicks class="pt-8">

* **bridge** : isolation par défaut entre conteneurs
* **host** : supprime l'isolation réseau
* **overlay** : pour les clusters Docker Swarm
* **none** : pas de mise en réseau

</v-clicks>

---

# Pilote Host

<v-clicks class="pt-8">

* Supprime l'isolation réseau entre le conteneur et l'hôte
* Le conteneur utilise directement le réseau de l'hôte
* Utile pour les performances critiques
* Moins d'isolation = moins de sécurité

</v-clicks>

---

# Pilote None

<v-clicks class="pt-8">

* Isole complètement un conteneur
* Pas de communication avec l'hôte ou d'autres conteneurs
* Utile pour les conteneurs sans besoin réseau

</v-clicks>

---

# Pilote Bridge

<v-clicks class="pt-8">

* Isolation par défaut entre conteneurs
* Chaque conteneur obtient sa propre interface virtuelle
* Les conteneurs peuvent communiquer via le pont Docker
* Permet une architecture en couches

</v-clicks>

---

# Architecture en Couches

<v-clicks class="pt-8">

* Frontend, Backend et Database
* Le frontend ne devrait pas communiquer avec la base de données
* Les requêtes vers la base de données doivent passer par le backend
* Utilisez des réseaux séparés pour chaque couche

</v-clicks>

---

# Lab 4 - Réseaux

<v-clicks class="pt-8">

* Créez trois réseaux : frontends, backends, databases
* Déployez trois conteneurs nginx sur leurs réseaux respectifs
* Vérifiez que les conteneurs ne peuvent communiquer que sur leur réseau

</v-clicks>

```bash {monaco-run}
docker network create frontends
docker network create backends
docker network create databases
```

---
layout: center
class: text-center
---

# Chapitre 05 - Dockerfiles !

---

# Dockerfiles

<v-clicks class="pt-8">

* Jusqu'à présent, nous avons créé des images en commitant les modifications
* Ce n'est pas très efficace
* Les Dockerfiles permettent de décrire chaque étape
* Chaque instruction crée une nouvelle couche

</v-clicks>

---

# Avantages des Dockerfiles

<v-clicks class="pt-8">

* Reproductibilité : même image à chaque fois
* Versioning : tracer les modifications
* Automatisation : build automatisé
* Optimisation : garder les images petites

</v-clicks>

---

# Exemple d'Application Python

```python {monaco-run}
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
```

---

# Dockerfile pour l'Application

```dockerfile {monaco-run}
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

```bash {monaco-run}
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

<v-clicks class="pt-8">

* Choisissez une application que vous avez développée
* Créez un Dockerfile pour la containeriser
* Construisez l'image
* Exécutez le conteneur et testez-le

</v-clicks>

---

# Ressources pour le Lab

```bash {monaco-run}
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

# Chapitre 06 - Docker Compose !

---

# Docker Compose

<v-clicks class="pt-8">

* Outil pour définir et exécuter des applications multi-conteneurs
* Clé pour un développement et un déploiement efficaces
* Simplifie la gestion de votre pile applicative
* Utilise un fichier de configuration YAML

</v-clicks>

---

# Avantages de Docker Compose

<v-clicks class="pt-8">

* **Un seul fichier** : définissez tous vos services
* **Un seul commande** : démarrez tous les services
* **Gestion facile** : services, réseaux, volumes
* **Développement efficace** : environnement cohérent

</v-clicks>

---
layout: center
class: text-center
---

# Chapitre 07 - Et Ensuite ?

---

# Prochaines Étapes

<v-clicks class="pt-8">

* Maîtrisez Docker Compose pour les applications multi-conteneurs
* Explorez Docker Swarm ou Kubernetes pour l'orchestration
* Apprenez les bonnes pratiques de sécurité
* Optimisez vos images pour la taille et les performances

</v-clicks>

---

# Ressources Utiles

<v-clicks class="pt-8">

* Documentation officielle : https://docs.docker.com/
* Docker Hub : https://hub.docker.com/
* Paysage CNCF : https://landscape.cncf.io/
* Communauté Docker : https://www.docker.com/community/

</v-clicks>

---
layout: center
class: text-center
---

# Merci ! 🐳

Vous êtes maintenant prêt à containeriser vos applications avec Docker !

Questions ?
