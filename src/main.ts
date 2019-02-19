/**
 * Ugly approach use https://www.npmjs.com/package/iocjs instead;
 */

import { AutolayoutAdapter } from "webgladiator";
import { ColyseusAdapter } from "webgladiator";
import { PixiResourceAdapter } from "webgladiator";
import { TimelineMaxAdapter } from "webgladiator";
import { BlueprintBuilder } from "webgladiator";
import { DeviceAdapter } from "webgladiator";
import { Bus } from "webgladiator";
import { PixiAudioAdapter } from "webgladiator";
import { System } from "webgladiator";
import { GameBlueprint } from "./Game/GameBlueprint";

const manifest = {
  device: new DeviceAdapter(),
  event: new Bus(),
  layout: new AutolayoutAdapter(),
  resource: new PixiResourceAdapter(),
  tween: new TimelineMaxAdapter(),
  sound: new PixiAudioAdapter()
};

System.getInstance().inject(manifest);

window.onload = () => {
  BlueprintBuilder.getInstance().createObject(null, GameBlueprint);
};
