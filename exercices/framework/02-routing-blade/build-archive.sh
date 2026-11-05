#!/usr/bin/env bash
# Génère l'archive wishflix-maquettes.zip distribuée aux étudiants (Moodle/LMS) :
# les maquettes de scenarios/WishFlix/src/ + copy-css.mjs, dans un dossier wishflix-maquettes/.
# Usage : ./build-archive.sh   →  produit wishflix-maquettes.zip à côté de ce script.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
src="$(cd "$here/../../../scenarios/WishFlix/src" && pwd)"
out="$here/wishflix-maquettes.zip"

staging="$(mktemp -d)"
trap 'rm -rf "$staging"' EXIT
mkdir -p "$staging/wishflix-maquettes"
cp "$src"/*.html "$src"/*.css "$here/copy-css.mjs" "$staging/wishflix-maquettes/"

rm -f "$out"
if command -v zip >/dev/null 2>&1; then
  (cd "$staging" && zip -qr "$out" wishflix-maquettes)
elif command -v python3 >/dev/null 2>&1; then
  (cd "$staging" && python3 -m zipfile -c "$out" wishflix-maquettes)
else
  echo "Erreur : ni zip ni python3 disponible pour créer l'archive." >&2
  exit 1
fi

echo "Archive créée : $out"
python3 -m zipfile -l "$out" 2>/dev/null || unzip -l "$out"
