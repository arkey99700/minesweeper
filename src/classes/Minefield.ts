export type MinefieldTile = {
  isRevealed: boolean;
  isMined: boolean;
  isFlagged: boolean;
  number: number;
  x: number;
  y: number;
};

export default class Minefield {
  public static createGrid(
    width: number,
    height: number,
    mineCount: number
  ): MinefieldTile[][] {
    const grid = this.createEmptyGrid(width, height);
    return this.placeMinesOnGrid(grid, mineCount);
  }

  public static checkForWin(
    grid: MinefieldTile[][],
    mineCount: number
  ): boolean {
    let notRevealedTilesCount = 0;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (!grid[i][j].isRevealed) {
          notRevealedTilesCount++;
        }
      }
    }

    return notRevealedTilesCount === mineCount ? true : false;
  }

  public static flagMinedTiles(grid: MinefieldTile[][]): MinefieldTile[][] {
    return grid.map((row) =>
      row.map((cell) => {
        if (cell.isMined) cell.isFlagged = true;
        return cell;
      })
    );
  }

  public static revealAdjacentTiles(
    grid: MinefieldTile[][],
    x: number,
    y: number
  ): MinefieldTile[][] {
    if (grid[y][x].number) {
      return grid;
    }

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0) continue;

        if (grid[y + i]) {
          const currentTile = grid[y + i][x + j];

          if (currentTile && !currentTile.isMined && !currentTile.isRevealed) {
            currentTile.isRevealed = true;

            if (!currentTile.number) {
              this.revealAdjacentTiles(grid, x + j, y + i);
            }
          }
        }
      }
    }

    return grid;
  }

  public static revealMinedTiles(grid: MinefieldTile[][]): MinefieldTile[][] {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j].isMined && !grid[i][j].isFlagged) {
          grid[i][j].isRevealed = true;
        }
      }
    }

    return grid;
  }

  public static createEmptyGrid(
    width: number,
    height: number
  ): MinefieldTile[][] {
    const grid: MinefieldTile[][] = [];

    for (let i = 0; i < height; i++) {
      grid[i] = [];
      for (let j = 0; j < width; j++) {
        grid[i][j] = {
          x: j,
          y: i,
          isFlagged: false,
          isMined: false,
          isRevealed: false,
          number: 0,
        };
      }
    }

    return grid;
  }

  private static placeMinesOnGrid(
    grid: MinefieldTile[][],
    mineCount: number
  ): MinefieldTile[][] {
    const mines = [];

    outer: for (let i = 0; i < mineCount; i++) {
      const mineCoordinates = this.generateMineCoordinates(
        grid.length,
        grid[0].length
      );

      for (const mine of mines) {
        if (mine.x === mineCoordinates.x && mine.y === mineCoordinates.y) {
          i--;
          continue outer;
        }
      }

      mines.push(mineCoordinates);
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const mine = mines.find((mine) => mine.x === i && mine.y === j);

        if (mine) {
          grid[i][j].isMined = true;
        }
      }
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].isMined) {
          if (grid[i - 1] && grid[i - 1][j - 1]) grid[i - 1][j - 1].number++;
          if (grid[i - 1] && grid[i - 1][j]) grid[i - 1][j].number++;
          if (grid[i - 1] && grid[i - 1][j + 1]) grid[i - 1][j + 1].number++;
          if (grid[i][j - 1]) grid[i][j - 1].number++;
          if (grid[i][j + 1]) grid[i][j + 1].number++;
          if (grid[i + 1] && grid[i + 1][j - 1]) grid[i + 1][j - 1].number++;
          if (grid[i + 1] && grid[i + 1][j]) grid[i + 1][j].number++;
          if (grid[i + 1] && grid[i + 1][j + 1]) grid[i + 1][j + 1].number++;
        }
      }
    }

    return grid;
  }

  private static generateMineCoordinates(
    width: number,
    height: number
  ): { x: number; y: number } {
    const mineX = Math.floor(Math.random() * width);
    const mineY = Math.floor(Math.random() * height);

    return { x: mineX, y: mineY };
  }
}
