import { FighterData, FighterMove } from '../types';

export default class FighterMoves {
  specials: FighterMove[];
  basic: FighterMove[];
  constructor(fighterData: FighterData) {
    this.basic = fighterData.fighterMoves.basic;
    this.specials = fighterData.fighterMoves.specials;
  }
}
