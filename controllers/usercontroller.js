const User = require("../models/User");

const createUser = async (req, res) => {
    try{
        const {name, email, role} = req.body;

        const user = await User.create({
            name, email, role
        })

        res.status(201).json(user);
    } catch (error){
        res.status(500).json({
            message: "Error creating user",
            error: error.message,
        });
    }
};

const getAllUsers = async (req, res) => {
    try{
        const Users = await User.findAll();

        res.status(200).json(Users);
    } catch (error){
        res.status(500).json({
            message: "Error fetching users",
            error: error.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if(!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);
    } catch (error) { 
        res.status(500).json({
            message: "Error fetching user",
            error: error.message,
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
};