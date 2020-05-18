import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VmHeadline from './VmHeadline';

const vmData = [
  {
    name: 'Really Broken Machine',
    iopsAvg: 2,
    latencyAvgMs: 5000,
    latencyMaxMs: 8000,
  },
];

describe('VmHeadline', () => {
  it('displays all performance metrics', () => {
    render(<VmHeadline vm={vmData} />);

    expect(screen.getByText(t => t.startsWith('2'))).toBeDefined();
    expect(screen.getByText(t => t.startsWith('5,000'))).toBeDefined();
    expect(screen.getByText(t => t.startsWith('8,000'))).toBeDefined();
  });

  it('displays the vm name', () => {
    render(<VmHeadline vm={vmData} />);

    expect(screen.getByText('Really Broken Machine')).toBeDefined();
  });
});
