// import { Vector, Box, Circle, Polygon, Collider2d } from 'collider2d';
import { TCoordinates, RectType } from './types';

interface IObstacle {
  pos: TCoordinates;
  width: number;
  height: number;
}

export default class Obstacle {
  pos: TCoordinates;
  width: number;
  height: number;
  constructor({ pos, width, height }: IObstacle) {
    this.pos = pos;
    this.width = width;
    this.height = height;
  }

  testCollideWith() {
    // const demoWall: RectType = {
    //   a: { x: -1, y: 0 },
    //   b: { x: 0, y: 0 },
    //   c: { x: -1, y: 600 },
    //   d: { x: 0, y: 600 },
    // };

    if (this.pos.x < 0) return true;
    return false;
  }
}
