import { System } from "webgladiator";
import { Scene } from "webgladiator";
import { GameObjectBuilder } from "webgladiator";
import { Game } from "../Game";

export class GameScene extends Scene {
  blinkTween;
  interval;
  time = 15;
  owner: Game;
  initialize() {}
  start() {}
  listenToBusEvents() {}
  listenToHIDEventsX() {}

  startPending() {}

  deactivate() {}

  kill() {}
}
