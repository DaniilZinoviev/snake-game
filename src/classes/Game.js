import { Apple, Snake } from '/';

function Game(opts) {
  const defaultOptions = {
    cellSize: 15,
    totalWidth: 500,
    totalHeight: 300,
    snakeColor: '#235621',
    appleColor: '#aa0000',
    gameSpeed: 100,
    ctx: null,
  };
  const options = Object.assign(defaultOptions, opts);
  const {
    cellSize,
    totalWidth,
    totalHeight,
    snakeColor,
    appleColor,
    gameSpeed,
    ctx
  } = options;
  this.snake = new Snake();
  this.apples = [];
  this.initialized = false;
  this.totalRows = Math.floor(totalWidth / cellSize);
  this.totalCols = Math.floor(totalHeight / cellSize);
  

  this.checkEndGame = function() {
    const { x, y } = this.snake.getLastTile();
    if (
      x < 0 || x >= this.totalRows ||
      y < 0 || y >= this.totalCols
    ) {
      this.end();
    }
  }

  this.getAppleRandomPosition = function() {
    const x = Math.floor(Math.random() * this.totalRows);
    const y = Math.floor(Math.random() * this.totalCols);
    if (this.snake.tiles.some(tile => x === tile.x && y === tile.y)) {
      return this.getAppleRandomPosition();
    }
    return [x, y];
  }

  this.update = function () {
    // Create apples
    if (this.apples.length === 0) {
      const [x, y] = this.getAppleRandomPosition();

      this.apples.push(new Apple({x, y}))
    }

    // Update snake position
    this.snake.move(this.apples);

    // Check that snake can eat apples
    const tile = this.snake.getLastTile();
    this.apples = this.apples.filter(({x, y}) => {
      return x !== tile.x || y !== tile.y;
    });
    
    // Check end game
    this.checkEndGame();
  };

  this.render = function () {
    // console.log("run render");
    ctx.clearRect(0, 0, totalWidth, totalHeight);
    this.apples.forEach(({x, y}) => {
      ctx.fillStyle = appleColor;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    })
    this.snake.tiles.forEach((tile) => {
      ctx.fillStyle = snakeColor;
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
    // [x, y]
    const keyMap = {
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
  }

  this.end = function() {
    console.log('The game has ended.');
    clearInterval(this.interval);
    document.body.classList.remove('playing');
  }

  this.start = function() {
    console.log("Game init was started.");
    this.interval = setInterval(() => this.tick(), gameSpeed);
    this.tick();
    document.body.classList.add('playing');
  }

  this.init = function () {
    if (this.initialized) {
      return console.log("The game was initialized yet!");
    }
    this.start();

    window.addEventListener('keydown', (e) => {
      this.updateSnakeDirection(e.code)
    });
    console.log("Game init has been done.");
    this.initialized = true;
  };
}

export default Game;