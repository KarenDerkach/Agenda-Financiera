const express = require('express')

const route = express.Router()

const {
    createEvent,
    deleteEvent
} = require('../controllers/eventsControllers')

route.post('/newevent', createEvent)
route.delete('/:id', deleteEvent)


module.exports = route