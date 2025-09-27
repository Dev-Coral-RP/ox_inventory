import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectItemAmount, setItemAmount } from '../../store/inventory';
import { DragSource } from '../../typings';
import { onUse } from '../../dnd/onUse';
import { onGive } from '../../dnd/onGive';
import { fetchNui } from '../../utils/fetchNui';
import { Locale } from '../../store/locale';
import UsefulControls from './UsefulControls';

const InventoryControl: React.FC = () => {
  const itemAmount = useAppSelector(selectItemAmount);
  const dispatch = useAppDispatch();

  const [infoVisible, setInfoVisible] = useState(false);

  const [, use] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onUse(source.item);
    },
  }));

  const [, give] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onGive(source.item);
    },
  }));

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.valueAsNumber =
      isNaN(event.target.valueAsNumber) || event.target.valueAsNumber < 0 ? 0 : Math.floor(event.target.valueAsNumber);
    dispatch(setItemAmount(event.target.valueAsNumber));
  };

  return (
    <>
      <UsefulControls infoVisible={infoVisible} setInfoVisible={setInfoVisible} />
      <div className="inventory-control" style={{ display: 'none'}}>
        <div className="inventory-control-wrapper">
          <input
            className="inventory-control-input"
            type="number"
            defaultValue={itemAmount}
            onChange={inputHandler}
            min={0}
          />
          <button className="inventory-control-button" ref={use}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M9.53545 1.04839C9.53545 0.468498 9.07075 0 8.49556 0C7.92038 0 7.45568 0.468498 7.45568 1.04839V7.8629C7.45568 8.15121 7.2217 8.3871 6.93573 8.3871C6.64976 8.3871 6.41579 8.15121 6.41579 7.8629V2.09677C6.41579 1.51688 5.95109 1.04839 5.3759 1.04839C4.80071 1.04839 4.33601 1.51688 4.33601 2.09677V11.0081C4.33601 11.0572 4.33601 11.1096 4.33926 11.1588L2.37322 9.27167C1.85327 8.77369 1.03111 8.79335 0.533914 9.31754C0.0367174 9.84173 0.0594649 10.6706 0.579409 11.1719L4.23202 14.6774C5.63262 16.0239 7.49467 16.7742 9.43146 16.7742H10.0554C13.2141 16.7742 15.7748 14.1925 15.7748 11.0081V4.19355C15.7748 3.61366 15.3101 3.14516 14.7349 3.14516C14.1597 3.14516 13.695 3.61366 13.695 4.19355V7.8629C13.695 8.15121 13.461 8.3871 13.1751 8.3871C12.8891 8.3871 12.6551 8.15121 12.6551 7.8629V2.09677C12.6551 1.51688 12.1904 1.04839 11.6152 1.04839C11.04 1.04839 10.5753 1.51688 10.5753 2.09677V7.8629C10.5753 8.15121 10.3414 8.3871 10.0554 8.3871C9.76943 8.3871 9.53545 8.15121 9.53545 7.8629V1.04839Z" fill="#FCFBFE"/>
            </svg>
            {Locale.ui_use || 'Use'}
          </button>
          <button className="inventory-control-button" ref={give}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17" fill="none">
  <path d="M14.1194 4.93595C14.5168 4.52646 14.5168 3.86145 14.1194 3.45197L11.0672 0.307115C10.6698 -0.102372 10.0244 -0.102372 9.627 0.307115C9.22958 0.716601 9.22958 1.38161 9.627 1.79109L10.9432 3.14731H1.19219C0.629451 3.14731 0.174805 3.61576 0.174805 4.1956C0.174805 4.77543 0.629451 5.24388 1.19219 5.24388H10.9432L9.627 6.6001C9.22958 7.00958 9.22958 7.67459 9.627 8.08408C10.0244 8.49356 10.6698 8.49356 11.0672 8.08408L14.1194 4.93922V4.93595ZM3.52265 16.4671C3.92007 16.8766 4.56548 16.8766 4.9629 16.4671C5.36032 16.0576 5.36032 15.3926 4.9629 14.9831L3.64983 13.6302H13.4009C13.9636 13.6302 14.4183 13.1617 14.4183 12.5819C14.4183 12.002 13.9636 11.5336 13.4009 11.5336H3.64983L4.96608 10.1774C5.36349 9.76788 5.36349 9.10288 4.96608 8.69339C4.56866 8.28391 3.92325 8.28391 3.52583 8.69339L0.473663 11.8382C0.076245 12.2477 0.076245 12.9127 0.473663 13.3222L3.52583 16.4671H3.52265Z" fill="#FCFBFE"/>
</svg>
            {Locale.ui_give || 'Give'}
          </button>
          <button className="inventory-control-button" onClick={() => fetchNui('exit')}>
            {Locale.ui_close || 'Close'}
          </button>
        </div>
      </div>

      <button className="useful-controls-button" onClick={() => setInfoVisible(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 524 524">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      </button>
    </>
  );
};

export default InventoryControl;
