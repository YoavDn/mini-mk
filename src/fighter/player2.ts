import Fighter from './fighter';
import controls from '../controls';
import Game from '../game/game';
import { GRAVITY, GROUND_LEVEL } from '../utils';

export default class Fighter1 extends Fighter {
  constructor(game: Game, name: 'yoyo' | 'kevin') {
    super({ playerNum: 1, game, name });

    this.color = 'blue';
    this.startPos();
    this.regeisterControls();
    this.obstacle.pos = this.pos;
  }

  startPos() {
    const btm = this.ctx.canvas.height;
    const { width: charW, height: charH } = this.hitbox;
    const xPos = this.ctx.canvas.width / 2 + charW * 2;
    const yPos = btm - charH - GROUND_LEVEL;
    this.pos = { x: xPos, y: yPos };
  }

  regeisterControls() {
    const { player2 } = controls;
    Object.keys(player2).forEach(action => {
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.code === player2[action] && e.repeat === false) {
          switch (action) {
            case 'left':
              if (this.inAir()) break;
              this.keys.l.pressed = true;
              this.lastKey = player2[action];

              break;
            case 'right':
              if (this.inAir()) break;
              this.keys.r.pressed = true;
              this.lastKey = player2[action];

              break;
            case 'down':
              this.keys.d.pressed = true;
              this.lastKey = player2[action];

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
          }
        }
      });

      document.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.code === player2[action]) {
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
          }
        }
      });
    });
  }

  update(): void {
    if (!this.inAir()) this.velocity.x = 0;
    this.block(this.keys.b.pressed);

    this.moveLeft(this.keys.l.pressed, this.keys.d.pressed, 'KeyA');
    this.moveRight(this.keys.r.pressed, this.keys.d.pressed, 'KeyD');

    if (!this.keys.u.pressed) this.duck(this.keys.d.pressed);

    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    if (
      this.pos.y >=
      this.ctx.canvas.height - GROUND_LEVEL - this.hitbox.height
    ) {
      this.velocity.y = 0;
    } else this.velocity.y += GRAVITY;
  }
}
