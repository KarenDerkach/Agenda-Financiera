import React from 'react'
import './CardCity.css'
import DetailCity from './DetailCity';
import { motion } from "framer-motion"

interface CardCityProps {
  id: number;
  name: string;
  weather: string;
  min: number;
  max: number;
  img: string;
  onClose: () => void;
}

export default function CardCity({id,name, weather, min, max, img, onClose}: CardCityProps) {

    /*CONFIG MODAL*/

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }
  
  
    function closeModal() {
      setIsOpen(false);
    }
  

    /////////////////////////////////////////
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
      
        <button className='btn-info'onClick={openModal} >Más Información</button>
        
        {modalIsOpen ? <DetailCity params={id} modal={modalIsOpen} openModal={openModal} closeModal={closeModal}/> : null}
        </div> 
    </motion.div>
  )
}
