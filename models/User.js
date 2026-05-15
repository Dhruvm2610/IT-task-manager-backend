const { DataTypes } = require('sequelize'); //import
const db = require("../config/db"); //used for importing the database connection.

const User = db.define("User", {
    name: {
        type: DataTypes.STRING,  //data type
        allowNull: false, //field cannot be left empty.
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, //ensures that each email is unique.
    },

    role: {
        type: DataTypes.ENUM("Head", "Manager", "Employee"),
        allowNull: false,
    },
});

module.exports = User; //ready to export in other files.