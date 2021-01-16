import { Game } from './classes';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 1;

const options = {
  cellSize: 15,
  totalWidth: 500,
  totalHeight: 300,
  snakeColor: '#235621',
  appleColor: '#aa0000',
  gameSpeed: 100,
  ctx: ctx,
}

const game = new Game(options);
game.init();
