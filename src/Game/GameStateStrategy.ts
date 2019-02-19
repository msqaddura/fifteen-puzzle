import { Strategy } from "webgladiator";
import { sceneManager } from "webgladiator";
import { netSystem, STATUS } from "webgladiator";
import { System } from "webgladiator";
import { Game } from "./Game";
import { GameDataSource } from "./GameDataSource";

export class GameStateStrategy extends Strategy {
  owner: Game;
  start() {
    console.info("** Loading Started! **");
    System.resource.preload("Resources/resources.json").subscribe({
      next: value => {},
      complete: () => {
        this.owner.create();
        sceneManager.loadScene("GameScene");
      }
    });
  }
}
