import { FighterData, FighterMove } from '../types';
import Fighter from './fighter';
import Game from '../game/game';

export default class FighterMoves {
  specials: FighterMove[];
  basic: FighterMove[];
  game: Game;
  fighter: Fighter;
  constructor(fighter: Fighter, game: Game, fighterData: FighterData) {
    this.game = game;
    this.fighter = fighter;
    this.basic = fighterData.fighterMoves.basic;
    this.specials = fighterData.fighterMoves.specials;
  }

  execute(move: FighterMove) {
    this.fighter.isAttacking = true;

    setTimeout(() => {
      this.run(move);
      this.fighter.isAttacking = false;
    }, 200);
  }

  run(move: FighterMove) {
    const ememyIdx = this.game.players.findIndex(
      f => f.playerNum !== this.fighter.playerNum
    );
    const ememy = this.game.players[ememyIdx];

    if (!ememy) return;
    //in range
    if (Math.abs(this.fighter.pos.x - ememy.pos.x) < move.moveData.reach) {
      if (ememy.isBlocking) {
        ememy.health -= move.moveData.blockDamage;
        console.log(ememy.health);
      } else {
        ememy.health -= move.moveData.damage;
        console.log(ememy.health);
      }
    }
  }
}
