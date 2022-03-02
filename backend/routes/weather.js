const express = require('express')

const route = express.Router()

const {
    dataAPI,
    getAllCities,
    deleteCity
} = require('../controllers/weatherControllers')


route.get('/:ciudad', dataAPI)
route.get('/', getAllCities)
route.delete('/:id', deleteCity)

module.exports = route