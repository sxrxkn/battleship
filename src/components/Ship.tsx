import React from "react";

interface ShipProps {
  iconSrc: string;
  cellCount: number;
}

const Ship: React.FC<ShipProps> = ({ iconSrc, cellCount }) => {
  return (
    <div className={`ships ship-${cellCount}`}>
      <img src={iconSrc} alt="Ship" />
    </div>
  );
};

export default Ship;
