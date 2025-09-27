import React, { useState } from 'react';
import useNuiEvent from '../../hooks/useNuiEvent';
import InventoryControl from './InventoryControl';
import InventoryHotbar from './InventoryHotbar';
import { useAppDispatch } from '../../store';
import { refreshSlots, setAdditionalMetadata, setupInventory, setPlayerData } from '../../store/inventory';
import { setPlayerID } from '../../store/playerData';
import { useExitListener } from '../../hooks/useExitListener';
import type { Inventory as InventoryProps } from '../../typings';
import RightInventory from './RightInventory';
import LeftInventory from './LeftInventory';

import Tooltip from '../utils/Tooltip';
import { closeTooltip } from '../../store/tooltip';
import InventoryContext from './InventoryContext';
import { closeContextMenu } from '../../store/contextMenu';
import Fade from '../utils/transitions/Fade';
import { fetchNui } from '../../utils/fetchNui';

type PlayerDataProps = {
  playerID: number;
};

const Inventory: React.FC = () => {
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [playerID, setPlayerID] = useState<number | null>(null);
  useNuiEvent<boolean>('setInventoryVisible', setInventoryVisible);
  useNuiEvent<false>('closeInventory', () => {
    setInventoryVisible(false);
    dispatch(closeContextMenu());
    dispatch(closeTooltip());
  });
  useExitListener(setInventoryVisible);

  useNuiEvent<{
    leftInventory?: InventoryProps;
    rightInventory?: InventoryProps;
    playerData?: PlayerDataProps;
  }>('setupInventory', (data) => {
    dispatch(setupInventory(data));
    if (data.playerData) {
      const { playerID } = data.playerData;
      setPlayerID(playerID);

    }
    !inventoryVisible && setInventoryVisible(true);

  });

  useNuiEvent('refreshSlots', (data) => dispatch(refreshSlots(data)));

  useNuiEvent('displayMetadata', (data: Array<{ metadata: string; value: string }>) => {
    dispatch(setAdditionalMetadata(data));
  });
  const CloseTooltip = () => {
    // dispatch(closeTooltip());
  }
  return (
    <>
      <Fade in={inventoryVisible}>
        <div className="inventory-wrapper" onClick={CloseTooltip}>
          <div className='inventory-wrapper2'>
            <LeftInventory />
            <InventoryControl />
            <RightInventory />
            <Tooltip />
            <InventoryContext />
          </div>
        </div>
      </Fade>
      <InventoryHotbar />
    </>
  );
};

export default Inventory;
