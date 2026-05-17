"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User_1.default.create({
            name, email, role,
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating User",
            error: error.message,
        });
    }
};
exports.createUser = createUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message,
        });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user = await User_1.default.findByPk(Number(req.params.id));
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message,
        });
    }
};
exports.getUserById = getUserById;
