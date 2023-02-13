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
    }, 16 * move.frameData.startup);
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
        ememy.isHit = true;
        if (move.moveData.moveType === 'low' && !ememy.isDucking) {
          ememy.health -= move.moveData.damage;
        } else {
          ememy.health -= move.moveData.blockDamage;

          //block posh off
          if (ememy.pos.x > this.fighter.pos.x)
            ememy.pos.x += move.moveData.blockPushOff;
          else ememy.pos.x -= move.moveData.blockPushOff;
        }

        setTimeout(() => {
          ememy.isHit = false;
        }, Math.abs(16 * move.frameData.blockAdv));
      } else {
        if (
          (move.moveData.moveType === 'high' && !ememy.isDucking) ||
          move.moveData.moveType === 'mid'
        ) {
          ememy.isHit = true;
          ememy.health -= move.moveData.damage;

          setTimeout(() => {
            ememy.isHit = false;
          }, 16 * move.frameData.hitAdv);
        }
      }
    }

    //player recover
    setTimeout(() => {
      this.fighter.isAttacking = false;
    }, Math.abs(16 * move.frameData.recover));
  }
}
