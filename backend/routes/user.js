const express = require('express')

const route = express.Router()
   

const { createUser, getUsers } = require('../controllers/userControllers')
//const validarCampos = require('../middlewares/validation')


route.post('/newUser', createUser)
route.get('/', getUsers)

module.exports = route