import axios from 'axios';
import { useAtomValue } from 'jotai';
import { Fragment, useEffect, useState } from 'react';
import { ApiResponse, Weather } from '../../../interfaces';
import { configAtom, configLoadingAtom } from '../../../state/config';
import { weatherTemplate } from '../../../utility/templateObjects/weatherTemplate';
import { WeatherIcon } from '../../UI';
import classes from './WeatherWidget.module.css';

export const WeatherWidget = (): JSX.Element => {
  const configLoading = useAtomValue(configLoadingAtom);
  const config = useAtomValue(configAtom);

  const [weather, setWeather] = useState<Weather>(weatherTemplate);

  // Initial request to get data
  useEffect(() => {
    axios
      .get<ApiResponse<Weather[]>>('/api/weather')
      .then((data) => {
        const weatherData = data.data.data[0];
        if (weatherData) {
          setWeather(weatherData);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Open socket for data updates
  useEffect(() => {
    const socketProtocol =
      document.location.protocol === 'http:' ? 'ws:' : 'wss:';
    const socketAddress = `${socketProtocol}//${window.location.host}/socket`;
    const webSocketClient = new WebSocket(socketAddress);

    webSocketClient.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setWeather({
        ...weather,
        ...data,
      });
    };

    return () => webSocketClient.close();
  }, []);

  return (
    <div className={classes.WeatherWidget}>
      {configLoading ||
        (config.WEATHER_API_KEY && weather.id > 0 && (
          <>
            <div className={classes.WeatherIcon}>
              <WeatherIcon
                weatherStatusCode={weather.conditionCode}
                isDay={weather.isDay}
              />
            </div>
            <div className={classes.WeatherDetails}>
              {/* TEMPERATURE */}
              {config.isCelsius ? (
                <span>{weather.tempC}°C</span>
              ) : (
                <span>{Math.round(weather.tempF)}°F</span>
              )}

              {/* ADDITIONAL DATA */}
              <span>
                {weather.conditionText} · 
                {weather[config.weatherData]}%
              </span>
            </div>
          </>
        ))}
    </div>
  );
};
