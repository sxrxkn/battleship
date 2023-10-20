import React from "react";

import "../styles/SelectShipBoard.css";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { gameCharacteristicsSlice } from "../store/reducers/GameTypeSlice";

function SelectShipBoard() {
  const { selectedShipSize, availableShip, direction } = useAppSelector(
    (state) => state.gameCharacteristicsReducer
  );
  const { setShipSize, changeDirection } = gameCharacteristicsSlice.actions;

  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <h2 className="ship-board__header">Ваши корабли</h2>
        <div className="ship-board__direction-container">
          <p>Изменить направление кораблей</p>
          <button
            onClick={() => {
              dispatch(
                changeDirection(direction === "column" ? "row" : "column")
              );
            }}
            className={`ship-board__direction-button ${
              direction === "row" ? "ship-board__direction-button_rotate" : ""
            }`}>
            →
          </button>
        </div>
      </div>

      <div className="game-field__ship-board">
        {availableShip.map(({ shipSize, count, icon }) => {
          return (
            <div key={shipSize} className="ship-board__ship-container">
              <div
                onClick={() => {
                  dispatch(setShipSize(shipSize));
                }}
                className={`ship-board__ship ${
                  shipSize === selectedShipSize ? "ship__selected" : ""
                }`}>
                <img
                  className="ship-board__ship-img"
                  src={icon}
                  alt="Изображение корабля"
                />
              </div>

              <span>X {count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectShipBoard;
