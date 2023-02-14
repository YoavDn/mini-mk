import Game from './game';

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

  updatePlayersSides() {
    const [p1, p2] = this.game.players;
    if (p1.pos.x > p2.pos.x) {
      p1.isOnLeft = false;
      p2.isOnLeft = true;
    } else {
      p1.isOnLeft = true;
      p2.isOnLeft = false;
    }
  }

  draw() {
    const { ctx } = this.game;
    this.updatePlayersSides();

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
