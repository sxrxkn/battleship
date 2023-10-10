import React, { useState } from "react";

import "../styles/BattleFieldItem.css";

function BattleFieldItem() {
  const [isShoot, setShoot] = useState(false);
  return (
    <div
      onClick={() => setShoot(true)}
      className={`battle-field__item ${
        isShoot ? "battle-field_shootedItem" : ""
      }`}></div>
  );
}

export default BattleFieldItem;
