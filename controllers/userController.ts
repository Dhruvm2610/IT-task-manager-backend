import { Request, Response } from "express";
import User from "../models/User";

const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, role } = req.body;

        const user = await User.create({
            name, email, role,
        });

        res.status(201).json(user);   
    } catch (error: any) {
        res.status(500).json({
            message: "Error creating User",
            error: error.message,
        });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();

        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message,
        });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try { 
        const user = await User.findByPk(Number(req.params.id));

        if(!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message,
        });
    }
};

export { createUser, getAllUsers, getUserById };
    