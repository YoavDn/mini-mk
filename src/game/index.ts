import Player from '../player';
import GameLoop from './gameLoop';

interface IGame {
  ctx: CanvasRenderingContext2D;
}
export default class Game {
  ctx: CanvasRenderingContext2D;
  h: number;
  w: number;
  gameLoop: GameLoop;
  isPause: boolean;
  players: Player[];

  constructor({ ctx }: IGame) {
    this.ctx = ctx;
    this.ctx.canvas.width = this.w = 900;
    this.ctx.canvas.height = this.h = 600;
    this.isPause = false;
    this.players = [];
    this.gameLoop = new GameLoop({ ctx });
  }

  toggle() {
    this.isPause = !this.isPause;
  }

  start() {
    console.log('game start');
  }
}
