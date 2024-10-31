import { fireEvent, render, waitFor } from '@testing-library/react';
import Weather from '../Weather';
import WeatherForecast from '../../../models/WeatherForecast';

let weatherNelson: WeatherForecast;
let weatherBrighton: WeatherForecast;

const mockGetWeatherByLocation = jest.fn();

beforeAll(() => {
  jest.useFakeTimers('modern' as FakeTimersConfig);
  jest.setSystemTime(new Date('2024-10-31T18:30:00'));
});

beforeEach(() => {
  weatherNelson = {
    resolvedAddress: 'Nelson, Tasman, New Zealand',
    currentConditions: {
      cloudcover: 57.4,
      conditions: 'Partially cloudy',
      datetime: '2024-10-31',
      humidity: 70.1,
      icon: 'partly-cloudy-day',
      sunrise: '06:14:50',
      sunset: '20:06:52',
      temp: 12.8,
      tempmax: 17,
      tempmin: 8.7,
    },
    days: [
      {
        cloudcover: 57.4,
        conditions: 'Partially cloudy',
        datetime: '2024-10-31',
        humidity: 70.1,
        icon: 'partly-cloudy-day',
        sunrise: '06:14:50',
        sunset: '20:06:52',
        temp: 12.8,
        tempmax: 17,
        tempmin: 8.7,
      },
      {
        cloudcover: 13,
        conditions: 'Clear',
        datetime: '2024-11-01',
        humidity: 79.1,
        icon: 'clear-day',
        sunrise: '06:53:00',
        sunset: '16:34:31',
        temp: 13.8,
        tempmax: 15.57,
        tempmin: 12.6,
      },
      {
        cloudcover: 14,
        conditions: 'Clear',
        datetime: '2024-11-02',
        humidity: 80.1,
        icon: 'clear-day',
        sunrise: '06:54:00',
        sunset: '16:35:31',
        temp: 14.8,
        tempmax: 16.57,
        tempmin: 13.6,
      },
      {
        cloudcover: 15,
        conditions: 'Clear',
        datetime: '2024-11-03',
        humidity: 81.1,
        icon: 'clear-day',
        sunrise: '06:55:00',
        sunset: '16:36:31',
        temp: 15.8,
        tempmax: 17.57,
        tempmin: 14.6,
      },
      {
        cloudcover: 16,
        conditions: 'Clear',
        datetime: '2024-11-04',
        humidity: 82.1,
        icon: 'clear-day',
        sunrise: '06:56:00',
        sunset: '16:37:31',
        temp: 16.8,
        tempmax: 18.57,
        tempmin: 15.6,
      },
      {
        cloudcover: 17,
        conditions: 'Clear',
        datetime: '2024-11-05',
        humidity: 83.1,
        icon: 'clear-day',
        sunrise: '06:57:00',
        sunset: '16:38:31',
        temp: 17.8,
        tempmax: 19.57,
        tempmin: 16.6,
      },
    ],
  };

  weatherBrighton = {
    resolvedAddress: 'Brighton, Brighton and Hove, United Kingdom',
    currentConditions: {
      cloudcover: 57.4,
      conditions: 'Partially cloudy',
      datetime: '2024-10-31',
      humidity: 70.1,
      icon: 'partly-cloudy-day',
      sunrise: '06:14:50',
      sunset: '20:06:52',
      temp: 12.8,
      tempmax: 17,
      tempmin: 8.7,
    },
    days: [
      {
        cloudcover: 57.4,
        conditions: 'Partially cloudy',
        datetime: '2024-10-31',
        humidity: 70.1,
        icon: 'partly-cloudy-day',
        sunrise: '06:14:50',
        sunset: '20:06:52',
        temp: 12.8,
        tempmax: 17,
        tempmin: 8.7,
      },
      {
        cloudcover: 13,
        conditions: 'Clear',
        datetime: '2024-11-01',
        humidity: 79.1,
        icon: 'clear-day',
        sunrise: '06:53:00',
        sunset: '16:34:31',
        temp: 13.8,
        tempmax: 15.57,
        tempmin: 12.6,
      },
      {
        cloudcover: 14,
        conditions: 'Clear',
        datetime: '2024-11-02',
        humidity: 80.1,
        icon: 'clear-day',
        sunrise: '06:54:00',
        sunset: '16:35:31',
        temp: 14.8,
        tempmax: 16.57,
        tempmin: 13.6,
      },
      {
        cloudcover: 15,
        conditions: 'Clear',
        datetime: '2024-11-03',
        humidity: 81.1,
        icon: 'clear-day',
        sunrise: '06:55:00',
        sunset: '16:36:31',
        temp: 15.8,
        tempmax: 17.57,
        tempmin: 14.6,
      },
      {
        cloudcover: 16,
        conditions: 'Clear',
        datetime: '2024-11-04',
        humidity: 82.1,
        icon: 'clear-day',
        sunrise: '06:56:00',
        sunset: '16:37:31',
        temp: 16.8,
        tempmax: 18.57,
        tempmin: 15.6,
      },
      {
        cloudcover: 17,
        conditions: 'Clear',
        datetime: '2024-11-05',
        humidity: 83.1,
        icon: 'clear-day',
        sunrise: '06:57:00',
        sunset: '16:38:31',
        temp: 17.8,
        tempmax: 19.57,
        tempmin: 16.6,
      },
    ],
  };

  mockGetWeatherByLocation.mockResolvedValue({
    status: 200,
    data: { ...weatherNelson },
  });
});

