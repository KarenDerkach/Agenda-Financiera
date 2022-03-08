import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchCity } from "../../redux/actions/Weather/actions";
import { StoreState, City } from "../../tools/interface";

interface SearchBarProps {
  searchCity(city: string): any;
}

function SearchBar(props: SearchBarProps) {
  const [city, setCity] = useState("");
  const [change, setChange] = React.useState(false);

useEffect(() => {
  
  setChange(change);

}, [props, change]);


  const handleChange = (e: any) => {
    setCity(e.target.value);
    setChange(!change);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.searchCity(city);
    setCity("");
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ciudad..."
          value={city} //se igual a mi estado city va entre llaves porq es una variable city
          onChange={handleChange} //detecta cuando el usuario escriba o borre, quiero q genere una funcion que modifique mi estado original que es "" entonces tengo q tomar el input q me da el usuario
        />
        <button type="submit" onClick={ handleSubmit}>Buscar</button>
      </form>
    </div>
  );
}
const mapStateToProps = (state: StoreState): { city: City[] } => {
  return {
    city: state.city,
  };
};

export default connect(mapStateToProps, { searchCity })(SearchBar);
