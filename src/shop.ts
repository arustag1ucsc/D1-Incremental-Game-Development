// import { Inventory } from "./inventory.ts";

export class Shop {
  private currency: number = 0;
  private items: Record<string, number> = {
    "pickaxe": 10,
    "drill": 50,
    "jackhammer": 100,
    "bulldozer": 250,
  };

  constructor() {
  }
  buy(item: string): void {
    if (this.items[item] > this.currency) return;
  }
  sell(): void {
  }
  getPrice(item: string): number {
    return this.items[item];
  }
  addToCurrency(number: number): void {
    this.currency += number;
  }
  getCurrency(): number {
    return this.currency;
  }
}
