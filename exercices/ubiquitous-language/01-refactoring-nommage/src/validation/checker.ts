import type { Data } from "../formation/data.ts"
import type { Obj } from "../candidat/obj.ts"

export function checkA(d: Data): boolean {
  return d.dt.getTime() > Date.now()
}

export function checkB(d: Data): boolean {
  return d.getFree() > 0
}

export function checkC(d: Data, o: Obj): boolean {
  return !d.hasEntry(o.id)
}
