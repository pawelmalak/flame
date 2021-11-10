import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import axios from 'axios';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';
import { State } from '../../../store/reducers';

// Typescript
import { ApiResponse, Weather, WeatherForm } from '../../../interfaces';

// UI
import { InputGroup, Button } from '../../UI';

// Utils
import { inputHandler, weatherSettingsTemplate } from '../../../utility';

export const WeatherSettings = (): JSX.Element => {
  const { loading, config } = useSelector((state: State) => state.config);

  const dispatch = useDispatch();
  const { createNotification, updateConfig } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // Initial state
  const [formData, setFormData] = useState<WeatherForm>(
    weatherSettingsTemplate
  );

  // Get config
  useEffect(() => {
    setFormData({
      ...config,
    });
  }, [loading]);

  // Form handler
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Check for api key input
    if ((formData.lat || formData.long) && !formData.WEATHER_API_KEY) {
      createNotification({
        title: 'Warning',
        message: 'API key is missing. Weather Module will NOT work',
      });
    }

    // Save settings
    await updateConfig(formData);

    // Update weather
    axios
      .get<ApiResponse<Weather>>('/api/weather/update')
      .then(() => {
        createNotification({
          title: 'Success',
          message: 'Weather updated',
        });
      })
      .catch((err) => {
        createNotification({
          title: 'Error',
          message: err.response.data.error,
        });
      });
  };

  // Input handler
  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: { isNumber?: boolean; isBool?: boolean }
  ) => {
    inputHandler<WeatherForm>({
      e,
      options,
      setStateHandler: setFormData,
      state: formData,
    });
  };

  return (
    <form onSubmit={(e) => formSubmitHandler(e)}>
      <InputGroup>
        <label htmlFor="WEATHER_API_KEY">API key</label>
        <input
          type="text"
          id="WEATHER_API_KEY"
          name="WEATHER_API_KEY"
          placeholder="secret"
          value={formData.WEATHER_API_KEY}
          onChange={(e) => inputChangeHandler(e)}
        />
        <span>
          Using
          <a href="https://www.weatherapi.com/pricing.aspx" target="blank">
            {' '}
            Weather API
          </a>
          . Key is required for weather module to work.
        </span>
      </InputGroup>

      <InputGroup>
        <label htmlFor="lat">Location latitude</label>
        <input
          type="number"
          id="lat"
          name="lat"
          placeholder="52.22"
          value={formData.lat}
          onChange={(e) => inputChangeHandler(e, { isNumber: true })}
          step="any"
          lang="en-150"
        />
        <span>
          You can use
          <a
            href="https://www.latlong.net/convert-address-to-lat-long.html"
            target="blank"
          >
            {' '}
            latlong.net
          </a>
        </span>
      </InputGroup>

      <InputGroup>
        <label htmlFor="long">Location longitude</label>
        <input
          type="number"
          id="long"
          name="long"
          placeholder="21.01"
          value={formData.long}
          onChange={(e) => inputChangeHandler(e, { isNumber: true })}
          step="any"
          lang="en-150"
        />
      </InputGroup>

      <InputGroup>
        <label htmlFor="isCelsius">Temperature unit</label>
        <select
          id="isCelsius"
          name="isCelsius"
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
          value={formData.isCelsius ? 1 : 0}
        >
          <option value={1}>Celsius</option>
          <option value={0}>Fahrenheit</option>
        </select>
      </InputGroup>

      <Button>Save changes</Button>
    </form>
  );
};
