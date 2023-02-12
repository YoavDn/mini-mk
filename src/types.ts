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
