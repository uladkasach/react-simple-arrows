import React from 'react';
import uuid from 'uuid';

import { svgPathProperties } from 'svg-path-properties';
import { LineOrientation, Position } from '../constants';
import { ArrowHeadMarkerSvg } from './ArrowHeadMarkerSvg';
import { calculateAestheticLinePath } from './calculateAestheticLinePath';

const PATH_LENGTH = 100;
const ARROW_LENGTH = 15;
const ARROW_WIDTH = 9;

export const ArrowSvg = ({
  start,
  end,
  orientation,
  curviness = 0.6,
  color = '#456',
  highlight = false,
  highlightColor = 'pink',
}: {
  start: Position;
  end: Position;
  orientation: LineOrientation;
  curviness?: number;
  color?: string;
  highlight?: boolean;
  highlightColor?: string;
}) => {
  const headId = uuid();

  // define dimensions and coordinates of the svg plane
  const dimensions = {
    height: Math.abs(start.y - end.y),
    width: Math.abs(start.x - end.x),
  };
  const coordinates = {
    x: Math.min(start.x, end.x),
    y: Math.min(start.y, end.y),
  };

  // add room for padding to the svg plane
  const padding = ARROW_WIDTH; // as otherwise half of arrow head would be outside of svg when it goes to edge
  const paddedDimensions = {
    height: dimensions.height + padding, // i.e., add room for half an arrow width at each side
    width: dimensions.width + padding,
  };
  const paddedCoordinates = {
    x: coordinates.x - padding / 2, // half padding to allow for equal distance from edge on both sides
    y: coordinates.y - padding / 2,
  };

  // map the coordinates of the line from page coordinates into the svg plane coordinates (i.e., if starting at top left, the start coordinates would be (0, 0) plus padding offset)
  const innerStart = {
    x: start.x - paddedCoordinates.x,
    y: start.y - paddedCoordinates.y,
  };
  const innerEnd = {
    x: end.x - paddedCoordinates.x,
    y: end.y - paddedCoordinates.y,
  };

  const linePath = calculateAestheticLinePath({
    start: innerStart,
    end: innerEnd,
    orientation,
    curviness,
  });

  const linePathLength = svgPathProperties(linePath).getTotalLength();

  // return arrow positioned absolutely at the viewport w/ arrows positioned internally
  return (
    <svg height={paddedDimensions.height} width={paddedDimensions.width} style={{ position: 'absolute', top: paddedCoordinates.y, left: paddedCoordinates.x }}>
      <defs>
        <ArrowHeadMarkerSvg length={ARROW_LENGTH} width={ARROW_WIDTH} id={headId} color={color} />
      </defs>
      { highlight ?
          <path
              d={linePath}
              fill="none"
              stroke={highlightColor}
              strokeWidth="5"
              strokeDasharray={(PATH_LENGTH / linePathLength) * (linePathLength - (ARROW_LENGTH / 2))}
              pathLength={PATH_LENGTH} /> : <></>}

      <path
        d={linePath}
        fill="none"
        stroke={color}
        markerEnd={`url(#${headId})`}
      />
    </svg>
  );
};
