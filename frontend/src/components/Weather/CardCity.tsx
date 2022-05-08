import React from 'react'
import {Link} from 'react-router-dom'
import './CardCity.css'
import { motion } from "framer-motion"

interface CardCityProps {
  id: number;
  name: string;
  weather: string;
  min: number;
  max: number;
  img: string;
  lat: number;
  lon: number;
  onClose: () => void;
}

export default function CardCity({id,name, weather, min, max, img, lat, lon, onClose}: CardCityProps) {

   
  return (

    <motion.div 
    animate={{ scale: 1.2 }}
    transition={{ duration: 0.5 }}
    
    className="card">
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
        <div>
      
        <Link to={`/detail/${lat}/${lon}`}><button className='btn-info' >Más Información</button></Link>
        </div> 
    </motion.div>
  )
}
