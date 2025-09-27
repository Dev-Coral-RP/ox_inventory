import { flip, FloatingPortal, offset, shift, useFloating, useTransitionStyles } from '@floating-ui/react';
import React, { memo, useMemo } from 'react';
import { useAppSelector } from '../../store';
import SlotTooltip from '../inventory/SlotTooltip';

const Tooltip: React.FC = () => {
  const hoverData = useAppSelector((state) => state.tooltip);
  const clientX = hoverData.coords?.x || 0;
  const clientY = hoverData.coords?.y || 0;

  const { refs, context, floatingStyles } = useFloating({
    middleware: [flip(), shift(), offset({ mainAxis: 10, crossAxis: 10 })],
    open: hoverData.open,
    placement: 'right-start',
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 200,
  });

  // Memoize transform style to prevent unnecessary re-renders
  const transformStyle = useMemo(() => {
    return {
      transform: `translate(${clientX}px, ${clientY}px)`
    };
  }, [clientX, clientY]);

  // Skip rendering if no item or tooltip is closed
  if (!isMounted || !hoverData.item || !hoverData.inventoryType) {
    return null;
  }

  return (
    <FloatingPortal>
      <SlotTooltip
        ref={refs.setFloating}
        style={{ ...floatingStyles, ...styles, ...transformStyle }}
        item={hoverData.item}
        inventoryType={hoverData.inventoryType}
        coords={hoverData.coords ? { x: hoverData.coords.x, y: hoverData.coords.y } : { x: 0, y: 0 }}
      />
    </FloatingPortal>
  );
};

export default memo(Tooltip);