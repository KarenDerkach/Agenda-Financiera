const express = require('express')

const route = express.Router()

const {
    entrieCheq,
    getAllCheq,
    getCheqByClient,
    updateStatusCheq,
    deleteCheq
} = require('../controllers/cheqTercerosControllers')

route.post('/newCheq', entrieCheq)
route.get('/', getAllCheq)
route.get('/:cliente', getCheqByClient)
route.put('/:id', updateStatusCheq)
route.delete('/:id', deleteCheq)


module.exports = route