import Fighter from '.';
import Game from '../game';
import controls from '../controls';

const GRAVITY = 0.7;

interface IKeys {
  ArrowLeft: {
    pressed: boolean;
  };
  ArrowRight: {
    pressed: boolean;
  };
  ArrowDown: {
    pressed: boolean;
  };
  ArrowUp: {
    pressed: boolean;
  };
}

export default class Fighter1 extends Fighter {
  keys: IKeys;

  constructor(game: Game) {
    super({ playerNum: 0, game, name: 'Yoav' });
    this.keys = {
      ArrowLeft: {
        pressed: false,
      },
      ArrowRight: {
        pressed: false,
      },
      ArrowDown: {
        pressed: false,
      },
      ArrowUp: {
        pressed: false,
      },
    };
    this.startPos();
    this.regeisterControls();
  }

  startPos() {
    const btm = this.ctx.canvas.height;
    const { width: charW, height: charH } = this.hitbox;
    const xPos = this.ctx.canvas.width / 2 - charW * 3;
    const yPos = btm - charH;
    this.pos = { x: xPos, y: 300 };
  }

  regeisterControls() {
    const { player1 } = controls;
    Object.keys(player1).forEach(action => {
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.code === player1[action] && e.repeat === false) {
          switch (action) {
            case 'left':
              this.keys.ArrowLeft.pressed = true;
              this.lastKey = player1[action];

              break;
            case 'right':
              this.keys.ArrowRight.pressed = true;
              this.lastKey = player1[action];

              break;

            case 'down':
              this.keys.ArrowDown.pressed = true;
              this.lastKey = player1[action];
              break;

            case 'up':
              this.keys.ArrowUp.pressed = true;
              this.velocity.y = -20;
              break;
          }
        }
      });

      document.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.code === player1[action]) {
          switch (action) {
            case 'left':
              this.keys.ArrowLeft.pressed = false;

              break;
            case 'right':
              this.keys.ArrowRight.pressed = false;

              break;
            case 'down':
              this.keys.ArrowDown.pressed = false;

              break;
            case 'up':
              this.keys.ArrowUp.pressed = false;

              break;
          }
        }
      });
    });
  }

  update(): void {
    this.velocity.x = 0;
    if (
      this.keys.ArrowLeft.pressed &&
      this.lastKey === 'ArrowLeft' &&
      !this.keys.ArrowDown.pressed
    ) {
      this.velocity.x = -5;
    } else if (
      this.keys.ArrowRight.pressed &&
      this.lastKey === 'ArrowRight' &&
      !this.keys.ArrowDown.pressed
    ) {
      this.velocity.x = 5;
    }
    // if (!this.keys.ArrowUp.pressed) this.duck(this.keys.ArrowDown.pressed);

    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    if (this.pos.y > this.ctx.canvas.height - this.hitbox.height) {
      this.velocity.y = 0;
      console.log('hello');
    } else this.velocity.y += GRAVITY;
  }
}
