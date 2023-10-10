import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";
import Ship from "./Ship";

interface ShipContainerProps {
  iconSrc: string;
  cellCount: number;
}

const ShipContainer: React.FC<ShipContainerProps> = ({
  iconSrc,
  cellCount,
}) => {
  const [, drag] = useDrag({
    type: ItemTypes.SHIP,
    item: { iconSrc, cellCount },
  });

  return (
    <div ref={drag} className={`ship-container ship-${cellCount}`}>
      <Ship iconSrc={iconSrc} cellCount={cellCount} />
    </div>
  );
};

export default ShipContainer;
