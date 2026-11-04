#!/usr/bin/env node
// Copie les CSS des maquettes WishFlix dans resources/css/ du projet de l'étudiant.
// Usage : npm run 02-routing-blade -- <chemin du projet wishflix>
import { copyFileSync, existsSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const FILES = ['app.css', 'home.css', 'game-detail.css', 'wishlist.css', 'login.css', '404.css']

const here = dirname(fileURLToPath(import.meta.url))
const mockups = resolve(here, '../../../scenarios/WishFlix/src')
const target = process.argv[2]

function fail(message) {
  console.error(`Erreur : ${message}`)
  process.exit(1)
}

if (!target) {
  fail('indiquez le chemin du projet wishflix.\n  Exemple : npm run 02-routing-blade -- ~/projets/wishflix')
}

const project = resolve(target)
if (!existsSync(project) || !statSync(project).isDirectory()) fail(`dossier introuvable : ${project}`)
if (!existsSync(join(project, 'artisan'))) fail(`${project} ne ressemble pas à un projet Laravel (fichier « artisan » absent)`)
if (!existsSync(mockups)) fail(`maquettes introuvables : ${mockups} (lancez le script depuis le dépôt K.School)`)

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
