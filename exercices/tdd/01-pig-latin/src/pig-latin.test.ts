import { assertEquals } from "jsr:@std/assert"
import { pigLatin } from "./pig-latin.ts"

// Règle 1 — Mot commençant par une voyelle
Deno.test("should add ay when word starts with a vowel - apple", () => {
  const result = pigLatin("apple")
  assertEquals(result, "appleay")
})

Deno.test("should add ay when word starts with a vowel - ear", () => {
  const result = pigLatin("ear")
  assertEquals(result, "earay")
})

Deno.test("should add ay when word starts with a vowel - igloo", () => {
  const result = pigLatin("igloo")
  assertEquals(result, "iglooay")
})

// Règle 2 — Mot commençant par une consonne
Deno.test("should move consonant to end and add ay - pig", () => {
  const result = pigLatin("pig")
  assertEquals(result, "igpay")
})

Deno.test("should move consonant to end and add ay - latin", () => {
  const result = pigLatin("latin")
  assertEquals(result, "atinlay")
})

// Règle 3 — Mot commençant par plusieurs consonnes
Deno.test("should move consonant cluster to end and add ay - school", () => {
  const result = pigLatin("school")
  assertEquals(result, "oolschay")
})

Deno.test("should move consonant cluster to end and add ay - three", () => {
  const result = pigLatin("three")
  assertEquals(result, "eethray")
})

Deno.test("should move consonant cluster to end and add ay - glove", () => {
  const result = pigLatin("glove")
  assertEquals(result, "oveglay")
})
