import React from 'react';
import { render } from '@testing-library/react';

import TotalAvailability from './total-availability';

describe('TotalAvailability', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TotalAvailability />);
    expect(baseElement).toBeTruthy();
  });
});
