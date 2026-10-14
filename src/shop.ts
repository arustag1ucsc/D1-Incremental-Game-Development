import { inventory } from "./main.ts";
import { items } from "./items.ts";

export class Shop {
  private currency: number = 0;

  constructor() {
  }
  buy(item: keyof typeof items): boolean {
    if (items[item].cost > this.currency) return false;
    this.currency -= items[item].cost;
    items[item].cost *= 1.15;
    inventory.addToInventory(item);
    return true;
  }
  sell(item: keyof typeof items): void {
    if (items[item].quantity < 1) return;
    this.currency += items[item].cost * 0.6;
    inventory.removeFromInventory(item);
  }
  getPrice(item: keyof typeof items): number {
    return items[item].cost;
  }
  addToCurrency(number: number): void {
    this.currency += number;
  }
  getCurrency(): number {
    return this.currency;
  }
}
