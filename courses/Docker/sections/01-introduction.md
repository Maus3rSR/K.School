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

<img class="w-180 m-auto" src="/Docker_1.png" />

---

# Qu'est-ce que Docker
Analogie

<img class="w-180 m-auto" src="/Docker_2.png" />

---

# Qu'est-ce que Docker
Analogie

<img class="w-180 m-auto" src="/Docker_3.png" />

---
layout: center
class: text-center
---

# Qu'est-ce que Docker
&nbsp;

Docker vous permet **d'emballer _(package)_ une application** avec **toutes ses dépendances** dans **une unité standardisé** pour le développement logiciel :

## les CONTENEURS <small>_(containers)_</small>

<!--
« Toutes » comprend : les bibliothèques partagées système et les fichiers de configuration, l'environnement d'exécution de l'application (interpréteur, JRE, CLR, ...), la plateforme de l'application (serveur d'applications, IIS, ...), l'application elle-même, ses configurations...
-->

---

# Qu'est-ce que Docker
Machines Virtuelles vs Conteneurs - Schéma

<img class="w-180 m-auto" src="/docker-vs-vm.png" />

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

Une VM va contenir un système d'exploitation dans son intégralité c'est-à-dire les pilotes, les fichiers binaires, les bibliothèques alors que les conteneurs Docker ne possèdent que le strict nécessaire pour l'exécution de l'application. Il fait appel à l'OS de sa machine hôte pour réaliser ses appels système et exécuter ses applications, d'où son extrême légèreté.
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
