const CheqModel = require('../models/cheq-models')
const UserModel = require('../models/user-models')


//emision de cheque
const addCheq = async(req,res) =>{
    const {cliente, banco, numero, status, diferido,type, pago,ingreso, importe, observacion} = req.body
     const {userId} = req
    try{

        const findUser = await UserModel.findById(userId)
        
        const findNumber = await CheqModel.findOne({numero})
        if(findNumber){
            res.status(400).json({
                message: "El numero de cheque ya existe"
            })
        }
    if(cliente && banco && numero && type &&diferido && importe){
        const newCheq = new CheqModel({
            cliente,
            banco,
            numero,
            status,
            diferido,
            type,
            pago,
            ingreso,
            importe,
            observacion
        })
       const cheqSave = await newCheq.save()

       //guardo en el modelo de user el cheque creado
       findUser.chequeras = [...findUser.chequeras, cheqSave._id]
         await findUser.save()

        res.status(200).json({
            message: "Cheque ingresado correctamente",
            response: cheqSave
        })}else{
            res.status(400).json({
                message: "Faltan datos"
            })
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: err})
    }

    
}

//listado de cheques 
const listCheq = async(req,res) =>{
    try{
        const listCheq = await CheqModel.find().populate('user',{name: 1, email: 1 , role:1})
        res.status(200).send(listCheq)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: err})
    }
}

const deleteCheq = async(req,res) =>{
    const {id} = req.params
    try{
        const cheq = await CheqModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Cheque eliminado correctamente",
            response: cheq
        })
    }
    catch(err){
        res.status(500).json({error: err})
    }
}

const updateCheq = async(req,res) =>{
    const {id} = req.params
    const {cliente, banco, numero, status, diferido, pago, importe, observacion} = req.body
    try{
        const cheq = await CheqModel.findByIdAndUpdate(id,{
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

//VER DETALLE DE CHEQUE

const detailCheq = async(req,res) =>{
    const {id} = req.params
    try{
        const detail = await CheqModel.findById(id)
        res.status(200).send(detail)
    }
    catch(err){
        res.status(500).json({error: err})
    }
}

//FILTROS

//obtener cheque por  cliente
const filterCheq = async(req,res) =>{
    const filter = req.query.filter
    try{
        if(filter === 'Pagado'){
            const cheq7 = await CheqModel.find({status:"Pagado"}).sort({diferido: 1})
            res.status(200).send(cheq7)
        }
        else if(filter === 'Pendiente'){
            const cheq8 = await CheqModel.find({status:"Pendiente"}).sort({diferido: 1})
            res.status(200).send(cheq8)
        }
        else if(filter === 'Cheque Propio'){
            const cheq9 = await CheqModel.find({type:"Cheque Propio"}).sort({diferido: 1})
            res.status(200).send(cheq9)

        }
        else if(filter === 'Cheque Tercero'){
            const cheq10 = await CheqModel.find({type:"Cheque Tercero"}).sort({diferido: 1})
            res.status(200).send(cheq10)
        }
        else if(filter === 'Diferido'){
            const cheq11 = await CheqModel.find({diferido: {$gte: 0}}).sort({diferido: 1})
            res.status(200).send(cheq11)

        }
        else if(filter === "Todos"){
            const cheq12 = await CheqModel
            res.status(200).send(cheq12)
        }
        else{
            res.status(400).json({
                message: "Faltan datos"
            })
        }

    }
    catch(err){
        res.status(500).json({error: err})
    }

}


module.exports = {
    addCheq,
    listCheq,
    deleteCheq,
    updateCheq,
    detailCheq,
    filterCheq
}