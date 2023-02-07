import Game from '../game';
import type { TCoordinates, THitBox } from '../types';

interface ICharacter {
  game: Game;
  name: string;
  playerNum: 0 | 1;
}

export default class Character {
  playerNum: 0 | 1;
  ctx: CanvasRenderingContext2D;
  name: string;
  pos: TCoordinates;
  hitbox: THitBox;

  constructor({ game, name, playerNum }: ICharacter) {
    this.playerNum = playerNum;
    this.ctx = game.ctx;
    this.name = name;
    this.hitbox = { width: 60, height: 180 };
    this.pos = this.getInitialPos();
  }

  private getInitialPos(): TCoordinates {
    const btm = this.ctx.canvas.height;
    const { width: charW, height: charH } = this.hitbox;
    let xPos: number;
    let yPos: number;

    if (this.playerNum === 0) {
      //   xPos = this.ctx.canvas.width / 2 - charW * 2 - charW / 2;
      xPos = this.ctx.canvas.width / 2 - charW * 3;
      console.log(btm);
      return { x: xPos, y: btm - charH };
    } else {
      xPos = this.ctx.canvas.width / 2 + charW * 2;
      return { x: xPos, y: btm - charH };
    }
  }

  draw() {
    const { width: charW, height: charH } = this.hitbox;
    const { width: w, height: h } = this.ctx.canvas;
    const { x, y } = this.pos;

    this.ctx.fillStyle = 'red';
    this.ctx.moveTo(w / 2, 0);
    this.ctx.lineTo(w / 2, h);
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
    this.ctx.fillRect(x, y, charW, charH);
  }
}
