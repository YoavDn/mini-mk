import Game from '../game';
import type { TCoordinates, THitBox } from '../types';

interface ICharacter {
  game: Game;
  name: string;
  playerNum: 0 | 1;
}

export default class Character {
  private playerNum: 0 | 1;
  private ctx: CanvasRenderingContext2D;
  private name: string;
  private pos: TCoordinates;
  private hitbox: THitBox;

  constructor({ game, name, playerNum }: ICharacter) {
    this.playerNum = playerNum;
    this.ctx = game.ctx;
    this.name = name; // this will become an extemtion on custom char
    this.hitbox = { width: 60, height: 180 }; //same here is will become custom variables
    this.pos = this.getInitialPos();
  }

  private getInitialPos(): TCoordinates {
    const btm = this.ctx.canvas.height;
    const { width: charW, height: charH } = this.hitbox;
    let xPos: number;
    let yPos = btm - charH;

    if (this.playerNum === 0) {
      xPos = this.ctx.canvas.width / 2 - charW * 3;
      return { x: xPos, y: yPos };
    } else {
      xPos = this.ctx.canvas.width / 2 + charW * 2;
      return { x: xPos, y: yPos };
    }
  }

  private registerControls(): void {
    // TODO: initialzing the player controls
  }

  draw() {
    const { width: charW, height: charH } = this.hitbox;
    const { width: w, height: h } = this.ctx.canvas;
    const { x, y } = this.pos;

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(x, y, charW, charH);
    // for debug
    this.ctx.moveTo(w / 2, 0);
    this.ctx.lineTo(w / 2, h);
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
  }
}
