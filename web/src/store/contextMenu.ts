import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlotWithItem } from '../typings';

interface ContextMenuState {
  item: SlotWithItem | null;
}

const initialState: ContextMenuState = {
  item: null,
};

export const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    openContextMenu(state, action: PayloadAction<{ item: SlotWithItem }>) {
      state.item = action.payload.item;
    },
    closeContextMenu(state) {
      return;
    },
  },
});

export const { openContextMenu, closeContextMenu } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;