import { FighterData } from '../../types';
import { yoyoImgs } from './charectersImgs';
const yoyo: FighterData = {
  fighterName: 'yoyo',
  sprites: {
    idle: {
      left: {
        frameCount: 7,
        img: yoyoImgs.idleL,
      },
      right: {
        frameCount: 7,
        img: yoyoImgs.idleR,
      },
    },
    duck: {
      left: {
        frameCount: 1,
        img: yoyoImgs.duckL,
      },
      right: {
        frameCount: 1,
        img: yoyoImgs.duckR,
      },
    },
    block: {
      left: {
        stand: {
          img: yoyoImgs.blockL,
          frameCount: 1,
        },
        low: {
          img: yoyoImgs.blockLLow,
          frameCount: 1,
        },
      },
      right: {
        stand: {
          img: yoyoImgs.blockR,
          frameCount: 1,
        },
        low: {
          img: yoyoImgs.blockRLow,
          frameCount: 1,
        },
      },
    },
  },
  fighterMoves: {
    basic: [
      {
        MoveInstructions: ['one'],
        moveName: 'Back Hand',
        moveData: {
          moveType: 'high',
          blockDamage: 0.4,
          damage: 2,
          reach: 100,
          blockPushOff: 20,
        },
        frameData: {
          active: 2,
          blockAdv: 0,
          recover: 15,
          startup: 7,
          hitAdv: 7,
        },
      },

      {
        MoveInstructions: ['d', 'one'],
        moveName: 'Low Chop',
        moveData: {
          moveType: 'mid',
          blockDamage: 0.4,
          damage: 2,
          reach: 100,
          blockPushOff: 10,
        },
        frameData: {
          active: 2,
          blockAdv: -3,
          recover: 14,
          startup: 7,
          hitAdv: 15,
        },
      },
      {
        MoveInstructions: ['two'],
        moveName: 'Strong Leg',
        moveData: {
          moveType: 'high',
          blockDamage: 1.4,
          damage: 7,
          reach: 150,
          blockPushOff: 60,
        },
        frameData: {
          active: 3,
          blockAdv: 0,
          recover: 25,
          startup: 15,
          hitAdv: 13,
        },
      },
    ],
    specials: [],
  },
};

export default yoyo;
