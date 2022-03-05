import React, {useState} from 'react'

interface SearchBarProps {
    getCity: (city: string) => void;

}
export default function SearchBar({getCity}: SearchBarProps) {
    const [city,setCity] = useState("")
    return (
      <div>
      <form onSubmit={(event) => {
        event.preventDefault();  /**evito q se pierda los datos q se envian desde el formulario */
        getCity(city);
        setCity("") //cuando se haga click y se toma el valor como nuevo estado, luego q mi estado quede vacio nuevamente
      }}>
        <input
          type="text"
          placeholder="Ciudad..."
          value= {city}    //se igual a mi estado city va entre llaves porq es una variable city
          onChange = {event => setCity(event.target.value)}  //detecta cuando el usuario escriba o borre, quiero q genere una funcion que modifique mi estado original que es "" entonces tengo q tomar el input q me da el usuario
        />
        <input type="submit" value="Agregar" />  
      </form>
        </div>
    )
}
