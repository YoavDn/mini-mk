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
    // console.log(this.game.players);

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(20 + 400, 20, -p1.health * 4, 20);
    ctx.fillRect(width - 20 - 400, 20, p2.health * 4, 20);
  }
}
