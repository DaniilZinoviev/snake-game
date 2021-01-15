const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 1;
const cellSize = 15;
const totalWidth = 500;
const totalHeight = 300;
const snakeColor = '#000';
const appleColor = '#235621';

const gameSpeed = 100;

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

  this.getLastTile = function() {
    return this.tiles[ this.tiles.length - 1 ];
  }

  /**
   * 
   * @param {Array<Apple>} apples 
   */
  this.move = function(apples) {
    const lastTile = this.getLastTile();
    const newTile = {
      x: lastTile.x + this.moveX,
      y: lastTile.y + this.moveY,
    };
    this.tiles.push(newTile);

    const canEatApple = apples.some(({x, y}) => x === lastTile.x && y === lastTile.y);
    if (!canEatApple) {
      this.tiles.shift();
    }
  }
}

function Apple({x, y}) {
  this.x = x;
  this.y = y;
}

function Game() {
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

  this.update = function () {
    // console.log("run update");
    // Create apples
    if (this.apples.length === 0) {
      const x = Math.floor(Math.random() * this.totalRows);
      const y = Math.floor(Math.random() * this.totalCols);
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

  this.end = function() {
    clearInterval(this.interval);
    alert('The game has ended.')
  }

  this.init = function () {
    if (this.initialized) {
      return console.log("The game was initialized yet!");
    }
    console.log("Game init was started.");
    this.interval = setInterval(() => this.tick(), gameSpeed);
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
