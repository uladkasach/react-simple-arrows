import React from 'react';

import { render } from '@testing-library/react';

import { LineOrientation } from '../constants';
import { ArrowBetweenDivs } from './ArrowBetweenDivs';
import { ArrowsBetweenDivsContext } from './ArrowsBetweenDivsContext';
import { ArrowAnchorPlacement, getArrowAnchorPositionForCoordinates } from './getArrowAnchorPositionForCoordinates';

jest.mock('../ArrowSvg', () => ({ ArrowSvg: () => <div>__ARROW_SVG__</div> })); // mock out the arrow, since we've tested it elsewhere

jest.mock('./getArrowAnchorPositionForCoordinates');
const getArrowAnchorPositionForCoordinatesMock = getArrowAnchorPositionForCoordinates as jest.Mock;
getArrowAnchorPositionForCoordinatesMock.mockReturnValue('__EXAMPLE_ARROW_ANCHOR_POSITION__');

const initialContextValue = {
  coordinatesPerId: {},
  debug: false,
  setCoordinatesOfDivForId: () => {},
};

describe('ArrowBetweenDivs', () => {
  it('should not render anything if coordinates for the divs are not defined in the context yet', () => {
    const { container } = render(
      <ArrowsBetweenDivsContext.Provider
        value={{
          ...initialContextValue,
          coordinatesPerId: {},
        }}
      >
        <ArrowBetweenDivs
          from={{ id: 'div_one', placement: ArrowAnchorPlacement.BOTTOM }}
          to={{ id: 'div_two', placement: ArrowAnchorPlacement.TOP }}
          orientation={LineOrientation.HORIZONTAL}
        />
      </ArrowsBetweenDivsContext.Provider>,
    );
    expect(container.firstChild).toEqual(null);
  });
  it('should should warn if an id does not have coordinates and debug is true', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const { container } = render(
      <ArrowsBetweenDivsContext.Provider
        value={{
          ...initialContextValue,
          coordinatesPerId: {},
          debug: true,
        }}
      >
        <ArrowBetweenDivs
          from={{ id: 'div_one', placement: ArrowAnchorPlacement.BOTTOM }}
          to={{ id: 'div_two', placement: ArrowAnchorPlacement.TOP }}
          orientation={LineOrientation.HORIZONTAL}
        />
      </ArrowsBetweenDivsContext.Provider>,
    );
    expect(container.firstChild).toEqual(null);
    expect(warnSpy).toHaveBeenCalledTimes(2);
  });
  it('should get the anchor positions and render the arrow if both of the ids have coordinates', () => {
    const { container } = render(
      <ArrowsBetweenDivsContext.Provider
        value={{
          ...initialContextValue,
          coordinatesPerId: { div_one: '__EXAMPLE_DIV_ONE_COORDINATES__' as any, div_two: '__EXAMPLE_DIV_TWO_COORDINATES__' as any },
        }}
      >
        <ArrowBetweenDivs
          from={{ id: 'div_one', placement: ArrowAnchorPlacement.BOTTOM }}
          to={{ id: 'div_two', placement: ArrowAnchorPlacement.TOP }}
          orientation={LineOrientation.HORIZONTAL}
        />
      </ArrowsBetweenDivsContext.Provider>,
    );
    expect(container.firstChild).not.toEqual(null);
    expect(container.firstChild!.textContent).toEqual('__ARROW_SVG__');
    expect(getArrowAnchorPositionForCoordinatesMock).toHaveBeenCalledTimes(2);
    expect(getArrowAnchorPositionForCoordinatesMock).toHaveBeenCalledWith({
      coordinates: '__EXAMPLE_DIV_ONE_COORDINATES__',
      placement: ArrowAnchorPlacement.BOTTOM,
    });
    expect(getArrowAnchorPositionForCoordinatesMock).toHaveBeenCalledWith({
      coordinates: '__EXAMPLE_DIV_TWO_COORDINATES__',
      placement: ArrowAnchorPlacement.TOP,
    });
  });
});
