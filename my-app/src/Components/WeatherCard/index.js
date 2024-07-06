import "./index.css"

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]


const WeatherCard = (props)=>{
const {weatherDetails,isFahrenheit} = props
const units = isFahrenheit ? "F" : "C"

const {day,highTemp,lowTemp,weatherIcon,weather} = weatherDetails
const imageLink = `http://openweathermap.org/img/w/${weatherIcon}.png`
    return <li className="weather-card">
<p className="day-name">{days[day]}</p>
<img className="weather-icon" src={imageLink} alt={weather}  />

<div className="temp-container">
<p>High:{highTemp}&deg;{units} </p>
<p className="low-temp">Low: {lowTemp}&deg;{units}</p>
    
</div>

</li>
}



export default WeatherCard