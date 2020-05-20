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
  it('should look correct going down and right with custom width and color', async () => {
    const { container } = render(
        <ArrowSvg start={{ x: 0, y: 0 }} end={{ x: 500, y: 300 }} orientation={LineOrientation.HORIZONTAL} width="3" color="green" />);
    expect(container.firstChild).not.toEqual(null);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should look correct going down and left with custom width and color', async () => {
    const { container } = render(
        <ArrowSvg start={{ x: 500, y: 0 }} end={{ x: 0, y: 300 }} orientation={LineOrientation.HORIZONTAL} width="3" color="green" />);
    expect(container.firstChild).not.toEqual(null);
    expect(container.firstChild).toMatchSnapshot();
  });
});
