import React from "react";

import "../styles/Statistics.css";

import Header from "../components/Header";
import { useAppSelector } from "../hooks/redux";

function Statistics() {
  const { statistics } = useAppSelector((state) => state.generalInfoReducer);
  return (
    <>
      <Header></Header>
      <main>
        <section className="statistics">
          <div className="statistic__item">
            <h3>
              Сыгранные бои:
              <span className="statistics__battles">
                {statistics.battlesCount}
              </span>
            </h3>
          </div>
          <div className="statistic__item">
            <h3>
              Победы:
              <span className="statistics__win">{statistics.winCount}</span>
            </h3>
          </div>
          <div className="statistic__item">
            <h3>
              Поражения:
              <span className="statistics__lose">{statistics.loseCount}</span>
            </h3>
          </div>
        </section>
      </main>
    </>
  );
}

export default Statistics;
