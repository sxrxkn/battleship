import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import RulesLink from "../components/RulesLink";

import "../styles/Home.css";

function Home() {
  return (
    <main>
      <Header></Header>
      <section className="options">
        <label className="options__label">
          Введите свое имя:
          <input className="oprions__name-field" type="text" name="name" />
        </label>
        <h2 className="options__type-header">Выберите тип игры:</h2>
        <div className="options__choose-type-block">
          <Link to={"/game"} className="options__type-button">
            Стрельба строго по очереди
          </Link>
          <Link to={"/game"} className="options__type-button">
            Стрельба до промаха
          </Link>
        </div>
      </section>
      <RulesLink></RulesLink>
    </main>
  );
}

export default Home;
