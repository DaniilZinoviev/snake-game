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

  /**
   * Snake's "head"
   */
  this.getFirstTile = function () {
    return this.tiles[0];
  };

  /**
   * Last tile, or Snake's "tail"
   */
  this.getLastTile = function () {
    return this.tiles[this.tiles.length - 1];
  };

  /**
   * Last tile, or Snake's "tail"
   */
  this.getPreLastTile = function () {
    return this.tiles[this.tiles.length - 2];
  };

  this.getNextTile = function (rows, cols, canMoveThroughWalls) {
    const lastTile = this.getLastTile();
    let x = lastTile.x + this.moveX;
    let y = lastTile.y + this.moveY;

    // Move through walls
    if (canMoveThroughWalls) {
      if (x > rows - 1) {
        x = 0;
      } else if (x < 0) {
        x = rows;
      }
      if (y > cols - 1) {
        y = 0;
      } else if (y < 0) {
        y = cols;
      }
    }

    return { x, y };
  };

  /**
   *
   * @param {Array<Apple>} apples
   * @param {number} rows
   * @param {number} cols
   */
  this.move = function (newTile, apples) {
    this.tiles.push(newTile);

    const canEatApple = apples.some(
      ({ x, y }) => x === newTile.x && y === newTile.y
    );
    console.log(`canEatApple = ${canEatApple}`);
    if (!canEatApple) {
      this.tiles.shift();
    }
  };
}

export default Snake;
