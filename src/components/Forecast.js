import '../forecast.css';
import {amOrpm} from '../helpers/helper.js';
import React from 'react';

const Forecast = ({ data }) => {
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let time = new Date(data.dt * 1000);
  time = amOrpm(time.getUTCHours());

  return (
    <div className="weatherCard">

      <div className="timeAndLogo">
        <img src={icon} alt={data.weather[0].description} />
        <h3 className="time">{time}</h3>
      </div>

      <div className="info">
        <h3>{data.main.temp} &deg;C</h3>
        <p className="description">{data.weather[0].description} outside</p>
        <div className="temps">
          <p className="range"><strong>min:</strong> {data.main.temp_min} &deg;C</p>
          <p className="range"><strong>max:</strong> {data.main.temp_max} &deg;C</p>
        </div>
      </div>

    </div>
  );
}

export default Forecast;