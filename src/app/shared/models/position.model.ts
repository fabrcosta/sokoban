export class Position {
  constructor(public row: number, public col: number) {}

  public toString(): string {
    return this.row + "," + this.col;
  }
}
