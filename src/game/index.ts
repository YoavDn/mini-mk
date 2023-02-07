import Character from '../character';
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
  players: Character[];

  constructor({ ctx }: IGame) {
    this.ctx = ctx;
    this.ctx.canvas.width = this.w = 900;
    this.ctx.canvas.height = this.h = 600;
    this.isPause = false;
    this.players = [];

    //adding characters manually
    this.addPlayers();

    this.gameLoop = new GameLoop({ ctx, game: this });
  }

  addPlayers() {
    const player1 = new Character({ game: this, name: 'Yoav', playerNum: 0 });
    const player2 = new Character({ game: this, name: 'Aviv', playerNum: 1 });
    this.players.push(player1, player2);
  }

  toggle() {
    this.isPause = !this.isPause;
  }

  start() {
    console.log('game start');
  }
}
