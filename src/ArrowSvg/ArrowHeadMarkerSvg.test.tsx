import React from 'react';

import { render } from '@testing-library/react';

import { ArrowHeadMarkerSvg } from './ArrowHeadMarkerSvg';

describe('ArrowHeadMarkerSvg', () => {
  it('should look correct', async () => {
    const { container } = await render(
      <svg>
        <ArrowHeadMarkerSvg id="__ID__" width={10} length={20} />
      </svg>,
    );
    expect(container.firstChild).not.toEqual(null);
    expect(container.firstChild).toMatchSnapshot();
  });
});
