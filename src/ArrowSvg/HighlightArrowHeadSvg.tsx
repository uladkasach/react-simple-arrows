import React from 'react';

export const HighlightArrowHeadSvg = ({ id, length, width, color = 'black' }: { id: string; length: number; width: number; color?: string }) => {
  const arrowPath = `M0,0 L0,${width} L${width},${length} L${length},0 z`;
  return (
      // setting markerUnits="userSpaceOnUse" so that it doesn't inherit stroke width from the highlight path
    <marker id={id} key={id} markerWidth={length} markerHeight={width} refX={length - width / 2} refY={width / 2} orient="auto" markerUnits="userSpaceOnUse">
      <path d={arrowPath} fill={color} />
    </marker>
  );
};
