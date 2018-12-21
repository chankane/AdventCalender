const ARGS = [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1];
const SIZE = 3;

var size;
var field;
var isSolved = false;
var ans = ['c', 'b'];

function initField() {
  field = [];
  for (let z = -1; z <= size; z++) {
    field[z] = [];
    for (let y = -1; y <= size; y++) {
      field[z][y] = [];
      for (let x = -1; x <= size; x++) {
        field[z][y][x] = 1;
      }
    }
  }
  
  for (let z = 0; z < size; z++) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        field[z][y][x] = 0;
      }
    }
  }
}

function solve(depth, pos, dir) {
  if (isSolved) {
    return;
  }

  if (depth >= size * size * size) {
   showAns();
   isSolved = true;
  }

  if (field[pos.z][pos.y][pos.z]) {
    return;
  }

  if (args[depth]) {
    for (e of dir.generateDirOfRightAngle()) {
      solve(depth + 1, Verctor3.add(pos, e), e);
    }
  } else {
    solve(depth + 1, Verctor3.add(pos, dir), dir);
  }
}

function main() {
  //let args = document.getElementById('args').value.split(',');
  size = SIZE;
  args = ARGS;
  initField();
  console.log(field);
  solve(0, new Verctor3(0, 0, 0), new Verctor3(1, 0, 0));
  document.getElementById('answer').innerText = document.getElementById('args').value;
}

function showAns() {
  document.getElementById('answer').innerText = ans.join(',');
}

class Verctor3 {
  static add(v1, v2) {
    return new Verctor3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  generateDirOfRightAngle() {
    const inv = new Verctor3(this.x, this.y, this.z);
    let ret= [];
    for (let z = -1; z <= 1; z++) {
      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          let tmp = new Verctor3(x, y, z);
          if (!tmp.equals(this) && !tmp.equals(inv)) {
            ret.push(tmp);
          }
        }
      }
    }
    return ret;
  }

  equals(v) {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  }
}