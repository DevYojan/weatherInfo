import '../main.css';
import loadingGif from '../images/24.gif';
import currentweather, { API_KEY } from '../apis/currentweather';
import forecast from '../apis/forecast';
import React from 'react';
import TodaysWeather from './TodaysWeather';
import ForecastList from './ForecastList';
import Footer from './Footer';

class App extends React.Component {
  state = {
    errMessage: null,
    weatherData: null,
    forecastData: null,
  }

  componentDidMount() {
    if (!navigator.geolocation) {
      this.setState({
        errMessage: 'OOps... 😞 Your device does not support geolocation. This app can\'t function without geolocation.',
      });
    } else {

      // For current weather
      navigator.geolocation.getCurrentPosition(async (position) => {
        const query = `?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${API_KEY}`;
        let response = await currentweather.get(query);
        response = response.data;

        const weatherData = {
          description: response.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
          temp_min: response.main.temp_min,
          temp_max: response.main.temp_max,
          temp: response.main.temp,
          name: response.name,
          lon: response.coord.lon,
          lat: response.coord.lat,
        }

        this.setState({
          weatherData
        }, async () => {
          const query = `?lat=${this.state.weatherData.lat}&lon=${this.state.weatherData.lon}&units=metric&appid=${API_KEY}`;
          const response = await forecast.get(query);
          this.setState({
            forecastData: response.data,
          });
        });

      });
    }
  }

  render() {

    if (!this.state.weatherData) {
      return (
        <div className="container loading">
          <h1 className="heading">Weather Info</h1>
          <h1>Loading ...</h1>
          <img src={loadingGif} alt="Loading..." />
        </div>);
    }

    return (
      <div className="container">
        <h1 className="heading">Weather Info</h1>
        <TodaysWeather weatherData={this.state.weatherData} />
        <ForecastList forecastData={this.state.forecastData} />
        <Footer />
      </div>
    );
  }
}
export default App;