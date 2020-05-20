import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Unwrapped as VmHeadlineContainer } from './VmHeadlineContainer';

jest.mock('../../actionCreators');

const vmProps = {
  fetchVm: jest.fn(),
  vmId: '0',
  vm: [
    {
      name: 'Really Broken Machine',
      iopsAvg: 2,
      latencyAvgMs: 5000,
      latencyMaxMs: 8000,
    },
  ],
};

describe('VmHeadlineContainer', () => {
  it('does NOT show anything while the data is still loading', () => {
    render(<VmHeadlineContainer loadingVm {...vmProps} />);

    expect(screen.queryByText(t => t.startsWith('2'))).toBeFalsy();
    expect(screen.queryByText(t => t.startsWith('5,000'))).toBeFalsy();
  });

  it('shows data once it is loaded', () => {
    render(<VmHeadlineContainer loadingVm={false} {...vmProps} />);

    expect(screen.queryByText(t => t.startsWith('2'))).toBeDefined();
    expect(screen.queryByText(t => t.startsWith('5,000'))).toBeDefined();
  });

  it('shows fetches data again on new id', () => {
    vmProps.fetchVm.mockReset();
    const { rerender } = render(<VmHeadlineContainer loadingVm={false} {...vmProps} />);
    expect(vmProps.fetchVm).toHaveBeenCalledWith('0');

    rerender(<VmHeadlineContainer loadingVm={false} {...vmProps} vmId={'42'} />);
    expect(vmProps.fetchVm).toHaveBeenCalledWith('42');
    expect(vmProps.fetchVm).toHaveBeenCalledTimes(2);
  });
});
