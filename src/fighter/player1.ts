import Fighter from './fighter';
import Game from '../game/game';

import controls from '../controls';

import { GRAVITY, GROUND_LEVEL } from '../utils';

export default class Fighter1 extends Fighter {
  constructor(game: Game, name: 'yoyo' | 'kevin') {
    super({ playerNum: 0, game, name: name });
    this.startPos();
    this.color = 'red';
    this.regeisterControls();
    this.obstacle.pos = this.pos;
  }

  startPos() {
    const btm = this.ctx.canvas.height;
    const { width: charW, height: charH } = this.hitbox;
    const xPos = this.ctx.canvas.width / 2 - charW * 3;
    const yPos = btm - charH - GROUND_LEVEL;
    this.pos = { x: xPos, y: yPos };
  }

  regeisterControls() {
    const { player1 } = controls;
    Object.keys(player1).forEach(action => {
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.code === player1[action] && e.repeat === false) {
          switch (action) {
            case 'left':
              if (this.inAir()) break;

              this.keys.l.pressed = true;
              this.lastKey = player1[action];

              break;
            case 'right':
              if (this.inAir()) break;
              this.keys.r.pressed = true;
              this.lastKey = player1[action];

              break;

            case 'down':
              this.keys.d.pressed = true;
              this.lastKey = player1[action];
              if (this.isOnLeft) this.sprite.change('duckL');
              else this.sprite.change('duckR');
              break;

            case 'up':
              if (this.inAir()) break;
              this.keys.u.pressed = true;
              this.velocity.y = -22;
              break;
            case 'block':
              if (this.inAir()) break;
              this.keys.b.pressed = true;
              break;
            case 'one':
              if (this.inAir()) break;
              this.keys.a.pressed = true;
              this.moveStack.push('one');
              break;
            case 'two':
              if (this.inAir()) break;
              this.keys.a2.pressed = true;
              this.moveStack.push('one');
              break;
          }
        }
      });

      document.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.code === player1[action]) {
          switch (action) {
            case 'left':
              this.keys.l.pressed = false;
              break;
            case 'right':
              this.keys.r.pressed = false;
              break;
            case 'down':
              this.keys.d.pressed = false;
              break;
            case 'up':
              this.keys.u.pressed = false;
              break;
            case 'block':
              this.keys.b.pressed = false;
              break;
            case 'one':
              this.keys.a.pressed = false;
              break;
            case 'two':
              this.keys.a2.pressed = false;
              break;
          }
        }
      });
    });
  }
}
