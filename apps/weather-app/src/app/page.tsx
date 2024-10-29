'use client'; // This is a client component
import { useEffect, useState, lazy } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import WeatherClient from './api/WeatherClient';
import { HttpResponseMessage, IHttpResponseMessage } from './models/HttpResponseMessage';
import Unit from './enums/Unit';
import WeatherForecast from './models/Forecast';
import DateUtils from './utils/DateUtils';
import Image from 'next/image';
import StringUtils from './utils/StringUtils';

const Index = () => {
  const [location, setLocation] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState(Unit.Celcius);
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [loadError, setLoadError] = useState<unknown>(null);

  const initialLocation = 'Brighton';

  const loadWeatherForecast = async (searchLocation: string): Promise<void> => {
    setIsSearching(true);

    try {
      const weatherResponse: IHttpResponseMessage = await new WeatherClient().getWeatherByLocation(
        searchLocation,
        temperatureUnit,
        5
      );
      new HttpResponseMessage(weatherResponse).throwIfNotSuccessful();

      const forecast = weatherResponse.data as WeatherForecast;
      setWeatherForecast(forecast);
    } catch (error) {
      setLoadError(error);
    }

    setIsSearching(false);
  };

  useEffect(() => {
    (async () => {
      const loc = location.trim() === '' ? initialLocation : location;
      await loadWeatherForecast(loc);
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

    await loadWeatherForecast(location);
  };

  const getTemperatureUnitSymbol = (): string => {
    let symbol = '';

    switch (temperatureUnit) {
      case Unit.Celcius:
        symbol = 'C';
        break;
      case Unit.Fahrenheit:
        symbol = 'F';
        break;
      default:
        symbol = '?';
    }

    return symbol;
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
          {!weatherForecast || isSearching ? (
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
                  {!!weatherForecast?.currentConditions.temp
                    ? Math.round(weatherForecast?.currentConditions.temp)
                    : 'Unknown'}
                </h1>
                <h3>°{getTemperatureUnitSymbol()}</h3>
              </div>
              <h3>{weatherForecast?.currentConditions.conditions}</h3>
            </>
          )}
        </div>
      </div>
      <div className="right-column">
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
          <div className="box">
            <h4>Humidity</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '6px' }}>
              <div style={{ width: '12px' }} />
              <h3 style={{ margin: '6px 0px' }}>
                {!!weatherForecast?.currentConditions.humidity
                  ? Math.round(weatherForecast?.currentConditions.humidity)
                  : 'Unknown'}
                %
              </h3>
              <div style={{ width: '12px' }}>
                <p>%</p>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '5px',
                borderRadius: '2px',
                overflow: 'hidden',
                margin: '6px 0px',
              }}
            >
              <div
                style={{
                  flex: Math.round(weatherForecast?.currentConditions.humidity ?? 0),
                  height: '5px',
                  backgroundColor: '#1BACFF',
                }}
              />
              <div
                style={{
                  flex: 100 - Math.round(weatherForecast?.currentConditions.humidity ?? 0),
                  height: '5px',
                  backgroundColor: 'white',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>0</p>
              <p>100</p>
            </div>
          </div>
          <div className="box">
            <h4>Cloud Cover</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '6px' }}>
              <div style={{ width: '12px' }} />
              <h3 style={{ margin: '6px 0px' }}>
                {!!weatherForecast?.currentConditions.cloudcover
                  ? Math.round(weatherForecast?.currentConditions.cloudcover)
                  : 'Unknown'}
                %
              </h3>
              <div style={{ width: '12px' }}>
                <p>%</p>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '5px',
                borderRadius: '2px',
                overflow: 'hidden',
                margin: '6px 0px',
              }}
            >
              <div
                style={{
                  flex: Math.round(weatherForecast?.currentConditions.cloudcover ?? 0),
                  height: '5px',
                  backgroundColor: '#FF991B',
                }}
              />
              <div
                style={{
                  flex: 100 - Math.round(weatherForecast?.currentConditions.cloudcover ?? 0),
                  height: '5px',
                  backgroundColor: 'white',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>0</p>
              <p>100</p>
            </div>
          </div>
        </div>
        <div className="overview-row-2">
          <div className="box">
            <h4>Min temp.</h4>
            <div
              style={{
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
              }}
            >
              <h3>{Math.round(weatherForecast?.days[0]?.tempmin ?? 0)}</h3>
              <h4>°{getTemperatureUnitSymbol()}</h4>
            </div>
          </div>
          <div className="box">
            <h4>Max temp.</h4>
            <div
              style={{
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
              }}
            >
              <h3>{Math.round(weatherForecast?.days[0]?.tempmax ?? 0)}</h3>
              <h4>°{getTemperatureUnitSymbol()}</h4>
            </div>
          </div>
          <div className="box">
            <h4>Sunrise</h4>
            <div style={{ marginTop: '12px' }}>
              <h3>{weatherForecast?.currentConditions?.sunrise.substring(0, 5)}</h3>
            </div>
          </div>
          <div className="box">
            <h4>Sunset</h4>
            <div style={{ marginTop: '12px' }}>
              <h3>{weatherForecast?.currentConditions?.sunset.substring(0, 5)}</h3>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '24px', marginBottom: '12px' }}>
          <h3>5 Day Forecast</h3>
        </div>
        <div className="five-day-row">
          {weatherForecast?.days.map((forecast, index) => {
            const header = DateUtils.isDateTomorrow(forecast.datetime)
              ? 'Tomorrow'
              : DateUtils.getWeekDay(forecast.datetime);

            if (index === 0) return <></>;

            return (
              <div className="box">
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ flex: 1 }}>
                    <h3>{header}</h3>
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
                    <h4 style={{ color: 'white' }}>
                      {forecast.tempmax} °{getTemperatureUnitSymbol()}
                    </h4>
                    <h4>
                      {forecast.tempmin} °{getTemperatureUnitSymbol()}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
