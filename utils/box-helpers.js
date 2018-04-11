import {
  WALL_WIDTH,
  WALL_HEIGHT,
  weaponConfig,
} from '../config';

const getColumn = index => (
  index % WALL_HEIGHT
);

const getRow = (index, column) => (
  (index - column) / WALL_WIDTH
);

const isInRow = (index, currentRow) => {
  const column = getColumn(index);
  const row = getRow(index, column);

  return currentRow === row;
};

const getBoxesToRemove = (array, startIndex, num = 1) => {
  const column = getColumn(startIndex);
  const row = getRow(startIndex, column);
  const output = [];

  for (let i = 0; i < num; i += 1) {
    const nextIndex = isInRow(startIndex + i, row)
      ? startIndex + i
      : startIndex - (num - i);

    if (array[nextIndex]) {
      output.push(array[nextIndex]);
    }
  }

  return output;
};

export const getUpdatedBoxes = (boxes, removedId, weapon) => {
  const weaponRange = weaponConfig[weapon];
  const startIndex = boxes.findIndex(box => box.id === removedId);
  const boxesToRemove = getBoxesToRemove(boxes, startIndex, weaponRange);

  const updatedBoxes = boxes.filter(box => (
    boxesToRemove.indexOf(box) === -1
  ));

  return { boxesToRemove, updatedBoxes };
};
