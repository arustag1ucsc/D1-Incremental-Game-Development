// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import "./style.css";
import moonUrl from "./assets/moon.gif?no-inline";
import { Shop } from "./shop.ts";
import { Inventory } from "./inventory.ts";
import { items } from "./items.ts";

const app = document.querySelector<HTMLElement>("#app")!;
const shop = new Shop();
export const inventory = new Inventory();

const heading = document.createElement("h1");
heading.textContent = "Moon Miners";
heading.className = "gameTitle";

const image = document.createElement("img");
image.src = moonUrl;
image.alt = "rotaing gif of moon";
image.width = 200;
image.height = 200;
image.id = "moonButton";
image.className = "moonImage";

const counterElement = document.createElement("span");
counterElement.id = "ores";
counterElement.textContent = "0";
counterElement.className = "oreCounter";

// new code starts here
image.addEventListener("click", (event: MouseEvent) => {
  shop.addToCurrency(1);
  counterElement.textContent = shop.getCurrency().toFixed(1) + " ores";
  updateButtons();

  playMoonPop();
  spawnConfetti(event.clientX, event.clientY);
});

function playMoonPop(): void {
  image.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.88)" },
      { transform: "scale(1.05)" },
      { transform: "scale(1)" },
    ],
    { duration: 200, easing: "ease-out" },
  );
}

const confettiColors = [
  "#ffd966",
  "#ff6b6b",
  "#6bcbff",
  "#9dff6b",
  "#d96bff",
  "#ffffff",
];

function spawnConfetti(x: number, y: number): void {
  const pieceCount = 24;

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement("div");
    const width = 6 + Math.random() * 6;
    const height = width * 0.5;
    const color =
      confettiColors[Math.floor(Math.random() * confettiColors.length)];

    piece.style.position = "fixed";
    piece.style.left = `${x - width / 2}px`;
    piece.style.top = `${y - height / 2}px`;
    piece.style.width = `${width}px`;
    piece.style.height = `${height}px`;
    piece.style.backgroundColor = color;
    piece.style.borderRadius = "2px";
    piece.style.pointerEvents = "none";
    piece.style.zIndex = "1000";
    document.body.append(piece);

    // Burst outward, biased upward, then fall with gravity
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 100;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 60;
    const spin = (Math.random() - 0.5) * 900;

    const animation = piece.animate(
      [
        { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${dx}px, ${dy}px) rotate(${spin}deg)`,
          opacity: 1,
          offset: 0.5,
        },
        {
          transform: `translate(${dx * 1.2}px, ${dy + 140}px) rotate(${
            spin * 1.6
          }deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 900 + Math.random() * 500,
        easing: "cubic-bezier(0.2, 0.8, 0.4, 1)",
        fill: "forwards",
      },
    );

    animation.onfinish = () => piece.remove();
  }
}
// new code ends here

const message = document.createElement("p");
message.className = "gameMessage";

const productionElement = document.createElement("p");
productionElement.className = "productionRate";
productionElement.textContent = "0 ores/sec";

const buttons: HTMLButtonElement[] = [];

function createButton(
  name: keyof typeof items,
  cost: number,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "upgradeButton";
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
  productionElement.textContent = `${totalProduction} ores/sec`;

  updateButtons();
  requestAnimationFrame(update);
}

app.className = "MoonMiners";

const moonSection = document.createElement("section");
moonSection.className = "moonSection";
moonSection.append(image, counterElement, productionElement);

const shopSection = document.createElement("section");
shopSection.className = "shopSection";

const upgradeButtons = document.createElement("div");
upgradeButtons.className = "upgradeButtons";

const shopHeading = document.createElement("h2");
shopHeading.textContent = "Upgrades!";
shopSection.append(shopHeading, message, upgradeButtons);

app.append(heading, moonSection, shopSection);

for (const item of Object.keys(items) as Array<keyof typeof items>) {
  const button = createButton(item, items[item].cost);
  button.dataset.item = item;
  buttons.push(button);
  upgradeButtons.append(button);
}

updateButtons();
requestAnimationFrame(update);
