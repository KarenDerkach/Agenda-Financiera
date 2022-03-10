const express = require('express')

const route = express.Router()

const {
    addCheq,
    listCheq,
    deleteCheq,
    updateCheq,
    detailCheq,
    filterCheq,
} = require('../controllers/cheqControllers')

route.post('/newCheq', addCheq)
route.get('/listCheq', listCheq)
route.delete('/deleteCheq/:id', deleteCheq)
route.put('/updateCheq/:id', updateCheq)
route.get('/detailCheq/:id', detailCheq)
route.get('/cheq', filterCheq)


module.exports = route