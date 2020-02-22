import Axios from "axios";

export default Axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/forecast",
});