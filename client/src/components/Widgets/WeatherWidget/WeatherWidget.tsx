import { useState, useEffect, Fragment } from 'react';
import { Weather, ApiResponse } from '../../../interfaces';
import axios from 'axios';

import WeatherIcon from '../../UI/Icons/WeatherIcon/WeatherIcon';

import classes from './WeatherWidget.module.css';

const WeatherWidget = (): JSX.Element => {
  const [weather, setWeather] = useState<Weather>({
    externalLastUpdate: '',
    tempC: 0,
    tempF: 0,
    isDay: 1,
    conditionText: '',
    conditionCode: 1000,
    id: -1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  const [isLoading, setIsLoading] = useState(true);

  // Initial request to get data
  useEffect(() => {
    axios.get<ApiResponse<Weather[]>>('/api/weather')
      .then(data => {
        const weatherData = data.data.data[0];
        if (weatherData) {
          setWeather(weatherData);
        }
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  // Open socket for data updates
  useEffect(() => {
    const webSocketClient = new WebSocket('ws://localhost:5005');

    webSocketClient.onopen = () => {
      console.log('WebSocket opened');
    }

    webSocketClient.onclose = () => {
      console.log('WebSocket closed')
    }

    webSocketClient.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setWeather({
        ...weather,
        ...data
      })
    }

    return () => webSocketClient.close();
  }, []);

  return (
    <div className={classes.WeatherWidget}>
      {isLoading
        ? 'loading'
        : (weather.id > 0 && 
            (<Fragment>
              <div className={classes.WeatherIcon}>
                <WeatherIcon
                  weatherStatusCode={weather.conditionCode}
                  isDay={weather.isDay}
                />
              </div>
              <div className={classes.WeatherDetails}>
                <span>{weather.tempC}°C</span>
                <span>{weather.conditionCode}</span>
              </div>
            </Fragment>)
        )
      }
    </div>
  )
}

export default WeatherWidget;