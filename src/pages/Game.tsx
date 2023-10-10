import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import RulesLink from "../components/RulesLink";

import "../styles/Game.css";
import BattleField from "../components/BattleField";

function Game() {
  const [isTransform, transform] = useState(false);

  return (
    <main>
      <Header></Header>
      <section className="game-info">
        <div className="game-info__username-block">
          <p className="game-info__username">Пользователь</p>
          <p className="game-info__type">Тип игры</p>
        </div>
        <div>
          <Link className="options__type-button" to={"/statistics"}>
            Статистика
          </Link>
        </div>
      </section>

      <section className="game-field">
        <div>
          <BattleField></BattleField>
        </div>
        <div>
          {/* <div
            className="game-field__ship"
            onDoubleClick={() => {
              transform(!isTransform);
            }}
            style={isTransform ? { transform: "rotate(90deg)" } : {}}
            draggable={true}>
            <FirstShip></FirstShip>
          </div>
          <div draggable={true}>
            <SecondShip></SecondShip>
          </div>
          <div draggable={true}>
            <ThirdShip></ThirdShip>
          </div>
          <div draggable={true}>
            <FourthShip></FourthShip>
          </div> */}
        </div>
        {/* <div>
          <BattleField></BattleField>
        </div> */}
      </section>

      <RulesLink></RulesLink>
    </main>
  );
}

export default Game;
