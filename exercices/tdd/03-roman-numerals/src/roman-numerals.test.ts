import { assertEquals } from "jsr:@std/assert"
import { toRoman } from "./roman-numerals.ts"

// Cas simples — chiffres de base
Deno.test("should return I for 1", () => {
  assertEquals(toRoman(1), "I")
})

Deno.test("should return II for 2", () => {
  assertEquals(toRoman(2), "II")
})

Deno.test("should return III for 3", () => {
  assertEquals(toRoman(3), "III")
})

Deno.test("should return V for 5", () => {
  assertEquals(toRoman(5), "V")
})

Deno.test("should return X for 10", () => {
  assertEquals(toRoman(10), "X")
})

Deno.test("should return L for 50", () => {
  assertEquals(toRoman(50), "L")
})

Deno.test("should return C for 100", () => {
  assertEquals(toRoman(100), "C")
})

Deno.test("should return D for 500", () => {
  assertEquals(toRoman(500), "D")
})

Deno.test("should return M for 1000", () => {
  assertEquals(toRoman(1000), "M")
})

// Combinaisons additives
Deno.test("should return VI for 6", () => {
  assertEquals(toRoman(6), "VI")
})

Deno.test("should return XIV for 14", () => {
  assertEquals(toRoman(14), "XIV")
})

Deno.test("should return XLII for 42", () => {
  assertEquals(toRoman(42), "XLII")
})

// Cas soustractifs
Deno.test("should return IV for 4", () => {
  assertEquals(toRoman(4), "IV")
})

Deno.test("should return IX for 9", () => {
  assertEquals(toRoman(9), "IX")
})

Deno.test("should return XL for 40", () => {
  assertEquals(toRoman(40), "XL")
})

Deno.test("should return XC for 90", () => {
  assertEquals(toRoman(90), "XC")
})

Deno.test("should return CD for 400", () => {
  assertEquals(toRoman(400), "CD")
})

Deno.test("should return CM for 900", () => {
  assertEquals(toRoman(900), "CM")
})

// Cas complexes
Deno.test("should return MCMXCIV for 1994", () => {
  assertEquals(toRoman(1994), "MCMXCIV")
})

Deno.test("should return MMXXVI for 2026", () => {
  assertEquals(toRoman(2026), "MMXXVI")
})
