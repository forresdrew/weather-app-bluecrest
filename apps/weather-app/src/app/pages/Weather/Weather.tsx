'use client';
import './Weather.css';
import '../../global.css';
import { FunctionComponent, useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import Image from 'next/image';
import TimelineClient from '../../api/TimelineClient';
import { HttpResponseMessage, IHttpResponseMessage } from '../../models/HttpResponseMessage';
import TemperatureUnit, { getTemperatureUnitSymbol } from '../../enums/TemperatureUnit';
import WeatherForecast from '../../models/WeatherForecast';
import DateUtils from '../../utils/DateUtils';
import StringUtils from '../../utils/StringUtils';
import PercentageIndicator from '../../components/PercentageIndicator/PercentageIndicator';
import InfoBox from '../../components/InfoBox/InfoBox';
import Conditions from '../../models/Conditions';
import IconButton from '../../components/Buttons/IconButton/IconButton';
import SwitchButton from '../../components/Buttons/SwitchButton/SwitchButton';
import ConditionsTile from '../../components/ConditionsTile/ConditionsTile';

const Weather: FunctionComponent = () => {
  const [location, setLocation] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState(TemperatureUnit.Celcius);
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [forecastUnavailable, setForecastUnavailable] = useState(false);

  // Extract initial location and number of upcoming days to forecast for easy editing
  const initialLocation = 'Brighton';
  const numDatesToDisplay = 5;

  const loadWeatherForecast = async (hideOverview: boolean = true): Promise<void> => {
    // If nothing is in the search box just search initial location
    const searchLocation = location.trim() === '' ? initialLocation : location;

    // Stop showing error/unavailable and start showing loading indicator
    setForecastUnavailable(false);
    if (hideOverview) {
      setIsSearching(true);
    }

    try {
      const weatherResponse: IHttpResponseMessage = await new TimelineClient().getWeatherByLocation(
        searchLocation,
        temperatureUnit,
        numDatesToDisplay
      );

      // Will throw if response code not in 200 range
      new HttpResponseMessage(weatherResponse).throwIfNotSuccessful();

      const forecast = weatherResponse.data as WeatherForecast;

      // Set forecast to unavailable if a response has come through with no resolved location
      if (!forecast.resolvedAddress) {
        setForecastUnavailable(true);
      } else {
        /* With more time I would do both the below steps in a much more typesafe way accounting for empty array / unsorted data */

        // Set currentConditions property to associated object from days array
        forecast.currentConditions = { ...forecast.days[0] } as Conditions;

        // Filter current day from upcoming days so we don't render it in 5 day forecast
        forecast.days.shift();

        // Load forecast into state and show overview column
        setWeatherForecast(forecast);
      }
    } catch (error) {
      // update forcast unavailable state
      setForecastUnavailable(true);
    }

    // Stop searching whether successful or otherwise
    setIsSearching(false);
  };

  useEffect(() => {
    // Self calling async function to load weather forecast on init and on temperature unit change
    (async () => {
      if (!weatherForecast) {
        // First load
        await loadWeatherForecast();
      } else {
        // Don't hide data on temperature change
        await loadWeatherForecast(false);
      }
    })();
  }, [temperatureUnit]);

  // Input change handler
  const onLocationChanged = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setLocation(value);
  };

  // Ignore click if nothing is in search box, else search for typed location
  const onSearchClicked = async (): Promise<void> => {
    if (location.trim() === '') {
      return;
    }

    await loadWeatherForecast();
  };

  return (
    <div data-testid="weather-page" className="container">
      <div className="column left-column">
        <div className="search-row">
          <input
            data-testid="search-input"
            value={location}
            onChange={onLocationChanged}
            placeholder="Enter a Location..."
          />
          <IconButton testId="search-button" onClick={onSearchClicked}>
            <HiArrowRight size={16} />
          </IconButton>
        </div>
        <div className="todays-weather-container">
          {forecastUnavailable ? (
            <div data-testid="unavailable-container" className="centered-container">
              <h3 className="unavailable">Weather Unavailable</h3>
              <div data-testid="unavailable-retry-button" onClick={() => loadWeatherForecast()}>
                <h4 className="retry clickable">Retry</h4>
              </div>
            </div>
          ) : !weatherForecast || isSearching ? (
            <div data-testid="activity-indicator" className="centered-container">
              <div className="activity-indicator" />
            </div>
          ) : (
            <>
              <div className="location-date-container">
                <div className="location-container">
                  <h2 data-testid="primary-location">
                    {StringUtils.splitLocationString(weatherForecast?.resolvedAddress)[0]}
                  </h2>
                  <h4 data-testid="secondary-location">
                    {StringUtils.splitLocationString(weatherForecast?.resolvedAddress)[1]}
                  </h4>
                </div>
                <h3 data-testid="current-date">{DateUtils.formatDateDDDddMMM(new Date())}</h3>
              </div>
              <div data-testid="current-conditions-svg" className="weather-image-container">
                <Image
                  className="weather-image"
                  src={require(`../../assets/images/${weatherForecast.currentConditions.icon ?? 'clear-day'}.svg`)}
                  alt={`${weatherForecast?.currentConditions.icon}.svg`}
                />
              </div>
              <div>
                <div className="today-temp-row">
                  <h1 data-testid="current-temp">{Math.round(weatherForecast.currentConditions.temp ?? 0)}</h1>
                  <h3 data-testid="current-temp-unit">°{getTemperatureUnitSymbol(temperatureUnit)}</h3>
                </div>
                <h3 data-testid="current-conditions">{weatherForecast.currentConditions.conditions}</h3>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="column right-column">
        {!forecastUnavailable && !isSearching && weatherForecast && (
          <div data-testid="overview-container" className="overview-container">
            <div className="overview-header-row">
              <h3>Day Overview</h3>
              <div className="unit-buttons-row">
                <SwitchButton
                  testId="celcius-button"
                  label="°C"
                  isActive={temperatureUnit === TemperatureUnit.Celcius}
                  onClick={() => setTemperatureUnit(TemperatureUnit.Celcius)}
                />
                <SwitchButton
                  testId="fahrenheit-button"
                  label="°F"
                  isActive={temperatureUnit === TemperatureUnit.Fahrenheit}
                  onClick={() => setTemperatureUnit(TemperatureUnit.Fahrenheit)}
                />
              </div>
            </div>
            <div className="overview-row-1">
              <PercentageIndicator
                testId="humidity-percentage"
                label="Humidity"
                value={weatherForecast?.currentConditions.humidity}
              />
              <PercentageIndicator
                testId="cloud-cover-percentage"
                label="Cloud Cover"
                value={weatherForecast.currentConditions.cloudcover}
                barColor="#FF991B"
              />
            </div>
            <div className="overview-row-2">
              <div className="box-sub-row">
                <InfoBox
                  testId="min-temp-box"
                  label="Min temp."
                  value={Math.round(weatherForecast.currentConditions.tempmin ?? 0).toString()}
                  unit={temperatureUnit}
                />
                <InfoBox
                  testId="max-temp-box"
                  label="Max temp."
                  value={Math.round(weatherForecast.currentConditions.tempmax ?? 0).toString()}
                  unit={temperatureUnit}
                />
              </div>
              <div className="box-sub-row">
                <InfoBox
                  testId="sunrise-box"
                  label="Sunrise"
                  value={weatherForecast.currentConditions.sunrise.substring(0, 5)}
                />
                <InfoBox
                  testId="sunset-box"
                  label="Sunset"
                  value={weatherForecast.currentConditions.sunset.substring(0, 5)}
                />
              </div>
            </div>
            <div className="forecast-header">
              <h3>{numDatesToDisplay} Day Forecast</h3>
            </div>
            <div className="five-day-row">
              {weatherForecast.days.map((conditions, index) => {
                return (
                  <ConditionsTile
                    testId={`conditions-tile-${index}`}
                    key={index}
                    conditions={conditions}
                    unit={temperatureUnit}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
