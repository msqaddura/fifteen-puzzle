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
    this._state[idle.i][idle.j] = { ...target, i: idle.i, j: idle.j };
    this._state[target.i][target.j] = { ...idle, i: target.i, j: target.j };
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
            this._state[i][j - 1].state = CELL_STATE.IDLE;
            console.log("top");
          }
          if (i !== 0) {
            this._state[i - 1][j].state = CELL_STATE.IDLE;
            console.log("left");
          }
          if (j !== 3) {
            //above
            this._state[i][j + 1].state = CELL_STATE.TAKEN;
            console.log("bottom");
          }
          if (i !== 3) {
            this._state[i + 1][j].state = CELL_STATE.TAKEN;
            console.log("right");
          }
        }
      }
    }
    this._invalidate();
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
