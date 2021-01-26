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
  this.getFirstTile = function() {
    return this.tiles[0];
  }

  /**
   * Last tile, or Snake's "tail"
   */
  this.getLastTile = function() {
    return this.tiles[ this.tiles.length - 1 ];
  }

  /**
   * Last tile, or Snake's "tail"
   */
  this.getPreLastTile = function() {
    return this.tiles[ this.tiles.length - 2 ];
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

    const canEatApple = apples.some(({x, y}) => x === newTile.x && y === newTile.y);
    console.log(`canEatApple = ${canEatApple}`)
    if (!canEatApple) {
      this.tiles.shift();
    }
  }
}

export default Snake;