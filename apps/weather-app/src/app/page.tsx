'use client'; // This is a client component
import { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import WeatherClient from './api/WeatherClient';
import { HttpResponseMessage, IHttpResponseMessage } from './models/HttpResponseMessage';
import Unit from './enums/Unit';
import WeatherForecast from './models/Forecast';

const Index = () => {
  const [location, setLocation] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState(Unit.Celcius);
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast | null>(null);
  const [loadError, setLoadError] = useState<unknown>(null);

  const initialLocation = 'Brighton';

  const loadWeatherForecast = async (manualLocation?: string): Promise<void> => {
    try {
      const weatherResponse: IHttpResponseMessage = await new WeatherClient().getWeatherByLocation(
        manualLocation ?? location,
        temperatureUnit
      );
      new HttpResponseMessage(weatherResponse).throwIfNotSuccessful();

      const forecast = weatherResponse.data as WeatherForecast;
      setWeatherForecast(forecast);
    } catch (error) {
      setLoadError(error);
    }
  };

  useEffect(() => {
    (async () => {
      await loadWeatherForecast(initialLocation);
    })();
  }, []);

  const onLocationChanged = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setLocation(value);
  };

  return (
    <div className="container">
      <div className="left-column">
        <div className="search-row">
          <input value={location} onChange={onLocationChanged} placeholder="Enter a Location..." />
          <div className="search-button-container">
            <HiArrowRight />
          </div>
        </div>
        <div className="todays-weather-container"></div>
      </div>
      <div className="right-column">
        <div className="overview-header-row">
          <h2>Title</h2>
          <div className="unit-buttons-row">
            <div className="unit-button-container">
              <p>C</p>
            </div>
            <div className="unit-button-container">
              <p>F</p>
            </div>
          </div>
        </div>
        <div className="overview-row-1">
          <div className="box">Humidity</div>
          <div className="box">Cloud Cover</div>
        </div>
        <div className="overview-row-2">
          <div className="box">Min Temp</div>
          <div className="box">Max Temp</div>
          <div className="box">Sunrise</div>
          <div className="box">Sunset</div>
        </div>
        <h2>Heading</h2>
        <div className="five-day-row">
          <div className="box">Tomorrow</div>
          <div className="box">Tue</div>
          <div className="box">Wed</div>
          <div className="box">Thur</div>
          <div className="box">Fri</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
