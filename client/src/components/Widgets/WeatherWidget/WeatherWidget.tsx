import { useState, useEffect, Fragment } from 'react';
import { Weather, ApiResponse, Config } from '../../../interfaces';
import axios from 'axios';

import WeatherIcon from '../../UI/Icons/WeatherIcon/WeatherIcon';

import classes from './WeatherWidget.module.css';

const WeatherWidget = (): JSX.Element => {
  const [weather, setWeather] = useState<Weather>({
    externalLastUpdate: '',
    tempC: 0,
    tempF: 0,
    isDay: 1,
    cloud: 0,
    conditionText: '',
    conditionCode: 1000,
    id: -1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);

  // Initial request to get data
  useEffect(() => {
    // get weather
    axios.get<ApiResponse<Weather[]>>('/api/weather')
      .then(data => {
        const weatherData = data.data.data[0];
        if (weatherData) {
          setWeather(weatherData);
        }
        setIsLoading(false);
      })
      .catch(err => console.log(err));
    
    // get config
    if (!localStorage.isCelsius) {
      axios.get<ApiResponse<Config>>('/api/config/isCelsius')
        .then((data) => {
          setIsCelsius(parseInt(data.data.data.value) === 1);
          localStorage.setItem('isCelsius', JSON.stringify(isCelsius));
        })
        .catch((err) => console.log(err));
    } else {
      setIsCelsius(JSON.parse(localStorage.isCelsius));
    }
  }, []);

  // Open socket for data updates
  useEffect(() => {
    const webSocketClient = new WebSocket(`ws://${window.location.host}/socket`);

    webSocketClient.onopen = () => {
      console.log('Socket: listen')
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
                {isCelsius
                  ? <span>{weather.tempC}°C</span>
                  : <span>{weather.tempF}°F</span>
                }
                <span>{weather.cloud}%</span>
              </div>
            </Fragment>)
        )
      }
    </div>
  )
}

export default WeatherWidget;