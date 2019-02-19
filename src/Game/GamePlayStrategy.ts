import { Application } from "webgladiator";
import { Strategy } from "webgladiator";
import { System } from "webgladiator";
import { Game } from "./Game";
import { GameDataSource } from "./GameDataSource";
import { CellPlayedMessage } from "./GameScene/CellPlayedMessage";

export class GamePlayStrategy extends Strategy {
  netSystem;
  playerId;
  owner: Game;
  execute() {}
  listenToBusEvents() {
    super.listenToBusEvents();
    this.registerEvent(CellPlayedMessage).subscribe(message => {
      GameDataSource.getInstance().applyMove(message.num);
    });
  }
}
