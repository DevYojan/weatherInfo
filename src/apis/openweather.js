import Axios from "axios";

export const API_KEY = 'd07073bf53729e1461aa5ee997d17871';

export default Axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});