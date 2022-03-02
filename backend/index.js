require('dotenv').config();
const express = require('express')
const connection = require('./dbConnection/connection')
const routes = require('./routes/index')
const app = express()
const {
    PORT
  } = process.env;

  app.use(express.json())
//me traigo las rutas
app.use('/', routes)

//middlewaress
app.use(( err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err ;
    console.error(err);
    res.status(status).send(message);
 
  });



app.listen(PORT, async() => {
    try{ 
        console.log(`server running on port ${PORT}`)
        await connection()
        console.log('CONNECTION DB OK')
    }
    catch(err){
        console.log(err)
    }
    
})