const mongoose = require('mongoose')

const {Schema} = mongoose

//defino normas/campos para el modelo
const entrieCheqSchema = new Schema({
    cliente : {type: String, required:true},
    banco : {type:String, required:true},
    numero: { type: Number, required: true, unique: true},
    status: {
        type: ["Pendiente","Pagado","Vencido","Rechazado"],
        default: ["Pendiente"]
    },
    diferido:{type: String, required: true},
    ingreso:{type: Date, default: Date.now},
    pago:{type: Date},
    importe:{type: Number, required: true},
    observacion: String,
    
})

//model recibe dos parametros, 1ero: nombre de la collection , 2do: schema del modelo
const CheqPropioModel = mongoose.model('cheq_propios', entrieCheqSchema)

module.exports = CheqPropioModel