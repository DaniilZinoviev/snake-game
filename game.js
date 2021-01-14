const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 1;
const cellSize = 10;
const totalWidth = 500;
const totalHeight = 300;

const gameSpeed = 50;

function Snake() {
  // Defaults
  this.tiles = [
    {
      x: 2,
      y: 4,
    },
  ];
  this.moveX = 1;
  this.moveY = 0;
}

function Game() {
  this.snake = new Snake();
  this.initialized = false;

  this.update = function () {
    console.log("run update");
    // Update snake position
    const lastTile = this.snake.tiles[this.snake.tiles.length - 1];
    const newTile = {
      x: lastTile.x + this.snake.moveX,
      y: lastTile.y + this.snake.moveY,
    };
    this.snake.tiles.push(newTile);
    this.snake.tiles.shift();
  };

  this.render = function () {
    console.log("run render");
    ctx.clearRect(0, 0, totalWidth, totalHeight);
    this.snake.tiles.forEach((tile) => {
      ctx.fillRect(tile.x * cellSize, tile.y * cellSize, cellSize, cellSize);
    });
  };

  this.tick = function () {
    try {
      this.update(this.snake);
      this.render(this.snake);
    } catch (e) {
      console.error(e.message);
    }
  };

  this.updateSnakeDirection = function(key) {
    console.log(key);
    const keyMap = {
      // [x, y]
      ArrowDown:  [0, 1],
      KeyS:       [0, 1],
      ArrowUp:    [0, -1],
      KeyW:       [0, -1],
      ArrowRight: [1, 0],
      KeyD:       [1, 0],
      ArrowLeft:  [-1, 0],
      KeyA:       [-1, 0],
    }

    if (keyMap[key]) {
      const [x, y] = keyMap[key];
      this.snake.moveX = x;
      this.snake.moveY = y;
    }
  }

  this.init = function () {
    if (this.initialized) {
      return console.log("The game was initialized yet!");
    }
    console.log("Game init was started.");
    setInterval(() => this.tick(), gameSpeed);
    this.tick();

    window.addEventListener('keydown', (e) => {
      this.updateSnakeDirection(e.code)
    });
    console.log("Game init has been done.");
    this.initialized = true;
  };
}

// function init() {
//   const snake = new Snake();
//   setInterval(function () { gameTick(snake); }, gameSpeed);
//   gameTick(snake);
// }

const game = new Game();
game.init();
