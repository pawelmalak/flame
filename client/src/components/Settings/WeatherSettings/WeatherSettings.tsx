import { useState, ChangeEvent, Fragment, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { ApiResponse, Config } from '../../../interfaces';

import InputGroup from '../../UI/Forms/InputGroup/InputGroup';
import Button from '../../UI/Buttons/Button/Button';

interface FormState {
  WEATHER_API_KEY: string;
  lat: number;
  long: number;
  isCelsius: number;
}

const WeatherSettings = (): JSX.Element => {
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

    axios.put<ApiResponse<{}>>('/api/config', formData)
      .then(data => console.log(data.data.success))
      .catch(err => console.log(err));
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

export default WeatherSettings;