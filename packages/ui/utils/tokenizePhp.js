// Découpe une ligne de code PHP (session Tinker, ex. `Category::create([...])`)
// en segments étiquetés par rôle, pour <Terminal> avec `lang: 'php'`.
// Retourne [{ text, role }] — les espaces et le texte hors rôle ont role: null,
// la concaténation des text redonne la ligne d'origine (copie fidèle).

const KEYWORDS = new Set([
  'fn', 'function', 'return', 'new', 'use', 'if', 'else', 'elseif', 'foreach',
  'as', 'while', 'for', 'class', 'public', 'private', 'protected', 'static',
  'true', 'false', 'null', 'echo', 'print', 'int', 'string', 'bool', 'array',
  'void', 'float', 'self', 'parent', 'extends', 'implements', 'namespace',
  'match', 'readonly', 'final', 'abstract', 'const', 'instanceof', 'throw',
  'try', 'catch', 'finally', 'switch', 'case', 'default', 'break', 'continue',
  'do', 'yield', 'from', 'clone', 'and', 'or', 'xor', 'isset', 'empty', 'unset',
  'list', 'global', 'declare',
])

// Alternation totale : chaque caractère est couvert par une branche (\S en dernier).
const RE = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\$[A-Za-z_]\w*|::|->|=>|\d+(?:\.\d+)?|[A-Za-z_]\w*|\s+|\S/g

export function tokenizePhp(code) {
  const matches = []
  let m
  RE.lastIndex = 0
  while ((m = RE.exec(code)) !== null) matches.push(m[0])

  const parts = matches.map((text) => ({ text, role: null }))
  for (let i = 0; i < parts.length; i++) {
    parts[i].role = classify(parts, i)
  }
  return parts
}

function classify(parts, i) {
  const text = parts[i].text
  if (/^\s+$/.test(text)) return null
  if (text[0] === '"' || text[0] === "'") return 'string'
  if (text[0] === '$') return 'variable'
  if (text === '::') return 'scope'
  if (text === '->') return 'arrow'
  if (text === '=>') return 'operator'
  if (text === ':') return 'colon'
  if (/^[()\[\],;{}]$/.test(text)) return 'punct'
  if (/^\d/.test(text)) return 'number'
  if (/^[A-Za-z_]/.test(text)) {
    if (/^[A-Z]/.test(text)) return 'class'
    const nextNonWs = parts.slice(i + 1).find((p) => !/^\s+$/.test(p.text))
    if (!KEYWORDS.has(text) && nextNonWs && nextNonWs.text === '(') return 'method'
    return null
  }
  return 'operator'
}

export const PHP_ROLES = [
  'class', 'scope', 'arrow', 'method', 'variable',
  'string', 'number', 'operator', 'colon', 'punct',
]

export const PHP_ROLE_LABELS = {
  class: 'classe',
  scope: '::',
  arrow: '->',
  method: 'méthode',
  variable: 'variable',
  string: 'chaîne',
  number: 'nombre',
  operator: 'opérateur',
  colon: ':',
  punct: 'ponctuation',
}
