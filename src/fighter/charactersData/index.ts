import { FighterData } from '../../types';
import yoyo from './yoyo';

interface CharsData {
  yoyo: FighterData;
  kevin: FighterData;
}
const charactersData: CharsData = {
  yoyo: yoyo,
  kevin: yoyo,
};

export default charactersData;
