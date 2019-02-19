export const GameLayout = `
HV:|[Game]|
V:[Game:[Header(40)][Content][Footer(40)]]
H:|[Header,Content,Footer]|
C:GameScene.width(GameScene.height).centerY(Content).bottom(<=Footer.top-5).top(>=Header.bottom+5).centerX(Content)
Z:|[Game][ChalkWay][Chalk][GameScene]|
`;
