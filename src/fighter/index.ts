import controls from '../controls';
import Game from '../game';
import type { TCoordinates, THitBox } from '../types';

export interface ICharacter {
  game: Game;
  name: string;
  playerNum: 1 | 0;
}

export default class Fighter {
  playerNum: 0 | 1;
  ctx: CanvasRenderingContext2D;
  name: string;
  pos: TCoordinates;
  lastKey?: string;
  hitbox: THitBox;
  velocity: {
    x: number;
    y: number;
  };

  constructor({ game, name, playerNum }: ICharacter) {
    this.pos = { x: 0, y: 0 };
    this.playerNum = playerNum;
    this.ctx = game.ctx;
    this.name = name; // this will become an extemtion on custom char
    this.hitbox = { width: 60, height: 180 }; //same here is will become custom variables
    this.velocity = { x: 0, y: 0 };
  }

  //   private registerControls(): void {
  //     // TODO: initialzing the player controls

  //     //controls for player0
  //     Object.keys(controls[0]).forEach(action => {
  //       document.addEventListener('keydown', (e: KeyboardEvent) => {
  //         const isPlayer0 = this.playerNum === 0;
  //         if (e.code === controls[0][action]) {
  //           switch (action) {
  //             case 'left':
  //               if (isPlayer0) {
  //                 this.keys.a.pressed = true;
  //                 this.lastKey = controls[0][action];
  //                 console.log(this.lastKey, this.keys);
  //               }
  //               break;
  //             case 'right':
  //               if (isPlayer0) {
  //                 this.keys.d.pressed = true;
  //                 this.lastKey = controls[0][action];
  //                 console.log(this.keys);
  //               }
  //               break;
  //           }
  //         }
  //       });
  //       document.addEventListener('keyup', (e: KeyboardEvent) => {
  //         const isPlayer0 = this.playerNum === 0;
  //         if (e.code === controls[0][action]) {
  //           switch (action) {
  //             case 'left':
  //               if (isPlayer0) {
  //                 this.keys.a.pressed = false;
  //               }
  //               break;
  //             case 'right':
  //               if (isPlayer0) {
  //                 this.keys.d.pressed = false;
  //               }
  //               break;
  //           }
  //         }
  //       });
  //     });

  //     // controls for player1
  //     Object.keys(controls[1]).forEach(action => {
  //       document.addEventListener('keydown', (e: KeyboardEvent) => {
  //         const isPlayer1 = this.playerNum === 1;
  //         if (e.code === controls[1][action]) {
  //           switch (action) {
  //             case 'left':
  //               if (isPlayer1) {
  //                 this.keys.leftArrow.pressed = true;
  //                 this.lastKey = controls[1][action];
  //               }
  //               break;
  //             case 'right':
  //               if (isPlayer1) {
  //                 this.keys.rightArrow.pressed = true;
  //                 this.lastKey = controls[1][action];
  //               }
  //               break;
  //           }
  //         }
  //       });

  //       document.addEventListener('keyup', (e: KeyboardEvent) => {
  //         const isPlayer1 = this.playerNum === 1;
  //         if (e.code === controls[1][action]) {
  //           switch (action) {
  //             case 'left':
  //               if (isPlayer1) {
  //                 this.keys.leftArrow.pressed = false;
  //               }
  //               break;
  //             case 'right':
  //               if (isPlayer1) {
  //                 this.keys.rightArrow.pressed = false;
  //               }
  //               break;
  //           }
  //         }
  //       });
  //     });
  //   }

  update() {
    this.pos.x += this.velocity.x;
  }

  draw() {
    const { width: charW, height: charH } = this.hitbox;
    const { width: w, height: h } = this.ctx.canvas;
    const { x, y } = this.pos;
    this.update();

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(x, y, charW, charH);
    // for debug
    this.ctx.moveTo(w / 2, 0);
    this.ctx.lineTo(w / 2, h);
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
  }
}
