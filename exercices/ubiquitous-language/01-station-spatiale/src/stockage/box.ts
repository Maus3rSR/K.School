export class Box<T extends { id: string }> {
  private items: T[] = [];

  add(x: T): void {
    this.items.push(x);
  }

  remove(id: string): T | undefined {
    const idx = this.items.findIndex((x) => x.id === id);
    if (idx === -1) return undefined;
    return this.items.splice(idx, 1)[0];
  }

  getAll(): T[] {
    return this.items;
  }

  count(): number {
    return this.items.length;
  }
}
