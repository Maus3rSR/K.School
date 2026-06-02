import { Mgr } from "./station/mgr.ts";
import type { Obj as ObjA } from "./carburant/obj.ts";
import type { Obj as ObjB } from "./nourriture/obj.ts";
import type { Obj as ObjC } from "./equipement/obj.ts";

const s = new Mgr();
s.register("fuel");
s.register("food");
s.register("equipment");

const a1: ObjA = {
  id: "c1",
  label: "Hydrogen tank A",
  quantity: 50,
  propulsionType: "hydrogen",
  rating: 95,
};
const a2: ObjA = {
  id: "c2",
  label: "Plasma cartridge",
  quantity: 3,
  propulsionType: "plasma",
  rating: 0,
};

const b1: ObjB = {
  id: "f1",
  label: "Ration pack Alpha",
  quantity: 200,
  calories: 2400,
  expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
};
const b2: ObjB = {
  id: "f2",
  label: "Emergency protein bar",
  quantity: 5,
  calories: 500,
  expirationDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
};

const c1: ObjC = {
  id: "e1",
  label: "Repair kit",
  quantity: 8,
  category: "tools",
  status: "used",
};
const c2: ObjC = {
  id: "e2",
  label: "Medical scanner",
  quantity: 1,
  category: "medical",
  status: "new",
};

s.insert("fuel", a1);
s.insert("fuel", a2);
s.insert("food", b1);
s.insert("food", b2);
s.insert("equipment", c1);
s.insert("equipment", c2);

console.log("--- Entries below threshold 10 ---");
console.log(s.findBelowThreshold(10));

console.log("\n--- Expired entries (food) ---");
console.log(s.filterExpired("food"));

console.log("\n--- Sum of all quantities ---");
console.log(s.sumAll());

console.log("\n--- Delete entry c2 from fuel ---");
console.log(s.delete("fuel", "c2"));
