/**
 * This is a "Demo" page code.
 * I include some styles and initialize the Game with my options
 */
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

/**
 * Buttons "Start" and "Reload"
 */
document.querySelectorAll(".js-btn--start").forEach((btn) => {
  btn.addEventListener("click", () => {
    game.start();
  });
});
