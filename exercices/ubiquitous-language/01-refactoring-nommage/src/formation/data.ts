export class Data {
  private reg: string[] = []

  constructor(
    public id: string,
    public lbl: string,
    public dt: Date,
    public max: number,
  ) {}

  getCount(): number {
    return this.reg.length
  }

  getFree(): number {
    return this.max - this.reg.length
  }

  isOk(): boolean {
    return this.dt.getTime() > Date.now() && this.getFree() > 0
  }

  hasEntry(oid: string): boolean {
    return this.reg.includes(oid)
  }

  addEntry(oid: string): void {
    this.reg.push(oid)
  }
}
