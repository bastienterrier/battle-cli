
/**
 * @description Map M[x][y]
 */
export const map: number[][] = [
  [2, 2, 2, 2, 2, 2, 2],
  [2, 2, 1, 0, 1, 2, 2],
  [2, 1, 0, 0, 0, 1, 2],
  [2, 2, 1, 0, 1, 2, 2],
  [2, 2, 2, 1, 2, 2, 2],
];

export const MAP_HEIGHT: number = map.length;
export const MAP_WIDHT: number = map[0].length;

export const mapPlaceByCode = {
  0: 'Village',
  1: 'Forest',
  2: 'Plains',
  3: 'Mountain',
};
