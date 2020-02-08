import React, { ReactElement } from 'react';
import { CoordinatesPerId, useCoordinatesPerId } from './useCoordinatesPerId';

// define the context data store
interface ArrowsBetweenDivContextData {
  coordinatesPerId: CoordinatesPerId;
  setCoordinatesOfDivForId: (args: { id: string; div: HTMLDivElement }) => void;
  debug: boolean;
}
export const ArrowsBetweenDivsContext = React.createContext<ArrowsBetweenDivContextData>({
  coordinatesPerId: {},
  debug: false,
  setCoordinatesOfDivForId: () => {
    throw new Error('ArrowsBetweenDivsContextProvider not found'); // throw error by default
  },
});

/**
 * registering divs into the ArrowsBetweenDivsContext, so that they can be found by id in the ArrowBetweenDivs component
 *
 * example:
 * ```
 * <div ref={(div) => registerDivToArrowsContext({ id: '__SOME_ID__', div })} />
 * ```
 * */
type RegisterDivForArrowsContext = (args: { id: string; div: HTMLDivElement | null }) => void;

export const ArrowsBetweenDivsContextProvider = ({
  children,
  debug = false,
}: {
  children: (args: { registerDivToArrowsContext: RegisterDivForArrowsContext }) => ReactElement;
  debug?: boolean;
}) => {
  // track state of coordinates in context
  const { coordinates, setCoordinatesOfDivForId } = useCoordinatesPerId();

  // rename the method to make more sense to consumers
  const registerDivToArrowsContext = ({ id, div }: { id: string; div: HTMLDivElement | null }) => setCoordinatesOfDivForId({ id, div });

  // render the children wrapped in context
  return (
    <ArrowsBetweenDivsContext.Provider value={{ debug, coordinatesPerId: coordinates, setCoordinatesOfDivForId }}>
      {children({ registerDivToArrowsContext })}
    </ArrowsBetweenDivsContext.Provider>
  );
};
