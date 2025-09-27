import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlotWithItem } from '../typings';

interface PlayerDataState {
  playerID: number;

}

const initialState: PlayerDataState = {
    playerID: 1,

};

export const playerDataSlice = createSlice({
  name: 'playerData',
  initialState,
  reducers: {
    setPlayerID(state, action: PayloadAction<number>) {
      state.playerID = action.payload;
    }
  },
});

export const { setPlayerID } = playerDataSlice.actions;

export const selectPlayerID = (state: { playerData: PlayerDataState }) => state.playerData.playerID;

export default playerDataSlice.reducer;