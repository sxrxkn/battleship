import React from "react";

import BattleFieldItem from "./BattleFieldItem";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { botFieldSlice } from "../store/reducers/BotFieldSlice";

import "../styles/BotField.css";
import { gameCharacteristicsSlice } from "../store/reducers/GameTypeSlice";
import { store } from "../store/store";
import { columns, rows } from "../utils/constants";

function BotField() {
  const { isUserMove } = useAppSelector(
    (state) => state.gameCharacteristicsReducer
  );
  const { shipsInfo, disabledCells } = useAppSelector(
    (state) => state.botFieldReducer
  );
  const { changeMove, shotUserCell } = gameCharacteristicsSlice.actions;
  const { shotBotCell } = botFieldSlice.actions;
  const { status, type } = useAppSelector((state) => state.generalInfoReducer);

  const dispatch = useAppDispatch();

  const field = rows.map((row) => {
    return (
      <div key={row} className="battleField__row">
        {columns.map((column) => {
          const id = `${row}${column}`;
          return (
            <div
              onClick={() => {
                if (
                  type === "Стрельба до промаха" &&
                  !disabledCells.some((disabledCell) => disabledCell === id) &&
                  isUserMove &&
                  status !== "end"
                ) {
                  dispatch(shotBotCell([row, column]));
                  const didUserHitNow =
                    store.getState().botFieldReducer.didUserHit;
                  if (!didUserHitNow) {
                    let didBotHitNow;
                    do {
                      dispatch(shotUserCell());
                      didBotHitNow =
                        store.getState().gameCharacteristicsReducer.didBotHit;
                    } while (didBotHitNow);
                  }
                } else if (
                  isUserMove &&
                  !disabledCells.some((disabledCell) => disabledCell === id) &&
                  status !== "end" &&
                  type === "Стрельба строго по очереди"
                ) {
                  dispatch(shotBotCell([row, column]));
                  dispatch(changeMove(false));
                  dispatch(shotUserCell());
                }
              }}
              className={`battleField__cell-container ${
                disabledCells.some((cellId) => cellId === id)
                  ? "battleField__cell-container_disabled-cell"
                  : ""
              } ${
                shipsInfo.some((ship) => {
                  return ship.destroyedCells.some(
                    (destroyedCell) => destroyedCell === id
                  );
                })
                  ? "battleField__cell-container_destroyed-cell"
                  : ""
              }`}
              key={id}>
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
export default BotField;
