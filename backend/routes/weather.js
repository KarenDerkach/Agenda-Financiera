const express = require('express')

const route = express.Router()

const {
    dataAPI,
    getAllCities,
    detailCity,
    deleteCity
} = require('../controllers/weatherControllers')


route.get('/:ciudad', dataAPI)
route.get('/', getAllCities)
route.get('/detail/:latitud/:longitud', detailCity)
route.delete('/:id', deleteCity)

module.exports = route