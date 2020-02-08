import { LineOrientation, Position } from '../constants';

/*
  based on:
    https://www.beyondjava.net/how-to-connect-html-elements-with-an-arrow-using-svg
*/

export const calculateAestheticLinePath = ({
  start,
  end,
  curviness,
  orientation,
}: {
  start: Position;
  end: Position;
  curviness: number;
  orientation: LineOrientation;
}) => {
  // 1. determine the deltas for where the line should deviate to form a Bezier curve, based on the orientation and curviness
  const horizontalCurviness = orientation === LineOrientation.HORIZONTAL ? curviness : 0;
  const verticalCurviness = orientation === LineOrientation.VERTICAL ? curviness : 0;
  const horizontalDelta = (end.x - start.x) * horizontalCurviness;
  const verticalDelta = (end.y - start.y) * verticalCurviness;

  // 2. calculate the deviation positions, based on delta, to ensure a nice Bezier curve
  const startDeviation: Position = {
    x: start.x + horizontalDelta,
    y: start.y + verticalDelta,
  };
  const endDeviation: Position = {
    x: end.x - horizontalDelta,
    y: end.y - verticalDelta,
  };

  // 3. define
  const path = [
    'M',
    start.x,
    start.y,
    'C', // triggers bezier curve
    startDeviation.x,
    startDeviation.y,
    endDeviation.x,
    endDeviation.y,
    end.x,
    end.y,
  ].join(' ');

  // 4. return the path
  return path;
};
