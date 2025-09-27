import { Inventory } from './inventory';
import { Slot } from './slot';

export type State = {
  leftInventory: Inventory;
  rightInventory: Inventory;
  playerData: {
    health: number;
    armor: number;
    food: number;
    water: number;
    id: number;
    job: string;
    cash: number;
    bank: number;
  };
  itemAmount: number;
  shiftPressed: boolean;
  isBusy: boolean;
  additionalMetadata: Array<{ metadata: string; value: string }>;
  history?: {
    leftInventory: Inventory;
    rightInventory: Inventory;
  };
};
