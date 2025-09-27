import { Inventory, SlotWithItem } from '../../typings';
import React, { Fragment, useMemo } from 'react';
import { Items } from '../../store/items';
import { Locale } from '../../store/locale';
import ReactMarkdown from 'react-markdown';
import { useAppDispatch, useAppSelector } from '../../store';
import ClockIcon from '../utils/icons/ClockIcon';
import { getItemUrl } from '../../helpers';
import Divider from '../utils/Divider';
import { Menu, MenuItem } from '../utils/menu/Menu';
import InventoryContext from './InventoryContext';
import { closeTooltip } from '../../store/tooltip';
import { onUse } from '../../dnd/onUse';
import { onGive } from '../../dnd/onGive';
import { onDrop } from '../../dnd/onDrop';
import { fetchNui } from '../../utils/fetchNui';
import { isSlotWithItem } from '../../helpers';
import { setClipboard } from '../../utils/setClipboard';
import { selectItemAmount, setItemAmount } from '../../store/inventory';

interface DataProps {
  action: string;
  component?: string;
  slot?: number;
  serial?: string;
  id?: number;
}

interface Button {
  label: string;
  index: number;
  group?: string;
}

interface Group {
  groupName: string | null;
  buttons: ButtonWithIndex[];
}

interface ButtonWithIndex extends Button {
  index: number;
}

interface GroupedButtons extends Array<Group> { }

const SlotTooltip: React.ForwardRefRenderFunction<
  HTMLDivElement,
  { item: SlotWithItem; inventoryType: Inventory['type']; style: React.CSSProperties, coords: { x: number; y: number } }
> = ({ item, inventoryType, style, coords }, ref) => {
  const additionalMetadata = useAppSelector((state) => state.inventory.additionalMetadata);
  const itemData = useMemo(() => Items[item.name], [item]);
  const ingredients = useMemo(() => {
    if (!item.ingredients) return null;
    return Object.entries(item.ingredients).sort((a, b) => a[1] - b[1]);
  }, [item]);
  const description = item.metadata?.description || itemData?.description;
  const ammoName = itemData?.ammoName && Items[itemData?.ammoName]?.label;
  let itemType = 'item';
  if(item?.name){
    itemType = item?.name.startsWith('weapon_') ? 'weapon' : item?.name.startsWith('ammo_') ? 'ammo' : 'item';

  }

  const groupButtons = (buttons: any): GroupedButtons => {

    return buttons.reduce((groups: Group[], button: Button, index: number) => {
      if (button.group) {
        const groupIndex = groups.findIndex((group) => group.groupName === button.group);
        if (groupIndex !== -1) {
          groups[groupIndex].buttons.push({ ...button, index });
        } else {
          groups.push({
            groupName: button.group,
            buttons: [{ ...button, index }],
          });
        }
      } else {
        groups.push({
          groupName: null,
          buttons: [{ ...button, index }],
        });
      }
      return groups;
    }, []);
  };

  const dispatch = useAppDispatch();
  const itemAmount = useAppSelector(selectItemAmount);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.valueAsNumber =
      isNaN(event.target.valueAsNumber) || event.target.valueAsNumber < 0 ? 0 : Math.floor(event.target.valueAsNumber);
    dispatch(setItemAmount(event.target.valueAsNumber));
  };

  const handleClick = (data: DataProps) => {
    if (!item) return;
    dispatch(closeTooltip());

    switch (data && data.action) {
      case 'use':
        onUse({ name: item.name, slot: item.slot });
        break;
      case 'give':
        onGive({ name: item.name, slot: item.slot });
        break;
      case 'drop':
        isSlotWithItem(item) && onDrop({ item: item, inventory: 'player' });
        break;
      case 'remove':
        fetchNui('removeComponent', { component: data?.component, slot: data?.slot });
        break;
      case 'removeAmmo':
        fetchNui('removeAmmo', item.slot);
        break;
      case 'copy':
        setClipboard(data.serial || '');
        break;
      case 'custom':
        fetchNui('useButton', { id: (data?.id || 0) + 1, slot: item.slot });
        break;
    }

  };

