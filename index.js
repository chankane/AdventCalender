//const ARGS = [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1];
const ARGS = [0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0];
const SIZE = 3;

var size;
var field;
var isSolved = false;
var ans = ['No answer...'];
var max = 0;

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
  if (max < depth) {
    max = depth;
  }

  if (depth >= size * size * size) {
    isSolved = true;
    ans = [];
    return;
  }

  if (field[pos.z][pos.y][pos.x]) {
    return;
  }

  field[pos.z][pos.y][pos.z] = 1;

  if (args[depth]) {
    for (e of dir.generateDirOfRightAngle()) {
      solve(depth + 1, Verctor3.add(pos, e), e);
      if (isSolved) {
        ans.unshift(dir.toString());
        return;
      }
    }
  } else {
    solve(depth + 1, Verctor3.add(pos, dir), dir);
  }

  field[pos.z][pos.y][pos.z] = 0;
}

function main() {
  //let args = document.getElementById('args').value.split(',');
  size = SIZE;
  args = ARGS;
  initField();
  console.log(field);
  solve(0, new Verctor3(0, 0, 0), new Verctor3(1, 0, 0));
  console.log(max);
  console.log(ans);
  showAns();
}

function showAns() {
  document.getElementById('answer').innerText = ans.join('\n');
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
    const inv = new Verctor3(-this.x, -this.y, -this.z);

    let all = [
      new Verctor3(1, 0, 0),
      new Verctor3(-1, 0, 0),
      new Verctor3(0, 1, 0),
      new Verctor3(0, -1, 0),
      new Verctor3(0, 0, 1),
      new Verctor3(0, 0, -1),
    ];

    return all.filter(e => !e.equals(this) && !e.equals(inv));
  }

  equals(v) {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  }

  toString() {
    if (this.equals(new Verctor3(1, 0, 0))) {
      return 'Right';
    } else if (this.equals(new Verctor3(-1, 0, 0))) {
      return 'Left';
    } else if (this.equals(new Verctor3(0, 1, 0))) {
      return 'Up';
    } else if (this.equals(new Verctor3(0, -1, 0))) {
      return 'Down';
    } else if (this.equals(new Verctor3(0, 0, 1))) {
      return 'Back';
    } else if (this.equals(new Verctor3(0, 0, -1))) {
      return 'Forward';
    }
  }
}