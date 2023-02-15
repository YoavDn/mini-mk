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

  change(mode: string) {
    switch (mode) {
      case 'duckR':
        this.currSprite = this.sprites.sprites.duck.right;
        break;
      case 'duckL':
        this.currSprite = this.sprites.sprites.duck.left;
        break;
      case 'blockR':
        this.currSprite = this.sprites.sprites.block.right.stand;
        break;
      case 'blockRLow':
        this.currSprite = this.sprites.sprites.block.right.low;
        break;
      case 'blockL':
        this.currSprite = this.sprites.sprites.block.left.stand;
        break;
      case 'blockLLow':
        this.currSprite = this.sprites.sprites.block.left.low;
    }
  }

  updateSprite() {
    if (
      this.fighter.isOnLeft &&
      !this.fighter.keys.l.pressed &&
      !this.fighter.keys.r.pressed &&
      !this.fighter.keys.d.pressed
    ) {
      this.currSprite = this.sprites.sprites.idle.left;
    } else if (
      !this.fighter.isOnLeft &&
      !this.fighter.keys.l.pressed &&
      !this.fighter.keys.r.pressed &&
      !this.fighter.keys.d.pressed
    ) {
      this.currSprite = this.sprites.sprites.idle.right;
    } else if (
      this.fighter.keys.d &&
      !this.fighter.keys.l.pressed &&
      !this.fighter.keys.r.pressed
    ) {
      this.currSprite = this.fighter.isOnLeft
        ? this.sprites.sprites.duck.left
        : this.sprites.sprites.duck.right;
    }
  }

  animate() {
    this.updateSprite();
    const { ctx } = this.game;

    if (this.currSprite.frameCount > 1) {
      ctx.drawImage(
        this.currSprite.img,
        180 * this.frames.value,
        0,
        this.currSprite.img.width / 7,
        this.currSprite.img.height,
        this.fighter.pos.x - 50,
        this.fighter.pos.y - 120,
        this.currSprite.img.width / 7,
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
      const posY = this.fighter.isDucking
        ? this.fighter.pos.y - 120 - 90
        : this.fighter.pos.y - 120;
      ctx.drawImage(
        this.currSprite.img,
        0,
        0,
        this.currSprite.img.width,
        this.currSprite.img.height,
        this.fighter.pos.x - 50,
        posY,
        this.currSprite.img.width,
        this.currSprite.img.height
      );
    }
  }
}
