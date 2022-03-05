require('dotenv').config();
const axios = require('axios');

const {
    API_PASSWORD
  } = process.env;

//info ciudad especifica
const arrayCiudades = []

const dataAPI = async (req, res) => {
    const { ciudad } = req.params
   
    try {
        if (ciudad) {
            const city = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_PASSWORD}&units=metric`)
            const dataCity = await city.data
            if (dataCity.main !== undefined) {  //si el objeto tiene propiedad main
                const ciudad = {
                    min: Math.round(dataCity.main.temp_min),
                    max: Math.round(dataCity.main.temp_max),
                    img: dataCity.weather[0].icon,
                    id: dataCity.id,
                    wind: dataCity.wind.speed,
                    temp: dataCity.main.temp,
                    name: dataCity.name,
                    weather: dataCity.weather[0].main,
                    clouds: dataCity.clouds.all,
                    latitud: dataCity.coord.lat,
                    longitud: dataCity.coord.lon
                };
                arrayCiudades.push(ciudad)
                res.status(200).send(ciudad)

            } else {
                res.status(404).send("ERROR")
            }
        } else {
            res.status(404).send("Ciudad ingresada no existe")
        }
    } catch (err) {
        res.status(500).send(err)
    }



}

//obtener todas las ciudades
const getAllCities = async (req, res) => {
    // try {
    //     const cities = await axios.get(`http://api.openweathermap.org/data/2.5/group?id=${arrayCiudades.map(ciudad => ciudad.id)}&appid=${API_PASSWORD}&units=metric`)
    //    if(cities.data.list.length > 0){
    //     const dataCities = await cities.data.list
    //     res.status(200).json({
    //         message: "Ciudades obtenidas correctamente",
    //         response: dataCities
    //     })
    //    }else{
    //     res.status(404).json({
    //         message: "No hay ciudades",
    //         response: cities
    //     })
    //    }
        
    // } catch (err) {
    //     res.status(500).json({
    //         message: "Hubo un error",
    //         response: err
    //     })
    // }
    if(arrayCiudades.length > 0){
        res.status(200).send(arrayCiudades)
    }else{
        res.status(404).json({
            message: "No hay ciudades",
            response: arrayCiudades
        })
    }
}

//eliminar ciudad
const deleteCity = async (req, res) => {
    const { id } = req.params
    const findCity = arrayCiudades.find(ciudad => ciudad.id === Number(id))
    if(findCity){
       const newArr = arrayCiudades.splice(arrayCiudades.indexOf(findCity), 1)
        res.status(200).json({
            message: "Ciudad eliminada correctamente",
            response: newArr
        })
    } else {
        res.status(404).json({
            message: "Ciudad no encontrada",
        })
    }
}
    
module.exports = {
    dataAPI,
    getAllCities,
    deleteCity
}