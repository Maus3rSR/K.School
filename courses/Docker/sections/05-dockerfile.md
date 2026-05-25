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

<img class="w-200" src="/docker-analogie-gateau.jpg" />

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

 ℹ️ Petite précision concernant le point `.` dans la commande ci-dessus : il représente le contexte de **build**, c'est-à-dire l'ensemble des fichiers auxquels nous pouvons accéder pendant la compilation.
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
