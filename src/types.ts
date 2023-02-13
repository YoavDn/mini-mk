export type TCoordinates = {
  x: number;
  y: number;
};
export type THitBox = {
  width: number;
  height: number;
};

export type TControls = {
  [key: string]: {
    [key: string]: string;
  };
};

export type RectType = {
  a: TCoordinates;
  b: TCoordinates;
  c: TCoordinates;
  d: TCoordinates;
};

export interface IKeys {
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
  b: {
    pressed: boolean;
  };
  a: {
    pressed: boolean;
  };
  d: {
    pressed: boolean;
  };
  s: {
    pressed: boolean;
  };
  w: {
    pressed: boolean;
  };
  r: {
    pressed: boolean;
  };
}
type moveType = 'mid' | 'high' | 'low';
type controls = 'd' | 'u' | 'l' | 'r' | '1' | '2';
type MoveInstructions = controls[];

export interface FighterData {
  fighterName: string;
  fighterMoves: {
    specials: FighterMove[];
    basic: FighterMove[];
  };
}

export type FighterMove = {
  MoveInstructions: MoveInstructions;
  moveName: string;
  moveData: {
    moveType: moveType;
    damage: number;
    blockDamage: number;
    moveHitbox: THitBox;
  };
  frameData: {
    startup: number;
    active: number;
    recover: number;
    blockAdv: number;
    hitAdv: number;
  };
};
