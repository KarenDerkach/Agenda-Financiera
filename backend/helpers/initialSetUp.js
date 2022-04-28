const RoleModel = require("../models/role-models");

const createRoles = async () => {
    try{

        const count  =await RoleModel.estimatedDocumentCount()
        
        //Si ya existen roles no se crean
        if(count > 0) return
        
        
        //ejecuta todas estas promesas en paralelo y espera a que sean resueltas
        const values = await Promise.all([
            new RoleModel({name: 'user'}).save(),
            new RoleModel({name: 'admin'}).save(),
           
        ])
        
        console.log(values)
    }
    catch(error){
        console.log(error)
    }
}

module.exports = createRoles