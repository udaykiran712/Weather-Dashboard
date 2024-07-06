import "./App.css"

import {Component} from "react"

import WeatherCard from "./Components/WeatherCard"

import {ThreeCircles} from "react-loader-spinner"

const apiStatus= {
  initial:"INITIAL",
  loading:"LOADING",
  success:"SUCCESS",
  failure:"FAILURE"
}

class App extends Component{

state = {
  cityName:"",
  weatherForeCastData:[],
  currentWeatherData:{},
  currentApiStatus:apiStatus.initial,
  isFahrenheit :false,
  isConvertVisible:false,
}

toggleUnits = ()=>{
  this.setState(prevState=>({isFahrenheit:!prevState.isFahrenheit}),this.getWeatherReports)
}

onChangeInput=(event)=>{
this.setState({cityName:event.target.value,currentApiStatus:apiStatus.initial,isConvertVisible:false,isFahrenheit:false})
}

onSearchSubmit=()=>{
  this.setState({currentApiStatus:apiStatus.loading,isFahrenheit:false},  this.getWeatherReports)
}

getWeatherReports = async ()=>{

  const {cityName,isFahrenheit} = this.state

  const units = isFahrenheit ? "imperial" : "metric"
  const apikey = "42af6ce2056732d3a7cefaa1c3e5d3fa";
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${apikey}`);  
  const data = await response.json()
  console.log(data)
  if(data.cod==="200"){
    const currentData={
      currentTemp:data.list[0].main.temp,
      currentWeather:data.list[0].weather[0].description,
      weatherIcon:data.list[0].weather[0].icon
    }  
    const newreports = data.list.filter((each)=>{
      const newDate = new Date(each.dt_txt).getHours()
      return newDate===21;
  })
  const updatedData = newreports.map((each)=>{
    return {
        highTemp:each.main.temp_max,
        lowTemp:each.main.temp_min,
        day:new Date(each.dt_txt).getDay(),
        weather:each.weather[0].main,
        weatherIcon:each.weather[0].icon,
    }});
    this.setState({weatherForeCastData:updatedData,currentWeatherData:currentData,currentApiStatus:apiStatus.success,isConvertVisible:true})
  }
  else{
    this.setState({currentApiStatus:apiStatus.failure})
  }
}


loadingView = ()=> <div className="loading-container">
<ThreeCircles   color="#00BFFF"  height={50} width={50} />
</div>

successView = ()=>{
const{weatherForeCastData,currentWeatherData,cityName,isFahrenheit} = this.state;
const units = isFahrenheit ? "F" : "C"
const imageLink = `http://openweathermap.org/img/w/${currentWeatherData.weatherIcon}.png`

return <div>
<div className="current-weather-container">
<div>
  <h3>Current Weather in {cityName}</h3>
  <h1 className="degrees">{currentWeatherData.currentTemp}&deg;{units}</h1>
  <p className="weather-condition">{currentWeatherData.currentWeather}</p>
</div>
<img src = {imageLink}  alt="weather-report" className="main-weather-icon" />
</div>

<h2 className="five-day-head">5-Day Forecast</h2>

<ul className="weather-cards-container">
{weatherForeCastData.map((each)=>(

<WeatherCard isFahrenheit={isFahrenheit} weatherDetails = {each} key={each.day}/>

))}
</ul>

</div>
}

failureView = ()=>{
  alert("City Not Found.  Please Enter A Valid City Name")
  this.setState({currentApiStatus:apiStatus.initial,cityName:""})
}

renderData= ()=>{
const {currentApiStatus} = this.state

switch(currentApiStatus){
case apiStatus.loading:
  return this.loadingView()
case apiStatus.success:
  return this.successView()
case apiStatus.failure:
  return this.failureView()
default:
  return null
}
}


  render(){

const{cityName,isFahrenheit,isConvertVisible} = this.state;
const units = isFahrenheit ?  "C" : "F" 
return <div className="App-container">
  <div className="dashboard-container">
    <div className="first-container">
    <h1 className="main-weather-heading">Weather Dashboard</h1>
    {isConvertVisible && <button onClick={this.toggleUnits}  className="convert-button"> TO &deg;{units} </button>}
    
    </div>
<div className="input-container">
<input type="text" value={cityName} onChange={this.onChangeInput}  placeholder="Enter city name..." className="search-container" />
<button onClick={this.onSearchSubmit} className="search-button">Search</button>
</div>
{this.renderData()}
  </div>
</div>

  }

}



export default App