import { Game } from "./classes";
import "./styles/index.scss";

const canvas = document.getElementById("game--canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 1;

const options = {
  cellSize: 20,
  totalWidth: canvas.width,
  totalHeight: canvas.height,
  snakeColor: "#235621",
  appleColor: "#aa0000",
  gameSpeed: 200,
  ctx: ctx,
};

const game = new Game(options);
game.init();

const startButtons = document.querySelectorAll(".js-btn--start");
startButtons.forEach((btn) =>
  btn.addEventListener("click", () => game.start())
);
