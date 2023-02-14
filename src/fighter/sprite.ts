import Game from '../game/game';
import { FighterData } from '../types';
import Fighter from './fighter';

type spriteType = { img: HTMLImageElement; frameCount: number };
type spritesType = {
  idle: {
    left: spriteType;
    right: spriteType;
  };
};

export default class Sprite {
  fighter: Fighter;
  game: Game;
  sprites: spritesType;
  currSprite: spriteType;
  frames: { max: number; value: number; elapsed: number };
  constructor(figther: Fighter, fighterData: FighterData, game: Game) {
    this.fighter = figther;
    this.game = game;
    this.sprites = fighterData.sprites;
    this.currSprite =
      this.fighter.playerNum === 0
        ? this.sprites.idle.left
        : this.sprites.idle.right;
    this.frames = {
      max: this.currSprite.frameCount,
      value: 0,
      elapsed: 0,
    };
  }

  updateSprite() {
    if (this.fighter.isOnLeft) {
      this.currSprite = this.sprites.idle.left;
    } else {
      this.currSprite = this.sprites.idle.right;
    }
  }

  animate() {
    this.updateSprite();
    const { ctx } = this.game;

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
  }
}
