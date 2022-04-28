const express = require('express')

const route = express.Router()

const {
    registrarUsuario,
  loginUsuario,
} = require('../controllers/authControllers')


route.post('/register', registrarUsuario)
route.post('/login', loginUsuario)

module.exports = route