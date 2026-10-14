// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";
import { Shop } from "./shop.ts";
import { Inventory } from "./inventory.ts";
import { items } from "./items.ts";

const app = document.querySelector<HTMLElement>("#app")!;
const shop = new Shop();
export const inventory = new Inventory();

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 200;
image.height = 200;

const counterElement = document.createElement("span");
counterElement.id = "ores";
counterElement.textContent = "0";

image.addEventListener("click", () => {
  shop.addToCurrency(1);
  counterElement.textContent = (shop.getCurrency().toFixed(1).toString()) +
    "ores";
  updateButtons();
});

const message = document.createElement("p");
// message.textContent = "Your project starts here.";

const buttons: HTMLButtonElement[] = [];

function createButton(
  name: keyof typeof items,
  cost: number,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = `${name}: ${cost} ores`;
  button.addEventListener("click", () => {
    const purchased = shop.buy(name);
    if (purchased) {
      counterElement.textContent = shop.getCurrency().toString();
      message.textContent = `Purchased a ${name}`;
    } else {
      message.textContent = `You need ${cost - shop.getCurrency()} more ores!`;
    }
    updateButtons();
  });
  return button;
}

function updateButtons(): void {
  for (const button of buttons) {
    const item = button.dataset.item as keyof typeof items;
    const cost = items[item].cost;
    const newQuantity = inventory.getItemQuanity(item);

    button.disabled = shop.getCurrency() < items[item].cost;
    button.textContent = `${item}: ${
      Math.floor(cost)
    } ores | Owned: ${newQuantity}`;
  }
}

let lastTime = performance.now();

function update(now: number): void {
  const elapsedSeconds = (now - lastTime) / 1000;
  lastTime = now;

  let totalProduction = 0;

  for (const item of Object.keys(items) as Array<keyof typeof items>) {
    totalProduction += items[item].quantity * items[item].oresPerSecond;
  }

  shop.addToCurrency(totalProduction * elapsedSeconds);

  counterElement.textContent = `${shop.getCurrency().toFixed(0)} ores`;

  updateButtons();

  requestAnimationFrame(update);
}

app.append(heading, image, counterElement, message);

for (const item of Object.keys(items) as Array<keyof typeof items>) {
  const button = createButton(item, items[item].cost);
  button.dataset.item = item;
  buttons.push(button);
  app.append(button);
}

requestAnimationFrame(update);
