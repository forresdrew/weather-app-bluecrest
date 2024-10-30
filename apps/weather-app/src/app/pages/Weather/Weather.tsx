'use client';
import './Weather.css';
import '../../global.css';
import { FunctionComponent, useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import Image from 'next/image';
import TimelineClient from '../../api/TimelineClient';
import { HttpResponseMessage, IHttpResponseMessage } from '../../models/HttpResponseMessage';
import Unit, { getTemperatureUnitSymbol } from '../../enums/Unit';
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
  const [temperatureUnit, setTemperatureUnit] = useState(Unit.Celcius);
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [overviewIsVisible, setOverviewIsVisible] = useState(false);
  const [loadError, setLoadError] = useState<unknown>(null);

  // Extract initial location and number of upcoming days to forecast for easy editing
  const initialLocation = 'Brighton';
  const numDatesToDisplay = 5;

  const loadWeatherForecast = async (): Promise<void> => {
    // If nothing is in the search box just search initial location
    const searchLocation = location.trim() === '' ? initialLocation : location;

    // Stop showing error and start showing loading indicator
    setLoadError(false);
    setIsSearching(true);

    try {
      const weatherResponse: IHttpResponseMessage = await new TimelineClient().getWeatherByLocation(
        searchLocation,
        temperatureUnit,
        numDatesToDisplay
      );

      // Will throw if response code not in 200 range
      new HttpResponseMessage(weatherResponse).throwIfNotSuccessful();

      const forecast = weatherResponse.data as WeatherForecast;

      /* With more time I would do both the below steps in a much more typesafe way accounting for empty array / unsorted data */

      // Set currentConditions property to associated object from days array
      forecast.currentConditions = { ...forecast.days[0] } as Conditions;

      // Filter current day from upcoming days so we don't render it in 5 day forecast
      forecast.days.shift();

      // Load forecast into state and show overview column
      setWeatherForecast(forecast);
      setOverviewIsVisible(true);
    } catch (error) {
      // Store error in state for use in render tree
      setLoadError(error);
    }

    // Stop searching whether successful or otherwise
    setIsSearching(false);
  };

  useEffect(() => {
    // Self calling async function to load weather forecast on init and on temperature unit change
    (async () => {
      await loadWeatherForecast();
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
    <div className="container">
      <div className="column left-column">
        <div className="search-row">
          <input value={location} onChange={onLocationChanged} placeholder="Enter a Location..." />
          <IconButton onClick={onSearchClicked}>
            <HiArrowRight size={16} />
          </IconButton>
        </div>
        <div className="todays-weather-container">
          {loadError ? (
            <div className="centered-container">
              <h3 className="unavailable">Weather Unavailable</h3>
              <div onClick={loadWeatherForecast}>
                <h4 className=" retry clickable">Retry</h4>
              </div>
            </div>
          ) : !weatherForecast || isSearching ? (
            <div className="centered-container">
              <div className="activity-indicator" />
            </div>
          ) : (
            <>
              <div className="location-date-container">
                <div className="location-container">
                  <h2>{StringUtils.splitLocationString(weatherForecast?.resolvedAddress)[0]}</h2>
                  <h4>{StringUtils.splitLocationString(weatherForecast?.resolvedAddress)[1]}</h4>
                </div>
                <h3>{DateUtils.formatDateDDDddMMM(new Date())}</h3>
              </div>
              <div className="weather-image-container">
                <Image
                  className="weather-image"
                  src={require(`../../assets/images/${weatherForecast.currentConditions.icon ?? 'clear-day'}.svg`)}
                  alt={`${weatherForecast?.currentConditions.icon}.svg`}
                />
              </div>
              <div>
                <div className="today-temp-row">
                  <h1>{Math.round(weatherForecast.currentConditions.temp ?? 0)}</h1>
                  <h3>°{getTemperatureUnitSymbol(temperatureUnit)}</h3>
                </div>
                <h3>{weatherForecast.currentConditions.conditions}</h3>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="column right-column">
        {weatherForecast && overviewIsVisible && (
          <div className="overview-container">
            <div className="overview-header-row">
              <h3>Day Overview</h3>
              <div className="unit-buttons-row">
                <SwitchButton
                  label="°C"
                  isActive={temperatureUnit === Unit.Celcius}
                  onClick={() => setTemperatureUnit(Unit.Celcius)}
                />
                <SwitchButton
                  label="°F"
                  isActive={temperatureUnit === Unit.Fahrenheit}
                  onClick={() => setTemperatureUnit(Unit.Fahrenheit)}
                />
              </div>
            </div>
            <div className="overview-row-1">
              <PercentageIndicator label="Humidity" value={weatherForecast?.currentConditions.humidity} />
              <PercentageIndicator
                label="Cloud Cover"
                value={weatherForecast.currentConditions.cloudcover}
                barColor="#FF991B"
              />
            </div>
            <div className="overview-row-2">
              <div className="box-sub-row">
                <InfoBox
                  label="Min temp."
                  value={Math.round(weatherForecast.currentConditions.tempmin ?? 0).toString()}
                  unit={temperatureUnit}
                />
                <InfoBox
                  label="Max temp."
                  value={Math.round(weatherForecast.currentConditions.tempmax ?? 0).toString()}
                  unit={temperatureUnit}
                />
              </div>
              <div className="box-sub-row">
                <InfoBox label="Sunrise" value={weatherForecast.currentConditions.sunrise.substring(0, 5)} />
                <InfoBox label="Sunset" value={weatherForecast.currentConditions.sunset.substring(0, 5)} />
              </div>
            </div>
            <div className="forecast-header">
              <h3>{numDatesToDisplay} Day Forecast</h3>
            </div>
            <div className="five-day-row">
              {weatherForecast.days.map((conditions, index) => {
                return <ConditionsTile key={index} conditions={conditions} unit={temperatureUnit} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
