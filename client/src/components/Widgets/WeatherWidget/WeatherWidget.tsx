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
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get<ApiResponse<Weather[]>>('/api/weather')
      .then(data => {
        setWeather(data.data.data[0]);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={classes.WeatherWidget}>
      {isLoading
        ? 'loading'
        : (
          <Fragment>
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
          </Fragment>
        )
      }
    </div>
  )
}

export default WeatherWidget;