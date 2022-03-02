const mongoose = require('mongoose')

const {Schema} = mongoose

//defino normas/campos para el modelo
const entrieCheqSchema = new Schema({
    cliente : {type: String, required:true},
    banco : {type:String, required:true},
    numero: { type: Number, required: true, unique: true},
    titular:  String,
    status: {
        type: ["Pendiente","Depositado","Vencido","Rechazado","Endosado"],
        default: ["Pendiente"]
    },
    diferido:{type: Date, required: true},
    ingreso:{type: Date, default: Date.now},
    importe:{type: Number, required: true},
    observacion: String,
    
})

//model recibe dos parametros, 1ero: nombre de la collection , 2do: schema del modelo
const CheqTercerosModel = mongoose.model('chequeras',entrieCheqSchema)


module.exports = CheqTercerosModel