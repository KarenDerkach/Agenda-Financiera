const jwt = require("jsonwebtoken");
const RoleModel = require("../models/role-models");
const UserModel = require("../models/user-models");

//VERIFICA QUE EL USUARIO EXISTA
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"]
    //console.log(token)

    if (!token) return res.status(403).json({ message: "no se proporciono el token" })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded._id
    req.name = decoded.name
    const user = await UserModel.findById(req.userId, { password: 0 })

    if (!user) return res.status(401).json({ message: "no se encontro el usuario" })


    next()

  }
  catch (error) {
    res.status(500).json({ message: "error en el token" })
  }
}

//SOLAMENTE LOS USUARIOS PUEDEN  UTILIZAR LA APP
const isUser = async (req, res, next) => {

  const user = await UserModel.findById(req.userId, { password: 0 })

  const roles = await RoleModel.find({ _id: { $in: user.role } })

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "user") {
      next()
      return;
    }
  }

  return res.status(403).json({ message: "no tiene permisos, debe estar registrado" })

}

module.exports = { verifyToken, isUser }