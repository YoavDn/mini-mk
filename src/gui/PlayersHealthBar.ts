import Fighter from '../fighter/fighter';
import Game from '../game/game';

export default class PlayersHealthBar {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  draw() {
    const { ctx } = this.game;
    const [p1, p2] = this.game.players;
    const { width, height } = this.game.ctx.canvas;

    const p1HealthBar = p1.health > 0 ? -p1.health * 4 : 0;
    const p2HealthBar = p2.health > 0 ? p2.health * 4 : 0;
    ctx.fillStyle = 'green';
    ctx.fillRect(20 + 400, 20, p1HealthBar, 20);
    ctx.fillRect(width - 20 - 400, 20, p2HealthBar, 20);

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.rect(20, 20, 400, 20);
    ctx.rect(width - 20 - 400, 20, 400, 20);
    ctx.stroke();
  }
}
