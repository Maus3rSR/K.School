export interface Obj {
  id: string;
  label: string;
  quantity: number;
  calories: number;
  expirationDate: Date;
}

export function chk(o: Obj): boolean {
  return o.expirationDate.getTime() < Date.now();
}
