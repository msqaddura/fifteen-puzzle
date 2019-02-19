export const NAME = "CellPlayedMessage";
export class CellPlayedMessage {
  static uName = NAME;
  name = NAME;
  constructor(public readonly dispatcher, public readonly num) {}
}
