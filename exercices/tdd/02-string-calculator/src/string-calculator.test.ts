import { assertEquals, assertThrows } from "jsr:@std/assert"
import { add } from "./string-calculator.ts"

// Étape 1 — Chaîne vide
Deno.test("should return 0 for empty string", () => {
  const result = add("")
  assertEquals(result, 0)
})

// Étape 2 — Un seul nombre
Deno.test("should return the number when given a single number", () => {
  const result = add("5")
  assertEquals(result, 5)
})

Deno.test("should return the number when given a single number - 1", () => {
  const result = add("1")
  assertEquals(result, 1)
})

// Étape 3 — Deux nombres
Deno.test("should return the sum of two numbers", () => {
  const result = add("1,2")
  assertEquals(result, 3)
})

Deno.test("should return the sum of two numbers - 4 and 6", () => {
  const result = add("4,6")
  assertEquals(result, 10)
})

// Étape 4 — N nombres
Deno.test("should return the sum of multiple numbers", () => {
  const result = add("1,2,3,4")
  assertEquals(result, 10)
})

Deno.test("should return the sum of many numbers", () => {
  const result = add("1,2,3,4,5,6,7,8,9,10")
  assertEquals(result, 55)
})

// Étape 5 — Nombres négatifs
Deno.test("should throw when a negative number is given", () => {
  assertThrows(
    () => add("1,-2,3"),
    Error,
    "negatives not allowed: -2"
  )
})

Deno.test("should list all negative numbers in error message", () => {
  assertThrows(
    () => add("1,-2,-5"),
    Error,
    "negatives not allowed: -2, -5"
  )
})
