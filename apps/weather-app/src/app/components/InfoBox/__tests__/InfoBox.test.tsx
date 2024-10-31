import { render, waitFor } from '@testing-library/react';
import InfoBox from '../InfoBox';
import TemperatureUnit from '../../../enums/TemperatureUnit';

describe('InfoBox', () => {
  it('will render', async () => {
    const { getByTestId, queryByTestId } = render(<InfoBox testId="info-box" label="My Info Box" value="My Value" />);

    await waitFor(() => expect(queryByTestId('info-box')).toBeTruthy());
    await waitFor(() => expect(getByTestId('info-box-label').textContent).toEqual('My Info Box'));
    await waitFor(() => expect(getByTestId('info-box-value').textContent).toEqual('My Value'));
  });

  it('will display unit if unit is provided', async () => {
    const { getByTestId, queryByTestId } = render(
      <InfoBox testId="info-box" label="My Info Box" value="My Value" unit={TemperatureUnit.Celcius} />
    );

    await waitFor(() => expect(queryByTestId('info-box')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('info-box-unit')).toBeTruthy());
    await waitFor(() => expect(getByTestId('info-box-unit').textContent).toEqual('°C'));
  });

  it('will not display unit if no unit is provided', async () => {
    const { queryByTestId } = render(<InfoBox testId="info-box" label="My Info Box" value="My Value" />);

    await waitFor(() => expect(queryByTestId('info-box')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('info-box-unit')).toBeFalsy());
  });
});
