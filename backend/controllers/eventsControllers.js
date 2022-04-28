const EventModel = require('../models/event-models')
const UserModel = require('../models/user-models')

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
        type,
        user
    } = req.body

    const {userId} = req
    try {

        const findUser = await UserModel.findById(userId)

        if(title && start && end && type){
        const event = new EventModel({
            title,
            start,
            end,
            notes,
            type
        })
       const eventSave = await event.save()

 //guardo en el modelo de user el cheque creado
 findUser.events = [...findUser.events, eventSave._id]
 await findUser.save()


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