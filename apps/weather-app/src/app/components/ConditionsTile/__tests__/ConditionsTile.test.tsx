import { render, waitFor } from '@testing-library/react';
import ConditionsTile from '../ConditionsTile';
import Conditions from '../../../models/Conditions';
import TemperatureUnit from '../../../enums/TemperatureUnit';

let conditions: Conditions;

beforeAll(() => {
  jest.useFakeTimers('modern' as FakeTimersConfig);
  jest.setSystemTime(new Date('2024-10-31T18:30:00'));
});

beforeEach(() => {
  conditions = {
    cloudcover: 57.4,
    conditions: 'Partially cloudy',
    datetime: '2024-11-01',
    humidity: 70.1,
    icon: 'partly-cloudy-day',
    sunrise: '06:14:50',
    sunset: '20:06:52',
    temp: 12.8,
    tempmax: 17,
    tempmin: 8.7,
  };
});

describe('ConditionsTile', () => {
  it('will render', async () => {
    const { getByTestId, queryByTestId } = render(
      <ConditionsTile testId="conditions-tile" conditions={conditions} unit={TemperatureUnit.Celcius} />
    );

    await waitFor(() => expect(queryByTestId('conditions-tile')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-header')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-image-container')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-conditions')).toBeTruthy());
    await waitFor(() => expect(getByTestId('conditions-tile-conditions').textContent).toEqual('Partially cloudy'));
    await waitFor(() => expect(queryByTestId('conditions-tile-min-temp')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-max-temp')).toBeTruthy());
  });

  it('will display tomorrow if date is tomorrow', async () => {
    const { getByTestId, queryByTestId } = render(
      <ConditionsTile testId="conditions-tile" conditions={conditions} unit={TemperatureUnit.Celcius} />
    );

    await waitFor(() => expect(queryByTestId('conditions-tile')).toBeTruthy());
    await waitFor(() => expect(getByTestId('conditions-tile-header').textContent).toEqual('Tomorrow'));
  });

  it('will display formatted date if date is not tomorrow', async () => {
    conditions = { ...conditions, datetime: '2024-11-02' };
    const { getByTestId, queryByTestId } = render(
      <ConditionsTile testId="conditions-tile" conditions={conditions} unit={TemperatureUnit.Celcius} />
    );

    await waitFor(() => expect(queryByTestId('conditions-tile')).toBeTruthy());
    await waitFor(() => expect(getByTestId('conditions-tile-header').textContent).toEqual('Sat, 2 Nov'));
  });

  it('will display temperatures in Celcius', async () => {
    const { getByTestId, queryByTestId } = render(
      <ConditionsTile testId="conditions-tile" conditions={conditions} unit={TemperatureUnit.Celcius} />
    );

    await waitFor(() => expect(queryByTestId('conditions-tile')).toBeTruthy());
    await waitFor(() => expect(getByTestId('conditions-tile-min-temp').textContent).toEqual('9°C'));
    await waitFor(() => expect(getByTestId('conditions-tile-max-temp').textContent).toEqual('17°C'));
  });

  it('will display temperatures in Fahrenheit', async () => {
    const { getByTestId, queryByTestId } = render(
      <ConditionsTile testId="conditions-tile" conditions={conditions} unit={TemperatureUnit.Fahrenheit} />
    );

    await waitFor(() => expect(queryByTestId('conditions-tile')).toBeTruthy());
    await waitFor(() => expect(getByTestId('conditions-tile-min-temp').textContent).toEqual('9°F'));
    await waitFor(() => expect(getByTestId('conditions-tile-max-temp').textContent).toEqual('17°F'));
  });

  it('will display temperatures as 0 if none are provided', async () => {
    conditions = { ...conditions, tempmin: undefined, tempmax: undefined };
    const { getByTestId, queryByTestId } = render(
      <ConditionsTile testId="conditions-tile" conditions={conditions} unit={TemperatureUnit.Fahrenheit} />
    );

    await waitFor(() => expect(queryByTestId('conditions-tile')).toBeTruthy());
    await waitFor(() => expect(getByTestId('conditions-tile-min-temp').textContent).toEqual('0°F'));
    await waitFor(() => expect(getByTestId('conditions-tile-max-temp').textContent).toEqual('0°F'));
  });
});
