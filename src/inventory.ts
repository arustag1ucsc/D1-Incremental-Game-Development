export class Inventory {
  items: Record<string, number> = {
    "pickaxe": 0,
    "drill": 0,
    "jackhammer": 0,
    "bulldozer": 0,
  };

  addToInventory(item: string) {
    this.items[item]++;
  }

  removeFromInventory(item: string) {
    this.items[item]--;
  }

  getItemQuanity(item: string): number {
    return this.items[item];
  }

  // constructor() {
  //   for (const item in this.items) {
  //     item;
  //   }
  // }
}
