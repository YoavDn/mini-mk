import Fighter from '../fighter';
import Game from '../game';

export default class PlayersHealthBar {
  game: Game;
  playersHealth: [number, number];

  constructor(game: Game) {
    this.game = game;
    this.playersHealth = [game.players[0].health, game.players[1].health];
  }

  draw() {
    const [p1H, p2H] = this.playersHealth;
    const { ctx } = this.game;
    const { width, height } = this.game.ctx.canvas;

    ctx.beginPath();

    ctx.fillStyle = 'white';
    ctx.fillRect(20, 20, p1H * 4, 20);
    ctx.fillRect(width - 20 - 400, 20, p1H * 4, 20);
  }
}
