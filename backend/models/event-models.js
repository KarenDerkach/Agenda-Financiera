const mongoose = require('mongoose')

const {Schema} = mongoose

//defino normas/campos para el modelo
const entrieEventSchema = new Schema({
    title : {type: String, required:true},
    start : {type: Date, required: true},
    end: {type: Date, required: true},
    notes: String,
    type: { type: ["Cumpleaños","Reunion","Trabajo","Tareas", "Otros"], default: ["Reunion"]},
    user: {type: Schema.Types.ObjectId, ref: "usuarios"}

})

//model recibe dos parametros, 1ero: nombre de la collection , 2do: schema del modelo
const EventModel = mongoose.model('events',entrieEventSchema)

module.exports = EventModel