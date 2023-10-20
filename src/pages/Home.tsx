import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import RulesLink from "../components/RulesLink";

import "../styles/Home.css";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { generalInfoSlice } from "../store/reducers/GeneralInfoSlice";

function Home() {
  const { changeGameStatus, setGameType, setUserName } =
    generalInfoSlice.actions;
  const { status } = useAppSelector((state) => state.generalInfoReducer);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [isInputDisabled, setInputDisabled] = useState(false);
  const [isTypeSelected, selectType] = useState(false);

  const isButtonDisabled = name.trim() === "";

  return (
    <main>
      <Header></Header>
      <section className="options">
        {!status && (
          <>
            <label className="options__label">
              Введите свое имя:
              <input
                value={name}
                className="oprions__name-field"
                type="text"
                name="name"
                disabled={isInputDisabled}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <button
              onClick={() => {
                if (!isButtonDisabled) {
                  dispatch(setUserName(name.trim()));
                  dispatch(changeGameStatus("chooseGameType"));
                  setInputDisabled(true);
                }
              }}
              disabled={isButtonDisabled}
              className="styled-button">
              Подтвердить
            </button>
          </>
        )}

        {status === "chooseGameType" && !isTypeSelected && (
          <>
            <h2 className="options__type-header">Выберите тип игры:</h2>
            <div className="options__choose-type-block">
              <Link
                to={"/game"}
                onClick={() => {
                  dispatch(changeGameStatus("shipPlacement"));
                  dispatch(setGameType("Стрельба строго по очереди"));
                  selectType(true);
                }}
                className="styled-button">
                Стрельба строго по очереди
              </Link>
              <Link
                to={"/game"}
                onClick={() => {
                  dispatch(changeGameStatus("shipPlacement"));
                  dispatch(setGameType("Стрельба до промаха"));
                  selectType(true);
                }}
                className="styled-button">
                Стрельба до промаха
              </Link>
            </div>
          </>
        )}
      </section>
      <RulesLink></RulesLink>
    </main>
  );
}

export default Home;
