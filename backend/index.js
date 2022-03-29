const {
  PORT,
  NODE_ENV
} = process.env;

if (NODE_ENV !== 'production') {
require('dotenv').config();
}
const express = require('express')
const connection = require('./dbConnection/connection')
const routes = require('./routes/index')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
//permite entender codigo que mande el usuario mediante un form por ejemplo, extended:true -> permite recibir data e imagenes
app.use(express.urlencoded({ extended: true, limit: '50mb' }));



app.use('/', routes)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//middlewaress
app.use(( err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err ;
  console.error(err);
  res.status(status).send(message);

});


app.set('port', PORT || 3001) 

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