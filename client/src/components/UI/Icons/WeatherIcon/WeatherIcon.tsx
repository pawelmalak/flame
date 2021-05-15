import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Skycons } from 'skycons-ts';
import { GlobalState, Theme } from '../../../../interfaces';
import { IconMapping, TimeOfDay } from './IconMapping';

interface ComponentProps {
  theme: Theme;
  weatherStatusCode: number;
}

const WeatherIcon = (props: ComponentProps): JSX.Element => {
  const icon = (new IconMapping).mapIcon(props.weatherStatusCode, TimeOfDay.day);

  useEffect(() => {
    const delay = setTimeout(() => {
      const skycons = new Skycons({'color': props.theme.colors.accent});
      skycons.add(`weather-icon`, icon);
      skycons.play();
    }, 1);

    return () => {
      clearTimeout(delay);
    }
  }, []);

  return <canvas id={`weather-icon`} width='50' height='50'></canvas>
}

const mapStateToProps = (state: GlobalState) => {
  return {
    theme: state.theme.theme
  }
}

export default connect(mapStateToProps)(WeatherIcon);