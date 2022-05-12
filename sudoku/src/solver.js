export function solver(grid) {
  if (solved(grid)) {
    return grid;
  } else {
    const possibilities = nextgrids(grid);
    const validgrids = keepOnlyValid(possibilities);
    return searchForSolution(validgrids);
  }
}

export function solved(grid) {
  // checks to see if the given puzzle is solved
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid.length; j++) {
      if (grid[i][j] == null) {
        return false;
      }
    }
  }
  return true;
}

function searchForSolution(grids) {
  // List[grid] -> grid or false
  // finds a valid solution to the sudoku problem
  if (grids.length < 1) {
    return false;
  } else {
    // backtracking search for solution
    var first = grids.shift();
    const tryPath = solver(first);
    if (tryPath !== false) {
      return tryPath;
    } else {
      return searchForSolution(grids);
    }
  }
}

function nextgrids(grid) {
  // grid -> List[grid]
  // finds the first emply square and generates 9 different grids filling in that square with numbers 1...9
  var res = [];
  const firstEmpty = findEmptySquare(grid);
  if (firstEmpty !== undefined) {
    const row = firstEmpty[0];
    const col = firstEmpty[1];
    for (var i = 1; i <= grid.length; i++) {
      var newgrid = [...grid];
      var new_row = [...newgrid[row]];
      new_row[col] = i;
      newgrid[row] = new_row;
      res.push(newgrid);
    }
  }
  return res;
}

function findEmptySquare(grid) {
  for (var row = 0; row < grid.length; row++) {
    for (var col = 0; col < grid.length; col++) {
      if (grid[row][col] == null) {
        return [row, col];
      }
    }
  }
}

function keepOnlyValid(grids) {
  var res = [];
  for (var i = 0; i < grids.length; i++) {
    if (validgrid(grids[i])) {
      res.push(grids[i]);
    }
  }
  return res;
}

function validgrid(grid) {
  return rowsCheck(grid) && columnsCheck(grid) && boxesCheck(grid);
}

function rowsCheck(grid) {
  for (var row = 0; row < grid.length; row++) {
    var cur = [];
    for (var col = 0; col < grid.length; col++) {
      if (cur.includes(grid[row][col])) {
        return false;
      } else if (grid[row][col] != null) {
        cur.push(grid[row][col]);
      }
    }
  }
  return true;
}

function columnsCheck(grid) {
  for (var col = 0; col < grid.length; col++) {
    var cur = [];
    for (var row = 0; row < grid.length; row++) {
      if (cur.includes(grid[row][col])) {
        return false;
      } else if (grid[row][col] != null) {
        cur.push(grid[row][col]);
      }
    }
  }
  return true;
}

function boxesCheck(grid) {
  var factor = Math.floor(Math.sqrt(grid.length))
  for (var row = 0; row < grid.length; row += factor) {
    for (var col = 0; col < grid.length; col += factor) {
      var cur = [];
      for (let i = 0; i < factor; i++) {
        for (let j = 0; j < factor; j++) {
          if (cur.includes(grid[row+i][col+j])) {
            return false;
          } else if (grid[row+i][col+j] != null) {
            cur.push(grid[row+i][col+j])
          }
        }
      }
    }
  }
  return true;
}
