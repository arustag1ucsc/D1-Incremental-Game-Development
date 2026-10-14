// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";
import { Shop } from "./shop.ts";

const app = document.querySelector<HTMLElement>("#app")!;
const shop = new Shop();

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
  counterElement.textContent = shop.getCurrency().toString();
});

const message = document.createElement("p");
message.textContent = "Your project starts here.";

// For the linter
shop;

app.append(heading, image, counterElement, message);