const key = isSlotWithItem(item) ? String(item.name).toLowerCase() : '';
const defs = (window as any).__itemDefs || {};
const luaRarity = defs[key]?.metadata?.rarity ?? defs[key]?.rarity;
const rarityTag =
  isSlotWithItem(item)
    ? String(item.metadata?.rarity ?? luaRarity ?? 'common').toLowerCase()
    : 'common';

// Helper for label
const rarityLabel = rarityTag.charAt(0).toUpperCase() + rarityTag.slice(1);

  return (
    <>
      {!itemData ? (
        <div className="tooltip-wrapper" ref={ref} style={style}>
          <div className="tooltip-header-wrapper">
            <p>{item.name}</p>
          </div>
          <Divider />
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            transform: `translate(${coords.x}px, ${coords.y}px)`,
            transitionProperty: 'opacity',
            transitionDuration: '200ms',
            translate: 'transformY(-100%)',
          }}
          className="tooltip-wrapper" ref={ref}
        >
          <div className="tooltip-header-wrapper">
            <div
              className="tooltip-header-box"
              style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
              }}
            >
              <div className="header-title">
                <div style={{
                  width: 'fit-content',
                  height: 'fit-content',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <p className="tooltip-item-name">
    {item.metadata?.label || itemData.label || item.name}
  </p>
  <span className={`rarity-badge rarity-${rarityTag}`}>{rarityLabel}</span>
</div>
                  {description ? (
                    <div className="tooltip-description">
                      {description}
                    </div>
                  ) : (
                    <div className="tooltip-description">
                      No description found about Item
                    </div>
                  )}
                </div>

                {item.weight > 0 && (
                  <p className='tooltip-weight-box'>{`${(item.weight / 1000).toFixed(2)}kg`}</p>
                )}
              </div>
            </div>

            {inventoryType === 'crafting' && (
              <div className="tooltip-crafting-duration">
                <ClockIcon />
                <p>{(item.duration !== undefined ? item.duration : 3000) / 1000}s</p>
              </div>
            )}
          </div>

          {inventoryType !== 'crafting' ? (
            <>
              <div style={{
                width: '100%',
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}>
                {item.durability !== undefined && (
                  <p className='metadata-text'>
                    {Locale.ui_durability}: <p style={{
                      color: '#FFF',
                      textShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
                      fontFamily: 'Gilroy-Medium !important',
                      fontSize: '.625vw',
                      lineHeight: 'normal'
                    }}>
                    {Math.trunc(item.durability)}%
                    </p>
                  </p>
                )}
                {item.metadata?.ammo !== undefined && (
                  <p className='metadata-text'>
                    {Locale.ui_ammo}: <p style={{
                      color: '#FFF',
                      textShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
                      fontFamily: 'Gilroy-Medium !important',
                      fontSize: '.625vw',
                      lineHeight: 'normal'
                    }}>{item.metadata.ammo}</p>
                  </p>
                )}
                {ammoName && (
                  <p className='metadata-text'>
                    {Locale.ammo_type}: <p style={{
                      color: '#FFF',
                      textShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
                      fontFamily: 'Gilroy-Medium !important',
                      fontSize: '.625vw',
                      lineHeight: 'normal'
                    }}>
                    {ammoName}
                    </p>
                  </p>
                )}
                {item.metadata?.serial && (
                  <p className='metadata-text'>
                    {Locale.ui_serial}:
                    <p style={{
                      color: '#FFF',
                      textShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
                      fontFamily: 'Gilroy-Medium !important',
                      fontSize: '.625vw',
                      lineHeight: 'normal'
                    }}>
                    {item.metadata.serial}
                    </p>
                  </p>
                )}
                {item.metadata?.components && item.metadata?.components[0] && (
                  <p className='metadata-text'>
                    {Locale.ui_components}:{' '}
                    <p style={{
                      color: '#FFF',
                      textShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
                      fontFamily: 'Gilroy-Medium !important',
                      fontSize: '.625vw',
                      lineHeight: 'normal'
                    }}>
                    {(item.metadata?.components).map((component: string, index: number, array: []) =>
                      index + 1 === array.length ? Items[component]?.label : Items[component]?.label + ', '
                    )}
                    </p>

                  </p>
                )}
                {item.metadata?.weapontint && (
                  <p className='metadata-text'>
                    {Locale.ui_tint}:
                    <p style={{
                      color: '#FFF',
                      textShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
                      fontFamily: 'Gilroy-Medium !important',
                      fontSize: '.625vw',
                      lineHeight: 'normal'
                    }}>
                    {item.metadata.weapontint}
                    </p>
                  </p>
                )}
                {additionalMetadata.map((data: { metadata: string; value: string }, index: number) => (
                  <Fragment key={`metadata-${index}`}>
                    {item.metadata && item.metadata[data.metadata] && (
                      <p>
                        {data.value}:
                        <p style={{
                      color: '#FFF',
                      textShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
                      fontFamily: 'Gilroy-Medium !important',
                      fontSize: '.625vw',
                      lineHeight: 'normal'
                    }}>
                    {item.metadata[data.metadata]}
                    </p>
                      </p>
                    )}
                  </Fragment>
                ))}
              </div>
            </>
          ) : (
            <div className="tooltip-ingredients">
              {ingredients &&
                ingredients.map((ingredient) => {
                  const [item, count] = [ingredient[0], ingredient[1]];
                  return (
                    <div className="tooltip-ingredient" key={`ingredient-${item}`}>
                      <img src={item ? getItemUrl(item) : 'none'} alt="item-image" />
                      <p>
                        {count >= 1
                          ? `${count}x ${Items[item]?.label || item}`
                          : count === 0
                            ? `${Items[item]?.label || item}`
                            : count < 1 && `${count * 100}% ${Items[item]?.label || item}`}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}

          <Divider />

          <div className='item-buttons'>
            <div className="tooltip-input-wrapper">
              <input
                className="tooltip-input"
                type="number"
                defaultValue={itemAmount}
                onChange={inputHandler}
                min={0}
              />
            </div>

            <MenuItem onClick={() => handleClick({ action: 'use' })} label={Locale.ui_use || 'Use'} />
            <MenuItem onClick={() => handleClick({ action: 'give' })} label={Locale.ui_give || 'Give'} />
            <MenuItem onClick={() => handleClick({ action: 'drop' })} label={Locale.ui_drop || 'Drop'} />

            {item && item.metadata?.ammo > 0 && (
              <MenuItem onClick={() => handleClick({ action: 'removeAmmo' })} label={Locale.ui_remove_ammo} />
            )}

            {item && item.metadata?.serial && (
              <MenuItem
                onClick={() => handleClick({ action: 'copy', serial: item.metadata?.serial })}
                label={Locale.ui_copy}
              />
            )}

            {item && item.metadata?.components && item.metadata?.components.length > 0 && (
              <Menu label={Locale.ui_removeattachments}>
                {item &&
                  item.metadata?.components.map((component: string, index: number) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleClick({ action: 'remove', component, slot: item.slot })}
                      label={Items[component]?.label || ''}
                    />
                  ))}
              </Menu>
            )}

            {((item && item.name && Items[item.name]?.buttons?.length) || 0) > 0 && (
              <>
                {item &&
                  item.name &&
                  groupButtons(Items[item.name]?.buttons).map((group: Group, index: number) => (
                    <React.Fragment key={index}>
                      {group.groupName ? (
                        <Menu label={group.groupName}>
                          {group.buttons.map((button: Button) => (
                            <MenuItem
                              key={button.index}
                              onClick={() => handleClick({ action: 'custom', id: button.index })}
                              label={button.label}
                            />
                          ))}
                        </Menu>
                      ) : (
                        group.buttons.map((button: Button) => (
                          <MenuItem
                            key={button.index}
                            onClick={() => handleClick({ action: 'custom', id: button.index })}
                            label={button.label}
                          />
                        ))
                      )}
                    </React.Fragment>
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default React.forwardRef(SlotTooltip);