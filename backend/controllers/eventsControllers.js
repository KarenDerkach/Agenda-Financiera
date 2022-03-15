const EventModel = require('../models/event-models')

const getEvents = async (req, res) => {
    try {
        const events = await EventModel.find()
        events? 
        res.status(200).send(events) 
        :
        res.status(404).send({message: 'No events found'})
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener eventos',
            error
        })
    }
}

const createEvent = async (req, res) => {
    const {
        title,
        start,
        end,
        notes,
        type
    } = req.body
    try {
        if(title && start && end && type){
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
    }else{
        res.status(400).json({
            message: 'Faltan datos'
        })
    }
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear evento',
            error
        })
    }
}

const deleteEvent = async (req, res) => {
    const { id } = req.params

    try {
        
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