#!/usr/bin/env node
// Copie les CSS des maquettes WishFlix dans resources/css/ du projet de l'étudiant.
// Fourni dans l'archive wishflix-maquettes.zip : les fichiers des maquettes sont
// dans le même dossier que ce script. Aucun dépôt ni gestionnaire de paquets requis.
// Usage : node copy-css.mjs <chemin du projet wishflix>
import { copyFileSync, existsSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const FILES = ['app.css', 'home.css', 'game-detail.css', 'wishlist.css', 'login.css', '404.css']

const mockups = dirname(fileURLToPath(import.meta.url))
const target = process.argv[2]

function fail(message) {
  console.error(`Erreur : ${message}`)
  process.exit(1)
}

if (!target) {
  fail('indiquez le chemin du projet wishflix.\n  Exemple : node copy-css.mjs ~/projets/wishflix')
}

const project = resolve(target)
if (!existsSync(project) || !statSync(project).isDirectory()) fail(`dossier introuvable : ${project}`)
if (!existsSync(join(project, 'artisan'))) fail(`${project} ne ressemble pas à un projet Laravel (fichier « artisan » absent)`)
if (!existsSync(join(mockups, 'app.css'))) fail(`maquettes introuvables à côté du script : ${mockups} (archive incomplète ?)`)

const cssDir = join(project, 'resources', 'css')
if (!existsSync(cssDir)) fail(`dossier introuvable : ${cssDir}`)

const original = join(cssDir, 'app.css')
const backup = join(cssDir, 'app.css.orig')
if (existsSync(original) && !existsSync(backup)) copyFileSync(original, backup)

for (const file of FILES) {
  const source = join(mockups, file)
  if (!existsSync(source)) fail(`maquette absente : ${source}`)
  copyFileSync(source, join(cssDir, file))
  console.log(`copié : ${file}`)
}
console.log(`\n${FILES.length} fichiers copiés dans ${cssDir}`)
console.log('Votre ancien app.css est conservé dans app.css.orig (utile pour le Bonus Tailwind).')
