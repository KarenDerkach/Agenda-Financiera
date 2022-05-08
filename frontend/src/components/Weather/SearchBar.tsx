import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCity } from "../../redux/actions/Weather/actions";
import { ImSearch } from "react-icons/im";
import "./SearchBar.css";
//import swal from 'sweetalert';

export default function SearchBar() {
  const dispatch = useDispatch();

  const [stateCity, setstateCity] = useState("");

  const handleChange = (e: any) => {
    setstateCity(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // if(!stateCity) return swal("No se ha encontrado la ciudad", "intenta con una nueva", "warning");
    dispatch(searchCity(stateCity));
    setstateCity("");
  };

  return (
    <div className="container-searchBar">
      <form className="box" onSubmit={handleSubmit}>
        <input
          className="inputCity"
          type="text"
          placeholder="Busca tu ciudad..."
          value={stateCity}
          onChange={(e) => handleChange(e)}
        />
        <button className="btnCity" type="submit" onClick={handleSubmit}>
          <ImSearch className="icon" />
        </button>
      </form>
    </div>
  );
}