jest.mock('../../../api/TimelineClient.ts', () => {
  return jest.fn().mockImplementation(() => {
    return { getWeatherByLocation: mockGetWeatherByLocation };
  });
});

describe('Weather', () => {
  it('will render', async () => {
    const { getByTestId, queryByTestId } = render(<Weather />);

    await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());
    await waitFor(() => expect(queryByTestId('weather-page')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('search-input')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('search-button')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('error-container')).toBeFalsy());
    await waitFor(() => expect(queryByTestId('unavailable-container')).toBeFalsy());
    await waitFor(() => expect(getByTestId('primary-location').textContent).toEqual('Nelson'));
    await waitFor(() => expect(getByTestId('secondary-location').textContent).toEqual('Tasman, New Zealand'));
    await waitFor(() => expect(getByTestId('current-date').textContent).toEqual('Thu, 31 Oct'));
    await waitFor(() => expect(queryByTestId('current-conditions-svg')).toBeTruthy());
    await waitFor(() => expect(getByTestId('current-temp').textContent).toEqual('13'));
    await waitFor(() => expect(getByTestId('current-temp-unit').textContent).toEqual('°C'));
    await waitFor(() => expect(getByTestId('current-conditions').textContent).toEqual('Partially cloudy'));
    await waitFor(() => expect(queryByTestId('overview-container')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('celcius-button')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('fahrenheit-button')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('humidity-percentage')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('cloud-cover-percentage')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('max-temp-box')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('min-temp-box')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('sunrise-box')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('sunset-box')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-0')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-1')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-2')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-3')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-4')).toBeTruthy());
  });

  it('will render', async () => {
    const { getByTestId, queryByTestId } = render(<Weather />);

    await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());
    await waitFor(() => expect(queryByTestId('weather-page')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('search-input')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('search-button')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('unavailable-container')).toBeFalsy());
    await waitFor(() => expect(getByTestId('primary-location').textContent).toEqual('Nelson'));
    await waitFor(() => expect(getByTestId('secondary-location').textContent).toEqual('Tasman, New Zealand'));
    await waitFor(() => expect(getByTestId('current-date').textContent).toEqual('Thu, 31 Oct'));
    await waitFor(() => expect(queryByTestId('current-conditions-svg')).toBeTruthy());
    await waitFor(() => expect(getByTestId('current-temp').textContent).toEqual('13'));
    await waitFor(() => expect(getByTestId('current-temp-unit').textContent).toEqual('°C'));
    await waitFor(() => expect(getByTestId('current-conditions').textContent).toEqual('Partially cloudy'));
    await waitFor(() => expect(queryByTestId('overview-container')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('celcius-button')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('fahrenheit-button')).toBeTruthy());
    await waitFor(() => expect(getByTestId('humidity-percentage-value').textContent).toEqual('70%'));
    await waitFor(() => expect(getByTestId('cloud-cover-percentage-value').textContent).toEqual('57%'));
    await waitFor(() => expect(getByTestId('max-temp-box-value').textContent).toEqual('17'));
    await waitFor(() => expect(getByTestId('min-temp-box-value').textContent).toEqual('9'));
    await waitFor(() => expect(getByTestId('sunrise-box-value').textContent).toEqual('06:14'));
    await waitFor(() => expect(getByTestId('sunset-box-value').textContent).toEqual('20:06'));
    await waitFor(() => expect(queryByTestId('conditions-tile-0')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-1')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-2')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-3')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-4')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('conditions-tile-5')).toBeFalsy());
  });

  it('will show unavailable message if error response is received', async () => {
    mockGetWeatherByLocation.mockResolvedValue({
      status: 400,
    });

    const { queryByTestId } = render(<Weather />);

    await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());
    await waitFor(() => expect(queryByTestId('unavailable-container')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('unavailable-retry-button')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('overview-container')).toBeFalsy());
  });

  it('will show weather unavailable message if no data is returned', async () => {
    mockGetWeatherByLocation.mockResolvedValue({
      status: 200,
      data: {},
    });

    const { queryByTestId } = render(<Weather />);

    await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());
    await waitFor(() => expect(queryByTestId('unavailable-container')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('unavailable-retry-button')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('overview-container')).toBeFalsy());
  });

  it('will change temperature unit', async () => {
    const { queryByTestId, getByTestId } = render(<Weather />);

    await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());
    await waitFor(() => expect(getByTestId('current-temp-unit').textContent).toEqual('°C'));

    await waitFor(() => fireEvent.click(getByTestId('fahrenheit-button')));
    await waitFor(() => expect(getByTestId('current-temp-unit').textContent).toEqual('°F'));

    await waitFor(() => fireEvent.click(getByTestId('celcius-button')));
    await waitFor(() => expect(getByTestId('current-temp-unit').textContent).toEqual('°C'));
  });

  it('will not search if input is empty', async () => {
    mockGetWeatherByLocation
      .mockResolvedValueOnce({
        status: 200,
        data: weatherNelson,
      })
      .mockResolvedValue({
        status: 200,
        data: weatherBrighton,
      });

    const { queryByTestId, getByTestId } = render(<Weather />);

    await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());
    await waitFor(() => expect(getByTestId('primary-location').textContent).toEqual('Nelson'));
    await waitFor(() => expect(getByTestId('secondary-location').textContent).toEqual('Tasman, New Zealand'));

    await waitFor(() => fireEvent.click(getByTestId('search-button')));

    await waitFor(() => expect(getByTestId('primary-location').textContent).toEqual('Nelson'));
    await waitFor(() => expect(getByTestId('secondary-location').textContent).toEqual('Tasman, New Zealand'));
  });

  it('will search if input is populated', async () => {
    mockGetWeatherByLocation
      .mockResolvedValueOnce({
        status: 200,
        data: weatherNelson,
      })
      .mockResolvedValue({
        status: 200,
        data: weatherBrighton,
      });

    const { queryByTestId, getByTestId } = render(<Weather />);

    await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());
    await waitFor(() => expect(getByTestId('primary-location').textContent).toEqual('Nelson'));
    await waitFor(() => expect(getByTestId('secondary-location').textContent).toEqual('Tasman, New Zealand'));

    fireEvent.change(getByTestId('search-input'), {
      target: { value: 'Brighton' },
    });
    await waitFor(() => fireEvent.click(getByTestId('search-button')));

    await waitFor(() => expect(getByTestId('primary-location').textContent).toEqual('Brighton'));
    await waitFor(() =>
      expect(getByTestId('secondary-location').textContent).toEqual('Brighton and Hove, United Kingdom')
    );
  });

  it('will retry successfully after unavailable due to error response', async () => {
    mockGetWeatherByLocation
      .mockResolvedValueOnce({
        status: 400,
        data: undefined,
      })
      .mockResolvedValue({
        status: 200,
        data: weatherNelson,
      });

    const { queryByTestId, getByTestId } = render(<Weather />);

    await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());
    await waitFor(() => expect(queryByTestId('unavailable-container')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('unavailable-retry-button')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('overview-container')).toBeFalsy());

    await waitFor(() => fireEvent.click(getByTestId('unavailable-retry-button')));

    await waitFor(() => expect(getByTestId('primary-location').textContent).toEqual('Nelson'));
    await waitFor(() => expect(getByTestId('secondary-location').textContent).toEqual('Tasman, New Zealand'));
    await waitFor(() => expect(queryByTestId('overview-container')).toBeTruthy());
  });

  it('will retry successfully after unavailable due to empty data', async () => {
    mockGetWeatherByLocation
      .mockResolvedValueOnce({
        status: 200,
        data: {},
      })
      .mockResolvedValue({
        status: 200,
        data: weatherNelson,
      });

    const { queryByTestId, getByTestId } = render(<Weather />);

    await waitFor(() => expect(queryByTestId('activity-indicator')).toBeNull());
    await waitFor(() => expect(queryByTestId('unavailable-container')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('unavailable-retry-button')).toBeTruthy());
    await waitFor(() => expect(queryByTestId('overview-container')).toBeFalsy());

    await waitFor(() => fireEvent.click(getByTestId('unavailable-retry-button')));

    await waitFor(() => expect(getByTestId('primary-location').textContent).toEqual('Nelson'));
    await waitFor(() => expect(getByTestId('secondary-location').textContent).toEqual('Tasman, New Zealand'));
    await waitFor(() => expect(queryByTestId('overview-container')).toBeTruthy());
  });
});
