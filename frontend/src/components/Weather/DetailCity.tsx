import React from 'react'

import Modal from 'react-modal';
import { StoreState, City} from '../../tools/interface';
import {connect} from 'react-redux';
import style from './DetailCity.module.css';

interface DetailProps {
    params : number;
    allCities: City[];
    modal: boolean;
    openModal(): any;
      closeModal(): any;
  }

  /* Inicio Conf Modal */
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '10px',
        width: '30vw',
        height: '70vh'
        
	},
};

Modal.setAppElement('#root');

/* Fin config modal */


 function DetailCity(props : DetailProps) {


    const city: any = props.allCities.find(city => city.id === props.params);
 
    

  return (
    <Modal
        isOpen={props.modal}
        onRequestClose={props.closeModal}
        style={customStyles}
        overlayClassName={style.overlay}
       
              >
      
        {    city ? (     
        <div className={style.modal_detail} >
      <button onClick={props.closeModal} className={style.btnClose}>X</button>
      <h3>{city.name}</h3>
      <img src={"http://openweathermap.org/img/wn/"+city.img+"@2x.png"} alt={city.name} className={style.imgWeather}/>
      <p > <strong>Clima : </strong> {city.weather}</p>
      <div className={style.container_temp}>
        <p> <strong>Temperatura Minima : </strong> {city.min}°</p>
        <p> <strong>Temperatura Maxima : </strong> {city.max}°</p>
           
        </div> 
            <div className={style.container_infoextra}>
              <p><strong>Viento: </strong> {city.wind} km/h </p>
              <p><strong>Humedad: </strong>{city.humidity}%</p>
              
            </div>
 </div> 
        
        ) : null}
      
 
   </Modal>
  )
}

const mapStateToProps = (state: StoreState): {allCities: City[]} => {
    return {
      allCities: state.allCities
    };
  };

  export default connect(mapStateToProps)(DetailCity);

