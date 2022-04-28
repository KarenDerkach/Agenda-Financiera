const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    name: {
        type: String,  
    }
});

const RoleModel = model('roles', RoleSchema);
module.exports = RoleModel;