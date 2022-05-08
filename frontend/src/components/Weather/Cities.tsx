import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { City } from "../../tools/interface";
import { allCity, deleteCity } from "../../redux/actions/Weather/actions";
import CardCity from "./CardCity";
import SearchBar from "./SearchBar";
import gif from "../../tools/img/weather-gif.gif";
import "./Cities.css";

export default function Cities() {
  const infoCity = useSelector((state: any) => state.city);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCity());
  }, [dispatch, infoCity]);

  const handleDeleteCity = (id: number) => {
    dispatch(deleteCity(id));
  };

  return (
    <div className="w-container">
      <div className="row">
        <SearchBar />
      </div>
      <div className="container-cities">
        {infoCity.length > 0 ? (
          infoCity.map((city: City) => {
            return (
              <CardCity
                key={city.id}
                id={city.id}
                name={city.name}
                weather={city.weather}
                min={city.min}
                max={city.max}
                img={city.img}
                lat={city.latitud}
                lon={city.longitud}
                onClose={() => handleDeleteCity(city.id)}
              />
            );
          })
        ) : (
          <img src={gif} alt="icono clima" className="weather-gif" />
        )}
      </div>
    </div>
  );
}
