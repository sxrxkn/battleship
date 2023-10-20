import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralInfoInterface } from "../../models/models";

const initialState: GeneralInfoInterface = {
  type: null,
  status: null,
  userName: null,
  statistics: {
    battlesCount: 0,
    winCount: 0,
    loseCount: 0,
  },
};

export const generalInfoSlice = createSlice({
  name: "generalInfo",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    updateStatisticsWinCount: (state) => {
      state.statistics.winCount += 1;
      state.statistics.battlesCount += 1;
    },
    updateStatisticsLoseCount: (state) => {
      state.statistics.loseCount += 1;
      state.statistics.battlesCount += 1;
    },
    restartBattle: (state) => {
      state.status = "shipPlacement";
    },
    restartSession: () => {
      return initialState;
    },
    setGameType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    changeGameStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const {
  setGameType,
  changeGameStatus,
  restartBattle,
  updateStatisticsLoseCount,
  updateStatisticsWinCount,
  setUserName,
  restartSession,
} = generalInfoSlice.actions;
export default generalInfoSlice.reducer;
