import React from 'react';
import InventoryGrid from './InventoryGrid';
import { useAppSelector } from '../../store';
import { selectRightInventory } from '../../store/inventory';

const RightInventory: React.FC = () => {
  const rightInventory = useAppSelector(selectRightInventory);
  let trunkInventory = useAppSelector(selectRightInventory);
  let backpackInventory = useAppSelector(selectRightInventory);

  let inventoryDisabled = false;
  backpackInventory = {
    ...backpackInventory,
    items: backpackInventory.items.slice(30, 60),
  }
  let backpackDisabled = false;

  if (rightInventory.backpackDisabled) {
    backpackDisabled = true;
  }
  trunkInventory = {...trunkInventory, label: "TRUNK"}
  if (trunkInventory) {
    if(trunkInventory.type !== 'trunk' && trunkInventory.type !== 'glovebox') {
      inventoryDisabled = true;
    }
  }

  return(
    <div style={
      {
        display: 'flex',
        flexDirection: 'column',
        gap: '3.8519vh',
      }
    }>
      <InventoryGrid inventory={rightInventory} />
      {/* <InventoryGrid inventory={trunkInventory} inventoryDisabled={inventoryDisabled} /> */}

    </div>
  );
};

// Add React.memo to prevent unnecessary re-renders
export default React.memo(RightInventory);
