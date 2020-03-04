import '../forecastlist.css'
import React from 'react';
import Forecast from './Forecast';
import { getDayOfWeek } from '../helpers/helper';

const todaysDate = new Date();

function getDay(day, daysAfter) {
  let copiedDate = new Date(todaysDate.getTime());
  copiedDate.setDate(copiedDate.getDate() + daysAfter);
  return copiedDate.getUTCDate();
}

const ForecastList = ({ forecastData }) => {

  let day1 = [],
    day2 = [],
    day3 = [],
    day4 = [],
    day5 = [];

  if (!forecastData) {
    return <div></div>;
  }

  for (let i=0; i<forecastData.list.length; i++) {
    
    let data = forecastData.list[i];
    const day = new Date(data.dt * 1000).getUTCDate();

    if (day === getDay(todaysDate, 0)) {
      day1.push(<Forecast data={data} key={data.dt} />);
      continue;
    }

    if (day === getDay(todaysDate, 1)) {
      day2.push(<Forecast data={data} key={data.dt} />);
      continue;
    }

    if (day === getDay(todaysDate, 2)) {
      day3.push(<Forecast data={data} key={data.dt} />);
      continue;
    }

    if (day === getDay(todaysDate, 3)) {
      day4.push(<Forecast data={data} key={data.dt} />);
      continue;
    }

    if (day === getDay(todaysDate, 4)) {
      day5.push(<Forecast data={data} key={data.dt} />);
      continue;
    }
  }

  return (
    <div>
      <details open>
        <summary>Today's Forecast</summary>
        <div className="todaysForecast forecastData">
          {day1}
        </div>
      </details>

      <details>
        <summary>{getDayOfWeek((forecastData.list[0].dt_txt), 1)}</summary>
        <div className="day2 forecastData">
          {day2}
        </div>
      </details>

      <details>
        <summary>{getDayOfWeek((forecastData.list[0].dt_txt), 2)}</summary>
        <div className="day3 forecastData">
          {day3}
        </div>
      </details>

      <details>
        <summary>{getDayOfWeek((forecastData.list[0].dt_txt), 3)}</summary>
        <div className="day4 forecastData">
          {day4}
        </div>
      </details>

      <details>
        <summary>{getDayOfWeek((forecastData.list[0].dt_txt), 4)}</summary>
        <div className="day5 forecastData">
          {day5}
        </div>
      </details>
    </div>
  );
}

export default ForecastList;