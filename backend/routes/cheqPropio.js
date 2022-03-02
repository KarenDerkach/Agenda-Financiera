const express = require('express')

const route = express.Router()

const {
    entrieCheqPropio,
    listCheqPropio
} = require('../controllers/cheqPropioControllers')

route.post('/newCheq', entrieCheqPropio)
route.get('/listCheq', listCheqPropio)


module.exports = route