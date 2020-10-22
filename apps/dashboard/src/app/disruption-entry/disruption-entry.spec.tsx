import React from 'react';
import { render } from '@testing-library/react';

import DisruptionEntry from './disruption-entry';

describe('DisruptionEntry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DisruptionEntry />);
    expect(baseElement).toBeTruthy();
  });
});
