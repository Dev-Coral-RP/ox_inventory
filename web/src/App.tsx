import InventoryComponent from './components/inventory';
import useNuiEvent from './hooks/useNuiEvent';
import { Items } from './store/items';
import { Locale } from './store/locale';
import { setImagePath } from './store/imagepath';
import { setupInventory } from './store/inventory';
import { Inventory } from './typings';
import { useAppDispatch } from './store';
import { debugData } from './utils/debugData';
import DragPreview from './components/utils/DragPreview';
import { fetchNui } from './utils/fetchNui';
import { useDragDropManager } from 'react-dnd';
import KeyPress from './components/utils/KeyPress';


debugData([
  {
    action: 'setupInventory',
    data: {
      playerData: {
        playerID: '1',
      },
      leftInventory: {
        id: 'test',
        type: 'player',
        slots: 50,
        label: 'Bob Smith',
        weight: 3000,
        maxWeight: 50000,
        backpackDisabled: false,
        items: [
          {
            slot: 1,
            name: 'iron',
            weight: 3000,
            metadata: {
              description: `name: Svetozar Miletic  \n Gender: Male`,
              ammo: 3,
              mustard: '60%',
              ketchup: '30%',
              mayo: '10%',
              rarity: 'legendary',
            },
            count: 5,
          },
          { slot: 2, name: 'weapon_combatpistol', weight: 0, count: 1, metadata: { durability: 75 } },
          { slot: 3, name: 'copper', weight: 100, count: 12, metadata: { type: 'Special' } },
          {
            slot: 4,
            name: 'water',
            weight: 10000,
            count: 10,
            metadata: { description: 'Generic item description' },
          },
          { slot: 10, name: 'water', weight: 100, count: 1 },
          {
            slot: 6,
            name: 'burger',
            weight: 100,
            count: 6,
          },
          { slot:7, name: 'burger', weight: 100, count: 1 },
          { slot: 8, name: 'energy_junk1', weight: 100, count: 1 },
        ],
      },
      rightInventory: {
        id: 'shop',
        type: 'shop',
        slots: 100,
        label: 'Drop',
        weight: 3000,
        maxWeight: 5000,
        items: [
          {
            slot: 1,
            name: 'lockpick',
            weight: 500,
            price: 300,
            ingredients: {
              iron: 5,
              copper: 12,
              powersaw: 0.1,
            },
            metadata: {
              description: 'Simple lockpick that breaks easily and can pick basic door locks',
            },
          },
        ],
      },

    },
  },
]);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const manager = useDragDropManager();

  useNuiEvent<{
    locale: { [key: string]: string };
    items: typeof Items;
    leftInventory: Inventory;
    imagepath: string;
  }>('init', ({ locale, items, leftInventory, imagepath }) => {
    for (const name in locale) Locale[name] = locale[name];
    for (const name in items) Items[name] = items[name];

    setImagePath(imagepath);
    dispatch(setupInventory({ leftInventory }));
  });

  fetchNui('uiLoaded', {});

  useNuiEvent('closeInventory', () => {
    manager.dispatch({ type: 'dnd-core/END_DRAG' });
  });

  return (
    <div className="app-wrapper">
      <InventoryComponent />
      <DragPreview />
      <KeyPress />
    </div>
  );
};

addEventListener("dragstart", function(event) {
  event.preventDefault()
})

export default App;
