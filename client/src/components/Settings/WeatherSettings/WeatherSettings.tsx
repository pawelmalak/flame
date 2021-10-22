import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { createNotification, updateConfig } from '../../../store/actions';

// Typescript
import {
  ApiResponse,
  Config,
  GlobalState,
  NewNotification,
  Weather,
  WeatherForm,
} from '../../../interfaces';

// UI
import InputGroup from '../../UI/Forms/InputGroup/InputGroup';
import Button from '../../UI/Buttons/Button/Button';

// Utils
import { inputHandler, weatherSettingsTemplate } from '../../../utility';

interface ComponentProps {
  createNotification: (notification: NewNotification) => void;
  updateConfig: (formData: WeatherForm) => void;
  loading: boolean;
  config: Config;
}

const WeatherSettings = (props: ComponentProps): JSX.Element => {
  // Initial state
  const [formData, setFormData] = useState<WeatherForm>(
    weatherSettingsTemplate
  );

  // Get config
  useEffect(() => {
    setFormData({
      ...props.config,
    });
  }, [props.loading]);

  // Form handler
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Check for api key input
    if ((formData.lat || formData.long) && !formData.WEATHER_API_KEY) {
      props.createNotification({
        title: 'Warning',
        message: 'API key is missing. Weather Module will NOT work',
      });
    }

    // Save settings
    await props.updateConfig(formData);

    // Update weather
    axios
      .get<ApiResponse<Weather>>('/api/weather/update')
      .then(() => {
        props.createNotification({
          title: 'Success',
          message: 'Weather updated',
        });
      })
      .catch((err) => {
        props.createNotification({
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

const mapStateToProps = (state: GlobalState) => {
  return {
    loading: state.config.loading,
    config: state.config.config,
  };
};

export default connect(mapStateToProps, { createNotification, updateConfig })(
  WeatherSettings
);
