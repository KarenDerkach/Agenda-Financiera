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
const {verifyToken, isUser }= require('../middlewares/authMiddleware')

route.post('/newCheq',
 [verifyToken, isUser],
 addCheq)
route.get('/listCheq',
 [verifyToken, isUser],
 listCheq)
route.delete('/deleteCheq/:id',
 [verifyToken, isUser],
 deleteCheq)
route.put('/updateCheq/:id',
 [verifyToken, isUser],
 updateCheq)
route.get('/detailCheq/:id',
 [verifyToken, isUser], 
detailCheq)
route.get('/cheq',
 [verifyToken, isUser], 
filterCheq)


module.exports = route