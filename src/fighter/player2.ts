import Fighter from '.';
import controls from '../controls';
import Game from '../game';
import { GRAVITY } from '../utils';

interface IKeys {
  a: {
    pressed: boolean;
  };
  d: {
    pressed: boolean;
  };
  s: {
    pressed: boolean;
  };
  w: {
    pressed: boolean;
  };
}

export default class Fighter1 extends Fighter {
  keys: IKeys; //for now
  constructor(game: Game) {
    super({ playerNum: 1, game, name: 'Yoav' });
    this.keys = {
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
      w: {
        pressed: false,
      },
    };

    this.startPos();
    this.regeisterControls();
  }

  startPos() {
    const btm = this.ctx.canvas.height;
    const { width: charW, height: charH } = this.hitbox;
    const xPos = this.ctx.canvas.width / 2 + charW * 2;
    const yPos = btm - charH;
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
              this.keys.a.pressed = true;
              this.lastKey = player2[action];

              break;
            case 'right':
              if (this.inAir()) break;
              this.keys.d.pressed = true;
              this.lastKey = player2[action];

              break;
            case 'down':
              this.keys.s.pressed = true;
              this.lastKey = player2[action];

              break;
            case 'up':
              if (this.inAir()) break;
              // if (this.pos.y < this.ctx.canvas.height - this.hitbox.height)

              this.keys.w.pressed = true;
              this.velocity.y = -22;
              break;
          }
        }
      });

      document.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.code === player2[action]) {
          switch (action) {
            case 'left':
              this.keys.a.pressed = false;
              break;
            case 'right':
              this.keys.d.pressed = false;

              break;
            case 'down':
              this.keys.s.pressed = false;

              break;
            case 'up':
              this.keys.w.pressed = false;

              break;
          }
        }
      });
    });
  }

  update(): void {
    if (!this.inAir()) this.velocity.x = 0;
    if (
      this.keys.a.pressed &&
      this.lastKey === 'KeyA' &&
      !this.keys.s.pressed
    ) {
      this.velocity.x = -5;
    } else if (
      this.keys.d.pressed &&
      this.lastKey === 'KeyD' &&
      !this.keys.s.pressed
    ) {
      this.velocity.x = 5;
    }

    if (!this.keys.w.pressed) this.duck(this.keys.s.pressed);

    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    if (this.pos.y >= this.ctx.canvas.height - this.hitbox.height) {
      this.velocity.y = 0;
    } else this.velocity.y += GRAVITY;
  }
}
