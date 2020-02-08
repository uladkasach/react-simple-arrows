import React from 'react';

// based on https://github.com/pierpo/react-archer/blob/master/src/ArcherContainer.js#L293

export const ArrowHeadMarkerSvg = ({ id, length, width, color = 'black' }: { id: string; length: number; width: number; color?: string }) => {
  const arrowPath = `M0,0 L0,${width} L${length - 1},${width / 2} z`;
  if (length < width) throw new Error('arrow head width must be less than length');
  return (
    <marker id={id} key={id} markerWidth={length} markerHeight={width} refX={length - width / 2} refY={width / 2} orient="auto">
      <path d={arrowPath} fill={color} />
    </marker>
  );
};
