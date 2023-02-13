import { FighterData } from '../../types';
const yoyo: FighterData = {
  fighterName: 'yoyo',
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
          hitAdv: 30,
        },
      },
      {
        MoveInstructions: ['d', 'one'],
        moveName: 'Low Chop',
        moveData: {
          moveType: 'mid',
          blockDamage: 0.4,
          damage: 2,
          reach: 80,
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
    ],
    specials: [],
  },
};

export default yoyo;
