import { DataTypes } from "sequelize";
import db from "../config/db";

const User = db.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    role: {
        type: DataTypes.ENUM("Head", "Manager", "Employee"),
        allowNull: false,
    },
});

export default User;