import { useEffect } from 'react';
import { connect } from 'react-redux';
import { IconKey, Skycons } from 'skycons-ts';
import { GlobalState, Theme } from '../../../../interfaces';

interface ComponentProps {
  theme: Theme;
  icon: IconKey
}

const WeatherIcon = (props: ComponentProps): JSX.Element => {
  const randomId = `icon-${Math.floor(Math.random() * 1000)}`;
  useEffect(() => {
    const delay = setTimeout(() => {
      const skycons = new Skycons({'color': props.theme.colors.accent});
      skycons.add(`weather-icon-${randomId}`, props.icon);
      skycons.play();
    }, 1);

    return () => {
      clearTimeout(delay);
    }
  }, []);

  return <canvas id={`weather-icon-${randomId}`} width='50' height='50'></canvas>
}

const mapStateToProps = (state: GlobalState) => {
  return {
    theme: state.theme.theme
  }
}

export default connect(mapStateToProps)(WeatherIcon);