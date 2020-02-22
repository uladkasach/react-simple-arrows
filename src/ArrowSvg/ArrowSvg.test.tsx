import React from 'react';

import { render } from '@testing-library/react';

import { LineOrientation } from '../constants';
import { ArrowSvg } from './ArrowSvg';

jest.mock('uuid', () => () => '__UUID__');

describe('ArrowSvg', () => {

  it('should look correct going down and right', async () => {
    const { container } = render(<ArrowSvg start={{ x: 0, y: 0 }} end={{ x: 500, y: 300 }} orientation={LineOrientation.HORIZONTAL} />);
    expect(container.firstChild).not.toEqual(null);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should look correct going down and left', async () => {
    const { container } = render(<ArrowSvg start={{ x: 500, y: 0 }} end={{ x: 0, y: 300 }} orientation={LineOrientation.HORIZONTAL} />);
    expect(container.firstChild).not.toEqual(null);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should look correct going down and right with highlight default color enabled', async () => {
    const { container } = render(
        <body style={ { backgroundColor: 'cyan' } }>
        <ArrowSvg start={{ x: 0, y: 0 }} end={{ x: 500, y: 300 }} orientation={LineOrientation.HORIZONTAL} highlight={true}  />
        </body>);
    expect(container.firstChild).not.toEqual(null);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should look correct going down and left with highlight custom color enabled', async () => {
    const { container } = render(
        <body style={ { backgroundColor: 'cyan' } }>
        <ArrowSvg start={{ x: 500, y: 0 }} end={{ x: 0, y: 300 }} orientation={LineOrientation.HORIZONTAL} highlight={true} highlightColor="yellow"/>
        </body>);
    expect(container.firstChild).not.toEqual(null);
    expect(container.firstChild).toMatchSnapshot();
  });
});
