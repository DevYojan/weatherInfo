import React from 'react';

class TodaysWeather extends React.Component {

  state = {
    time: null,
  }

  render() {

    if (!this.props.weatherData) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className="todaysWeather">
        <h2>{this.props.weatherData.name}</h2>
        <div className="todaysInfo">
          <img src={this.props.weatherData.icon} alt={this.props.weatherData.description} />
          <div className="temp">
            <h1>{this.props.weatherData.temp} &deg;C</h1>
            <div>
              <p className="description">{this.props.weatherData.description} outside.</p>
              {this.props.weatherData.temp_min} - {this.props.weatherData.temp_max} &deg;C
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodaysWeather;