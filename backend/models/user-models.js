const { Schema, model } = require('mongoose');
const bcrypt = require("bcryptjs");

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'roles',
    }],
    chequeras: [{
        type: Schema.Types.ObjectId,
        ref: 'chequeras',
    }],
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'events',
    }]
}, {
    timestamps: true
});

// Encriptar contraseña
UserSchema.statics.encryptPassword =  (password) => {
    const salt =  bcrypt.genSaltSync(10);
    return  bcrypt.hashSync(password,salt)
}

//Verificar contraseña cuando vuelva a ingresar
UserSchema.statics.matchPassword =  (password, receivePassword) => {
    return bcrypt.compareSync(password, receivePassword)  //true or false
}


const UserModel = model('usuarios', UserSchema);
module.exports = UserModel;