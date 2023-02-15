import yoyoIdleR from '../../../assets/yoyo/idleR.png';
import yoyoIdleL from '../../../assets/yoyo/idleL.png';
import yoyoBlockR from '../../../assets/yoyo/blockR.png';
import yoyoBlockL from '../../../assets/yoyo/blockL.png';
import yoyoBlockLLow from '../../../assets/yoyo/blockL-low.png';
import yoyoBlockRLow from '../../../assets/yoyo/blockR-low.png';
import yoyoDuckR from '../../../assets/yoyo/duckR.png';
import yoyoDuckL from '../../../assets/yoyo/duckL.png';

export const yoyoImgs = {
  idleL: new Image(),
  idleR: new Image(),
  blockR: new Image(),
  blockL: new Image(),
  blockRLow: new Image(),
  blockLLow: new Image(),
  duckL: new Image(),
  duckR: new Image(),
};

//src for the imgase
yoyoImgs.idleR.src = yoyoIdleR;
yoyoImgs.idleL.src = yoyoIdleL;
yoyoImgs.blockL.src = yoyoBlockL;
yoyoImgs.blockLLow.src = yoyoBlockLLow;
yoyoImgs.blockR.src = yoyoBlockR;
yoyoImgs.blockR.src = yoyoBlockRLow;
yoyoImgs.duckL.src = yoyoDuckL;
yoyoImgs.duckR.src = yoyoDuckR;
