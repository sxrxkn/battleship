import React from "react";
import { Link } from "react-router-dom";

import "../styles/RulesLink.css";

function RulesLink() {
  return (
    <div className="link-container">
      <Link
        target="_blank"
        to={"/rules"}
        className="link-container__rules-link">
        Ознакомиться с правилами
      </Link>
    </div>
  );
}

export default RulesLink;
