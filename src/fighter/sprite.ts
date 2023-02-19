import Game from '../game/game';
import { FighterData } from '../types';
import Fighter from './fighter';

type spriteType = { img: HTMLImageElement; frameCount: number };
type spritesType = Pick<FighterData, 'sprites'>;

export default class Sprite {
  fighter: Fighter;
  game: Game;
  sprites: spritesType;
  currSprite: spriteType;
  frames: { max: number; value: number; elapsed: number };
  constructor(figther: Fighter, fighterData: FighterData, game: Game) {
    this.fighter = figther;
    this.game = game;
    this.sprites = fighterData;
    this.currSprite =
      this.fighter.playerNum === 0
        ? this.sprites.sprites.idle.left
        : this.sprites.sprites.idle.right;
    this.frames = {
      max: this.currSprite.frameCount,
      value: 0,
      elapsed: 0,
    };
  }

  updateSprite() {
    if (this.fighter.isDucking) {
      if (this.fighter.isBlocking) {
        //must be ducking and blocking
        this.currSprite = this.fighter.isOnLeft
          ? this.sprites.sprites.block.left.low
          : this.sprites.sprites.block.right.low;
      } else if (this.fighter.isAttacking) {
        //low attack
        console.log('low attack');
        this.currSprite = this.fighter.isOnLeft
          ? this.sprites.sprites.fist.left.low
          : this.sprites.sprites.fist.right.low;
      } else {
        //just ducking
        this.currSprite = this.fighter.isOnLeft
          ? this.sprites.sprites.duck.left
          : this.sprites.sprites.duck.right;
      }
    } else {
      if (this.fighter.isBlocking) {
        //just blocking
        this.currSprite = this.fighter.isOnLeft
          ? this.sprites.sprites.block.left.stand
          : this.sprites.sprites.block.right.stand;
      } else if (this.fighter.isAttacking) {
        this.currSprite = this.fighter.isOnLeft
          ? this.sprites.sprites.fist.left.stand
          : this.sprites.sprites.fist.right.stand;
      } else {
        //just standing
        this.currSprite = this.fighter.isOnLeft
          ? this.sprites.sprites.idle.left
          : this.sprites.sprites.idle.right;
      }
    }
  }

  animate() {
    this.updateSprite();
    const { ctx } = this.game;

    if (this.currSprite.frameCount > 1) {
      let diff = -120;

      if (this.fighter.isAttacking) diff += -30;
      if (this.fighter.isDucking) diff += -30;
      ctx.drawImage(
        this.currSprite.img,
        180 * this.frames.value,
        0,
        this.currSprite.img.width / this.currSprite.frameCount,
        this.currSprite.img.height,
        this.fighter.pos.x - 50,
        this.fighter.pos.y + diff,
        this.currSprite.img.width / this.currSprite.frameCount,
        this.currSprite.img.height
      );

      if (this.frames.max > 1) {
        this.frames.elapsed++;
      }

      if (this.frames.elapsed % 10 === 0) {
        if (this.frames.value < this.frames.max - 1) this.frames.value++;
        else this.frames.value = 0;
      }
    } else {
      let diff = -120;
      if (this.fighter.isDucking) {
        diff += -90;
      }
      if (this.fighter.isDucking && this.fighter.isBlocking) diff += 30;
      ctx.drawImage(
        this.currSprite.img,
        0,
        0,
        this.currSprite.img.width,
        this.currSprite.img.height,
        this.fighter.pos.x - 50,
        this.fighter.pos.y + diff,
        this.currSprite.img.width,
        this.currSprite.img.height
      );
    }
  }
}
