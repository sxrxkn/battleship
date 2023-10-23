import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import RulesLink from "../components/RulesLink";
import SelectShipBoard from "../components/SelectShipBoard";
import BattleField from "../components/BattleField";
import BotField from "../components/BotField";

import "../styles/Game.css";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { gameCharacteristicsSlice } from "../store/reducers/GameTypeSlice";
import { generalInfoSlice } from "../store/reducers/GeneralInfoSlice";
import { botFieldSlice } from "../store/reducers/BotFieldSlice";
import { store } from "../store/store";

function Game() {
  const [isPlayerWin, setResult] = useState<null | string>(null);

  const { availableShip, countDestroyedPlayersShip } = useAppSelector(
    (state) => state.gameCharacteristicsReducer
  );
  const { setShipToBotField, restartBotField } = botFieldSlice.actions;
  const {
    changeGameStatus,
    restartBattle,
    restartSession,
    updateStatisticsLoseCount,
    updateStatisticsWinCount,
  } = generalInfoSlice.actions;
  const { countDestroyedBotShip } = useAppSelector(
    (state) => state.botFieldReducer
  );
  const {
    changeMove,
    shotUserCell,

    restartUserField,
  } = gameCharacteristicsSlice.actions;
  const { status, type, userName } = useAppSelector(
    (state) => state.generalInfoReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!type) {
      window.location.replace("/");
    }
  });

  useEffect(() => {
    if (countDestroyedPlayersShip === 10) {
      dispatch(updateStatisticsLoseCount());
      setResult("Вы проиграли");
      dispatch(changeGameStatus("end"));
    } else if (countDestroyedBotShip === 10) {
      dispatch(updateStatisticsWinCount());
      setResult("Вы выиграли");
      dispatch(changeGameStatus("end"));
    }
  }, [
    changeGameStatus,
    countDestroyedBotShip,
    countDestroyedPlayersShip,
    dispatch,
    updateStatisticsLoseCount,
    updateStatisticsWinCount,
  ]);

  useEffect(() => {
    if (availableShip.length === 0) {
      dispatch(changeGameStatus("game"));
      dispatch(setShipToBotField());
      dispatch(
        changeMove(Boolean((Math.floor(Math.random() * 100) + 1) % 2 === 0))
      );
      let isUserMove = store.getState().gameCharacteristicsReducer.isUserMove;
      if (!isUserMove) {
        if (type === "Стрельба до промаха") {
          let didBotHitNow;
          do {
            dispatch(shotUserCell());
            didBotHitNow =
              store.getState().gameCharacteristicsReducer.didBotHit;
          } while (didBotHitNow);
        } else {
          dispatch(shotUserCell());
        }
      }
    }
  }, [
    availableShip,
    changeGameStatus,
    changeMove,
    dispatch,
    setShipToBotField,
    shotUserCell,
    type,
  ]);

  return (
    <main>
      <Header></Header>
      <section className="game-info">
        <div className="game-info__user-block">
          <Link
            onClick={() => {
              dispatch(restartBotField());
              dispatch(restartUserField());
              dispatch(restartSession());
            }}
            className="styled-button styled-button_restart"
            to={"/"}>
            Начать новую сессию
          </Link>
          <p className="game-info__info">{userName}</p>
          <p className="game-info__info">{type}</p>
        </div>
        <div>
          <Link target="_blank" className="styled-button" to={"/statistics"}>
            Статистика
          </Link>
          <button
            onClick={() => {
              if (status === "game") {
                dispatch(updateStatisticsLoseCount());
              }
              dispatch(restartUserField());
              dispatch(restartBotField());
              dispatch(restartBattle());
            }}
            className="styled-button styled-button_restart-game">
            Начать бой заново
          </button>
        </div>
      </section>

      <section className="game-field">
        <div>
          <p className="game-field__name">Ваше поле</p>
          {(status === "game" || status === "end") && (
            <p className="game-field__name">
              Количество оставшихся кораблей: {10 - countDestroyedPlayersShip}
            </p>
          )}
          <BattleField></BattleField>
        </div>
        {isPlayerWin && <p className="game-field__end-text">{isPlayerWin}</p>}
        {status === "shipPlacement" && <SelectShipBoard></SelectShipBoard>}
        {(status === "game" || status === "end") && (
          <div>
            <p className="game-field__name game-field__name_end">
              Поле противника
            </p>
            {(status === "game" || status === "end") && (
              <p className="game-field__name game-field__name_end">
                Количество оставшихся кораблей: {10 - countDestroyedBotShip}
              </p>
            )}

            <BotField></BotField>
          </div>
        )}
      </section>
      <RulesLink></RulesLink>
    </main>
  );
}

export default Game;
