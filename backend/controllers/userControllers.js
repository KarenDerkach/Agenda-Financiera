const UserModel = require("../models/user-models") ;
const RoleModel = require( "../models/role-models") ;


 const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const rolesFound = await RoleModel.find({ name: { $in: role } });


    // creating a new User
    const user = new UserModel({
      name,
      email,
      password,
      role: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await UserModel.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
    });
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find().populate("role", {
            _id:0,
            __v:0
        }).populate("chequeras",{
            user:0,
            __v:0
        }).populate("events",{
            user:0,
            __v:0
        });
    
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
    }
};

module.exports ={createUser, getUsers}