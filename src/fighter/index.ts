import Game from '../game';
import type { TCoordinates, THitBox } from '../types';

export interface ICharacter {
  game: Game;
  name: string;
  playerNum: 1 | 0;
}

export default class Fighter {
  playerNum: 0 | 1;
  ctx: CanvasRenderingContext2D;
  name: string;
  pos: TCoordinates;
  lastKey?: string;
  hitbox: THitBox;
  health: number;
  isBlocking: boolean;
  velocity: {
    x: number;
    y: number;
  };

  constructor({ game, name, playerNum }: ICharacter) {
    this.pos = { x: 0, y: 0 };
    this.playerNum = playerNum;
    this.ctx = game.ctx;
    this.name = name; // this will become an extemtion on custom char
    this.hitbox = { width: 60, height: 180 }; //same here is will become custom variables
    this.velocity = { x: 0, y: 0 };
    this.health = 100;
    this.isBlocking = false;
  }

  duck(isDownPressed: boolean) {
    if (isDownPressed) {
      this.hitbox.height = 90;
    } else {
      this.hitbox.height = 180;
    }
    this.pos.y = this.ctx.canvas.height - this.hitbox.height;
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
