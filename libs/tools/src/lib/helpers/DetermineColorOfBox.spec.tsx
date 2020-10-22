import React from 'react';
import { render } from '@testing-library/react';

import Helpers from './DetermineColorOfBox';

describe('Helpers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Helpers />);
    expect(baseElement).toBeTruthy();
  });
});
