import { Entity } from "webgladiator";
import { BlueprintBuilder } from "webgladiator";
import { Sprite } from "webgladiator";
import { Text } from "webgladiator";
import { TilingSprite } from "webgladiator";
import { Game } from "./Game";
import { GameLayout } from "./GameLayout";
import { GamePlayStrategy } from "./GamePlayStrategy";
import { GameStateStrategy } from "./GameStateStrategy";
import { GameSceneBlueprint } from "./GameScene/GameSceneBlueprint";

// tslint:disable-next-line:variable-name
export const GameBlueprint = {
  name: "Game",
  ctor: Game,
  gameLayout: GameLayout,
  directChildren: ["Background"],
  blueprints: [
    {
      name: "Background",
      ctor: Sprite,
      source: "Resources/bg.jpg",
      lazy: true,
      layout: {
        name: "Content"
      }
    },
    GameSceneBlueprint,
    {
      name: "GameStateStrategy",
      ctor: GameStateStrategy
    },
    {
      name: "GamePlayStrategy",
      ctor: GamePlayStrategy
    }
  ],
  sceneMap: {
    GameScene: GameSceneBlueprint
  }
};
