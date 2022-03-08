const express = require('express')

const route = express.Router()

const {
    addOwnCheq,
    listOwnCheq,
    deleteOwnCheq,
    updateOwnCheq
} = require('../controllers/cheqPropioControllers')

route.post('/newCheq', addOwnCheq)
route.get('/listCheq', listOwnCheq)
route.delete('/deleteCheq/:id', deleteOwnCheq)
route.put('/updateCheq/:id', updateOwnCheq)


module.exports = route