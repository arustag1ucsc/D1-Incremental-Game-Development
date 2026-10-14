# Moon Miners

A minimal incremental clicker game about mining moon ores. Ores can be used to buy tools that generate ores automatically over time.

## Play the Game

Link: https://arustag1ucsc.github.io/D1-Incremental-Game-Development/

## How to Play

1. Click the moon to mine ores.
2. Buy upgraded tools with ores to increase production rate.
3. Mine more ores and buy better tools!

## How to Run the Game Locally

1. Have Node.js and npm installed.
2. Clone the repository:
```
git clone https://github.com/arustag1ucsc/D1-Incremental-Game-Development.git
```
3. Install dependencies:
```
npm install
```
4. Start development server:
```
npm run dev
```
5. Open the displayed local URL.

Build the project:
```
npm run build
```
## Code Structure:
- `src/main.ts` - Creates game interface, contains button handler, updates ore count, manages upgrade buttons.
- `src/inventory.ts` — Manages the player's inventory. Updates the quantity of tools. 
- `src/items.ts` - Defines the available items and their costs and ores per second.
- `src/shop.ts` - Handles purchasing upgrades and checking ore costs.
- `src/style.css` - Stylizes the game's layout, colors, background, and buttons.
- `src/assets/` -  Contains images used in the game and other assets.
- `index.html` - Contains the main HTML page for the game.

## Revision Explanation
- [6a5222e](https://github.com):
We organized files to assist with shared behavior. The game is separated into main.ts, inventory.ts, items.ts, shop.ts. Files are imported into other files for reference and access to variables such as item cost.
- [72ddcac](https://github.com):
We added an update button in main.ts to handle requests for animation frames and to keep all the variables current to the player's actions. Production rate is now accurate to tools owned. We updated upgrade costs to be accurate to tool's uses and added a production statistics variable to be displayed in the game.

## Credits
Moon assets by https://grinnch.itch.io/pixel-moon-phases
