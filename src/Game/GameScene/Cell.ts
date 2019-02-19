import * as Rx from "rxjs";
import { Entity } from "webgladiator";
import { GameObjectBuilder } from "webgladiator";
import { System } from "webgladiator";
import { GameDataSource, CELL_STATE } from "../GameDataSource";
import { CellPlayedMessage } from "./CellPlayedMessage";

const ANIM_SPEED = 0.1;
const STATES = {
  UNDONE: "UNDONE",
  ENABLED: "ENABLED",
  DISABLED: "DISABLED",
  LOCKED: "LOCKED",
  PLAYED: "PLAYED"
};

export class Cell extends Entity {
  _i;
  _j;
  num;
  stateMachine;
  fadeTween;
  lockTween;

  get i() {
    return this._i;
  }

  set i(value) {
    //this.x = this.params.shifts.left[value];
    this._i = value;
  }

  get j() {
    return this._j;
  }

  set j(value) {
    //this.y = this.params.shifts.top[value];
    this._j = value;
  }

  initialize() {
    window["cells"] = window["cells"] || [];
    window["cells"].push(this);
    this.i = this.params.i;
    this.j = this.params.j;
    this.num = this.params.num;
    this.left = 0;
    this.top = 0;

    this.fadeTween = System.getInstance()
      .getSystem("tween")
      .create({ paused: true });
  }

  start() {
    this.getNode("text").text = this.num === 16 ? "" : this.num;

    this.y = this.params.shifts.top[this.j];
    this.x = this.params.shifts.top[this.i];
    GameDataSource.getInstance()
      .obsData.takeWhile(() => this.isActive)
      .subscribe(data => {
        const { i, j, num, state } = data
          .flat()
          .find(item => item.num === this.num);

        this.fadeTween
          .to(this, ANIM_SPEED, {
            x: this.params.shifts.left[i],
            y: this.params.shifts.top[j]
          })
          .play();
        this.i = i;
        this.j = j;

        this.interactive = state === CELL_STATE.IDLE;
        this.alpha = state === CELL_STATE.IDLE ? 1 : num === 16 ? 0.1 : 0.7;
      });
  }
  public listenToHIDEvents() {
    super.listenToHIDEvents(true);
    this.registerHIDEvent("pointertap").subscribe(value => {
      this.sendEvent(new CellPlayedMessage(this, this.num));
    });
  }
}

GameObjectBuilder.getInstance().registerGameObject("Cell", Cell);
