export const Y_OFFSET = 2.5;

export const BOX_SIZE = 2;
export const BOX_SCALE = 1;

export const WALL_WIDTH = 4;
export const WALL_HEIGHT = 4;

export const boxTypes = [{
  points: 1,
}, {
  points: 10,
  file: 'box/box-special.gltf',
  mapFile: 'box/DefaultMaterial_baseColor-2.png',
}];

export const weapons = {
  CANNONBALL: 'cannonball',
  ROCKET: 'rocket',
};

export const weaponConfig = {
  [weapons.CANNONBALL]: 1,
  [weapons.ROCKET]: 3,
};

export const SPECIAL_WEAPON_DELAY = 300;
