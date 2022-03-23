import React, { useEffect } from 'react'
import {connect} from 'react-redux';
import { StoreState, City} from '../../tools/interface';
import { allCity, deleteCity } from '../../redux/actions/Weather/actions'
import CardCity from './CardCity';
import SearchBar from './SearchBar';
import gif from '../../tools/img/weather-gif.gif'
import './Cities.css';

interface CityProps {
	allCities: City[];
	allCity(): any;
  deleteCity(id:number): any;
}

 function Cities(props : CityProps) {

   const [change, setChange] = React.useState(false);
  
   useEffect(() => {
     props.allCity()
 

}, [props, change]);
    

const handleDeleteCity = (id:number) => {
  props.deleteCity(id)
 setChange(!change)
}
    
    return (

      <div className='w-container'>
      
      <div className="row">
      <SearchBar/>  
      </div>
      <div className='container-cities'>
      {
      props.allCities.length > 0 ?
       props.allCities.map((city: City) => { 
      
          return( <CardCity
            key={city.id}
            id={city.id}
          name ={city.name}
          weather= {city.weather}
            min={city.min}
            max={city.max}
            img={city.img}
            onClose = {() => handleDeleteCity(city.id)}
          /> )
         
        
          } )
          : <img src={gif} alt='icono clima'className='weather-gif'/>
       }
     </div>
      
    </div>
  )
}

const mapStateToProps = (state: StoreState): {allCities: City[]} => {
  return {
    allCities: state.allCities
  };
};

export default connect(mapStateToProps, {allCity, deleteCity})(Cities);