import { Entity } from "webgladiator";
import { Scene } from "webgladiator";
import { AnimatedSprite } from "webgladiator";
import { Sprite } from "webgladiator";
import { Text } from "webgladiator";
import { TilingSprite } from "webgladiator";
import { GameScene } from "./GameScene";

import { Board } from "./Board";
import { Cell } from "./Cell";
// tslint:disable-next-line:variable-name
export const GameSceneBlueprint = {
  name: "GameScene",
  lazy: true,
  ctor: GameScene, // Can as well be Just Scene

  manifest: "Resources/GameSceneManifest.json",
  blueprints: [
    {
      name: "Grid",
      ctor: Board,
      scaleOnly: true,
      width: 500,
      height: 500,
      layout: {
        name: "GameScene"
      },
      config: "",
      blueprints: [],
      repeatableBlueprints: [
        {
          repeats: [
            { name: "box00", j: 0, i: 0, num: 1 },
            { name: "box01", j: 0, i: 1, num: 2 },
            { name: "box02", j: 0, i: 2, num: 3 },
            { name: "box03", j: 0, i: 3, num: 4 },

            { name: "box10", j: 1, i: 0, num: 5 },
            { name: "box11", j: 1, i: 1, num: 6 },
            { name: "box12", j: 1, i: 2, num: 7 },
            { name: "box13", j: 1, i: 3, num: 8 },

            { name: "box20", j: 2, i: 0, num: 9 },
            { name: "box21", j: 2, i: 1, num: 10 },
            { name: "box22", j: 2, i: 2, num: 11 },
            { name: "box23", j: 2, i: 3, num: 12 },

            { name: "box30", j: 3, i: 0, num: 13 },
            { name: "box31", j: 3, i: 1, num: 14 },
            { name: "box32", j: 3, i: 2, num: 15 },
            { name: "box33", j: 3, i: 3, num: 16 }
          ],
          repeatable: {
            name: "repeatable",
            repeatable: true,
            ctor: Cell, // <-- extends Container
            scaleOnly: true,
            accessible: true,
            accessibleTitle: "hey",
            width: 150,
            height: 150,
            shifts: {
              left: [0, 200, 400, 600],
              top: [0, 200, 400, 600]
            },

            blueprints: [
              {
                name: "lock",
                ctor: Sprite,
                source: "Resources/tile.png",
                interactive: true,
                accessible: true,
                accessibleTitle: "hey"
                // "anchorX": 0.5,
                // "anchorY": 0.5,
              },
              {
                name: "text",
                ctor: Text,
                text: "",
                left: 32,
                top: 32,
                anchorX: 0.5,
                anchorY: 0.5
              }
            ]
          }
        }
      ]
    }
  ]
};
