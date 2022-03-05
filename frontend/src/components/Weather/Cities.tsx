import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import { StoreState, City} from '../../tools/interface';
import { allCity, deleteCity, searchCity } from '../../redux/actions/actions'
import CardCity from './CardCity';
import SearchBar from './SearchBar';

interface CityProps {
	allCities: City[];
  city: City[];
	allCity(): any;
  deleteCity(id:number): any;
  searchCity(city:string): any;
}

 function Cities(props : CityProps) {
   
   useEffect(() => {
     props.allCity()
    }
    , [props])
    
    const handleDeleteCity = (id:number) => {
      props.deleteCity(id)
    }

    const handleSearchCity = (city:string) => {
      props.searchCity(city)
    }
    
    return (
      <div>
      
     <h1> Cities</h1>
      <div className="row">
      <SearchBar getCity={()=>handleSearchCity}/>  
      </div>
      <div>
      {
      props.allCities.length > 0 ?
       props.allCities.map((city: City) => { 
         return( <CardCity
          key={city.id}
        name ={city.name}
        weather= {city.weather}
          min={city.min}
          max={city.max}
          img={city.img}
          onClose = {() => handleDeleteCity(city.id)}
        /> )
          } )
          : <h3>Busca una ciudad</h3>
       }
     </div>
      
    </div>
  )
}

const mapStateToProps = (state: StoreState): {allCities: City[], city: City[]} => {
  return {
    allCities: state.allCities,
    city: state.city
  };
};

export default connect(mapStateToProps, {allCity, deleteCity,searchCity})(Cities);