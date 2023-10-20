export interface BotBoardInterface {
  disabledCells: string[];
  didUserHit: boolean;
  countDestroyedBotShip: number;
  shipsInfo: {
    cells: string[];
    destroyedCells: string[];
    isDestroyed: boolean;
    direction: string | null;
  }[];
  availableShip: { shipSize: number; count: number; icon: string }[];
}

export interface GameInterface {
  disabledCells: string[];
  shipsInfo: {
    cells: string[];
    destroyedCells: string[];
    isDestroyed: boolean;
    direction: string;
  }[];
  direction: string;
  countDestroyedPlayersShip: number;
  lastSuccesBotShoot: number[][];
  didBotHit: boolean;
  selectedShipSize: number;
  isUserMove: null | boolean;
  availableShip: { shipSize: number; count: number; icon: string }[];
}

export interface GeneralInfoInterface {
  type: null | string;
  status: null | string;
  userName: null | string;
  statistics: { battlesCount: number; winCount: number; loseCount: number };
}
