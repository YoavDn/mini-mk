import Fighter from '.';
import Game from '../game';
import controls from '../controls';

interface IKeys {
  ArrowLeft: {
    pressed: boolean;
  };
  ArrowRight: {
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
    };
    this.startPos();
    this.regeisterControls();
  }

  startPos() {
    const btm = this.ctx.canvas.height;
    const { width: charW, height: charH } = this.hitbox;
    const xPos = this.ctx.canvas.width / 2 - charW * 3;
    const yPos = btm - charH;
    this.pos = { x: xPos, y: yPos };
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
          }
        }
      });
    });
  }

  update(): void {
    this.velocity.x = 0;
    if (this.keys.ArrowLeft.pressed && this.lastKey === 'ArrowLeft') {
      this.velocity.x = -5;
    } else if (this.keys.ArrowRight.pressed && this.lastKey === 'ArrowRight') {
      this.velocity.x = 5;
    }
    this.pos.x += this.velocity.x;
  }
}
