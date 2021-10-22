import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';

// Typescript
import { Weather, ApiResponse, GlobalState, Config } from '../../../interfaces';

// CSS
import classes from './WeatherWidget.module.css';

// UI
import WeatherIcon from '../../UI/Icons/WeatherIcon/WeatherIcon';

interface ComponentProps {
  configLoading: boolean;
  config: Config;
}

const WeatherWidget = (props: ComponentProps): JSX.Element => {
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
    updatedAt: new Date(),
  });
  const [isLoading, setIsLoading] = useState(true);

  // Initial request to get data
  useEffect(() => {
    axios
      .get<ApiResponse<Weather[]>>('/api/weather')
      .then((data) => {
        const weatherData = data.data.data[0];
        if (weatherData) {
          setWeather(weatherData);
        }
        setIsLoading(false);
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
      {isLoading ||
        props.configLoading ||
        (props.config.WEATHER_API_KEY && weather.id > 0 && (
          <Fragment>
            <div className={classes.WeatherIcon}>
              <WeatherIcon
                weatherStatusCode={weather.conditionCode}
                isDay={weather.isDay}
              />
            </div>
            <div className={classes.WeatherDetails}>
              {props.config.isCelsius ? (
                <span>{weather.tempC}°C</span>
              ) : (
                <span>{weather.tempF}°F</span>
              )}
              <span>{weather.cloud}%</span>
            </div>
          </Fragment>
        ))}
    </div>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    configLoading: state.config.loading,
    config: state.config.config,
  };
};

export default connect(mapStateToProps)(WeatherWidget);
