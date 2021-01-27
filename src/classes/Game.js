import { Apple, Snake } from "/";

function Game(opts) {
  const defaultOptions = {
    cellSize: 15,
    totalWidth: 500,
    totalHeight: 300,
    snakeColor: "#235621",
    appleColor: "#aa0000",
    gameSpeed: 100,
    ctx: null,
    canMoveThroughWalls: true,
  };
  const options = Object.assign(defaultOptions, opts);
  const {
    cellSize,
    totalWidth,
    totalHeight,
    snakeColor,
    appleColor,
    gameSpeed,
    ctx,
    canMoveThroughWalls,
  } = options;
  this.snake = new Snake();
  this.apples = [];
  this.initialized = false;
  this.totalRows = Math.floor(totalWidth / cellSize);
  this.totalCols = Math.floor(totalHeight / cellSize);

  this.init = function () {
    if (this.initialized) {
      return console.error("The game was initialized yet!");
    }
    this.setGameState('init');
    window.addEventListener("keydown", (e) => {
      this.updateSnakeDirection(e.code);
    });
    this.initialized = true;
    console.log("The game is initialized.");
  };

  this.update = function () {
    // Create apples
    if (this.apples.length === 0) {
      const [x, y] = this.getAppleRandomPosition();
      this.apples.push(new Apple({ x, y }));
    }

    // Update snake position
    const next = this.snake.getNextTile(
      this.totalRows,
      this.totalCols,
      canMoveThroughWalls
    );
    this.snake.move(next, this.apples);

    // Check that snake can eat apples
    const tile = this.snake.getLastTile();
    this.apples = this.apples.filter(({ x, y }) => {
      return x !== tile.x || y !== tile.y;
    });

    // Check end game
    this.checkEndGame();
  };

  this.render = function () {
    ctx.clearRect(0, 0, totalWidth, totalHeight);
    this.apples.forEach(({ x, y }) => {
      ctx.fillStyle = appleColor;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });
    this.snake.tiles.forEach((tile) => {
      ctx.fillStyle = snakeColor;
      ctx.fillRect(tile.x * cellSize, tile.y * cellSize, cellSize, cellSize);
    });
  };

  this.tick = function () {
    try {
      this.update();
      this.render();
    } catch (e) {
      console.error(e.message);
    }
  };

  this.start = function () {
    this.snake = new Snake();
    this.apples = [];
    this.interval = setInterval(() => this.tick(), gameSpeed);
    this.tick();
    document.body.classList.add("playing");
    this.setGameState('play');
  };

  this.checkEndGame = function () {
    const { x, y } = this.snake.getLastTile();

    // If cannot move through walls
    if (!canMoveThroughWalls) {
      if (x < 0 || x >= this.totalRows || y < 0 || y >= this.totalCols) {
        this.end();
      }
    }
    // If snake eat itself
    var positions = {};
    this.snake.tiles.forEach(({ x, y }) => {
      const uniquePosition = `${x}, ${y}`;
      if (positions[uniquePosition]) {
        ctx.fillStyle = "red";
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        this.end();
      }
      positions[uniquePosition] = true;
    });
  };

  this.end = function () {
    console.log("The game has ended.");
    clearInterval(this.interval);
    document.body.classList.remove("playing");
    this.setGameState('end');
  };

  this.getAppleRandomPosition = function () {
    const x = Math.floor(Math.random() * this.totalRows);
    const y = Math.floor(Math.random() * this.totalCols);
    if (this.snake.tiles.some((tile) => x === tile.x && y === tile.y)) {
      return this.getAppleRandomPosition();
    }
    return [x, y];
  };

  this.updateSnakeDirection = function (key) {
    // [x, y]
    const keyMap = {
      ArrowDown: [0, 1],
      KeyS: [0, 1],
      ArrowUp: [0, -1],
      KeyW: [0, -1],
      ArrowRight: [1, 0],
      KeyD: [1, 0],
      ArrowLeft: [-1, 0],
      KeyA: [-1, 0],
    };
    if (keyMap[key]) {
      const [x, y] = keyMap[key];
      const head = this.snake.getLastTile();
      const nextPosX = head.x + x;
      const nextPosY = head.y + y;

      // Check if snake will eat itself
      const neck = this.snake.getPreLastTile();
      if (neck && nextPosX === neck.x && nextPosY === neck.y) {
        return;
      }
      this.snake.moveX = x;
      this.snake.moveY = y;
    }
  };

  this.setGameState = function(state) {
    document.body.setAttribute('data-gamestate', state);
  }
}

export default Game;
