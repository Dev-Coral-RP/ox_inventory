import React, { useState } from 'react';
import { getItemUrl, isSlotWithItem } from '../../helpers';
import useNuiEvent from '../../hooks/useNuiEvent';
import { useAppSelector } from '../../store';
import { selectLeftInventory } from '../../store/inventory';
import { SlotWithItem } from '../../typings';
import SlideUp from '../utils/transitions/SlideUp';
import { Items } from '../../store/items';
import WeightBar from '../utils/WeightBar';

const InventoryHotbar: React.FC = () => {
  const [hotbarVisible, setHotbarVisible] = useState(false);
  const items = useAppSelector(selectLeftInventory).items.slice(0, 5);

  //stupid fix for timeout
  const [handle, setHandle] = useState<NodeJS.Timeout>();
  useNuiEvent('toggleHotbar', () => {
    if (hotbarVisible) {
      setHotbarVisible(false);
    } else {
      if (handle) clearTimeout(handle);
      setHotbarVisible(true);
      setHandle(setTimeout(() => setHotbarVisible(false), 3000));
    }
  });

  return (
    <SlideUp in={hotbarVisible}>
      <div className="hotbar-container">
        {items.map((item) => (
          <div
            className="inventory-slot-wrapper"
            style={{
              border: '1px solid #ffffff26',
              backgroundColor: '#1f1f1f',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
            }}
          >
            <div className="inventory-slot-number" style={{opacity: '40%'}}>{item.slot}</div>
            <div
              className="hotbar-item-slot"
              data-rarity={item?.metadata?.rarity ? String(item.metadata.rarity).toLowerCase() : 'common'}
              style={{
                backgroundImage: `url(${item?.name ? getItemUrl(item as SlotWithItem) : 'none'}`,
                backgroundSize: '65%',
                zIndex: 1,
              }}
              key={`hotbar-${item.slot}`}
            >
              {isSlotWithItem(item) && (
                <div className="item-slot-wrapper">
                  <div
                    className="item-hotslot-header-wrapper"
                  >
                    <div className="item-slot-info-wrapper">
                      <p className='countText'>
                        {item.count ? item.count.toLocaleString('en-us') + `` : ''}<p className='countEmb'>x</p>
                      </p>

                      {/* <div className='weightWrapper'>
                        <p className='weightText'>
                          {item.weight > 0
                            ? item.weight >= 1000
                              ? `${(item.weight / 1000).toLocaleString('en-us', {
                                  minimumFractionDigits: 2,
                                })}`
                              : `${item.weight.toLocaleString('en-us', {
                                  minimumFractionDigits: 0,
                                })}`
                            : ''}
                        </p>
                        {item.weight > 0 && (
                          <p className='countEmb'>
                            {item.weight >= 1000 ? 'kg' : 'g'}
                          </p>
                        )}
                      </div> */}
                    </div>
                  </div>
                  <div className="item-slot-label-wrapper">
                    <div className="inventory-slot-label-text">
                      {item.metadata?.label ? item.metadata.label : Items[item.name]?.label || item.name}
                    </div>

                    {item?.durability !== undefined && (
                      <WeightBar percent={item.durability} durability />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideUp>
  );
};

export default InventoryHotbar;
