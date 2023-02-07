import Fighter from '.';
import controls from '../controls';
import Game from '../game';

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
              this.keys.a.pressed = true;
              this.lastKey = player2[action];
              console.log(this.lastKey);

              break;
            case 'right':
              this.keys.d.pressed = true;
              this.lastKey = player2[action];

              break;
            case 'down':
              this.keys.s.pressed = true;
              this.lastKey = player2[action];

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
          }
        }
      });
    });
  }

  update(): void {
    this.velocity.x = 0;
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
    if (this.keys.s.pressed) {
      this.hitbox.height = 90;
    } else {
      this.hitbox.height = 180;
    }

    this.pos.x += this.velocity.x;
    this.pos.y = this.ctx.canvas.height - this.hitbox.height;
  }
}
