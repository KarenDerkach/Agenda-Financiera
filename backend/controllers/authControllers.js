const UserModel = require("../models/user-models");
const RoleModel = require("../models/role-models");

const { generateToken } = require("../helpers/generateToken");

const registrarUsuario = async (req, res ) => {
  const { email, password, name, role } = req.body;
try{
  //verificaciones
    let userFound = await UserModel.findOne({ email });

    if (userFound) {
      return res.status(401).json({
        err:true,
        message: "El email ya se encuentra registrado",

      })
      
    }
    if(!email, !password, !name){
      return res.status(401).json({
        err: true,
        message: "Todos los campos son requeridos"
      
      })
    }
    if(password.length < 6){
     return res.status(401).json({
        err: true,
        message: "La contraseña debe tener al menos 6 caracteres"
      })
    }
    //fin verificaciones
    
    const newUsuario = new UserModel({
      name,
      email,
      password : UserModel.encryptPassword(password),
    });

    console.log("newUsuario", newUsuario)

    if(role){
    const foundRole = await RoleModel.find({name:  role})
 newUsuario.role = foundRole.map(role => role._id) 
    //si no se asigna el role, no se le asigna usuario
  }else{
    const roles = await RoleModel.findOne({name: "user"})
    newUsuario.role =  [roles._id]
  }

    const savedUser = await newUsuario.save();
     console.log("saveUsuario",savedUser)

    // Generar JWT
     const token = await generateToken(savedUser._id);

   return res.status(201).json({
      ok: true,
      id: savedUser._id,
      name: savedUser.name,
      password: savedUser.password,
      role,
      token,
    });

}
catch(err){
  res.status(500).json({
    err: true,
    message: "Error en el servidor",
    error: err
  })
}

}




const loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  try{

    const userFound = await UserModel.findOne({ email }).populate("role", {
      _id: 0,
      __v: 0,
    });
    if (!userFound) {
      return res.status(401).json({
        err: true,
        message: "El usuario no existe, registrate"
      })
    }
    // Confirmar los passwords
    const validPassword = UserModel.matchPassword(password, userFound.password);
  
    if (!validPassword) {
     return  res.status(401).json({
        err: true,
        message: "Contraseña invalida"
      })
      
    }
  
  
      // Generar JWT
      const token = await generateToken(userFound._id);
  
    return  res.json({
        ok: true,
        id: userFound._id,
        name: userFound.name,
        token,
      });
   
  }
catch(error){
  console.log(error)
}
};



module.exports = {
registrarUsuario,
  loginUsuario,

};