import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ApiResponse, Config, NewNotification, Weather } from '../../../interfaces';

import InputGroup from '../../UI/Forms/InputGroup/InputGroup';
import Button from '../../UI/Buttons/Button/Button';
import { createNotification } from '../../../store/actions';

interface FormState {
  WEATHER_API_KEY: string;
  lat: number;
  long: number;
  isCelsius: number;
}

interface ComponentProps {
  createNotification: (notification: NewNotification) => void;
}

const WeatherSettings = (props: ComponentProps): JSX.Element => {
  const [formData, setFormData] = useState<FormState>({
    WEATHER_API_KEY: '',
    lat: 0,
    long: 0,
    isCelsius: 1
  })

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, isNumber?: boolean) => {
    let value: string | number = e.target.value;

    if (isNumber) {
      value = parseFloat(value);
    }

    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  useEffect(() => {
    axios.get<ApiResponse<Config[]>>('/api/config?keys=WEATHER_API_KEY,lat,long,isCelsius')
      .then(data => {
        let tmpFormData = { ...formData };

        data.data.data.forEach((config: Config) => {
          let value: string | number = config.value;
          if (config.valueType === 'number') {
            value = parseFloat(value);
          }

          tmpFormData = {
            ...tmpFormData,
            [config.key]: value
          }
        })

        setFormData(tmpFormData);
      })
      .catch(err => console.log(err));
  }, []);

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    // Check for api key input
    if ((formData.lat || formData.long) && !formData.WEATHER_API_KEY) {
      props.createNotification({
        title: 'Warning',
        message: 'API Key is missing. Weather Module will NOT work'
      })
    }

    // Save settings
    axios.put<ApiResponse<{}>>('/api/config', formData)
      .then(() => {
        props.createNotification({
          title: 'Success',
          message: 'Settings updated'
        })

        // Update weather with new settings
        axios.get<ApiResponse<Weather>>('/api/weather/update')
          .then(() => {
            props.createNotification({
              title: 'Success',
              message: 'Weather updated'
            })
          })
          .catch((err) => {
            props.createNotification({
              title: 'Error',
              message: err.response.data.error
            })
          });
      })
      .catch(err => console.log(err));
    
    // set localStorage
    localStorage.setItem('isCelsius', JSON.stringify(parseInt(`${formData.isCelsius}`) === 1))
  }

  return (
    <form onSubmit={(e) => formSubmitHandler(e)}>
      <InputGroup>
        <label htmlFor='WEATHER_API_KEY'>API Key</label>
        <input
          type='text'
          id='WEATHER_API_KEY'
          name='WEATHER_API_KEY'
          placeholder='secret'
          value={formData.WEATHER_API_KEY}
          onChange={(e) => inputChangeHandler(e)}
        />
        <span>
          Using
          <a
            href='https://www.weatherapi.com/pricing.aspx'
            target='blank'>
            {' '}Weather API
          </a>
          . Key is required for weather module to work.
        </span>
      </InputGroup>
      <InputGroup>
        <label htmlFor='lat'>Location Latitude</label>
        <input
          type='number'
          id='lat'
          name='lat'
          placeholder='52.22'
          value={formData.lat}
          onChange={(e) => inputChangeHandler(e, true)}
        />
        <span>
          You can use
          <a
            href='https://www.latlong.net/convert-address-to-lat-long.html'
            target='blank'>
            {' '}latlong.net
          </a>
        </span>
      </InputGroup>
      <InputGroup>
        <label htmlFor='long'>Location Longitude</label>
        <input
          type='number'
          id='long'
          name='long'
          placeholder='21.01'
          value={formData.long}
          onChange={(e) => inputChangeHandler(e, true)}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor='isCelsius'>Temperature Unit</label>
        <select
          id='isCelsius'
          name='isCelsius'
          onChange={(e) => inputChangeHandler(e, true)}
          value={formData.isCelsius}
        >
          <option value={1}>Celsius</option>
          <option value={0}>Fahrenheit</option>
        </select>
      </InputGroup>
    <Button>Save changes</Button>
    </form>
  )
}

export default connect(null, { createNotification })(WeatherSettings);