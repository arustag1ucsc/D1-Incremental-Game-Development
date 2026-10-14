import { inventory } from "./main.ts";
import { items } from "./items.ts";

export class Shop {
  private currency: number = 0;

  constructor() {
  }
  buy(item: keyof typeof items): boolean {
    if (items[item].cost > this.currency) return false;
    this.currency -= items[item].cost;

    const multiplier = inventory.getItemQuanity("discount") > 0 ? 1.1 : 1.25;
    items[item].cost = Math.floor(items[item].cost * multiplier);
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
