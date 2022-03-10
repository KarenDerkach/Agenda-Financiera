import React from 'react'
import './CardCity.css'

interface CardCityProps {
  key : number;
  name: string;
  weather: string;
  min: number;
  max: number;
  img: string;
  onClose: () => void;
}

export default function CardCity({name, weather, min, max, img, onClose}: CardCityProps) {
  return (
    <div className="card">
      <button  className='btnClose' onClick={onClose}>X</button>
      <h3>{name}</h3>
      <img src={"http://openweathermap.org/img/wn/"+img+"@2x.png"} alt={name} className='img-weather'/>
      <p className='w-subtitle'>{weather}</p>
      <div className="row-temperature">
            <div>
              <p>Min</p>
              <p>{min}°</p>
            </div>
            <div >
              <p>Max</p>
              <p>{max}°</p>
            </div>
        </div>    
    </div>
  )
}
