import { Obj } from "./candidat/obj.ts"
import { Data } from "./formation/data.ts"
import { handle } from "./inscription/handler.ts"

const o1 = new Obj("c-001", "Alice Martin", "alice@example.com")
const o2 = new Obj("c-002", "Bob Dupont", "bob@example.com")

const d1 = new Data(
  "f-101",
  "TypeScript Avancé",
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  2,
)

console.log("--- Tentatives d'inscription ---")
console.log(handle(o1, d1))
console.log(handle(o2, d1))
console.log(handle(o1, d1))

const d2 = new Data(
  "f-102",
  "Git pour les pros",
  new Date(Date.now() - 24 * 60 * 60 * 1000),
  10,
)

console.log("\n--- Session passée ---")
console.log(handle(o1, d2))
