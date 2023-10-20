export const isFieldAvailable = (
  cellNumber: number[],
  selectedShipSize: number,
  disabledCells: string[],
  direction: string
): boolean => {
  let [row, column] = cellNumber;
  for (let i = 0; i < selectedShipSize; i++) {
    if (row > 10 || column > 10) return false;
    const isAvailableCell = disabledCells.some(
      // eslint-disable-next-line no-loop-func
      (cell) => cell === `${row}${column}`
    );
    if (isAvailableCell) {
      return false;
    }
    if (direction === "row") {
      row += 1;
    } else column += 1;
  }
  return true;
};
