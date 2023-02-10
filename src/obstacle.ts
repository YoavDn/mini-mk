// import { Vector, Box, Circle, Polygon, Collider2d } from 'collider2d';
import Game from './game';
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
}
