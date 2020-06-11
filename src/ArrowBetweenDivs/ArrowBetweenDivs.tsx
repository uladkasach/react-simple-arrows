import React, { useContext } from 'react';

import { ArrowSvg } from '../ArrowSvg';
import { LineOrientation } from '../constants';
import { ArrowsBetweenDivsContext } from './ArrowsBetweenDivsContext';
import { ArrowAnchorPlacement, getArrowAnchorPositionForCoordinates } from './getArrowAnchorPositionForCoordinates';

export interface ArrowDivAnchorDefinition {
  id: string;
  placement: ArrowAnchorPlacement;
}

export const ArrowBetweenDivs = ({
  from,
  to,
  orientation,
  curviness,
  color = 'black',
  strokeWidth = '1',
}: {
  from: ArrowDivAnchorDefinition;
  to: ArrowDivAnchorDefinition;
  orientation: LineOrientation;
  curviness?: number;
  color?: string;
  strokeWidth?: string;
}) => {
  const { coordinatesPerId, debug } = useContext(ArrowsBetweenDivsContext);

  // grab the from and to coordinates from the context
  const fromCoordinates = coordinatesPerId[from.id];
  if (!fromCoordinates && debug) {
    if (debug) console.warn(`ArrowBetweenDivs: coordinates for from.id ${from.id} are not defined yet`); // output message if in debug mode
  }
  const toCoordinates = coordinatesPerId[to.id];
  if (!toCoordinates) {
    if (debug) console.warn(`ArrowBetweenDivs: coordinates for to.id ${to.id} are not defined yet`); // output message if in debug mode
  }
  if (!fromCoordinates || !toCoordinates) return null; // render nothing, as the id is not defined yet

  // define the start and end position based on the coordinates
  const start = getArrowAnchorPositionForCoordinates({ coordinates: fromCoordinates, placement: from.placement });
  const end = getArrowAnchorPositionForCoordinates({ coordinates: toCoordinates, placement: to.placement });

  // return the arrow
  return <ArrowSvg start={start} end={end} orientation={orientation} curviness={curviness} color={color} strokeWidth={strokeWidth}/>;
};
