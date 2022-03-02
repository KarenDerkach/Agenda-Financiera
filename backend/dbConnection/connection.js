require('dotenv').config();
const mongoose = require('mongoose')
const {
    PASSWORD,
    NAME_DB
  } = process.env;

const uri = `mongodb+srv://chequera_app:${PASSWORD}@cluster0.hc8pi.mongodb.net/${NAME_DB}?retryWrites=true&w=majority`

const connection = () =>{
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology:true})
}

//metodos de escucha
//cuando se activa la DB
mongoose.connection.on('open', _=>{
console.log("se conecto la base de datos")
})

//Cuando ocurre un error
mongoose.connection.on('error', error =>{
  console.log(error)
})

module.exports = connection
