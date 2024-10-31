import { render, waitFor } from '@testing-library/react';
import PercentageIndicator from '../PercentageIndicator';

describe('PercentageIndicator', () => {
  it('will render', async () => {
    const { getByTestId, queryByTestId } = render(
      <PercentageIndicator testId="percentage-indicator" label="My Percentage Indicator" value={50} />
    );

    await waitFor(() => expect(queryByTestId('percentage-indicator')).toBeTruthy());
    await waitFor(() =>
      expect(getByTestId('percentage-indicator-label').textContent).toEqual('My Percentage Indicator')
    );
    await waitFor(() => expect(getByTestId('percentage-indicator-value').textContent).toEqual('50%'));
  });
});
