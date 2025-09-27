import InventoryGrid from './InventoryGrid';
import { useAppSelector } from '../../store';
import { selectLeftInventory } from '../../store/inventory';

const LeftInventory: React.FC = () => {
  let leftInventory = useAppSelector(selectLeftInventory);
  let backpackInventory = useAppSelector(selectLeftInventory);
  // select only first 5 items
  const newItems = leftInventory.items.slice(0, 5);
  leftInventory = {
    ...leftInventory,
    items: leftInventory.items.slice(0, 30),
  }
  backpackInventory = {
    ...backpackInventory,
    items: backpackInventory.items.slice(30, 60),
  }
  let backpackDisabled = false;

  if (leftInventory.backpackDisabled) {
    backpackDisabled = true;
  }

  return (
    <div style={
      {
        display: 'flex',
        flexDirection: 'column',
        gap: '1vh',
      }
    }>
      <InventoryGrid inventory={{ ...leftInventory, items: newItems, label: 'hotbar' }}/>
      <InventoryGrid inventory={leftInventory} />


    </div>
  )
};

export default LeftInventory;
