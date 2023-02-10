import Game from '../game';
import type { TCoordinates, THitBox } from '../types';
import { GROUND_LEVEL } from '../utils';
import Obstacle from '../obstacle';

export interface ICharacter {
  game: Game;
  name: string;
  playerNum: 1 | 0;
}

export default class Fighter {
  playerNum: 0 | 1;
  ctx: CanvasRenderingContext2D;
  obstacle: Obstacle;
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
    this.obstacle = new Obstacle({
      game,
      pos: this.pos,
      width: this.hitbox.width,
      height: this.hitbox.height,
    });
  }

  duck(isDownPressed: boolean) {
    if (this.velocity.y !== 0) return;
    if (isDownPressed) {
      this.hitbox.height = 90;
    } else {
      this.hitbox.height = 180;
    }
    this.pos.y = this.ctx.canvas.height - this.hitbox.height - GROUND_LEVEL;
  }
  inAir(): boolean {
    return !(
      this.pos.y >=
      this.ctx.canvas.height - GROUND_LEVEL - this.hitbox.height
    );
  }

  moveLeft(leftKeyPressed: boolean, downKeyPressed: boolean, lastKey: string) {
    if (leftKeyPressed && this.lastKey === lastKey && !downKeyPressed) {
      this.velocity.x = -5;
    }
  }

  moveRight(
    rightKeyPressed: boolean,
    downKeyPressed: boolean,
    lastKey: string
  ) {
    if (rightKeyPressed && this.lastKey === lastKey && !downKeyPressed) {
      this.velocity.x = 5;
    }
  }

  draw() {
    const { width: charW, height: charH } = this.hitbox;

    const { x, y } = this.pos;
    this.obstacle.borderCollide();
    this.obstacle.fightersCollide();

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(x, y, charW, charH);
    // for debug
    // this.ctx.moveTo(w / 2, 0);
    // this.ctx.lineTo(w / 2, h);
    // this.ctx.strokeStyle = 'white';
    // this.ctx.stroke();
  }
}
