require('dotenv').config();
const mongoose = require('mongoose');
const { URL_MONGODB } = process.env;

// Set the strictQuery option to suppress the deprecation warning
mongoose.set('strictQuery', true);

const connection = () => {
  mongoose.connect(URL_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
};

// Metodos de escucha
// Cuando se activa la DB
mongoose.connection.on('open', () => {
  console.log("Se conectó la base de datos");
});

// Cuando ocurre un error
mongoose.connection.on('error', (error) => {
  console.log(error);
});

module.exports = connection;
