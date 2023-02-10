import Fighter from '.';
import Game from '../game';
import Obstacle from '../obstacle';
import controls from '../controls';
import { GRAVITY, GROUND_LEVEL } from '../utils';
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
              console.log('left');

              this.keys.ArrowLeft.pressed = true;
              this.lastKey = player1[action];

              break;
            case 'right':
              if (this.inAir()) break;
              this.keys.ArrowRight.pressed = true;
              this.lastKey = player1[action];

              break;

            case 'down':
              this.keys.ArrowDown.pressed = true;
              this.lastKey = player1[action];
              break;

            case 'up':
              if (this.inAir()) break;
              this.keys.ArrowUp.pressed = true;
              this.velocity.y = -22;
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
    if (!this.inAir()) this.velocity.x = 0;

    this.moveLeft(
      this.keys.ArrowLeft.pressed,
      this.keys.ArrowDown.pressed,
      'ArrowLeft'
    );
    this.moveRight(
      this.keys.ArrowRight.pressed,
      this.keys.ArrowDown.pressed,
      'ArrowRight'
    );

    if (!this.keys.ArrowUp.pressed) this.duck(this.keys.ArrowDown.pressed);

    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    //detemining if player on ground
    if (
      this.pos.y >=
      this.ctx.canvas.height - GROUND_LEVEL - this.hitbox.height
    ) {
      this.velocity.y = 0;
    } else this.velocity.y += GRAVITY;
  }
}
