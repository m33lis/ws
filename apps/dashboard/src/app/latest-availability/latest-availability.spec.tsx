import React from 'react';
import { render } from '@testing-library/react';

import LatestAvailability from './latest-availability';

describe('LatestAvailability', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LatestAvailability />);
    expect(baseElement).toBeTruthy();
  });
});
