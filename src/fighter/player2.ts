import Fighter from '.';
import controls from '../controls';
import Game from '../game';
import { GRAVITY, GROUND_LEVEL } from '../utils';

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
    this.color = 'yellow';
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

    this.moveLeft(this.keys.a.pressed, this.keys.s.pressed, 'KeyA');
    this.moveRight(this.keys.d.pressed, this.keys.s.pressed, 'KeyD');

    if (!this.keys.w.pressed) this.duck(this.keys.s.pressed);

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
