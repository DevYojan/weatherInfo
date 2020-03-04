import '../main.css';
import loadingGif from '../images/24.gif';
import React from 'react';
import TodaysWeather from './TodaysWeather';
import currentweather, { API_KEY } from '../apis/currentweather';
import ForecastList from './ForecastList';
import forecast from '../apis/forecast';

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
        // let response = {
        //   "coord": {
        //     "lon": 55.95,
        //     "lat": 25.78
        //   },
        //   "weather": [
        //     {
        //       "id": 801,
        //       "main": "Clouds",
        //       "description": "few clouds",
        //       "icon": "02n"
        //     }
        //   ],
        //   "base": "stations",
        //   "main": {
        //     "temp": 19.92,
        //     "feels_like": 19.43,
        //     "temp_min": 18,
        //     "temp_max": 21.67,
        //     "pressure": 1013,
        //     "humidity": 55
        //   },
        //   "visibility": 10000,
        //   "wind": {
        //     "speed": 1,
        //     "deg": 160
        //   },
        //   "clouds": {
        //     "all": 19
        //   },
        //   "dt": 1582135808,
        //   "sys": {
        //     "type": 1,
        //     "id": 7544,
        //     "country": "AE",
        //     "sunrise": 1582080545,
        //     "sunset": 1582121486
        //   },
        //   "timezone": 14400,
        //   "id": 291074,
        //   "name": "Ras Al Khaimah City",
        //   "cod": 200
        // }

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

  // async componentDidUpdate() {
  //   const query = `?lat=${this.state.weatherData.lat}&lon=${this.state.weatherData.lon}&units=metric&appid=${API_KEY}`;
  //   const response = await forecast.get(query);
  //   this.setState({
  //     forecastData: response.data,
  //   });
  // }

  render() {

    if (!this.state.weatherData) {
      return (
        <div className="container loading">
          <h1>Loading ...</h1>
          <img src={loadingGif} alt="Loading..." />
        </div>);
    }

    return (
      <div className="container">
        <h1 className="heading">Weather Info</h1>
        <TodaysWeather weatherData={this.state.weatherData} />
        <ForecastList forecastData={this.state.forecastData} />
      </div>
    );
  }
}
export default App;