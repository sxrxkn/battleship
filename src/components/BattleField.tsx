import React from "react";
import BattleFieldItem from "./BattleFieldItem";

import "../styles/BattleField.css";

function BattleField() {
  const columns = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
  const rows = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const field = rows.map((row) => {
    return (
      <div key={row} className="battleField__row">
        {columns.map((column) => {
          const id = `${row}${column}`;
          return <BattleFieldItem key={id}></BattleFieldItem>;
        })}
      </div>
    );
  });

  return <>{field}</>;
}

export default BattleField;
