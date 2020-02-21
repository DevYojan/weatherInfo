import React from 'react';

class TodaysWeather extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    time: null,
  }

  render() {

    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    setInterval(() => {
      this.setState({
        time: new Date().toLocaleTimeString()
      });
    }, 1000);

    if (!this.props.weatherData) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        <h2 className="curTime">{(this.state.time) ? this.state.time.toLowerCase() : this.state.time}</h2>
        <h2>{this.props.weatherData.name}</h2>
        <div className="info">
          <img src={this.props.weatherData.icon} alt={this.props.weatherData.description} />
          <div className="temp">
            <h1>{this.props.weatherData.temp} &deg;C</h1>
            <div className="desc">
              <p>{this.props.weatherData.description} outside.</p>
              {this.props.weatherData.temp_min} - {this.props.weatherData.temp_max} &deg;C
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodaysWeather;