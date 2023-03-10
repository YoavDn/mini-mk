import Game from './game';

interface IGameLoop {
  game: Game;
  ctx: CanvasRenderingContext2D;
}
export default class GameLoop {
  game: Game;
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;

  constructor({ ctx, game }: IGameLoop) {
    this.game = game;
    this.ctx = ctx;
    this.w = ctx.canvas.width;
    this.h = ctx.canvas.height;
    this.init();
  }

  private init() {
    if (this.game.isEnded) return;
    window.requestAnimationFrame(() => {
      this.tick();
      this.init();
    });
  }

  private tick() {
    this.game.frames++;
    this.ctx.clearRect(0, 0, this.w, this.h);

    this.game.checkGameOver();

    //draw the background
    this.game.sence.draw();
    // drawing  the gui
    this.game.gui.draw();

    //draw the players
    this.game.players.forEach(p => {
      p.update();
      p.draw();
    });
  }
}
