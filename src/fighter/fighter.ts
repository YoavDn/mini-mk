import Game from '../game/game';
import charactersData from './charactersData';
import type { TCoordinates, THitBox, MoveInstructions } from '../types';
import FighterMoves from './fighterMoves';
import { GROUND_LEVEL } from '../utils';
import Obstacle from '../obstacle';
import { IKeys } from '../types';
export interface ICharacter {
  game: Game;
  name: 'yoyo' | 'kevin';
  playerNum: 1 | 0;
}

export default class Fighter {
  playerNum: 0 | 1;
  color?: string;
  keys: IKeys;
  ctx: CanvasRenderingContext2D;
  obstacle: Obstacle;
  name: 'yoyo' | 'kevin';
  game: Game;
  fighterMoves: FighterMoves;
  pos: TCoordinates;
  lastKey?: string;
  hitbox: THitBox;
  health: number;
  isBlocking: boolean;
  velocity: {
    x: number;
    y: number;
  };
  moveStack: MoveInstructions;

  constructor({ game, name, playerNum }: ICharacter) {
    this.pos = { x: 0, y: 0 };
    this.playerNum = playerNum;
    this.game = game;
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
    this.moveStack = [];
    this.fighterMoves = new FighterMoves(charactersData[this.name]);

    this.keys = {
      l: {
        pressed: false,
      },
      r: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
      u: {
        pressed: false,
      },
      b: {
        pressed: false,
      },
      a: {
        pressed: false,
      },
    };
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
    if (this.isBlocking) return;
    if (leftKeyPressed && this.lastKey === lastKey && !downKeyPressed) {
      this.velocity.x = -5;
    }
  }

  moveRight(
    rightKeyPressed: boolean,
    downKeyPressed: boolean,
    lastKey: string
  ) {
    if (this.isBlocking) return;
    if (rightKeyPressed && this.lastKey === lastKey && !downKeyPressed) {
      this.velocity.x = 5;
    }
  }

  block(isBlockBtnPressed: boolean) {
    if (this.inAir()) return;
    this.isBlocking = isBlockBtnPressed ? true : false;
  }

  //   executeMoves() {
  //     if(!this.keys?.ArrowLeft.pressed && this.keys.arr)
  //   }

  update() {
    //
  }

  draw() {
    const { width: charW, height: charH } = this.hitbox;

    const { x, y } = this.pos;
    this.obstacle.borderCollide();
    this.obstacle.fightersCollide();

    this.ctx.lineWidth = 2;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color ?? 'red';
    this.ctx.strokeStyle = this.isBlocking ? 'white' : 'gray';
    this.ctx.fillRect(x, y, charW, charH);
    this.ctx.rect(x, y, charW, charH);
    this.ctx.stroke();
    // for debug
    // this.ctx.moveTo(w / 2, 0);
    // this.ctx.lineTo(w / 2, h);
    // this.ctx.strokeStyle = 'white';
    // this.ctx.stroke();
  }
}