export type MinefieldTileCoordinates = {
  x: number;
  y: number;
};

export type MinefieldTile = {
  isRevealed: boolean;
  isMined: boolean;
  isFlagged: boolean;
  number: number;
} & MinefieldTileCoordinates;

export type MinefieldGrid = MinefieldTile[][];

export const createMinefieldGrid = (
  width: number,
  height: number,
  mineCount: number
): MinefieldGrid => {
  const grid = createEmptyGrid(width, height);
  return placeMinesOnGrid(grid, mineCount);
};

export const isGameWon = (grid: MinefieldGrid, mineCount: number): boolean => {
  let notRevealedTilesCount = 0;

  for (const row of grid) {
    for (const tile of row) {
      if (!tile.isRevealed) {
        notRevealedTilesCount++;
      }
    }
  }

  return notRevealedTilesCount === mineCount ? true : false;
};

export const flagMinedTiles = (grid: MinefieldGrid): MinefieldGrid => {
  return grid.map((row) =>
    row.map((cell) => {
      if (cell.isMined) cell.isFlagged = true;
      return cell;
    })
  );
};

export const revealAdjacentTilesRecursive = (
  grid: MinefieldGrid,
  x: number,
  y: number
): MinefieldGrid => {
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
            revealAdjacentTilesRecursive(grid, x + j, y + i);
          }
        }
      }
    }
  }

  return grid;
};

export const createEmptyGrid = (
  width: number,
  height: number
): MinefieldGrid => {
  const grid: MinefieldGrid = [];

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
};

export const placeMinesOnGrid = (
  grid: MinefieldGrid,
  mineCount: number
): MinefieldGrid => {
  const mines = [];

  outer: for (let i = 0; i < mineCount; i++) {
    const mineCoordinates = generateMineCoordinates(
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
};

export const generateMineCoordinates = (
  width: number,
  height: number
): { x: number; y: number } => {
  const mineX = Math.floor(Math.random() * width);
  const mineY = Math.floor(Math.random() * height);

  return { x: mineX, y: mineY };
};
