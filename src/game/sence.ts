import Game from '.';

interface ISence {
  game: Game;
  width: number;
  height: number;
  imgSrc: string;
}

export default class Sence {
  game: Game;
  width: number;
  background: HTMLImageElement;
  height: number;
  imgSrc!: string;
  constructor({ width, height, game, imgSrc }: ISence) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.background = new Image();
    this.background.src = imgSrc;
  }

  draw() {
    const { ctx } = this.game;

    ctx.drawImage(
      this.background,
      0,
      0,
      this.background.width,
      this.background.height,
      0,
      0,
      this.width,
      this.height
    );
  }
}
