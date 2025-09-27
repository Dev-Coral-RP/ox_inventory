import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inventory, SlotWithItem } from '../typings';

interface TooltipState {
  open: boolean;
  item: SlotWithItem | null;
  inventoryType: Inventory['type'] | null;
  coords?: { x: number; y: number };

}

const initialState: TooltipState = {
  open: false,
  item: null,
  inventoryType: null,
  coords: undefined,
};

export const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState,
  reducers: {
    openTooltip(state, action: PayloadAction<{ item: SlotWithItem; inventoryType: Inventory['type'], coords: { x: number; y: number }}>) {
      state.open = true;
      state.item = action.payload.item;
      state.inventoryType = action.payload.inventoryType;
      state.coords = action.payload.coords;
    },
    closeTooltip(state) {
      return {
      ...initialState
      };
    },
  },
});

export const { openTooltip, closeTooltip } = tooltipSlice.actions;

export default tooltipSlice.reducer;

export const selectTooltip = (state: { tooltip: TooltipState }) => state.tooltip;