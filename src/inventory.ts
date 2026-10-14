import { items } from "./items.ts";
export class Inventory {
  addToInventory(item: keyof typeof items) {
    items[item].quantity++;
  }

  removeFromInventory(item: keyof typeof items) {
    items[item].quantity--;
  }

  getItemQuanity(item: keyof typeof items): number {
    return items[item].quantity;
  }
}
