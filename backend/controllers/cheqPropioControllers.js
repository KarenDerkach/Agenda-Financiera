const CheqPropioModel = require('../models/cheqPropio-models')

//emision de cheque
const addOwnCheq = async(req,res) =>{
    const {cliente, banco, numero, status, diferido, pago,ingreso, importe, observacion} = req.body
   try{ 
    if(cliente && banco && numero && diferido && importe){
        const newCheq = new CheqPropioModel({
            cliente,
            banco,
            numero,
            status,
            diferido,
            pago,
            ingreso,
            importe,
            observacion
        })
       await newCheq.save()
        res.status(200).json({
            message: "Cheque ingresado correctamente",
            response: newCheq
        })}else{
            res.status(400).json({
                message: "Faltan datos"
            })
        }
    }
    catch(err){
        res.status(500).json({error: err})
    }

    
}

//listado de cheques propios
const listOwnCheq = async(req,res) =>{
    try{
        const listCheq = await CheqPropioModel.find()
        res.status(200).send(listCheq)
    }
    catch(err){
        res.status(500).json({error: err})
    }
}

const deleteOwnCheq = async(req,res) =>{
    const {id} = req.params
    try{
        const cheq = await CheqPropioModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Cheque eliminado correctamente",
            response: cheq
        })
    }
    catch(err){
        res.status(500).json({error: err})
    }
}

const updateOwnCheq = async(req,res) =>{
    const {id} = req.params
    const {cliente, banco, numero, status, diferido, pago, importe, observacion} = req.body
    try{
        const cheq = await CheqPropioModel.findByIdAndUpdate(id,{
            cliente,
            banco,
            numero,
            status,
            diferido,
            pago,
            importe,
            observacion
        })
        res.status(200).send(cheq)
    }
    catch(err){
        res.status(500).json({error: err})
    }
}

module.exports = {
    addOwnCheq,
    listOwnCheq,
    deleteOwnCheq,
    updateOwnCheq
}