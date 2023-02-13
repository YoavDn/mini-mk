// import { Vector, Box, Circle, Polygon, Collider2d } from 'collider2d';
import Game from './game/game';
import { TCoordinates, RectType } from './types';

interface IObstacle {
  pos: TCoordinates;
  width: number;
  height: number;
  game: Game;
}

export default class Obstacle {
  pos: TCoordinates;
  width: number;
  height: number;
  game: Game;
  constructor({ pos, width, height, game }: IObstacle) {
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.game = game;
  }

  borderCollide() {
    if (this.pos.x < 0) this.pos.x = 1;
    if (this.pos.x > this.game.ctx.canvas.width - this.width) {
      this.pos.x = this.game.ctx.canvas.width - this.width;
    }
  }

  fightersCollide() {
    const [p1, p2] = this.game.players;

    //player in player
    // rect1.x < rect2.x + rect2.w &&
    //   rect1.x + rect1.w > rect2.x &&
    //   rect1.y < rect2.y + rect2.h &&
    //   rect1.h + rect1.y > rect2.y;
    if (
      p1.pos.x < p2.pos.x + p2.hitbox.width &&
      p1.pos.x + p1.hitbox.width > p2.pos.x &&
      p1.pos.y < p2.pos.y + p2.hitbox.height &&
      p1.hitbox.height + p1.pos.y > p2.pos.y
    ) {
      //player1 in on left
      if (p1.pos.x < p2.pos.x) {
        if (
          (p1.keys.r.pressed && p2.keys.a.pressed) ||
          p1.inAir() ||
          p2.inAir()
        ) {
          const temp = p1.pos.x;
          p1.pos.x = p2.pos.x - p1.hitbox.width;
          p2.pos.x = temp + p1.hitbox.width;
        } else if (
          (p1.keys.r.pressed && !p2.keys.a.pressed) ||
          p1.inAir() ||
          p2.inAir()
        ) {
          //when on border
          if (p2.pos.x + p2.hitbox.width >= this.game.ctx.canvas.width) {
            p1.pos.x = p2.pos.x - p1.hitbox.width;
          } else {
            p2.pos.x = p1.pos.x + p1.hitbox.width;
          }
        } else if (
          (p2.keys.a.pressed && !p1.keys.l.pressed) ||
          p1.inAir() ||
          p2.inAir()
        ) {
          if (p2.pos.x < p2.hitbox.width) {
            p2.pos.x = p2.hitbox.width;
          } else {
            p1.pos.x = p2.pos.x - p1.hitbox.width;
          }
        }
        //player2 in on left
      } else {
        if (
          (p1.keys.l.pressed && p2.keys.d.pressed) ||
          p2.inAir() ||
          p1.inAir()
        ) {
          const temp = p2.pos.x;
          p2.pos.x = p1.pos.x - p2.hitbox.width;
          p1.pos.x = temp + p2.hitbox.width;
        } else if (p1.keys?.l.pressed && !p2.keys?.d.pressed) {
          if (p1.pos.x < p2.hitbox.width) {
            p1.pos.x = p2.hitbox.width;
          } else {
            p2.pos.x = p1.pos.x - p2.hitbox.width;
          }
        } else if (p2.keys?.d.pressed && !p1.keys?.r.pressed) {
          if (p1.pos.x + p1.hitbox.width >= this.game.ctx.canvas.width) {
            p2.pos.x = p1.pos.x - p2.hitbox.width;
          } else {
            p1.pos.x = p2.pos.x + p2.hitbox.width;
          }
        }
      }
    }
  }
}
