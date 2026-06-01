import { Res } from "./result.ts"
import type { Data } from "../formation/data.ts"
import type { Obj } from "../candidat/obj.ts"
import { checkA, checkB, checkC } from "../validation/checker.ts"

export function handle(o: Obj, d: Data): Res {
  if (!checkA(d)) {
    return new Res(false, null, "ko_date")
  }

  if (!checkB(d)) {
    return new Res(false, null, "ko_full")
  }

  if (!checkC(d, o)) {
    return new Res(false, null, "ko_dup")
  }

  d.addEntry(o.id)
  const tmp = `REF-${d.id}-${o.id}-${Date.now()}`
  return new Res(true, tmp, "ok")
}
