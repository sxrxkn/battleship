import React, { useState } from "react";

import BattleFieldItem from "./BattleFieldItem";

import "../styles/BattleField.css";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { gameCharacteristicsSlice } from "../store/reducers/GameTypeSlice";
import { isFieldAvailable } from "../utils/functions/CheckCellAvailable";
import { columns, rows } from "../utils/constants";

function BattleField() {
  const [selectCells, putSelectedCells] = useState<{
    cellsArray: string[];
    isAvailable: boolean;
  }>();
  const { selectedShipSize, disabledCells, direction, shipsInfo } =
    useAppSelector((state) => state.gameCharacteristicsReducer);
  const { setShipToField } = gameCharacteristicsSlice.actions;
  const dispatch = useAppDispatch();

  const field = rows.map((row) => {
    return (
      <div key={row} className="battleField__row">
        {columns.map((column) => {
          const id = `${row}${column}`;
          return (
            <div
              className={`battleField__cell-container ${
                disabledCells.includes(id)
                  ? "battleField__cell-container_disabled"
                  : ""
              }${
                selectCells?.cellsArray.includes(id) && selectCells.isAvailable
                  ? " battleField__cell-container_select-ship"
                  : ""
              }${
                shipsInfo.some((ship) => ship.cells.includes(id))
                  ? " battleField__cell-container_ship-cell"
                  : ""
              }
            ${
              shipsInfo.some((ship) => {
                return ship.destroyedCells.some(
                  (destroyedCell) => destroyedCell === id
                );
              })
                ? "battleField__cell-container_destroyed-cell"
                : ""
            }
            `}
              key={id}
              onMouseEnter={() => {
                if (selectedShipSize) {
                  const selectedCellsArray = [];
                  let isAvailableCells: boolean = false;
                  if (direction === "column") {
                    for (let i = 0; i < selectedShipSize; i++) {
                      if (i === 0)
                        isAvailableCells = isFieldAvailable(
                          [row, column],
                          selectedShipSize,
                          disabledCells,
                          direction
                        );
                      selectedCellsArray.push(`${row}${column + i}`);
                    }
                  } else if (direction === "row") {
                    for (let i = 0; i < selectedShipSize; i++) {
                      if (i === 0)
                        isAvailableCells = isFieldAvailable(
                          [row, column],
                          selectedShipSize,
                          disabledCells,
                          direction
                        );
                      selectedCellsArray.push(`${row + i}${column}`);
                    }
                  }
                  putSelectedCells({
                    cellsArray: selectedCellsArray,
                    isAvailable: isAvailableCells,
                  });
                }
              }}
              onClick={() => {
                if (
                  selectedShipSize &&
                  isFieldAvailable(
                    [row, column],
                    selectedShipSize,
                    disabledCells,
                    direction
                  )
                ) {
                  putSelectedCells({ isAvailable: false, cellsArray: [] });
                  dispatch(setShipToField([row, column]));
                }
              }}>
              <BattleFieldItem key={id}></BattleFieldItem>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <>
      <div className="letters">
        {["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"].map((el) => {
          return <div key={el}>{el}</div>;
        })}
      </div>
      <div className="field-container">
        <div className="numbers">
          {rows.map((el) => {
            return <div key={el}>{el}</div>;
          })}
        </div>
        <div>{field}</div>
      </div>
    </>
  );
}

export default BattleField;
