import { Box } from "../stockage/box.ts";
import type { Obj as ObjA } from "../carburant/obj.ts";
import type { Obj as ObjB } from "../nourriture/obj.ts";
import type { Obj as ObjC } from "../equipement/obj.ts";
import { chk } from "../nourriture/obj.ts";

type Entry = ObjA | ObjB | ObjC;

export class Mgr {
  private registries = new Map<string, Box<Entry>>();

  register(key: string): void {
    this.registries.set(key, new Box<Entry>());
  }

  insert(key: string, entry: Entry): void {
    this.registries.get(key)?.add(entry);
  }

  delete(key: string, id: string): Entry | undefined {
    return this.registries.get(key)?.remove(id);
  }

  getAll(key: string): Entry[] {
    return this.registries.get(key)?.getAll() ?? [];
  }

  findBelowThreshold(threshold: number): Map<string, Entry[]> {
    const result = new Map<string, Entry[]>();
    for (const [key, box] of this.registries) {
      result.set(
        key,
        box.getAll().filter((x) => x.quantity < threshold),
      );
    }
    return result;
  }

  filterExpired(key: string): ObjB[] {
    return (this.registries.get(key)?.getAll() ?? []).filter((x): x is ObjB =>
      chk(x as ObjB),
    );
  }

  sumAll(): number {
    let acc = 0;
    for (const box of this.registries.values()) {
      acc += box.getAll().reduce((sum, x) => sum + x.quantity, 0);
    }
    return acc;
  }
}
