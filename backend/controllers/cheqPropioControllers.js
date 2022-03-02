const CheqPropioModel = require('../models/cheqPropio-models')

//emision de cheque
const entrieCheqPropio = async(req,res) =>{
    try{
        const newCheq = new CheqPropioModel({
            cliente: req.body.cliente,
            banco: req.body.banco,
            numero:req.body.numero,
            status: req.body.status,
            diferido: req.body.diferido,
            ingreso: req.body.ingreso,
            importe: req.body.importe,
            observacion: req.body.observacion
        })
        console.log(newCheq)
       await newCheq.save()
        res.status(200).json({
            message: "Cheque ingresado correctamente",
            response: newCheq
        })
    }
    catch(err){
        res.status(500).json({error: err})
    }

    
}

//listado de cheques propios
const listCheqPropio = async(req,res) =>{
    try{
        const listCheq = await CheqPropioModel.find()
        res.status(200).json({
            message: "Listado de cheques propios",
            response: listCheq
        })
    }
    catch(err){
        res.status(500).json({error: err})
    }
}

module.exports = {
    entrieCheqPropio,
    listCheqPropio
}