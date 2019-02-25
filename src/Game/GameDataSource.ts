import * as Rx from "rxjs";

const CONFIG = {
  X: 4,
  Y: 4
};

export const CELL_STATE = {
  GAP: "GAP", // 16
  LOCKED: "LOCKED", //cannot move
  NONE: "NONE", // initial
  IDLE: "IDLE", // can move
  TAKEN: "TAKEN" // mark as checked
};

export class GameDataSource {
  static getInstance() {
    if (!this.instance) {
      this.instance = new GameDataSource();
      // ... any one time initialization goes here ...
    }
    return this.instance;
  }
  protected static instance: GameDataSource;
  public obsData;
  private _state;

  private constructor() {
    this.obsData = new Rx.ReplaySubject(1);
    window["gameDataSource"] = this;
    this._state = this.generateMatrix();
    this.mutateMatrix();
  }
  getStream() {
    return this.obsData;
  }

  generateMatrix(hor = 4, ver = 4) {
    const shuffled = shuffle(
      Array.apply(null, { length: hor * ver }).map((value, index) => {
        return index + 1;
      })
    );
    const matrix = [[], [], [], []];
    for (let i = 0; i < hor; i++) {
      for (let j = 0; j < ver; j++) {
        matrix[i][j] = { num: shuffled.pop(), i, j, state: CELL_STATE.NONE };
      }
    }
    return matrix;
  }

  findCellByNumber(num) {
    for (let i = 0; i < CONFIG.X; i++) {
      for (let j = 0; j < CONFIG.Y; j++) {
        if (this._state[i][j].num === num) {
          return {
            ...this._state[i][j],
            num,
            i,
            j
          };
        }
      }
    }
  }

  applyMove(num) {
    const idle = this.findCellByNumber(16);
    const target = this.findCellByNumber(num);
    console.log("moving", target, "to", idle);

    const targetI = target.i;
    const targetJ = target.j;
    const idleI = idle.i;
    const idleJ = idle.j;
    if (idleI > targetI) {
      for (let i = idleI; i > targetI; i--) {
        this.swapIndicies(i, idleJ, i - 1, idleJ);
      }
    } else if (idleI < targetI) {
      for (let i = idleI; i < targetI; i++) {
        this.swapIndicies(i, idleJ, i + 1, idleJ);
      }
    } else if (idleJ > targetJ) {
      for (let j = idleJ; j > targetJ; j--) {
        this.swapIndicies(idleI, j, idleI, j - 1);
      }
    } else if (idleJ < targetJ) {
      for (let j = idleJ; j < targetJ; j++) {
        this.swapIndicies(idleI, j, idleI, j + 1);
      }
    }
    this.mutateMatrix();
  }

  mutateMatrix() {
    for (let i = 0; i < CONFIG.X; i++) {
      for (let j = 0; j < CONFIG.Y; j++) {
        const curr = this._state[i][j];
        curr.state =
          curr.state === CELL_STATE.TAKEN ? CELL_STATE.IDLE : CELL_STATE.LOCKED;
        if (curr.num === 16) {
          curr.state = CELL_STATE.GAP;
          const changed = false;
          if (j !== 0) {
            let top = j;
            while (top > 0) {
              this._state[i][--top].state = CELL_STATE.IDLE;
            }
            console.log("top");
          }
          if (i !== 0) {
            let left = i;
            while (left > 0) {
              this._state[--left][j].state = CELL_STATE.IDLE;
            }
            console.log("left");
          }
          if (j !== 3) {
            //above
            let bottom = j;
            while (bottom < 3) {
              this._state[i][++bottom].state = CELL_STATE.TAKEN;
            }
            console.log("bottom");
          }
          if (i !== 3) {
            let right = i;
            while (right < 3) {
              this._state[++right][j].state = CELL_STATE.TAKEN;
            }
            console.log("right");
          }
        }
      }
    }
    this._invalidate();
  }

  swapIndicies(ai, aj, bi, bj) {
    const a = this._state[ai][aj];
    const b = this._state[bi][bj];
    this.swapTiles(a, b);
  }

  swapTiles(a, b) {
    this._state[a.i][a.j] = {
      ...b,
      i: a.i,
      j: a.j
    };
    this._state[b.i][b.j] = {
      ...a,
      i: b.i,
      j: b.j
    };
  }

  private _invalidate() {
    this.obsData.next(this._state);
  }
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export let gameDataSource = GameDataSource.getInstance();
