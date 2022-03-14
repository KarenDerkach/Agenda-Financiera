require('dotenv').config();
const express = require('express')
const connection = require('./dbConnection/connection')
const routes = require('./routes/index')
const cors = require('cors')
const app = express()
const {
    PORT,
  } = process.env;

  app.use(express.json())
  app.use(cors())
//me traigo las rutas
app.use('/', routes)

//middlewaress
app.use(( err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err ;
    console.error(err);
    res.status(status).send(message);
 
  });


app.set('port', PORT || 3001);

app.listen( app.get('port'),  async() => {
    try{ 
        console.log(`server running on port ${app.get('port')}`)
        await connection()
        console.log('CONNECTION DB OK')
    }
    catch(err){
        console.log(err)
    }
    
})