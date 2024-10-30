'use client';
import './page.css';
import { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import WeatherClient from './api/WeatherClient';
import { HttpResponseMessage, IHttpResponseMessage } from './models/HttpResponseMessage';
import Unit, { getTemperatureUnitSymbol } from './enums/Unit';
import WeatherForecast from './models/Forecast';
import DateUtils from './utils/DateUtils';
import Image from 'next/image';
import StringUtils from './utils/StringUtils';
import PercentageIndicator from './components/PercentageIndicator/PercentageIndicator';
import InfoBox from './components/InfoBox/InfoBox';
import Conditions from './models/Conditions';

const Index = () => {
  const [location, setLocation] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState(Unit.Celcius);
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [overviewIsVisible, setOverviewIsVisible] = useState(false);
  const [loadError, setLoadError] = useState<unknown>(null);

  const initialLocation = 'Brighton';
  const numDatesToDisplay = 5;

  const loadWeatherForecast = async (): Promise<void> => {
    const searchLocation = location.trim() === '' ? initialLocation : location;

    setLoadError(false);
    setIsSearching(true);

    try {
      const weatherResponse: IHttpResponseMessage = await new WeatherClient().getWeatherByLocation(
        searchLocation,
        temperatureUnit,
        numDatesToDisplay
      );
      new HttpResponseMessage(weatherResponse).throwIfNotSuccessful();

      const forecast = weatherResponse.data as WeatherForecast;

      // Set currentConditions property to associated object from days array
      forecast.currentConditions = { ...forecast.days[0] } as Conditions;

      // Filter current day from upcoming days so we don't render it in 5 day forecast
      forecast.days.shift();

      setWeatherForecast(forecast);
      setOverviewIsVisible(true);
    } catch (error) {
      setLoadError(error);
    }

    setIsSearching(false);
  };

  useEffect(() => {
    (async () => {
      await loadWeatherForecast();
    })();
  }, [temperatureUnit]);

  const onLocationChanged = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setLocation(value);
  };

  const onSearchClicked = async (): Promise<void> => {
    if (location.trim() === '') {
      // TODO - focus input
      return;
    }

    await loadWeatherForecast();
  };

  return (
    <div className="container">
      <div className="left-column">
        <div className="search-row">
          <input value={location} onChange={onLocationChanged} placeholder="Enter a Location..." />
          <div className="search-button-container clickable" onClick={onSearchClicked}>
            <HiArrowRight size={16} />
          </div>
        </div>
        <div id="todays-weather-container" className="todays-weather-container">
          {loadError ? (
            <>
              <h3>Weather Unavailable</h3>
              <div onClick={loadWeatherForecast} style={{ marginTop: '8px' }}>
                <h4 className="clickable" style={{ color: '#1BACFF' }}>
                  Retry
                </h4>
              </div>
            </>
          ) : !weatherForecast || isSearching ? (
            <div className="activity-indicator" />
          ) : (
            <>
              <h2 style={{ marginBottom: '0px' }}>
                {StringUtils.splitLocationString(weatherForecast?.resolvedAddress)[0]}
              </h2>
              <h4 style={{ marginBottom: '24px' }}>
                {StringUtils.splitLocationString(weatherForecast?.resolvedAddress)[1]}
              </h4>
              <h3>{DateUtils.formatDate(new Date())}</h3>
              {!!weatherForecast?.currentConditions.icon && (
                <div style={{ margin: '50px 0px' }}>
                  <Image
                    src={require(`./assets/images/${weatherForecast?.currentConditions.icon}.svg`)}
                    alt={`${weatherForecast?.currentConditions.icon}.svg`}
                    style={{ width: '80%', height: 'auto' }} // optional
                  />
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  gap: '4px',
                }}
              >
                <h1>
                  {weatherForecast?.currentConditions.temp
                    ? Math.round(weatherForecast?.currentConditions.temp)
                    : 'Unknown'}
                </h1>
                <h3>°{getTemperatureUnitSymbol(temperatureUnit)}</h3>
              </div>
              <h3>{weatherForecast?.currentConditions.conditions}</h3>
            </>
          )}
        </div>
      </div>
      <div className="right-column">
        {overviewIsVisible && (
          <>
            <div className="overview-header-row">
              <h3>Day Overview</h3>
              <div className="unit-buttons-row">
                <div
                  onClick={() => setTemperatureUnit(Unit.Celcius)}
                  className={`unit-button-container clickable unit-button-${
                    temperatureUnit === Unit.Celcius ? 'enabled' : 'disabled'
                  }`}
                >
                  <p>°C</p>
                </div>
                <div
                  onClick={() => setTemperatureUnit(Unit.Fahrenheit)}
                  className={`unit-button-container clickable unit-button-${
                    temperatureUnit === Unit.Fahrenheit ? 'enabled' : 'disabled'
                  }`}
                >
                  <p>°F</p>
                </div>
              </div>
            </div>
            <div className="overview-row-1">
              <PercentageIndicator label="Humidity" value={weatherForecast?.currentConditions.humidity ?? 0} />
              <PercentageIndicator
                label="Cloud Cover"
                value={weatherForecast?.currentConditions.cloudcover ?? 0}
                barColor="#FF991B"
              />
            </div>
            <div className="overview-row-2">
              <InfoBox
                label="Min temp."
                value={Math.round(weatherForecast?.currentConditions.tempmin ?? 0).toString()}
                unit={temperatureUnit}
              />
              <InfoBox
                label="Max temp."
                value={Math.round(weatherForecast?.currentConditions.tempmax ?? 0).toString()}
                unit={temperatureUnit}
              />
              <InfoBox
                label="Sunrise"
                value={weatherForecast?.currentConditions?.sunrise?.substring(0, 5) ?? 'Unknown'}
              />
              <InfoBox
                label="Sunset"
                value={weatherForecast?.currentConditions?.sunset?.substring(0, 5) ?? 'Unknown'}
              />
            </div>
            <div style={{ marginTop: '24px', marginBottom: '12px' }}>
              <h3>{numDatesToDisplay} Day Forecast</h3>
            </div>
            <div className="five-day-row">
              {weatherForecast?.days.map((forecast, index) => {
                const header = DateUtils.isDateTomorrow(forecast.datetime)
                  ? 'Tomorrow'
                  : DateUtils.formatDate(new Date(forecast.datetime));

                return (
                  <div key={index} className="box">
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ color: 'white', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{header}</h4>
                        {!!forecast?.icon && (
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div
                              style={{
                                width: '80%',
                                paddingTop: '80%',
                                position: 'relative',
                              }}
                            >
                              <Image
                                src={require(`./assets/images/${forecast.icon}.svg`)}
                                alt={`${forecast.icon}.svg`}
                                style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <h4>{forecast.conditions}</h4>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginTop: '24px',
                        }}
                      >
                        <h4>
                          {Math.round(forecast.tempmin ?? 0)}°{getTemperatureUnitSymbol(temperatureUnit)}
                        </h4>
                        <h4 style={{ color: 'white' }}>
                          {Math.round(forecast.tempmax ?? 0)}°{getTemperatureUnitSymbol(temperatureUnit)}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
