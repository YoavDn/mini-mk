interface IGameLoop {
  ctx: CanvasRenderingContext2D;
}
export default class GameLoop {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;

  constructor({ ctx }: IGameLoop) {
    this.ctx = ctx;
    this.w = ctx.canvas.width;
    this.h = ctx.canvas.height;
    this.init();
  }

  private init() {
    window.requestAnimationFrame(() => {
      this.tick();
      this.init();
    });
  }

  private tick() {
    console.log('Hello from tick game loop');

    this.ctx.clearRect(0, 0, this.w, this.h);
  }
}
