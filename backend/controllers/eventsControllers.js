const EventModel = require('../models/event-models')

const getEvents = async (req, res) => {
    try {
        const events = await EventModel.find()
        res.status(200).send(events)
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener eventos',
            error
        })
    }
}

const createEvent = async (req, res) => {
    try {
        const {
            title,
            start,
            end,
            notes,
            type
        } = req.body
        const event = new EventModel({
            title,
            start,
            end,
            notes,
            type
        })
        await event.save()
        res.status(201).json({
            message: 'Evento creado',
            event
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear evento',
            error
        })
    }
}

const deleteEvent = async (req, res) => {
    try {
        const {
            id
        } = req.params
        await EventModel.findByIdAndDelete(id)
        res.status(200).json({
            message: 'Evento eliminado'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar evento',
            error
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    deleteEvent
}