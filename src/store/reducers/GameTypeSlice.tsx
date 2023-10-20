import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Ship1 from "../../assets/shipIcons/1.svg";
import Ship2 from "../../assets/shipIcons/2.svg";
import Ship3 from "../../assets/shipIcons/3.svg";
import Ship4 from "../../assets/shipIcons/4.svg";

import { blockingCells } from "../../utils/functions/BlockingCells";
import { formatCellId } from "../../utils/functions/FormatCellId";
import { isFieldAvailable } from "../../utils/functions/CheckCellAvailable";
import { GameInterface } from "../../models/models";

const initialState: GameInterface = {
  disabledCells: [],
  shipsInfo: [],
  direction: "column",
  didBotHit: false,
  selectedShipSize: 0,
  countDestroyedPlayersShip: 0,
  isUserMove: false,
  lastSuccesBotShoot: [],
  availableShip: [
    { shipSize: 1, count: 4, icon: Ship1 },
    { shipSize: 2, count: 3, icon: Ship2 },
    { shipSize: 3, count: 2, icon: Ship3 },
    { shipSize: 4, count: 1, icon: Ship4 },
  ],
};

export const gameCharacteristicsSlice = createSlice({
  name: "updateType",
  initialState,
  reducers: {
    restartUserField: () => {
      return initialState;
    },
    setShipSize: (state, action: PayloadAction<number>) => {
      state.selectedShipSize = action.payload;
    },
    changeMove: (state, action: PayloadAction<boolean>) => {
      state.isUserMove = action.payload;
    },
    shotUserCell: (state) => {
      let isHit = false;
      if (!state.lastSuccesBotShoot.length) {
        let column = 0;
        let row = 0;

        do {
          column = Math.floor(Math.random() * 10) + 1;
          row = Math.floor(Math.random() * 10) + 1;
        } while (state.disabledCells.includes(`${row}${column}`));
        state.disabledCells.push(`${row}${column}`);
        for (let i = 0; i < state.shipsInfo.length; i++) {
          for (let j = 0; j < state.shipsInfo[i].cells.length; j++) {
            if (state.shipsInfo[i].cells[j] === `${row}${column}`) {
              isHit = true;
              state.lastSuccesBotShoot.push([row, column]);
              state.shipsInfo[i].destroyedCells.push(
                state.shipsInfo[i].cells[j]
              );
              if (
                state.shipsInfo[i].destroyedCells.length ===
                state.shipsInfo[i].cells.length
              ) {
                state.countDestroyedPlayersShip += 1;
                state.lastSuccesBotShoot = [];
                state.shipsInfo[i].isDestroyed = true;
                const [firstRow, firstColumn] = formatCellId(
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
      } else if (state.lastSuccesBotShoot.length === 1) {
        let direction: number;
        let sideAray: number;
        let newCell: number[];
        let [row, column] = state.lastSuccesBotShoot[0];
        do {
          direction = [0, 1][Math.floor(Math.random() * 2)];
          sideAray = [+1, -1][Math.floor(Math.random() * 2)];
          // eslint-disable-next-line no-loop-func
          newCell = [row, column].map((currentDirection, index) => {
            if (index === direction) return (currentDirection += sideAray);
            else return currentDirection;
          });
        } while (!isFieldAvailable(newCell, 1, state.disabledCells, "row"));
        [row, column] = newCell;
        state.disabledCells.push(`${row}${column}`);
        for (let i = 0; i < state.shipsInfo.length; i++) {
          for (let j = 0; j < state.shipsInfo[i].cells.length; j++) {
            if (state.shipsInfo[i].cells[j] === `${row}${column}`) {
              isHit = true;
              state.lastSuccesBotShoot.push([row, column]);
              state.shipsInfo[i].destroyedCells.push(
                state.shipsInfo[i].cells[j]
              );
              if (
                state.shipsInfo[i].destroyedCells.length ===
                state.shipsInfo[i].cells.length
              ) {
                state.countDestroyedPlayersShip += 1;
                state.lastSuccesBotShoot = [];
                state.shipsInfo[i].isDestroyed = true;
                const [firstRow, firstColumn] = formatCellId(
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
      } else {
        let direction: number;
        let side: number;
        let newCell: number[];
        let row: number = 0;
        let column: number = 0;
        if (state.lastSuccesBotShoot[0][0] === state.lastSuccesBotShoot[1][0]) {
          direction = 1;
          row = state.lastSuccesBotShoot[0][0];
        } else {
          direction = 0;
          column = state.lastSuccesBotShoot[0][1];
        }

        do {
          side = [+1, -1][Math.floor(Math.random() * 2)];
          if (side === +1) {
            if (direction === 1) {
              column = Math.max(
                ...state.lastSuccesBotShoot.map((cell) => cell[direction])
              );
            } else {
              row = Math.max(
                ...state.lastSuccesBotShoot.map((cell) => cell[direction])
              );
            }
          } else {
            if (direction === 1) {
              column = Math.min(
                ...state.lastSuccesBotShoot.map((cell) => cell[direction])
              );
            } else {
              row = Math.min(
                ...state.lastSuccesBotShoot.map((cell) => cell[direction])
              );
            }
          }

          // eslint-disable-next-line no-loop-func
          newCell = [row, column].map((currentDirection, index) => {
            if (index === direction) return (currentDirection += side);
            else return currentDirection;
          });
        } while (!isFieldAvailable(newCell, 1, state.disabledCells, "row"));
        [row, column] = newCell;
        state.disabledCells.push(`${row}${column}`);
        for (let i = 0; i < state.shipsInfo.length; i++) {
          for (let j = 0; j < state.shipsInfo[i].cells.length; j++) {
            if (state.shipsInfo[i].cells[j] === `${row}${column}`) {
              isHit = true;
              state.lastSuccesBotShoot.push([row, column]);
              state.shipsInfo[i].destroyedCells.push(
                state.shipsInfo[i].cells[j]
              );
              if (
                state.shipsInfo[i].destroyedCells.length ===
                state.shipsInfo[i].cells.length
              ) {
                state.countDestroyedPlayersShip += 1;
                state.lastSuccesBotShoot = [];
                state.shipsInfo[i].isDestroyed = true;
                const [firstRow, firstColumn] = formatCellId(
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
      }
      state.didBotHit = isHit;
      state.isUserMove = true;
    },
    changeDirection: (state, action: PayloadAction<string>) => {
      state.direction = action.payload;
    },
    setShipToField: (state, action: PayloadAction<number[]>) => {
      let [row, column] = action.payload;
      const shipCellsArray = [];

      state.disabledCells = [
        ...state.disabledCells,
        ...blockingCells(state.direction, state.selectedShipSize, row, column),
      ];

      for (let i = 0; i < state.selectedShipSize; i++) {
        shipCellsArray.push(`${row}${column}`);
        if (state.direction === "column") column += 1;
        else row += 1;
      }
      state.shipsInfo.push({
        cells: shipCellsArray,
        destroyedCells: [],
        isDestroyed: false,
        direction: state.direction,
      });
      for (let i = 0; i < state.availableShip.length; i++) {
        if (state.selectedShipSize === state.availableShip[i].shipSize) {
          state.availableShip[i].count -= 1;
          if (state.availableShip[i].count === 0) {
            state.selectedShipSize = 0;
            state.availableShip.splice(i, 1);
            if (state.availableShip.length === 0) state.disabledCells = [];
          }
          break;
        }
      }
    },
  },
});

export const {
  restartUserField,
  setShipSize,
  setShipToField,
  changeMove,
  shotUserCell,
  changeDirection,
} = gameCharacteristicsSlice.actions;
export default gameCharacteristicsSlice.reducer;
