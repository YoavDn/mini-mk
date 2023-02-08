//assets
import backgroundImg from '../../imgs/background.png';

import Fighter from '../fighter';
import Sence from './sence';
import Fighter1 from '../fighter/player1';
import Fighter2 from '../fighter/player2';
import GameLoop from './gameLoop';

interface IGame {
  ctx: CanvasRenderingContext2D;
}
export default class Game {
  ctx: CanvasRenderingContext2D;
  h: number;
  w: number;
  gameLoop: GameLoop;
  sence: Sence;
  isPause: boolean;
  players: Fighter[];

  constructor({ ctx }: IGame) {
    this.ctx = ctx;
    this.ctx.canvas.width = this.w = 900;
    this.ctx.canvas.height = this.h = 600;
    this.isPause = false;
    this.players = [];
    this.sence = new Sence({
      width: this.w,
      height: this.h,
      game: this,
      imgSrc: backgroundImg,
    });

    //adding Fighters manually
    this.addPlayers();

    this.gameLoop = new GameLoop({ ctx, game: this });
  }

  addPlayers() {
    const player1 = new Fighter1(this);
    const player2 = new Fighter2(this);
    this.players.push(player1, player2);
  }

  toggle() {
    this.isPause = !this.isPause;
  }

  start() {
    console.log('game start');
  }
}
