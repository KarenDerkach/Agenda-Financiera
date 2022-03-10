import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchCity , allCity} from "../../redux/actions/Weather/actions";
import { StoreState, City } from "../../tools/interface";
import {ImSearch} from 'react-icons/im'
import './SearchBar.css';
import swal from 'sweetalert';

interface SearchBarProps {
  searchCity(city: string): any;
  allCity(): any;
}

function SearchBar(props: SearchBarProps) {

  const [stateCity, setstateCity] = useState("");
  const [change, setChange] = React.useState(false);

useEffect(() => {
  props.allCity()


}, [props,change]);


  const handleChange = (e: any) => {
    setstateCity(e.target.value);
  }

  const handleSubmit = (e: any) => {
    if(stateCity){
    e.preventDefault();
    props.searchCity(stateCity);
    setChange(!change);
    setstateCity("");
    }else{
      swal("No se ha encontrado la ciudad", "intenta con una nueva", "warning");

    }
  }

  return (
    <div className="container-searchBar">
      <form className="box" onSubmit={handleSubmit}>
        <input className="inputCity"
          type="text"
          placeholder="Busca tu ciudad..."
          value={stateCity}
          onChange={(e)=>handleChange(e)} 
        />
        <button className="btnCity" type="submit" onClick={ handleSubmit}><ImSearch className="icon"/></button>
      </form>
    </div>
  );
}
const mapStateToProps = (state: StoreState): { city: City[] } => {
  return {
    city: state.city,
  };
};

export default connect(mapStateToProps, { searchCity, allCity })(SearchBar);
