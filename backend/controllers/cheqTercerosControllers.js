const CheqTercerosModel = require('../models/cheqTerceros-models')


//ingreso de cheque
const entrieCheq = async(req,res) =>{
    try{
        const newCheq = new CheqTercerosModel({
            cliente: req.body.cliente,
            banco: req.body.banco,
            numero:req.body.numero,
            titular: req.body.titular,
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
        console.log("INGRESO AQUI")
        res.status(500).json({error: err})
    }

    
}

//obtener todos los cheques
const getAllCheq = async(req,res) =>{
    try{
        const dataDB = await CheqTercerosModel.find()
        res.status(200).send(dataDB)
    }
    catch(err){
        console.log(err)
    }
}

//FILTRADOS

//obtener cheque por  cliente
const getCheqByClient = async(req,res) =>{
    try{
        const dataDB = await CheqTercerosModel.find({cliente:req.params.cliente})
        res.status(200).send(dataDB)
    }
    catch(err){
        console.log(err)
    }
}

//Obtener cheque por fecha diferido

//Obtener cheque por status


//Actualizar/editar de cheque
const updateStatusCheq = async(req,res) =>{
    try{
        const dataDB = await CheqTercerosModel.findByIdAndUpdate(req.params.id,{
            status:req.body.status,
            diferido:req.body.diferido,
            importe:req.body.importe,
            observacion:req.body.observacion
        },{new:true})

        res.status(200).send(dataDB)
    }
    catch(err){
        console.log(err)
    }
}

//Eliminar cheque
const deleteCheq = async(req,res) =>{
    try{
        const dataDB = await CheqTercerosModel.findByIdAndDelete(req.params.id)
        res.status(200).send(dataDB)
    }
    catch(err){
        console.log(err)
    }
}

module.exports={
    entrieCheq,
    getAllCheq,
    getCheqByClient,
    updateStatusCheq,
    deleteCheq
}