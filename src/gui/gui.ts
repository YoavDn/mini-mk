import Game from '../game/game';
import PlayersHealthBar from './PlayersHealthBar';

export default class Gui {
  game: Game;
  playersHealthBar: PlayersHealthBar;
  constructor(game: Game) {
    this.game = game;
    this.playersHealthBar = new PlayersHealthBar(game);
  }

  draw() {
    this.playersHealthBar.draw();
  }
}
