//assets
import backgroundImg from '../../imgs/background.png';

import Fighter from '../fighter/fighter';
import Sence from './sence';
import Fighter1 from '../fighter/player1';
import Fighter2 from '../fighter/player2';
import GameLoop from './gameLoop';
import Gui from '../gui/gui';

interface IGame {
  ctx: CanvasRenderingContext2D;
}
export default class Game {
  ctx: CanvasRenderingContext2D;
  h: number;
  w: number;
  gameLoop: GameLoop;
  gui: Gui;
  sence: Sence;
  isPause: boolean;
  players: Fighter[];
  frames: number;

  constructor({ ctx }: IGame) {
    this.ctx = ctx;
    this.frames = 0;
    this.ctx.canvas.width = this.w = 1000;
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

    this.gui = new Gui(this);
    this.gameLoop = new GameLoop({ ctx, game: this });
  }

  addPlayers() {
    const player1 = new Fighter1(this, 'yoyo');
    const player2 = new Fighter2(this, 'yoyo');
    this.players.push(player1, player2);
  }

  toggle() {
    this.isPause = !this.isPause;
  }

  start() {
    console.log('game start');
  }
  checkGameOver() {
    if (this.players[1].health < 0 || this.players[0].health < 0) {
      console.log('gameOver');
    }
  }

  ended() {}
}
