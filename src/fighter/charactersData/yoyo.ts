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
          blockPushOff: 5,
        },
        frameData: {
          active: 2,
          blockAdv: 0,
          recover: 15,
          startup: 7,
          hitAdv: 6,
        },
      },
    ],
    specials: [],
  },
};

export default yoyo;
