import { blockingCells } from "./BlockingCells";
import { formatCellId } from "./FormatCellId";

export const updateCellStatusAfterShoot = (
  row: number,
  column: number,
  shipsArray: any
) => {
  let disabledCells = [];
  let succesBotShootArray = [];
  let shipIndex: null | number = null;
  let cellIndex: null | number = null;
  disabledCells.push(`${row}${column}`);
  for (let i = 0; i < shipsArray.length; i++) {
    for (let j = 0; j < shipsArray[i].cells.length; j++) {
      if (shipsArray[i].cells[j] === `${row}${column}`) {
        succesBotShootArray.push([row, column]);
        // shipsArray[i].destroyedCells.push(shipsArray.cells[j]);
        shipIndex = i;
        cellIndex = j;
        if (
          shipsArray[i].destroyedCells.length === shipsArray[i].cells.length
        ) {
          succesBotShootArray = [];
          shipsArray[i].isDestroyed = true;
          const [firstRow, firstColumn] = formatCellId(shipsArray[i].cells[0]);

          disabledCells = [
            ...disabledCells,
            ...blockingCells(
              shipsArray[i].direction!,
              shipsArray[i].cells.length,
              firstRow,
              firstColumn
            ),
          ];
        }
      }
    }
  }
  return [shipsArray, disabledCells, succesBotShootArray, shipIndex, cellIndex];
};
