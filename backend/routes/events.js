const express = require('express')

const route = express.Router()

const {
    getEvents,
    createEvent,
    deleteEvent
} = require('../controllers/eventsControllers')
//const {verifyToken, isUser }= require('../middlewares/authMiddleware')

route.post('/newevent',
// [verifyToken, isUser],
 createEvent)
route.get('/',
// [verifyToken, isUser], 
getEvents)
route.delete('/:id',
// [verifyToken, isUser],
 deleteEvent)


module.exports = route