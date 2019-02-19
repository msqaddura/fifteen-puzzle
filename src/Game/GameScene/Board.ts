import { Entity } from "webgladiator";
import { System } from "webgladiator";
import { GameDataSource } from "../GameDataSource";

export class Board extends Entity {
  toto;
  initialize() {
    this.toto = System.getInstance()
      .getSystem("tween")
      .create({ paused: true });
  }
  start() {
    window["system"] = System;
    window["board"] = this;
    GameDataSource.getInstance().obsData.subscribe(line => {});
  }
  mark(xa, ya, xb, yb, options = {}) {
    System.Graphics.drawLine(this, options, {
      xa,
      ya,
      xb,
      yb,
      color: 0xffffff,
      lineWidth: 20,
      alpha: 0.9
    });
  }
  goTo(i, j) {
    const point = this.getNode("Pointer");
    const { left, top } = this.getNode(`box${i}${j}`);

    this.toto
      .to(point, 0, { alpha: 1, x: 1066 / 2, y: 1072 })
      .to(point, 0.75, { x: left, y: top })
      .to(point, 0.4, { alpha: 0 })
      .play();
  }
}
