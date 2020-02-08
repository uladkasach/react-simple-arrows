import useWindowSize from '@rehooks/window-size';
import { useState } from 'react';

/*
  contract:
  - output: coordinatesById, setRefForCoordinatesById
*/
export interface Coordinates {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
export interface CoordinatesPerId {
  [index: string]: Coordinates;
}
export const getCoordinatesFromDiv = ({ div }: { div: HTMLDivElement }) => {
  const box = div.getBoundingClientRect();
  const coordinates = {
    top: box.top + window.scrollY,
    bottom: box.bottom + window.scrollY,
    left: box.left + window.scrollX,
    right: box.right + window.scrollX,
  };
  return coordinates;
};
export const useCoordinatesPerId = () => {
  useWindowSize(); // use window size to trigger state update when size changes -> triggers recalculation of coordinates
  const [coordinates, setCoordinates] = useState<CoordinatesPerId>({});
  const setCoordinatesOfDivForId = ({ id, div }: { id: string; div: HTMLDivElement | null }) => {
    if (!div) return; // do nothing if div not defined
    const priorCoordinates = coordinates[id];
    const currentCoordinates = getCoordinatesFromDiv({ div });
    if (JSON.stringify(priorCoordinates) !== JSON.stringify(currentCoordinates)) {
      setCoordinates({ ...coordinates, [id]: currentCoordinates });
    }
  };
  return { coordinates, setCoordinatesOfDivForId };
};
