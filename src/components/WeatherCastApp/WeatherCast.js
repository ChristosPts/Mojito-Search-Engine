import './WeatherCast.css';
import { Link } from 'react-router-dom'

import React from 'react';
import  {useState} from 'react';
import wCast from './imgs/wCast.svg'; //


const api = {
  key: "YOUR_API_KEY",
  base: "https://api.openweathermap.org/data/2.5/"
 }

function WeatherCast() {

  const[query,setQuery] = useState('');
  const[weather,setWeather] = useState({});
  
  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result =>{ 
        setQuery('');
        setWeather(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }


const classes = () => {
  if (typeof weather.main != "undefined"){
    if (weather.weather[0].main === "Clear"){
      return "wCast Clear";
    }  else if (weather.weather[0].main === "Drizzle"){
      return "wCast Drizzle";
    } else if (weather.weather[0].main === "Clouds"){
      return "wCast Clouds";
    } else if (weather.weather[0].main === "Rain"){
      return "wCast Rain";
    } else if (weather.weather[0].main === "Snow"){
      return "wCast Snow";
    } else if (weather.weather[0].main === "Thunderstorm"){
      return "wCast Thunderstorm";
    }
  } else 
    return "wCast";
}
 
  return (
    <div className= {classes()}> 
     <div className = "wCastlinks" ><Link to = {"/"}  className={"WLinkStyle"}>Mojito</Link></div>
    <div className="wCastBody">
    
      <div className="wCastSearchBox">
      <div className="wCastHeader">
        <h1> <a href="/WeatherCast"> <img src={wCast}alt="wCast"/> </a></h1>
              <input type="text" className="wCastSearchBar" placeholder="Search..."  
                     onChange={e => setQuery(e.target.value)}
                     value = {query}
                     onKeyPress={search}
              />
        </div>
      </div> 

     {(typeof weather.main != "undefined") ? (
      <div>
        <div className="locationBox">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
        </div>
      
          <div className="weatherBox">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
                 {weather.weather[0].main}
              </div>

            <div className="extras">
              <div className="feels">Feels like<br></br>{Math.round(weather.main.feels_like.toFixed())}°C</div> 
              <div className="humidity">Humidity<br></br>{weather.main.humidity}%</div>  
              <div className="wind">Wind Speed<br></br>{Math.round(weather.wind.speed.toFixed()*3.6)}km</div>
            </div>

          </div>
      </div>
      )  : ('')}
      </div>
    </div>
  );
}

export default WeatherCast;
