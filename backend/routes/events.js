const express = require('express')

const route = express.Router()

const {
    getEvents,
    createEvent,
    deleteEvent
} = require('../controllers/eventsControllers')

route.post('/newevent', createEvent)
route.get('/', getEvents)
route.delete('/:id', deleteEvent)


module.exports = route