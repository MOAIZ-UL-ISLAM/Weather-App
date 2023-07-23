import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [location, setlocation] = useState("");
  const [data, setdata] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8b84a187f5163b537d2c278a8032c6ec`;

  const searchCity = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setdata(response.data);
        console.log(response.data, event.key);
      });
      setlocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(event) => setlocation(event.target.value)}
          onKeyDown={searchCity}
        />
        <img
          src="/src/assets/search.png"
          style={{ width: 40, height: 40, marginTop: 6 }}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}&#176;&#8490;</h1> : null}
          </div>
          <div className="desc">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.main != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like}&#176;&#8490;</p>
              ) : null}
              <p>feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed}MPH</p> : null}
              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
