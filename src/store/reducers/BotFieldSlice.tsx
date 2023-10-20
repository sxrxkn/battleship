import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Ship1 from "../../assets/shipIcons/1.svg";
import Ship2 from "../../assets/shipIcons/2.svg";
import Ship3 from "../../assets/shipIcons/3.svg";
import Ship4 from "../../assets/shipIcons/4.svg";

import { isFieldAvailable } from "../../utils/functions/CheckCellAvailable";
import { blockingCells } from "../../utils/functions/BlockingCells";
import { formatCellId } from "../../utils/functions/FormatCellId";
import { BotBoardInterface } from "../../models/models";

const initialState: BotBoardInterface = {
  disabledCells: [],
  shipsInfo: [],
  didUserHit: false,
  countDestroyedBotShip: 0,
  availableShip: [
    { shipSize: 4, count: 1, icon: Ship4 },
    { shipSize: 3, count: 2, icon: Ship3 },
    { shipSize: 2, count: 3, icon: Ship2 },
    { shipSize: 1, count: 4, icon: Ship1 },
  ],
};

export const botFieldSlice = createSlice({
  name: "botField",
  initialState,
  reducers: {
    restartBotField: () => {
      return initialState;
    },
    shotBotCell: (state, action: PayloadAction<number[]>) => {
      let isHit = false;
      const [row, column] = action.payload;
      state.disabledCells.push(`${row}${column}`);
      for (let i = 0; i < state.shipsInfo.length; i++) {
        for (let j = 0; j < state.shipsInfo[i].cells.length; j++) {
          if (state.shipsInfo[i].cells[j] === `${row}${column}`) {
            isHit = true;
            state.shipsInfo[i].destroyedCells.push(state.shipsInfo[i].cells[j]);
            if (
              state.shipsInfo[i].destroyedCells.length ===
              state.shipsInfo[i].cells.length
            ) {
              state.countDestroyedBotShip += 1;
              state.shipsInfo[i].isDestroyed = true;
              let [firstRow, firstColumn] = formatCellId(
                state.shipsInfo[i].cells[0]
              );

              state.disabledCells = [
                ...state.disabledCells,
                ...blockingCells(
                  state.shipsInfo[i].direction!,
                  state.shipsInfo[i].cells.length,
                  firstRow,
                  firstColumn
                ),
              ];
            }
          }
        }
      }
      state.didUserHit = isHit;
    },
    setShipToBotField: (state) => {
      for (let k = 0; state.availableShip.length > 0; ) {
        let row: number = -1;
        let column: number = -1;
        let direction: string | null = null;
        let isCellAvailable = false;
        // Выбираем ячейку для заполнения кораблем
        while (!isCellAvailable) {
          column = Math.floor(Math.random() * 10) + 1;
          row = Math.floor(Math.random() * 10) + 1;
          direction = Math.random() < 0.5 ? "row" : "column";

          isCellAvailable = isFieldAvailable(
            [row, column],
            state.availableShip[k].shipSize,
            state.disabledCells,
            direction
          );
        }
        const shipCellsArray = [];

        state.disabledCells = [
          ...state.disabledCells,
          ...blockingCells(
            direction!,
            state.availableShip[k].shipSize,
            row,
            column
          ),
        ];

        for (let i = 0; i < state.availableShip[k].shipSize; i++) {
          shipCellsArray.push(`${row}${column}`);
          if (direction === "column") column += 1;
          else row += 1;
        }
        state.shipsInfo.push({
          cells: shipCellsArray,
          destroyedCells: [],
          isDestroyed: false,
          direction: direction,
        });
        // Удаляем доступные для размещения корабли
        for (let i = 0; i < state.availableShip.length; i++) {
          if (
            state.availableShip[k].shipSize === state.availableShip[i].shipSize
          ) {
            state.availableShip[i].count -= 1;
            if (state.availableShip[i].count === 0) {
              state.availableShip.splice(i, 1);
            }
            break;
          }
        }
      }
      state.disabledCells = [];
    },
  },
});

export const { setShipToBotField, shotBotCell, restartBotField } =
  botFieldSlice.actions;
export default botFieldSlice.reducer;
