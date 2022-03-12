require('dotenv').config();
const mongoose = require('mongoose')
const {
    
    URL_MONGODB

  } = process.env;



const connection = () =>{
    mongoose.connect(URL_MONGODB, { useNewUrlParser: true, useUnifiedTopology:true})
   
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
