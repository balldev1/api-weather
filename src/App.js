import photo1 from "./assets/photo1.jpg";
import photo2 from "./assets/photo2.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect,useState } from "react";
import { getFormattedWeatherData } from './weatherService'

function App() {

  const [city, setCity] = useState('Phetchabun')
  const [weather, setWeather] = useState(null)
  const [units, setUnits] =useState('metric')
  const [bg, setBg] = useState(photo2)

  useEffect(()=>{
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units)
      setWeather(data)

      // dynamic bg
      const threshold = units === 'metric' ? 20 : 60 ;
      if (data.temp <= threshold ) setBg(photo2);
      else setBg(photo1)
    }

    fetchWeatherData();
  },[units, city])

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? "°F" : "°C"
    setUnits(isCelsius ? 'metric' : 'imperial')
  }

  const enterKeyPressed = (e) =>{
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }
  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {
          weather  &&(
        
        <div className="container">
          {/* input */}
          <div className="section section_inputs">
            <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City" />
            <button onClick={handleUnitsClick}>°F</button>
          </div>

          {/* temperature */}
          <div className="section section_temperature"> 
            <div className="icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img
                src={weather.iconURL}
                alt="weatherIcon"
              />
              <h3>{weather.description}</h3>
            </div>
            <div className="temperature">
              <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</h1>  
            </div>
          </div>

          {/* bottom Descriptions */}
          <Descriptions weather={weather} units={units}/>
          
        </div>
        )
      }
      </div>
    </div>
  );
}

export default App;

// .toFixed()คือตัดทศนิยมออก 
// e.currentTarget.blur() ไม่โฟกัส

// if (e.keyCode === 13) ปุ่มenter
