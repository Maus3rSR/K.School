export interface Obj {
  id: string;
  label: string;
  quantity: number;
  category: "tools" | "medical" | "scientific";
  status: "new" | "used" | "damaged";
}
