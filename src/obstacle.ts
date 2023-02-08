import { TCoordinates } from './types';

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
}
