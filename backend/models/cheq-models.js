const mongoose = require('mongoose')

const {Schema} = mongoose

//defino normas/campos para el modelo
const entrieCheqSchema = new Schema({
    cliente : {type: String, required:true},
    banco : {type:String, required:true},
    numero: { type: Number, required: true, unique: true},
    status: {
        type: ["Pendiente","Pagado","Cobrado","Vencido","Rechazado","Endosado"],
        default: ["Pendiente"]
    },
    type: { type: ["Cheque Propio","Cheque Terceros"], default: ["Cheque Propio"]},
    diferido:{type: Date, required: true},
    ingreso:{type: Date, default: Date.now},
    pago:{type: Date},
    importe:{type: Number, required: true},
    observacion: String,
    
})

//model recibe dos parametros, 1ero: nombre de la collection , 2do: schema del modelo
const CheqModel = mongoose.model('cheq_propios', entrieCheqSchema)

module.exports = CheqModel