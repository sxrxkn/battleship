export const blockingCells = (
  direction: string,
  selectedShipSize: number,
  row: number,
  column: number
) => {
  const disabledCells = [];
  if (direction === "column") {
    for (let i = 0; i < selectedShipSize; i++) {
      if (i === 0 && column - 1 >= 1) {
        disabledCells.push(`${row}${column - 1}`);
        if (row + 1 <= 10) disabledCells.push(`${row + 1}${column - 1}`);
        if (row - 1 >= 1) disabledCells.push(`${row - 1}${column - 1}`);
      }
      if (i === selectedShipSize - 1 && column + 1 <= 10) {
        disabledCells.push(`${row}${column + 1}`);
        disabledCells.push(`${row + 1}${column + 1}`);
        disabledCells.push(`${row - 1}${column + 1}`);
      }
      if (row + 1 <= 10) disabledCells.push(`${row + 1}${column}`);
      if (row - 1 >= 1) disabledCells.push(`${row - 1}${column}`);
      disabledCells.push(`${row}${column}`);
      column += 1;
    }
  }
  // Блокируем ячейки, если направление row
  if (direction === "row") {
    for (let i = 0; i <= selectedShipSize; i++) {
      if (i === 0 && row - 1 >= 1) {
        disabledCells.push(`${row - 1}${column}`);
        if (column - 1 >= 1) disabledCells.push(`${row - 1}${column - 1}`);
        if (column + 1 <= 10) disabledCells.push(`${row - 1}${column + 1}`);
      }
      if (i === selectedShipSize - 1 && row + 1 <= 10) {
        disabledCells.push(`${row + 1}${column}`);
        disabledCells.push(`${row + 1}${column - 1}`);
        disabledCells.push(`${row + 1}${column + 1}`);
      }
      if (column + 1 <= 10) disabledCells.push(`${row}${column + 1}`);
      if (column - 1 >= 1) disabledCells.push(`${row}${column - 1}`);
      disabledCells.push(`${row}${column}`);
      row += 1;
    }
  }
  return disabledCells;
};
